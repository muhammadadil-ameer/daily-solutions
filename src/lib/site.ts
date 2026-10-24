export const site = {
  name: "Daily Solutions",
  tagline: "Simple online tools that solve everyday problems.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dailysolutions.vercel.app").replace(/\/$/, ""),
  email: "muhammadadilameer5@gmail.com",
  // Public identifiers (they appear in page HTML anyway); env vars override them per environment.
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-Y04G5F4VT0",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "z2num1ivdh",
  googleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "RFFHQi6TEtQ1BLoHaoGQVpL2JQjEg8C40fXRTHVvHng",
  description:
    "Free online tools to convert, resize and compress images, edit PDF files, convert audio and video, and calculate calories, BMI and more. No signup, files are processed in your browser.",
};

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
