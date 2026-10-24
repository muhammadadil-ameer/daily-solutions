export type Sex = "male" | "female";

export const activityLevels = [
  { id: "sedentary", label: "Sedentary (little or no exercise)", factor: 1.2 },
  { id: "light", label: "Lightly active (1–3 days/week)", factor: 1.375 },
  { id: "moderate", label: "Moderately active (3–5 days/week)", factor: 1.55 },
  { id: "very", label: "Very active (6–7 days/week)", factor: 1.725 },
  { id: "extra", label: "Extra active (physical job + training)", factor: 1.9 },
] as const;

export type ActivityId = (typeof activityLevels)[number]["id"];

export const activityFactor = (id: ActivityId) => activityLevels.find((a) => a.id === id)!.factor;

/** Mifflin-St Jeor resting energy, kcal/day. */
export function bmr(sex: Sex, weightKg: number, heightCm: number, age: number) {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
}

export function tdee(sex: Sex, weightKg: number, heightCm: number, age: number, activity: ActivityId) {
  return bmr(sex, weightKg, heightCm, age) * activityFactor(activity);
}

export const minCalories = (sex: Sex) => (sex === "male" ? 1500 : 1200);

export function bmi(weightKg: number, heightCm: number) {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiCategory(v: number): { label: string; tone: "warn" | "good" | "bad" } {
  if (v < 18.5) return { label: "Underweight", tone: "warn" };
  if (v < 25) return { label: "Healthy weight", tone: "good" };
  if (v < 30) return { label: "Overweight", tone: "warn" };
  return { label: "Obesity", tone: "bad" };
}

export function healthyWeightRange(heightCm: number) {
  const m = heightCm / 100;
  return { min: 18.5 * m * m, max: 24.9 * m * m };
}

export type Goal = "lose" | "maintain" | "gain";

export function macros(sex: Sex, weightKg: number, heightCm: number, age: number, activity: ActivityId, goal: Goal) {
  const maintenance = tdee(sex, weightKg, heightCm, age, activity);
  const calories = Math.max(minCalories(sex), maintenance + (goal === "lose" ? -500 : goal === "gain" ? 300 : 0));
  const proteinG = weightKg * (goal === "lose" ? 2.0 : 1.6);
  const fatG = Math.max((calories * 0.25) / 9, weightKg * 0.6);
  const carbsG = Math.max(0, (calories - proteinG * 4 - fatG * 9) / 4);
  return { calories, proteinG, fatG, carbsG };
}

export const proteinLevels = [
  { id: "sedentary", label: "Mostly inactive", range: [0.8, 1.0] },
  { id: "active", label: "Exercise regularly", range: [1.2, 1.6] },
  { id: "muscle", label: "Build muscle / strength training", range: [1.6, 2.2] },
  { id: "cut", label: "Lose fat while training", range: [1.8, 2.2] },
  { id: "older", label: "Age 65 or older", range: [1.0, 1.2] },
] as const;

export type ProteinLevel = (typeof proteinLevels)[number]["id"];

export const KCAL_PER_KG = 7700;

export function idealWeights(sex: Sex, heightCm: number) {
  const inchesOver5ft = Math.max(0, heightCm / 2.54 - 60);
  const f = (male: [number, number], female: [number, number]) => {
    const [base, per] = sex === "male" ? male : female;
    return base + per * inchesOver5ft;
  };
  return [
    { name: "Devine", kg: f([50, 2.3], [45.5, 2.3]) },
    { name: "Robinson", kg: f([52, 1.9], [49, 1.7]) },
    { name: "Miller", kg: f([56.2, 1.41], [53.1, 1.36]) },
    { name: "Hamwi", kg: f([48, 2.7], [45.5, 2.2]) },
  ];
}

export const kgToLb = (kg: number) => kg * 2.20462;
export const lbToKg = (lb: number) => lb / 2.20462;
export const ftInToCm = (ft: number, inch: number) => (ft * 12 + inch) * 2.54;
