import type { Metadata } from "next";
import Link from "next/link";
import { LAST_UPDATED, StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles your data: files are processed in your browser and not uploaded. Details on analytics, cookies and third-party services.`,
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <StaticPage title="Privacy Policy" path="/privacy/" intro={`Last updated: ${LAST_UPDATED}`}>
      <p>
        This policy explains what information {site.name} (“we”, “us”) collects when you use {site.url.replace(/^https?:\/\//, "")} and
        how it is used. The short version: your files are processed in your browser and are never uploaded to our server.
      </p>

      <h2>Files you use with our tools</h2>
      <p>
        The image, PDF, audio and video tools run entirely inside your web browser using JavaScript and WebAssembly.
        When you choose a file, it is read from your device into your browser’s memory, processed there, and the result
        is offered back to you as a download.
      </p>
      <ul>
        <li>Your files are <strong>not uploaded</strong> to our server or to any third party.</li>
        <li>We do not store your files. They remain in your browser’s memory only until you close or reload the page.</li>
        <li>We cannot see, access or recover your files.</li>
      </ul>

      <h2>Information you enter in calculators</h2>
      <p>
        Health and fitness calculators run in your browser. Values such as age, height and weight are not sent to us and
        are not stored.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        Our hosting provider, Vercel, processes standard technical data such as IP address, browser type and requested
        pages to deliver the website and protect it from abuse. These server logs are retained by Vercel for a limited
        time according to its own policies.
      </p>
      <p>
        We use Google Analytics 4 to understand how the site is used: which pages are visited, which tools are opened,
        and whether conversions, downloads or errors occur. These events never include the content or names of your
        files. Google Analytics uses cookies and may process your IP address. You can opt out with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
          Google Analytics opt-out add-on
        </a>{" "}
        or by blocking cookies in your browser.
      </p>
      <p>
        We also use Microsoft Clarity to see how visitors use our pages, through heatmaps and session replays (mouse
        movements, clicks and scrolling). The tool area of each page, where file names, previews and the values you enter
        appear, is masked so it is not captured in replays. Your files themselves are never sent to Clarity. Clarity
        uses cookies and processes data such as your IP address and device information. Learn more in the{" "}
        <a href="https://privacy.microsoft.com/privacystatement" rel="noopener noreferrer" target="_blank">
          Microsoft Privacy Statement
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        We do not use cookies for advertising. Analytics cookies from Google Analytics and Microsoft Clarity are set as
        described above. See our <Link href="/cookie-policy/">Cookie Policy</Link> for details.
      </p>

      <h2>Third-party services</h2>
      <ul>
        <li>
          <strong>Vercel</strong> hosts the website.
        </li>
        <li>
          <strong>jsDelivr</strong> (a public CDN) delivers the FFmpeg engine used by the audio and video converter. When
          you start your first media conversion, your browser downloads this engine from jsDelivr, which receives standard
          request data such as your IP address. Your media file is not sent to jsDelivr.
        </li>
        <li>
          <strong>Google Analytics</strong>, as described above.
        </li>
        <li>
          <strong>Microsoft Clarity</strong>, as described above.
        </li>
      </ul>

      <h2>Contact form</h2>
      <p>
        The contact form opens your own email app with your message prefilled. Nothing you type in the form is stored on
        our website. If you email us, we use your email address and message only to reply and keep correspondence as long
        as needed to handle your request.
      </p>

      <h2>Children</h2>
      <p>This website is not directed at children under 13, and we do not knowingly collect their personal information.</p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct or delete personal data we hold about you.
        Because we do not store your files or calculator inputs, the only personal data we may hold is email correspondence.
        Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> to make a request.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how the website handles data, for example by adding a feature that requires server processing, we
        will update this page before the change takes effect.
      </p>
    </StaticPage>
  );
}
