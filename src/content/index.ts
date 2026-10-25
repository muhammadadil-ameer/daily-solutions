import type { CategoryId, Tool } from "@/lib/types";
import { categories, getCategory } from "./categories";
import { imageTools } from "./image";
import { resizeTools } from "./resize";
import { pdfTools } from "./pdf";
import { mediaTools } from "./media";
import { healthTools } from "./health";
import { kbTools } from "./kb";

export { categories, getCategory };

/** Every tool page on the site. Adding a new category = new content file + entry in categories.ts. */
export const tools: Tool[] = [...imageTools, ...resizeTools, ...kbTools, ...pdfTools, ...mediaTools, ...healthTools];

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
const recentOrder = ["compress-image-to-20kb", "compress-image-to-50kb", "jfif-to-jpg", "compress-image-to-100kb"];

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
