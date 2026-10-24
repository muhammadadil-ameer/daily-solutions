export const site = {
  name: "Daily Solutions",
  tagline: "Simple online tools that solve everyday problems.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://daily-solutions.vercel.app").replace(/\/$/, ""),
  email: "muhammadadilameer5@gmail.com",
  description:
    "Free online tools to convert, resize and compress images, edit PDF files, convert audio and video, and calculate calories, BMI and more. No signup, files are processed in your browser.",
};

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
