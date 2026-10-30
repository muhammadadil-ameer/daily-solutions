export const site = {
  name: "Daily Solutions",
  tagline: "Simple online tools that solve everyday problems.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dailysolution.org").replace(/\/$/, ""),
  email: "muhammadadilameer5@gmail.com",
  // Public identifiers (they appear in page HTML anyway); env vars override them per environment.
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-Y04G5F4VT0",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "z2num1ivdh",
  googleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "RFFHQi6TEtQ1BLoHaoGQVpL2JQjEg8C40fXRTHVvHng",
  /** IndexNow key; the matching file is public/<key>.txt. */
  indexNowKey: "96e96a9bc1eb96ef8b02f8d4392b2f71",
  /** Default sitemap lastmod for pages without their own `updated` date (YYYY-MM-DD). */
  launchDate: "2026-10-24",
  description:
    "Free online tools to convert, resize and compress images, edit PDFs, convert audio and video, and calculate calories and BMI. No signup, runs in your browser.",
};

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
