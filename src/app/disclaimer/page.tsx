import type { Metadata } from "next";
import Link from "next/link";
import { LAST_UPDATED, StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Health calculators on ${site.name} provide estimates for general information and are not medical advice.`,
  alternates: { canonical: "/disclaimer/" },
};

export default function Disclaimer() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer/" intro={`Last updated: ${LAST_UPDATED}`}>
      <h2>Health and fitness calculators</h2>
      <p>
        The <Link href="/health-tools/">health and fitness calculators</Link> on {site.name} (including calorie, BMI,
        BMR, TDEE, macro, protein, calorie deficit and ideal weight calculators) provide estimates for general
        informational purposes only. They are not medical advice and are not a substitute for professional diagnosis or
        treatment.
      </p>
      <ul>
        <li>Results are based on population formulas and can differ significantly from your actual needs.</li>
        <li>The calculators do not diagnose any condition. A BMI category is not a diagnosis.</li>
        <li>
          Calculators are designed for healthy adults. They are not suitable for children, teenagers, pregnant or
          breastfeeding women, or people with medical conditions such as diabetes, kidney disease or eating disorders.
        </li>
        <li>Always consult a doctor or registered dietitian before making significant changes to your diet, exercise or medication.</li>
      </ul>
      <p>If you think you may have a medical emergency, contact your doctor or local emergency services immediately.</p>

      <h2>File tools</h2>
      <p>
        Conversion and compression results can vary depending on the input file. Always keep your original files and check
        results before using them for important purposes.
      </p>

      <h2>External links</h2>
      <p>We are not responsible for the content of external websites linked from this site.</p>
    </StaticPage>
  );
}
