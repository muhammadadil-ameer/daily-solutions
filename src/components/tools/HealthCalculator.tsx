"use client";

import { useEffect, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import {
  activityFactor,
  activityLevels,
  bmi,
  bmiCategory,
  bmr,
  ftInToCm,
  healthyWeightRange,
  idealWeights,
  KCAL_PER_KG,
  kgToLb,
  lbToKg,
  macros,
  minCalories,
  proteinLevels,
  tdee,
  type ActivityId,
  type Goal,
  type ProteinLevel,
  type Sex,
} from "@/lib/health";
import type { HealthCalc } from "@/lib/types";
import { ErrorMessage, Notice, Segmented, Stat } from "./ui";

const calcs: { id: HealthCalc; label: string }[] = [
  { id: "calorie", label: "Calories" },
  { id: "bmi", label: "BMI" },
  { id: "bmr", label: "BMR" },
  { id: "tdee", label: "TDEE" },
  { id: "macro", label: "Macros" },
  { id: "protein", label: "Protein" },
  { id: "deficit", label: "Calorie Deficit" },
  { id: "ideal-weight", label: "Ideal Weight" },
];

const needs: Record<HealthCalc, { age?: true; sex?: true; height?: true; weight?: true; activity?: true }> = {
  calorie: { age: true, sex: true, height: true, weight: true, activity: true },
  bmi: { height: true, weight: true },
  bmr: { age: true, sex: true, height: true, weight: true },
  tdee: { age: true, sex: true, height: true, weight: true, activity: true },
  macro: { age: true, sex: true, height: true, weight: true, activity: true },
  protein: { weight: true },
  deficit: { age: true, sex: true, height: true, weight: true, activity: true },
  "ideal-weight": { sex: true, height: true },
};

const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function HealthCalculator({ calc = "calorie", hub = false }: { calc?: HealthCalc; hub?: boolean }) {
  const [current, setCurrent] = useState<HealthCalc>(calc);
  useEffect(() => track("tool_open", { tool: hub ? "health-calculator" : `${calc}-calculator` }), [calc, hub]);

  return (
    <div className="space-y-6">
      {hub && (
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <Segmented label="Calculator" value={current} onChange={setCurrent} options={calcs} />
        </div>
      )}
      <Calculator key={current} calc={current} />
    </div>
  );
}

/** kg+cm, kg with height in feet/inches (common in South Asia), or lb+feet. */
type Units = "metric" | "kgft" | "imperial";

function Calculator({ calc }: { calc: HealthCalc }) {
  const need = needs[calc];
  const [units, setUnits] = useState<Units>("metric");
  const [age, setAge] = useState("30");
  const [sex, setSex] = useState<Sex>("female");
  const [cm, setCm] = useState("165");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("5");
  const [weight, setWeight] = useState("68");
  const [activity, setActivity] = useState<ActivityId>("light");
  const [goal, setGoal] = useState<Goal>("lose");
  const [protein, setProtein] = useState<ProteinLevel>("active");
  const [goalWeight, setGoalWeight] = useState("60");
  const [rate, setRate] = useState("0.5");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReactNode>(null);

  const weightLb = units === "imperial";
  const heightFt = units !== "metric";
  const wUnit = weightLb ? "lb" : "kg";

  function switchUnits(u: Units) {
    if (u === units) return;
    const w = Number(weight);
    const gw = Number(goalWeight);
    const toLb = u === "imperial";
    if (toLb !== weightLb) {
      const conv = (v: number) => (toLb ? fmt(kgToLb(v)) : fmt(lbToKg(v), 1)).replace(/,/g, "");
      if (w) setWeight(conv(w));
      if (gw) setGoalWeight(conv(gw));
    }
    const toFt = u !== "metric";
    if (toFt !== heightFt) {
      if (toFt) {
        const totalIn = Number(cm) / 2.54;
        if (totalIn) {
          setFt(String(Math.floor(totalIn / 12)));
          setInch(String(Math.round(totalIn % 12)));
        }
      } else {
        const c = ftInToCm(Number(ft), Number(inch));
        if (c) setCm(String(Math.round(c)));
      }
    }
    setUnits(u);
  }

  function calculate(e: { preventDefault(): void }) {
    e.preventDefault();
    setError("");
    const a = Number(age);
    const h = heightFt ? ftInToCm(Number(ft), Number(inch)) : Number(cm);
    const w = weightLb ? lbToKg(Number(weight)) : Number(weight);
    if (need.age && !(a >= 18 && a <= 100)) return fail("Please enter an age between 18 and 100. These calculators are designed for adults.");
    if (need.height && !(h >= 120 && h <= 250)) return fail("Please enter a valid height.");
    if (need.weight && !(w >= 30 && w <= 350)) return fail("Please enter a valid weight.");

    const toW = (kg: number) => (weightLb ? `${fmt(kgToLb(kg))} lb` : `${fmt(kg, 1)} kg`);
    const warnLow = (kcal: number) => kcal < minCalories(sex);

    switch (calc) {
      case "bmi": {
        // Round first so the shown value and its category always agree (e.g. 24.98 → 25.0 → Overweight).
        const v = Math.round(bmi(w, h) * 10) / 10;
        const c = bmiCategory(v);
        const r = healthyWeightRange(h);
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Your BMI" value={fmt(v, 1)} />
              <Stat label="Category" value={c.label} tone={c.tone === "good" ? "good" : undefined} />
            </dl>
            <BmiScale value={v} />
            <p className="text-sm text-muted">
              Healthy weight range for your height (BMI 18.5–24.9): <strong className="text-ink">{toW(r.min)} – {toW(r.max)}</strong>.
            </p>
          </>,
        );
        break;
      }
      case "bmr": {
        const v = bmr(sex, w, h, a);
        setResult(
          <>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat label="Basal Metabolic Rate" value={`${fmt(v)} kcal/day`} />
            </dl>
            <p className="text-sm text-muted">This is the energy your body uses at complete rest. Your total daily needs are higher once activity is included.</p>
          </>,
        );
        break;
      }
      case "tdee": {
        const b = bmr(sex, w, h, a);
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Your TDEE" value={`${fmt(b * activityFactor(activity))} kcal`} />
              <Stat label="BMR" value={`${fmt(b)} kcal`} />
            </dl>
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Calories per activity level</caption>
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-2 font-medium">Activity level</th>
                  <th className="py-2 text-right font-medium">kcal/day</th>
                </tr>
              </thead>
              <tbody>
                {activityLevels.map((l) => (
                  <tr key={l.id} className={`border-b border-line ${l.id === activity ? "font-semibold text-ink" : "text-muted"}`}>
                    <td className="py-2">{l.label}</td>
                    <td className="py-2 text-right">{fmt(b * l.factor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>,
        );
        break;
      }
      case "calorie": {
        const b = bmr(sex, w, h, a);
        const t = tdee(sex, w, h, a, activity);
        const rows = [
          { label: "Maintain weight", kcal: t, note: "" },
          { label: "Mild weight loss", kcal: t - 250, note: "≈0.25 kg / 0.5 lb per week" },
          { label: "Weight loss", kcal: t - 500, note: "≈0.5 kg / 1 lb per week" },
          { label: "Mild weight gain", kcal: t + 250, note: "≈0.25 kg / 0.5 lb per week" },
          { label: "Weight gain", kcal: t + 500, note: "≈0.5 kg / 1 lb per week" },
        ];
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Maintenance" value={`${fmt(t)} kcal`} />
              <Stat label="BMR" value={`${fmt(b)} kcal`} />
            </dl>
            <ul className="divide-y divide-line rounded-xl border border-line">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span>
                    <span className="block font-medium text-ink">{r.label}</span>
                    {r.note && <span className="block text-xs text-muted">{r.note}</span>}
                  </span>
                  <span className={`text-right font-semibold ${warnLow(r.kcal) ? "text-amber-700" : "text-ink"}`}>
                    {fmt(r.kcal)} kcal{warnLow(r.kcal) && <span className="block text-xs font-normal">below recommended minimum</span>}
                  </span>
                </li>
              ))}
            </ul>
          </>,
        );
        break;
      }
      case "macro": {
        const m = macros(sex, w, h, a, activity, goal);
        const parts = [
          { label: "Protein", g: m.proteinG, kcal: m.proteinG * 4, color: "bg-brand-600" },
          { label: "Carbs", g: m.carbsG, kcal: m.carbsG * 4, color: "bg-emerald-500" },
          { label: "Fat", g: m.fatG, kcal: m.fatG * 9, color: "bg-amber-500" },
        ];
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Calories" value={`${fmt(m.calories)} kcal`} />
              {parts.map((p) => (
                <Stat key={p.label} label={p.label} value={`${fmt(p.g)} g`} />
              ))}
            </dl>
            <div className="flex h-3 overflow-hidden rounded-full" aria-hidden="true">
              {parts.map((p) => (
                <div key={p.label} className={p.color} style={{ width: `${(p.kcal / m.calories) * 100}%` }} />
              ))}
            </div>
            <p className="text-sm text-muted">
              {parts.map((p) => `${p.label} ${fmt((p.kcal / m.calories) * 100)}%`).join(" · ")} of calories.
            </p>
          </>,
        );
        break;
      }
      case "protein": {
        const level = proteinLevels.find((p) => p.id === protein)!;
        const [lo, hi] = level.range;
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Daily protein" value={`${fmt(w * lo)}–${fmt(w * hi)} g`} />
              <Stat label="Per meal (4 meals)" value={`${fmt((w * lo) / 4)}–${fmt((w * hi) / 4)} g`} />
            </dl>
            <p className="text-sm text-muted">
              Based on {lo}–{hi} g per kg of body weight for “{level.label.toLowerCase()}”.
            </p>
          </>,
        );
        break;
      }
      case "deficit": {
        const gw = weightLb ? lbToKg(Number(goalWeight)) : Number(goalWeight);
        if (!(gw >= 30 && gw < w)) return fail("Your goal weight must be lower than your current weight.");
        const t = tdee(sex, w, h, a, activity);
        const perWeekKg = Number(rate);
        const daily = (perWeekKg * KCAL_PER_KG) / 7;
        const target = t - daily;
        const weeks = (w - gw) / perWeekKg;
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Maintenance" value={`${fmt(t)} kcal`} />
              <Stat label="Daily deficit" value={`${fmt(daily)} kcal`} />
              <Stat label="Eat per day" value={`${fmt(target)} kcal`} />
              <Stat label="Time to goal" value={`≈${fmt(Math.ceil(weeks))} weeks`} />
            </dl>
            {warnLow(target) && (
              <ErrorMessage>
                This target is below {fmt(minCalories(sex))} kcal per day, the usual minimum without medical supervision. Choose a slower rate.
              </ErrorMessage>
            )}
            <p className="text-sm text-muted">
              Losing {toW(w - gw)} at {toW(perWeekKg)} per week. Progress usually slows over time; recalculate every 4–5 kg (10 lb).
            </p>
          </>,
        );
        break;
      }
      case "ideal-weight": {
        const list = idealWeights(sex, h);
        const r = healthyWeightRange(h);
        setResult(
          <>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {list.map((x) => (
                <Stat key={x.name} label={x.name} value={toW(x.kg)} />
              ))}
            </dl>
            <p className="text-sm text-muted">
              Healthy BMI range for your height: <strong className="text-ink">{toW(r.min)} – {toW(r.max)}</strong>.
            </p>
            {h < 152.4 && <Notice>These formulas are designed for heights above 152 cm (5 ft). Use the BMI range instead.</Notice>}
          </>,
        );
        break;
      }
    }
    track("calculator_complete", { tool: `${calc}-calculator` });

    function fail(msg: string) {
      setResult(null);
      setError(msg);
      track("tool_error", { tool: `${calc}-calculator` });
    }
  }

  return (
    <form onSubmit={calculate} className="space-y-5" noValidate>
      {(need.height || need.weight) && (
        <Segmented
          label="Units"
          value={units}
          onChange={switchUnits}
          options={[
            { id: "metric", label: "kg + cm" },
            { id: "kgft", label: "kg + feet" },
            { id: "imperial", label: "lb + feet" },
          ]}
        />
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {need.sex && (
          <div>
            <p className="field-label">Sex</p>
            <Segmented label="Sex" value={sex} onChange={setSex} options={[{ id: "female", label: "Female" }, { id: "male", label: "Male" }]} />
          </div>
        )}
        {need.age && <Field id="age" label="Age (years)" value={age} onChange={setAge} />}
        {need.height &&
          (!heightFt ? (
            <Field id="cm" label="Height (cm)" value={cm} onChange={setCm} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Field id="ft" label="Height (ft)" value={ft} onChange={setFt} />
              <Field id="in" label="(in)" value={inch} onChange={setInch} />
            </div>
          ))}
        {need.weight && <Field id="weight" label={`Weight (${wUnit})`} value={weight} onChange={setWeight} decimal />}
        {calc === "deficit" && <Field id="goal-weight" label={`Goal weight (${wUnit})`} value={goalWeight} onChange={setGoalWeight} decimal />}
        {need.activity && (
          <div className="sm:col-span-2">
            <label htmlFor="activity" className="field-label">
              Activity level
            </label>
            <select id="activity" className="input" value={activity} onChange={(e) => setActivity(e.target.value as ActivityId)}>
              {activityLevels.map((l) => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>
        )}
        {calc === "macro" && (
          <div className="sm:col-span-2">
            <p className="field-label">Goal</p>
            <Segmented label="Goal" value={goal} onChange={setGoal} options={[
              { id: "lose", label: "Lose weight" },
              { id: "maintain", label: "Maintain" },
              { id: "gain", label: "Gain muscle" },
            ]} />
          </div>
        )}
        {calc === "protein" && (
          <div className="sm:col-span-2">
            <label htmlFor="protein-level" className="field-label">
              Activity and goal
            </label>
            <select id="protein-level" className="input" value={protein} onChange={(e) => setProtein(e.target.value as ProteinLevel)}>
              {proteinLevels.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        )}
        {calc === "deficit" && (
          <div className="sm:col-span-2">
            <p className="field-label">Weekly weight loss</p>
            <Segmented label="Weekly weight loss" value={rate} onChange={setRate} options={[
              { id: "0.25", label: weightLb ? "0.5 lb" : "0.25 kg" },
              { id: "0.5", label: weightLb ? "1 lb" : "0.5 kg" },
              { id: "0.75", label: weightLb ? "1.5 lb" : "0.75 kg" },
              { id: "1", label: weightLb ? "2 lb" : "1 kg" },
            ]} />
          </div>
        )}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      {/* type="button" so a click before hydration can't trigger a native form submit/reload. */}
      <button type="button" onClick={calculate} className="btn btn-primary w-full sm:w-auto">
        Calculate
      </button>
      {result && (
        <section aria-label="Results" aria-live="polite" className="space-y-4 rounded-2xl border border-line p-4 sm:p-5">
          {result}
          <p className="text-xs text-muted">Estimate only, not medical advice.</p>
        </section>
      )}
    </form>
  );
}

function Field({ id, label, value, onChange, decimal }: { id: string; label: string; value: string; onChange: (v: string) => void; decimal?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode={decimal ? "decimal" : "numeric"}
        step={decimal ? "0.1" : "1"}
        min={0}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function BmiScale({ value }: { value: number }) {
  const pos = Math.min(100, Math.max(0, ((value - 15) / (40 - 15)) * 100));
  return (
    <div aria-hidden="true">
      <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-400 via-emerald-500 via-40% to-red-500">
        <div className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-ink shadow" style={{ left: `${pos}%` }} />
      </div>
      <div className="relative mt-1 h-4 text-xs text-muted">
        {[15, 18.5, 25, 30, 40].map((t) => (
          <span key={t} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: `${((t - 15) / 25) * 100}%` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
