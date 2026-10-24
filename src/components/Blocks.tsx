import Link from "next/link";
import { getCategory, toolHref } from "@/content";
import { absoluteUrl } from "@/lib/site";
import type { Faq, Tool } from "@/lib/types";
import { ArrowRight, ChevronDown, ToolIcon } from "./Icons";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped is safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-brand-700">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </>
  );
}

export function ToolCard({ tool, cta = "Use Tool" }: { tool: Tool; cta?: string }) {
  return (
    <Link
      href={toolHref(tool)}
      className="card group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_-12px_rgba(37,99,235,0.25)]"
    >
      <span className="mb-3 grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <ToolIcon slug={tool.slug} category={tool.category} width={20} height={20} />
      </span>
      <span className="font-semibold text-ink">{tool.name}</span>
      <span className="mt-1 flex-1 text-sm leading-relaxed text-muted">{tool.short}</span>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        {cta} <ArrowRight width={16} height={16} className="transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function ToolGrid({ tools, cols = 3 }: { tools: Tool[]; cols?: 2 | 3 | 4 }) {
  const c = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={`grid gap-4 ${c}`}>
      {tools.map((t) => (
        <li key={t.slug}>
          <ToolCard tool={t} />
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line rounded-2xl border border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-ink">
              {f.q}
              <ChevronDown width={18} height={18} className="shrink-0 text-muted transition group-open:rotate-180" />
            </summary>
            <p className="pb-4 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </>
  );
}

export function SectionHeading({ title, sub, id }: { title: string; sub?: string; id?: string }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mt-2 max-w-2xl text-muted">{sub}</p>}
    </div>
  );
}

export function HealthDisclaimer() {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
      <strong className="font-semibold">Health disclaimer:</strong> These calculators provide estimates for general
      informational purposes only and are not medical advice. Results can vary based on individual circumstances. Talk to
      a doctor or registered dietitian before making major changes to your diet or exercise, especially if you have a
      medical condition, are pregnant or are under 18.{" "}
      <Link href="/disclaimer/" className="font-medium underline">
        Read the full disclaimer
      </Link>
      .
    </aside>
  );
}

export function categoryCrumb(tool: Tool): Crumb {
  const c = getCategory(tool.category);
  return { name: c.name, href: `/${c.hostTool ?? c.slug}/` };
}
