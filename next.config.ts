import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Every *.vercel.app address of this project (dailysolutions.vercel.app and the per-project/per-team aliases
// Vercel creates) must send visitors and Google to the custom domain, so search traffic and ranking signals
// all land on dailysolution.org and Google never picks a vercel.app URL as canonical.
const vercelHost = { type: "host" as const, value: "(?<vercelhost>.+)\\.vercel\\.app" };

// VERCEL_ENV is "production" for the live site, "preview" for branch/PR deployments, unset locally.
const isPreview = process.env.VERCEL_ENV === "preview";

const siteRedirects = [
  { source: "/image-resizer-compressor/", destination: "/image-resizer/", permanent: true },
  { source: "/pdf-toolkit/", destination: "/pdf-tools/", permanent: true },
  { source: "/audio-video-converter/", destination: "/media-converter/", permanent: true },
  { source: "/compress-pdf/", destination: "/pdf-compressor/", permanent: true },
  { source: "/heic-to-jpeg/", destination: "/heic-to-jpg/", permanent: true },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Preview deployments are never indexed (they live on *.vercel.app and duplicate the live site).
      ...(isPreview ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
      // Belt and braces: if a vercel.app URL is ever served instead of redirected, keep it out of Google.
      { source: "/:path*", has: [vercelHost], headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      {
        source: "/pdf.worker.min.mjs",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/ffmpeg/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    // Preview deployments must stay reachable on their own vercel.app URL for testing (they are noindexed above).
    if (isPreview) return siteRedirects;
    return [
      // The old Vercel address moves permanently to the custom domain in a single hop:
      // pages keep their trailing slash, files (sitemap.xml, robots.txt, …) don't get one.
      { source: "/", has: [vercelHost], destination: "https://dailysolution.org/", permanent: true },
      {
        source: "/:file(.+\\.[A-Za-z0-9]+)",
        has: [vercelHost],
        destination: "https://dailysolution.org/:file",
        permanent: true,
      },
      { source: "/:path+", has: [vercelHost], destination: "https://dailysolution.org/:path+/", permanent: true },
      ...siteRedirects,
    ];
  },
};

export default nextConfig;
