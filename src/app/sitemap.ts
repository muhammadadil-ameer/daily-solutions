import type { MetadataRoute } from "next";
import { categories, tools } from "@/content";
import { absoluteUrl, site } from "@/lib/site";

/** Last content change of the static pages. Update when editing one of them. */
const staticUpdated: Record<string, string> = {
  "/privacy/": "2026-10-24",
  "/cookie-policy/": "2026-10-25",
  "/terms/": "2026-10-25",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; updated?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/all-tools/", priority: 0.7 },
    ...categories.filter((c) => !c.hostTool).map((c) => ({ path: `/${c.slug}/`, priority: 0.8 })),
    ...tools.map((t) => ({ path: `/${t.slug}/`, priority: t.primary ? 0.9 : 0.8, updated: t.updated })),
    ...["/about/", "/contact/", "/privacy/", "/terms/", "/cookie-policy/", "/disclaimer/"].map((path) => ({ path, priority: 0.3 })),
  ];
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: p.updated ?? staticUpdated[p.path] ?? site.launchDate,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
