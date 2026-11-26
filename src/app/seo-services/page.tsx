import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, FaqList, JsonLd, SectionHeading } from "@/components/Blocks";
import { CheckIcon } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { absoluteUrl, seoPath as SEO_PATH, site } from "@/lib/site";

const LINKEDIN = "https://www.linkedin.com/in/muhammad-adil-seo/";
const TITLE = "SEO Services – Hire an SEO Expert for Your Website";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "SEO services by Muhammad Adil: technical SEO, indexing fixes, on-page SEO, Google Business Profile (GMB), local SEO, AEO and GEO for AI search.",
  alternates: { canonical: SEO_PATH },
  openGraph: {
    title: TITLE,
    description:
      "Technical SEO, indexing fixes, on-page SEO, Google Business Profile (GMB), local SEO, AEO and GEO for AI search.",
    url: SEO_PATH,
  },
};

/** Everything offered, grouped so visitors can find the service they came for. */
const serviceGroups = [
  {
    title: "Technical SEO",
    summary: "The foundation: if Google cannot crawl, render and index your pages, nothing else works.",
    items: [
      "Full technical audit and site crawl",
      "Indexing problems: “Discovered / Crawled – currently not indexed”",
      "“Duplicate, Google chose different canonical” and canonical tags",
      "Google Search Console setup, errors and monitoring",
      "robots.txt, XML sitemaps and crawl budget",
      "Redirects, broken links and 404 clean-up",
      "Core Web Vitals, page speed and mobile usability",
      "Structured data and schema markup",
      "Site architecture, URL structure and HTTPS",
      "Website migrations and redirect mapping",
    ],
  },
  {
    title: "On-page SEO & content",
    summary: "Making each page clearly the best answer for the searches you want to win.",
    items: [
      "Keyword research and search-intent mapping",
      "Title tags, meta descriptions and heading structure",
      "Internal linking strategy across the whole site",
      "SEO content writing and content optimisation",
      "Content gap and competitor analysis",
      "Keyword cannibalisation fixes and content pruning",
      "Image SEO, alt text and media optimisation",
      "Landing pages built around real search demand",
    ],
  },
  {
    title: "Local SEO & Google Business Profile (GMB)",
    summary: "For businesses that serve a city or area and want to show up in Google Maps.",
    items: [
      "Google Business Profile (GMB) setup, claiming and verification",
      "Profile optimisation: categories, services, products, photos",
      "Google Posts, Q&A and attribute management",
      "Map Pack (local 3-pack) ranking improvement",
      "NAP consistency and local citation building",
      "Review strategy, review responses and reputation",
      "Local landing pages and LocalBusiness schema",
      "Multi-location and service-area business setup",
    ],
  },
  {
    title: "AEO – Answer Engine Optimisation",
    summary: "Winning the answer boxes, not just the blue links.",
    items: [
      "Featured snippets and “People Also Ask” targeting",
      "Question-based content structure and clear answers",
      "FAQ, HowTo and Q&A schema markup",
      "Voice search and conversational query optimisation",
      "Concise, extractable answer formatting",
      "Zero-click search strategy for brand visibility",
    ],
  },
  {
    title: "GEO – Generative Engine Optimisation",
    summary: "Being the source AI tools quote when people ask about your topic.",
    items: [
      "Visibility in Google AI Overviews and AI Mode",
      "Getting cited by ChatGPT, Gemini, Perplexity and Copilot",
      "Entity and brand-name consistency across the web",
      "AI-crawler access, llms.txt and content accessibility",
      "Fact-dense, citable, well-sourced content",
      "Tracking where and how your brand is mentioned by AI",
    ],
  },
  {
    title: "Off-page SEO & authority",
    summary: "Earning the trust signals that decide competitive rankings.",
    items: [
      "White-hat link building and digital PR",
      "Competitor backlink gap analysis",
      "Brand mentions and entity building",
      "E-E-A-T: author profiles, about pages and trust signals",
      "Toxic backlink review and disavow when needed",
      "Business profile and directory listings",
    ],
  },
  {
    title: "E-commerce & international SEO",
    summary: "For online stores and sites that sell in more than one country or language.",
    items: [
      "Product and category page optimisation",
      "Faceted navigation, filters and parameter handling",
      "Product, Offer and Review schema",
      "hreflang and multi-language or multi-country setup",
      "Duplicate product content and thin-page fixes",
      "Traffic-drop and Google update recovery",
    ],
  },
  {
    title: "Analytics, tracking & reporting",
    summary: "Decisions based on your real data, not guesses.",
    items: [
      "Google Analytics 4 and Search Console setup",
      "Google Tag Manager and conversion tracking",
      "Keyword, ranking and visibility monitoring",
      "Looker Studio dashboards",
      "Clear monthly progress reports",
      "SEO audits and ongoing competitor tracking",
    ],
  },
];

