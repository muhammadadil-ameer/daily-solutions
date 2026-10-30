import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const oldHost = { type: "host" as const, value: "dailysolutions.vercel.app" };

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
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
    return [
      // The old Vercel address moves permanently to the custom domain in a single hop:
      // pages keep their trailing slash, files (sitemap.xml, robots.txt, …) don't get one.
      { source: "/", has: [oldHost], destination: "https://dailysolution.org/", permanent: true },
      {
        source: "/:file(.+\\.[A-Za-z0-9]+)",
        has: [oldHost],
        destination: "https://dailysolution.org/:file",
        permanent: true,
      },
      { source: "/:path+", has: [oldHost], destination: "https://dailysolution.org/:path+/", permanent: true },
      { source: "/image-resizer-compressor/", destination: "/image-resizer/", permanent: true },
      { source: "/pdf-toolkit/", destination: "/pdf-tools/", permanent: true },
      { source: "/audio-video-converter/", destination: "/media-converter/", permanent: true },
      { source: "/compress-pdf/", destination: "/pdf-compressor/", permanent: true },
      { source: "/heic-to-jpeg/", destination: "/heic-to-jpg/", permanent: true },
    ];
  },
};

export default nextConfig;
