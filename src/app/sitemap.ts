import type { MetadataRoute } from "next";
import { categories, tools } from "@/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/all-tools/", priority: 0.7 },
    ...categories.filter((c) => !c.hostTool).map((c) => ({ path: `/${c.slug}/`, priority: 0.8 })),
    ...tools.map((t) => ({ path: `/${t.slug}/`, priority: t.primary ? 0.9 : 0.8 })),
    ...["/about/", "/contact/", "/privacy/", "/terms/", "/cookie-policy/", "/disclaimer/"].map((path) => ({ path, priority: 0.3 })),
  ];
  return pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: "monthly", priority: p.priority }));
}
