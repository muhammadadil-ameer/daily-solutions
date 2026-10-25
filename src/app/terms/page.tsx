import type { Metadata } from "next";
import Link from "next/link";
import { LAST_UPDATED, StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the free online tools on ${site.name}: acceptable use, file privacy, no warranty and limits of liability.`,
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <StaticPage title="Terms of Service" path="/terms/" intro={`Last updated: ${LAST_UPDATED}`}>
      <p>By using {site.name}, you agree to these terms. If you do not agree, please do not use the website.</p>

      <h2>Use of the tools</h2>
      <ul>
        <li>The tools are provided free of charge for personal and commercial use.</li>
        <li>You may only process files that you own or have the right to use. You are responsible for the files you process and the results you create.</li>
        <li>You must not use the website for any unlawful purpose, or attempt to disrupt, overload or reverse-engineer the service beyond what is allowed by the open-source licenses of its components.</li>
      </ul>

      <h2>No warranty</h2>
      <p>
        The tools are provided “as is” and “as available”, without warranties of any kind. We work to make results accurate
        and reliable, but we do not guarantee that every file will convert correctly or that results will meet your needs.
        Always keep a copy of your original files and check results before relying on them.
      </p>

      <h2>Health calculators</h2>
      <p>
        Health and fitness calculators provide estimates for general information only and are not medical advice. See the{" "}
        <Link href="/disclaimer/">Disclaimer</Link>.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {site.name} is not liable for any loss of data, loss of profit, or indirect or
        consequential damages arising from use of the website or its tools.
      </p>

      <h2>Open-source software</h2>
      <p>
        The tools use open-source software including pdf-lib, PDF.js, FFmpeg (via ffmpeg.wasm), heic2any, UTIF.js,
        gifenc, jSquash and fflate. These components are subject to their own licenses.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed. Continued use means you accept the updated terms.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </StaticPage>
  );
}
