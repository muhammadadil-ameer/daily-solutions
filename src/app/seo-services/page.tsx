import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, JsonLd } from "@/components/Blocks";
import { LeadForm } from "@/components/LeadForm";
import { StaticPage } from "@/components/StaticPage";
import { absoluteUrl, seoPath as SEO_PATH, site } from "@/lib/site";

const LINKEDIN = "https://www.linkedin.com/in/muhammad-adil-seo/";

export const metadata: Metadata = {
  title: { absolute: "Hire an SEO Expert – SEO Services by Muhammad Adil" },
  description:
    "Need an SEO specialist for your website? Technical SEO, indexing fixes, on-page SEO, keyword research, local SEO and AI search visibility. Get in touch today.",
  alternates: { canonical: SEO_PATH },
  openGraph: {
    title: "Hire an SEO Expert – SEO Services by Muhammad Adil",
    description: "Technical SEO, indexing fixes, on-page SEO, local SEO and AI search visibility for your website.",
    url: SEO_PATH,
  },
};

const services = [
  {
    title: "Technical SEO audit & fixes",
    text: "Crawling and indexing problems, Search Console errors, sitemaps, redirects, canonical tags, duplicate pages, Core Web Vitals and site speed.",
  },
  {
    title: "Pages not indexed?",
    text: "“Discovered – currently not indexed”, “Crawled – currently not indexed” or “Duplicate, Google chose different canonical” – I find the cause and fix it.",
  },
  {
    title: "On-page SEO & content",
    text: "Titles, meta descriptions, headings, internal linking, schema markup and content that answers what people actually search for.",
  },
  {
    title: "Keyword research",
    text: "Find the searches your customers use, with realistic difficulty, and map them to the right pages.",
  },
  {
    title: "Local SEO",
    text: "Google Business Profile optimisation, local citations and reviews strategy to appear in the Map Pack.",
  },
  {
    title: "AI search visibility (AEO / GEO)",
    text: "Structure your content so it can be cited in Google AI Overviews and AI assistants such as ChatGPT, Gemini and Perplexity.",
  },
];

const steps = [
  "Send your website with the form below.",
  "I review it and reply with the main issues I see and what I recommend.",
  "If we work together, you get a clear plan, the fixes, and regular progress reports from Search Console.",
];

const faqs = [
  {
    q: "Can you guarantee first-page rankings?",
    a: "No honest SEO can guarantee rankings – Google decides. What I do guarantee is white-hat work that follows Google’s guidelines, clear reporting and fixes for every problem I find.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Technical fixes such as indexing problems can show results within a few weeks. Rankings for competitive keywords usually take three to six months of consistent work.",
  },
  {
    q: "Do you work with websites outside Pakistan?",
    a: "Yes. I work remotely with websites and businesses in any country, in English or Urdu.",
  },
  {
    q: "Which platforms do you work with?",
    a: "WordPress, Shopify, Wix, custom sites and modern frameworks such as Next.js – anything Google can crawl.",
  },
];

export default function SeoServices() {
  return (
    <StaticPage
      title="Need an SEO Expert for Your Website?"
      path={SEO_PATH}
      intro="I’m Muhammad Adil, an SEO specialist and the person behind Daily Solutions. I help websites get indexed, rank higher on Google and get found in AI search."
    >
      <p>
        <a href="#seo-form">Send your website</a> and tell me what you need – I’ll reply personally. You can also visit my{" "}
        <a href={LINKEDIN} target="_blank" rel="noopener">
          LinkedIn
        </a>
        .
      </p>

      <h2>SEO services</h2>
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="card p-5">
            <h3 className="font-semibold text-ink">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
          </div>
        ))}
      </div>

      <h2>How it works</h2>
      <ol>
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h2>Why work with me</h2>
      <ul>
        <li>100% white-hat methods that follow Google’s guidelines – no spam links, no shortcuts that risk penalties.</li>
        <li>Hands-on technical skills: I build and optimise websites myself, including this one.</li>
        <li>Transparent reports with real data from Google Search Console and Analytics.</li>
        <li>Direct contact with the person doing the work – in English or Urdu.</li>
      </ul>

      <h2 id="contact-form">Get in touch</h2>
      <div className="not-prose">
        <LeadForm />
      </div>
      <p className="text-sm">
        Prefer email? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Frequently asked questions</h2>
      <div className="not-prose">
        <FaqList faqs={faqs} />
      </div>

      <p className="text-sm">
        Looking for the free tools instead? Browse <Link href="/all-tools/">all free online tools</Link>.
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "SEO Services by Muhammad Adil",
          url: absoluteUrl(SEO_PATH),
          description: "Technical SEO, indexing fixes, on-page SEO, keyword research, local SEO and AI search visibility.",
          email: site.email,
          areaServed: "Worldwide",
          founder: { "@type": "Person", name: "Muhammad Adil", jobTitle: "SEO Specialist", sameAs: LINKEDIN },
        }}
      />
    </StaticPage>
  );
}