const steps = [
  {
    title: "Free review",
    text: "You send your website with the form. I check indexing, technical health, on-page setup and your main competitors.",
  },
  {
    title: "Findings & plan",
    text: "You get a plain-language list of what is holding the site back, in priority order, with what I would fix first.",
  },
  {
    title: "Implementation",
    text: "I carry out the fixes and the ongoing work, or hand your developer a clear specification – whichever you prefer.",
  },
  {
    title: "Reporting",
    text: "Regular reports from Search Console and Analytics showing indexing, rankings, clicks and what comes next.",
  },
];

const reasons = [
  {
    title: "100% white-hat",
    text: "Methods that follow Google’s guidelines. No spam links, no private blog networks, no shortcuts that put your site at risk.",
  },
  {
    title: "Hands-on technical skills",
    text: "I build and optimise websites myself, including Daily Solutions – so technical fixes get done properly, not just recommended.",
  },
  {
    title: "Built for AI search",
    text: "Search now happens in AI Overviews and assistants too. Every project covers classic SEO plus AEO and GEO.",
  },
  {
    title: "Transparent reporting",
    text: "Real numbers from your own Search Console and Analytics, and an honest view of what is working and what is not.",
  },
  {
    title: "You deal with me directly",
    text: "The person doing the work is the person you talk to – in English or Urdu. No account managers in between.",
  },
  {
    title: "Any platform",
    text: "WordPress, Shopify, Wix, Webflow, custom sites and modern frameworks such as Next.js – anything Google can crawl.",
  },
];

const tools = [
  "Google Search Console",
  "Google Analytics 4",
  "Google Business Profile",
  "Google Tag Manager",
  "Ahrefs",
  "Semrush",
  "Screaming Frog",
  "PageSpeed Insights",
  "Looker Studio",
  "Microsoft Clarity",
];

const faqs = [
  {
    q: "Can you guarantee first-page rankings?",
    a: "No honest SEO can guarantee rankings – Google decides what ranks. What I guarantee is white-hat work that follows Google’s guidelines, every problem I find reported to you, and clear data on what changed.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Technical and indexing fixes can show up within a few weeks, because they remove something that was actively blocking you. Rankings for competitive keywords usually take three to six months of consistent work.",
  },
  {
    q: "What is the difference between SEO, AEO and GEO?",
    a: "SEO aims at the classic list of blue links. AEO (answer engine optimisation) targets answer boxes such as featured snippets and “People Also Ask”. GEO (generative engine optimisation) is about being cited inside AI answers – Google AI Overviews, ChatGPT, Gemini and Perplexity. They overlap, and I work on all three together.",
  },
  {
    q: "Do you handle Google Business Profile (GMB) only, without a website?",
    a: "Yes. If you are a local business, Google Business Profile optimisation, citations and reviews can be handled on their own. A website makes the results stronger, but it is not required to start.",
  },
  {
    q: "Do you do the fixes yourself or just tell me what to do?",
    a: "Either way. I can implement the changes directly, or give your developer a precise specification and then verify the result. Tell me which you prefer in the form.",
  },
  {
    q: "Do you work with websites outside Pakistan?",
    a: "Yes. I work remotely with websites and businesses in any country, in English or Urdu.",
  },
  {
    q: "My traffic dropped suddenly. Can you help?",
    a: "Yes. Sudden drops usually trace back to a Google update, a technical change, a migration done without redirects, or a manual action. I diagnose the cause first and then plan the recovery – send the site and I will take a look.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the size of the site and what you need – a one-off audit is very different from ongoing work. Send your website through the form and you will get a free review and a clear quote before anything starts.",
  },
];

