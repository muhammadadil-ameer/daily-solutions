import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${site.name} exists: simple, free online tools that solve small everyday digital problems quickly and privately.`,
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <StaticPage title={`About ${site.name}`} path="/about/" intro={site.tagline}>
      <h2>Why this website exists</h2>
      <p>
        Everyone runs into small digital problems: an iPhone photo a website won’t accept, a PDF that is too large to
        upload, a voice memo that won’t play, or a question like “how many calories should I eat?”. These problems are
        small, but finding a trustworthy tool to solve them often means ads, pop-ups, sign-up forms and uploading
        personal files to unknown servers.
      </p>
      <p>
        {site.name} brings together focused tools that each solve one clear problem. You open the tool, use it, and
        get your result. That’s it.
      </p>

      <h2>What you can do here</h2>
      <ul>
        <li>
          <Link href="/image-tools/">Image tools</Link>: convert formats such as HEIC, WebP and PNG, resize to exact
          dimensions and compress to a target file size.
        </li>
        <li>
          <Link href="/pdf-tools/">PDF tools</Link>: compress, merge, split, rotate and convert PDFs.
        </li>
        <li>
          <Link href="/media-tools/">Media tools</Link>: convert audio and video between common formats.
        </li>
        <li>
          <Link href="/health-tools/">Health calculators</Link>: estimate calories, BMI, BMR, TDEE, macros and more.
        </li>
      </ul>

      <h2>Why the tools are kept simple</h2>
      <p>
        Most people need a result in under a minute, often on a phone. So every tool puts the main action at the top of
        the page, uses plain language, and avoids settings most people never need. Explanations and tips are further down
        for anyone who wants them.
      </p>

      <h2>Our commitment to privacy</h2>
      <p>
        File tools on this site run inside your web browser. Your images, documents, audio and video are processed on
        your own device and are not uploaded to our server. Health calculators also run in your browser and do not
        store what you enter. You can read the details in our <Link href="/privacy/">Privacy Policy</Link>.
      </p>

      <h2>Feedback</h2>
      <p>
        Found a bug, or need a tool we don’t have yet? <Link href="/contact/">Contact us</Link>. Suggestions directly
        shape which tools are added next.
      </p>
    </StaticPage>
  );
}
