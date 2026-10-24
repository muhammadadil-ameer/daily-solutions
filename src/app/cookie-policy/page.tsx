import type { Metadata } from "next";
import Link from "next/link";
import { LAST_UPDATED, StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies ${site.name} uses and how to control them.`,
  alternates: { canonical: "/cookie-policy/" },
};

export default function CookiePolicy() {
  return (
    <StaticPage title="Cookie Policy" path="/cookie-policy/" intro={`Last updated: ${LAST_UPDATED}`}>
      <h2>What cookies are</h2>
      <p>Cookies are small text files a website stores in your browser. They can remember settings or help measure how a site is used.</p>

      <h2>Cookies we use</h2>
      <ul>
        <li>
          <strong>Essential:</strong> the tools themselves do not need cookies to work.
        </li>
        <li>
          <strong>Analytics:</strong> Google Analytics 4 sets cookies such as <code>_ga</code> and <code>_ga_*</code> to
          distinguish visitors and sessions. They expire after up to 2 years.
        </li>
        <li>
          <strong>Usage insights:</strong> Microsoft Clarity sets cookies such as <code>_clck</code> (up to 1 year) and{" "}
          <code>_clsk</code> (1 day) to group page views into sessions for heatmaps and session replays.
        </li>
        <li>
          <strong>Advertising:</strong> we do not use advertising cookies. If this changes, we will update this page and ask for consent where required.
        </li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. Blocking cookies does not affect how the tools work.
        You can also install the Google Analytics opt-out browser add-on.
      </p>

      <p>
        More information: <Link href="/privacy/">Privacy Policy</Link>.
      </p>
    </StaticPage>
  );
}
