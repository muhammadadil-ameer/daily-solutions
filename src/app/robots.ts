import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Crawlers used by AI answer engines. `*` already allows them, but several of these are checked by
 * name (and some tools report a site as "restricted" when its own agent is not listed), so they are
 * spelled out to make it explicit that the site may be crawled, quoted and cited.
 */
const aiAgents = [
  "GPTBot", // OpenAI crawler
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // ChatGPT browsing on a user's request
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex AI grounding
  "Applebot",
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Bing and Copilot
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "Amazonbot",
  "cohere-ai",
  "CCBot", // Common Crawl
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiAgents, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
