import type { Metadata } from "next";
import { Breadcrumbs, ToolGrid } from "@/components/Blocks";
import { ToolSearch } from "@/components/ToolSearch";
import { categories, searchIndex, toolsIn } from "@/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Tools",
  description: `Browse every free tool on ${site.name}: image converters, image compressor, PDF tools, audio and video converters and health calculators.`,
  alternates: { canonical: "/all-tools/" },
};

export default function AllTools() {
  return (
    <>
      <div className="border-b border-line bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page pt-6 pb-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "All Tools", href: "/all-tools/" }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">All Tools</h1>
          <p className="mt-3 text-lg text-muted">Find the right tool by category or search.</p>
          <div className="mt-6 max-w-xl">
            <ToolSearch index={searchIndex()} />
          </div>
        </div>
      </div>
      <div className="container-page mt-10 space-y-14">
        {categories.map((c) => (
          <section key={c.id} aria-labelledby={`cat-${c.id}`}>
            <h2 id={`cat-${c.id}`} className="mb-5 text-2xl font-bold tracking-tight text-ink">
              {c.name}
            </h2>
            <ToolGrid tools={toolsIn(c.id)} cols={4} />
          </section>
        ))}
      </div>
    </>
  );
}
