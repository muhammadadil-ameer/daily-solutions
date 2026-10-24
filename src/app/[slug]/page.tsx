import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, FaqList, HealthDisclaimer, ToolGrid } from "@/components/Blocks";
import { ToolPage } from "@/components/ToolPage";
import { categories, getTool, tools, toolsIn } from "@/content";
import { getCategoryBySlug } from "@/content/categories";
import { site } from "@/lib/site";
import type { Category } from "@/lib/types";

// Only the slugs below exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...tools.map((t) => ({ slug: t.slug })),
    ...categories.filter((c) => !c.hostTool).map((c) => ({ slug: c.slug })),
  ];
}

const categoryMeta: Record<string, { title: string; description: string }> = {
  "image-tools": {
    title: "Free Image Tools – Convert, Resize and Compress Images",
    description: "Free online image tools: convert HEIC, WebP, PNG and JPG, resize to exact pixels and compress to a target size in KB. No signup, processed in your browser.",
  },
  "media-tools": {
    title: "Free Media Tools – Audio and Video Converter",
    description: "Convert audio and video online: M4A to MP3, MOV to MP4, MP4 to MP3, WAV to MP3, MP4 to GIF and more. Free, no signup, runs in your browser.",
  },
  "health-tools": {
    title: "Free Health Calculators – Calories, BMI, BMR, TDEE, Macros",
    description: "Free health and fitness calculators for daily calories, BMI, BMR, TDEE, macros, protein, calorie deficit and ideal weight. Clear formulas, metric and imperial.",
  },
};

/** Keeps the " | Daily Solutions" suffix only when the full title still fits in search results (~60 chars). */
function pageTitle(title: string): Metadata["title"] {
  return title.length + ` | ${site.name}`.length <= 60 ? title : { absolute: title };
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  const path = `/${slug}/`;
  if (tool) {
    return {
      title: pageTitle(tool.title),
      description: tool.metaDescription,
      alternates: { canonical: path },
      openGraph: { title: tool.title, description: tool.metaDescription, url: path },
    };
  }
  const meta = categoryMeta[slug];
  if (meta && getCategoryBySlug(slug)) {
    return {
      title: pageTitle(meta.title),
      description: meta.description,
      alternates: { canonical: path },
      openGraph: { title: meta.title, description: meta.description, url: path },
    };
  }
  return {};
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (tool) return <ToolPage tool={tool} />;
  const category = getCategoryBySlug(slug);
  if (category) return <CategoryPage category={category} />;
  notFound();
}

const categoryFaqs: Record<string, { q: string; a: string }[]> = {
  "image-tools": [
    { q: "Are my images uploaded?", a: "No. All image tools run in your browser. Your images stay on your device." },
    { q: "Which image formats are supported?", a: "JPG, PNG, WebP, AVIF, GIF, BMP and TIFF for input and output, plus HEIC/HEIF as input." },
    { q: "Can I process several images at once?", a: "The Image Converter accepts multiple images and offers a ZIP download. The resizer works on one image at a time." },
  ],
  "media-tools": [
    { q: "Are my audio and video files uploaded?", a: "No. Conversion runs in your browser with FFmpeg compiled to WebAssembly. Only the converter engine is downloaded from a CDN." },
    { q: "Why does the first conversion take longer?", a: "The converter engine (about 30 MB) is downloaded once and then cached by your browser." },
    { q: "Is there a size limit?", a: "Files up to 500 MB are supported. Smaller files convert faster, especially on phones." },
  ],
  "health-tools": [
    { q: "Are these calculators medical advice?", a: "No. They provide estimates for general information. Consult a healthcare professional for personal advice." },
    { q: "Is my health data stored?", a: "No. Everything is calculated in your browser and nothing you enter is saved or sent to us." },
    { q: "Which formulas are used?", a: "Mifflin-St Jeor for BMR, standard activity multipliers for TDEE, WHO categories for BMI, and Devine, Robinson, Miller and Hamwi for ideal weight." },
  ],
};

function CategoryPage({ category }: { category: Category }) {
  const list = toolsIn(category.id);
  const primary = list.filter((t) => t.primary);
  const rest = list.filter((t) => !t.primary);
  return (
    <>
      <div className="border-b border-line bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page pt-6 pb-10">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: category.name, href: `/${category.slug}/` }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{category.intro}</p>
        </div>
      </div>
      <div className="container-page mt-10 space-y-14">
        <section>
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink">Main tool{primary.length > 1 ? "s" : ""}</h2>
          <ToolGrid tools={primary} cols={2} />
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink">All {category.name.toLowerCase()}</h2>
          <ToolGrid tools={rest} />
        </section>
        {category.id === "health" && <HealthDisclaimer />}
        {categoryFaqs[category.slug] && (
          <section>
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink">Frequently asked questions</h2>
            <FaqList faqs={categoryFaqs[category.slug]} />
          </section>
        )}
      </div>
    </>
  );
}
