import type { CategoryId, Tool } from "@/lib/types";
import { categories, getCategory } from "./categories";
import { imageTools } from "./image";
import { resizeTools } from "./resize";
import { pdfTools } from "./pdf";
import { mediaTools } from "./media";
import { healthTools } from "./health";
import { kbTools } from "./kb";
import { gapImageTools } from "./gap-image";
import { gapPdfTools } from "./gap-pdf";
import { gapMediaTools } from "./gap-media";
import { trimTools } from "./trim";
import { videoTools } from "./video";
import { deviceExtras } from "./extras-devices";
import { extrasUpdated, type ToolExtra, toolExtras } from "./extras";

export { categories, getCategory };

/** Every tool page on the site. Adding a new category = new content file + entry in categories.ts. */
const baseTools: Tool[] = [
  ...imageTools,
  ...gapImageTools,
  ...resizeTools,
  ...kbTools,
  ...pdfTools,
  ...gapPdfTools,
  ...mediaTools,
  ...gapMediaTools,
  ...videoTools,
  ...trimTools,
  ...healthTools,
];

/** Applies content/extras.ts (extra sections, FAQs, better meta descriptions) on top of the base content. */
export const tools: Tool[] = baseTools.map((t) => {
  const extras = [toolExtras[t.slug], deviceExtras[t.slug]].filter(Boolean) as ToolExtra[];
  if (extras.length === 0) return t;
  return {
    ...t,
    metaDescription: extras.find((x) => x.metaDescription)?.metaDescription ?? t.metaDescription,
    sections: [...t.sections, ...extras.flatMap((x) => x.sections ?? [])],
    faqs: [...t.faqs, ...extras.flatMap((x) => x.faqs ?? [])],
    updated: extrasUpdated,
  };
});

const bySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return bySlug.get(slug);
}

export function toolsIn(category: CategoryId): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function primaryTools(): Tool[] {
  return tools.filter((t) => t.primary);
}

const popularOrder = [
  "heic-to-jpg",
  "webp-to-jpg",
  "png-to-webp",
  "jpg-to-webp",
  "compress-image",
  "pdf-compressor",
  "pdf-to-jpg",
  "jpg-to-pdf",
  "m4a-to-mp3",
  "mov-to-mp4",
  "calorie-calculator",
  "bmi-calculator",
];

export function popularTools(): Tool[] {
  return popularOrder.map((s) => bySlug.get(s)!).filter(Boolean);
}

/** Newest first. Prepend slugs here when launching a tool. */
const recentOrder = ["jpg-to-avif", "webp-to-pdf", "mov-to-gif", "aac-to-mp3"];

export function recentTools(): Tool[] {
  return recentOrder.map((s) => bySlug.get(s)!).filter(Boolean);
}

export function relatedTools(tool: Tool): Tool[] {
  return tool.related.map((s) => bySlug.get(s)).filter((t): t is Tool => !!t && t.slug !== tool.slug);
}

/** URL of the page that represents a category (PDF uses the toolkit page). */
export function categoryHref(id: CategoryId): string {
  const c = getCategory(id);
  return `/${c.hostTool ?? c.slug}/`;
}

export function toolHref(t: Tool | string): string {
  return `/${typeof t === "string" ? t : t.slug}/`;
}

export interface SearchEntry {
  slug: string;
  name: string;
  short: string;
  category: string;
  terms: string;
}

export function searchIndex(): SearchEntry[] {
  return tools.map((t) => ({
    slug: t.slug,
    name: t.name,
    short: t.short,
    category: getCategory(t.category).name,
    terms: [t.name, t.h1, t.short, ...(t.keywords ?? [])].join(" ").toLowerCase(),
  }));
}

/** Format / topic words in a slug, used to find closely related tools ("heic-to-jpg" → heic, jpg). */
const STOP = new Set(["to", "image", "images", "online", "free"]);
const ALIAS: Record<string, string> = { jpeg: "jpg", tif: "tiff" };
function slugTokens(slug: string): string[] {
  return slug
    .split("-")
    .filter((w) => !STOP.has(w))
    .map((w) => ALIAS[w] ?? w)
    .map((w) => (/^\d+(kb|mb)$/.test(w) ? "size" : /^\d+x\d+$/.test(w) ? "dimensions" : w));
}

const tokenFreq = new Map<string, number>();
for (const t of tools) for (const w of new Set(slugTokens(t.slug))) tokenFreq.set(w, (tokenFreq.get(w) ?? 0) + 1);

/**
 * Tools to link from a tool page so that every page gets internal links, not only the first few of a category.
 * Order: hand-picked `related`, then tools sharing a format/topic word, then the tool's neighbours in the
 * category list (wrapping around), so tools at the end of a category are linked as often as those at the start.
 */
export function similarTools(tool: Tool, count: number): Tool[] {
  const picked: Tool[] = [];
  const seen = new Set([tool.slug]);
  const add = (t: Tool | undefined) => {
    if (t && !seen.has(t.slug) && picked.length < count) {
      seen.add(t.slug);
      picked.push(t);
    }
  };
  tool.related.forEach((s) => add(bySlug.get(s)));
  const mine = new Set(slugTokens(tool.slug));
  const peers = toolsIn(tool.category);
  const i = peers.findIndex((t) => t.slug === tool.slug);
  // Rare words (heic, webp, kb sizes) count more than words most tools share (pdf, mp3), and ties go to the
  // nearest neighbour in the list, so the links spread over the whole category instead of its first items.
  tools
    .map((t, idx) => {
      const shared = slugTokens(t.slug).filter((w) => mine.has(w));
      const score = shared.reduce((sum, w) => sum + 1 / (tokenFreq.get(w) ?? 1), 0) + (t.category === tool.category ? 0.05 : 0);
      const pi = peers.indexOf(t);
      const dist = pi < 0 ? 999 + idx : Math.min(Math.abs(pi - i), peers.length - Math.abs(pi - i));
      return { t, score, dist, shared: shared.length };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.score - a.score || a.dist - b.dist)
    .forEach((x) => add(x.t));
  for (let step = 1; step < peers.length && picked.length < count; step++) {
    add(peers[(i + step) % peers.length]);
    add(peers[(i - step + peers.length) % peers.length]);
  }
  return picked;
}
