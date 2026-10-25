import Link from "next/link";
import { getCategory, relatedTools, toolHref, toolsIn } from "@/content";
import { absoluteUrl, site } from "@/lib/site";
import type { Tool } from "@/lib/types";
import { Breadcrumbs, categoryCrumb, FaqList, HealthDisclaimer, JsonLd, ToolGrid } from "./Blocks";
import { ArrowRight } from "./Icons";
import { ToolWidget } from "./ToolWidget";

const isBrowserTool = (t: Tool) => t.category !== "health";

export function ToolPage({ tool }: { tool: Tool }) {
  const category = getCategory(tool.category);
  const related = relatedTools(tool);
  const crumbs = [{ name: "Home", href: "/" }, categoryCrumb(tool)];
  if (tool.slug !== category.hostTool) crumbs.push({ name: tool.name, href: toolHref(tool) });
  const siblings = category.hostTool === tool.slug ? toolsIn(tool.category).filter((t) => t.slug !== tool.slug) : [];
  const next = related[0];

  return (
    <>
      <div className="border-b border-line bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page pt-6 pb-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{tool.h1}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{tool.intro}</p>
        </div>
      </div>

      <div className="container-page">
        {/* data-clarity-mask hides file names, previews and entered values from Clarity session recordings. */}
        <section aria-label={`${tool.name} tool`} data-clarity-mask="True" className="card -mt-4 p-4 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] sm:p-6">
          <ToolWidget widget={tool.widget} />
        </section>
        {isBrowserTool(tool) && (
          <p className="mt-3 text-center text-xs text-muted">
            Files are processed in your browser and are not uploaded to our server.{" "}
            <Link href="/privacy/" className="underline">Privacy</Link>
          </p>
        )}

        {tool.disclaimer && (
          <div className="mt-6">
            <HealthDisclaimer />
          </div>
        )}

        <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="prose-tool min-w-0">
            <h2>How to use the {tool.name}</h2>
            <ol>
              {tool.howTo.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            {tool.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {tool.formats && (
              <section>
                <h2>{tool.category === "image" || tool.category === "media" ? "Supported formats" : "Options"}</h2>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {tool.formats.map((f) => (
                    <div key={f.name} className="rounded-xl border border-line p-4">
                      <dt className="font-semibold text-ink">{f.name}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted">{f.desc}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {tool.examples && (
              <section>
                <h2>Examples</h2>
                <ul>
                  {tool.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2>Frequently asked questions</h2>
              <FaqList faqs={tool.faqs} />
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-ink">More {category.name}</h2>
              <ul className="space-y-1">
                {toolsIn(tool.category)
                  .filter((t) => t.slug !== tool.slug)
                  .slice(0, 8)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link href={toolHref(t)} className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-surface hover:text-brand-700">
                        {t.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>

        {siblings.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink">All {category.name}</h2>
            <ToolGrid tools={siblings} />
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink">Related tools</h2>
            <ToolGrid tools={related.slice(0, 6)} />
          </section>
        )}

        {next && (
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-600 p-6 text-white sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-white">Next step</p>
              <p className="text-lg font-semibold">{next.short}</p>
            </div>
            <Link href={toolHref(next)} className="btn bg-white text-brand-700 hover:bg-brand-50">
              Open {next.name} <ArrowRight width={16} height={16} />
            </Link>
          </div>
        )}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.h1,
          url: absoluteUrl(toolHref(tool)),
          description: tool.metaDescription,
          applicationCategory: tool.category === "health" ? "HealthApplication" : "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