export default function SeoServices() {
  return (
    <>
      {/* Hero: who this is for on the left, the request form on the right. */}
      <div className="border-b border-line bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page pt-6 pb-10 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "SEO Services", href: SEO_PATH }]} />
          <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div>
              <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">SEO · AEO · GEO · Local SEO</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Need an SEO Expert for Your Website?
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">
                I’m Muhammad Adil, an SEO specialist and the person behind Daily Solutions. I help websites get indexed,
                rank higher on Google, show up in Google Maps and get found in AI search.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3">
                {[
                  "Fix pages that Google won’t index",
                  "Rank for the searches that bring customers",
                  "Get found in Google Maps (GMB)",
                  "Be cited in AI answers (AEO & GEO)",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-ink">
                    <CheckIcon width={20} height={20} className="mt-0.5 shrink-0 text-brand-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-line bg-white/70 px-4 py-3 text-sm text-muted">
                <span className="font-semibold text-ink">The free review covers:</span> indexing and technical health,
                your on-page setup, the keywords you could realistically win, and the quick wins I would fix first.
              </p>
              <p className="mt-4 text-sm text-muted">
                Prefer to talk first? Email{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-brand-700 hover:underline">
                  {site.email}
                </a>{" "}
                or visit my{" "}
                <a href={LINKEDIN} target="_blank" rel="noopener" className="font-medium text-brand-700 hover:underline">
                  LinkedIn
                </a>
                .
              </p>
            </div>
            <div className="lg:sticky lg:top-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container-page space-y-14 py-12 sm:space-y-16">
        <section aria-labelledby="services">
          <SectionHeading
            id="services"
            title="SEO Services"
            sub="Everything needed to be found on Google, in Google Maps and inside AI answers. Take one part or the whole package."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {serviceGroups.map((g) => (
              <div key={g.title} className="card p-6">
                <h3 className="text-lg font-bold text-ink">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{g.summary}</p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckIcon width={16} height={16} className="mt-1 shrink-0 text-brand-600" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="process">
          <SectionHeading id="process" title="How it works" sub="Four steps, starting with a free review of your website." />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="card p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="why">
          <SectionHeading id="why" title="Why work with me" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="card p-6">
                <h3 className="font-semibold text-ink">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools">
          <SectionHeading id="tools" title="Tools I work with" sub="Industry-standard tools, plus your own Google data." />
          <ul className="flex flex-wrap gap-2.5">
            {tools.map((t) => (
              <li key={t} className="chip cursor-default hover:border-line hover:text-muted">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq" className="max-w-3xl">
          <SectionHeading id="faq" title="Frequently asked questions" />
          <FaqList faqs={faqs} />
        </section>

        <section className="card bg-brand-50/60 p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Ready to find out what’s holding your site back?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted">
            Send your website and I’ll reply with the main issues I find and what I would fix first – free, and with no
            obligation.
          </p>
          <a href="#seo-form" className="btn btn-primary mt-6">
            Request a free SEO review
          </a>
        </section>

        <p className="text-center text-sm text-muted">
          Looking for the free tools instead? Browse{" "}
          <Link href="/all-tools/" className="font-medium text-brand-700 hover:underline">
            all free online tools
          </Link>
          .
        </p>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "SEO Services by Muhammad Adil",
          url: absoluteUrl(SEO_PATH),
          description:
            "Technical SEO, indexing fixes, on-page SEO, keyword research, Google Business Profile (GMB), local SEO, AEO and GEO for AI search.",
          email: site.email,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Urdu"],
          founder: { "@type": "Person", name: "Muhammad Adil", jobTitle: "SEO Specialist", sameAs: LINKEDIN },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "SEO Services",
            itemListElement: serviceGroups.map((g) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: g.title, description: g.summary },
            })),
          },
        }}
      />
    </>
  );
}
