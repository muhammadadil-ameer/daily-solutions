import type { Tool } from "@/lib/types";

/** Landing pages for "compress image to N KB", the most searched image-size queries. */
interface KbPage {
  kb: number;
  width: number;
  uses: string[];
  tip: string;
  faq: { q: string; a: string };
}

const pages: KbPage[] = [
  {
    kb: 20,
    width: 400,
    uses: [
      "Scanned signatures for government job, exam and admission forms",
      "Small passport-size photos for exam portals that allow only 10–20 KB",
      "Thumbnail images for older systems with strict upload limits",
    ],
    tip: "20 KB is very small. Keep the width at about 300–400 pixels; a signature can go even smaller (200–300 pixels wide). Photos with plain backgrounds compress far better than busy ones.",
    faq: {
      q: "Why does my photo look blurry at 20 KB?",
      a: "20 KB is a tight limit, so the image needs fewer pixels and stronger compression. Reduce the width to around 300–400 px rather than lowering quality further; smaller but sharper usually looks better than large and blocky.",
    },
  },
  {
    kb: 50,
    width: 600,
    uses: [
      "Passport-size photos for job, CNIC, admission and exam applications",
      "Profile pictures for official portals",
      "Signatures and stamps where the limit is 50 KB",
    ],
    tip: "For a passport-size photo, a width of 400–600 pixels at 50 KB looks clear on screen and in print previews. Crop away extra background first with the Image Resizer if needed.",
    faq: {
      q: "What size in pixels should a 50 KB passport photo be?",
      a: "Most portals accept around 413×531 pixels (35×45 mm at 300 DPI) or similar. Check your form’s instructions, set those dimensions in the Image Resizer, then compress to 50 KB here.",
    },
  },
  {
    kb: 100,
    width: 1000,
    uses: [
      "CNIC/ID card, domicile and certificate scans for online applications",
      "Profile photos and product images on marketplaces",
      "Images for email signatures and lightweight web pages",
    ],
    tip: "100 KB is enough for a clear photo about 800–1000 pixels wide, or a readable document scan. For text documents, a white background and good lighting make the biggest difference.",
    faq: {
      q: "Can I compress a document scan to 100 KB and keep it readable?",
      a: "Usually yes. Keep the width around 1000–1200 px so small text stays readable. If it still doesn’t fit, crop the margins or save as WebP if the portal accepts it.",
    },
  },
  {
    kb: 200,
    width: 1600,
    uses: [
      "Visa, scholarship and university application uploads",
      "Photos for email and WhatsApp that still look sharp on large screens",
      "Blog and website images that must load fast",
    ],
    tip: "200 KB comfortably fits a sharp photo up to about 1600 pixels wide, so you rarely need to reduce dimensions much. This is also a good target for website images.",
    faq: {
      q: "Is 200 KB good enough for printing?",
      a: "For small prints, yes. For full-page prints you need more pixels and a larger file; use 500 KB or more and keep the original resolution.",
    },
  },
];

function kbTool({ kb, width, uses, tip, faq }: KbPage): Tool {
  const label = `${kb}KB`;
  return {
    slug: `compress-image-to-${kb}kb`,
    category: "image",
    name: `Compress Image to ${kb}KB`,
    h1: `Compress Image to ${kb}KB`,
    title: `Compress Image to ${label} Online Free – JPG, PNG, Photo`,
    updated: "2026-10-25",
    metaDescription: `Compress any image or photo to ${kb}KB (or below) online for free. Reduce JPG, PNG or HEIC from MB to ${kb} KB for online forms in seconds. No signup.`,
    short: `Reduce a photo or signature to under ${kb} KB.`,
    intro: `Reduce an image to ${kb} KB or less for an online form. The maximum size is already set to ${kb} KB and a suitable width is preselected – just add your photo, press “Apply” and download a JPG under ${kb} KB.`,
    widget: { type: "image-resize", focus: "compress", format: "jpg", maxKB: kb, width },
    howTo: [
      "Add your photo or signature (JPG, PNG, WebP or iPhone HEIC).",
      `“Max file size” is already set to ${kb} KB. Adjust the width if your form asks for exact pixels.`,
      "Press “Apply” – the tool finds the highest quality that stays under the limit.",
      `Check that the result is below ${kb} KB and download the JPG.`,
    ],
    sections: [
      { heading: `When you need an image under ${kb} KB`, list: uses },
      { heading: `Tips for a clear photo at ${kb} KB`, paragraphs: [tip] },
      {
        heading: "How the compressor reaches the exact size",
        paragraphs: [
          `The tool encodes the image several times at different quality levels and keeps the best one that is ${kb} KB or smaller, so you don’t have to guess. If ${kb} KB cannot be reached at the chosen width, it tells you; lowering the width solves it.`,
          "JPG is used because almost every upload form accepts it. Your photo is processed in your browser and is never uploaded to a server.",
        ],
      },
    ],
    faqs: [
      { q: `How do I compress an image to ${kb} KB?`, a: `Add your image above, keep “Max file size” at ${kb} and press “Apply”. Download the JPG once the size shows ${kb} KB or less.` },
      faq,
      { q: "Can I do this on my phone?", a: "Yes. The page works in Chrome and Safari on Android and iPhone; pick the photo from your gallery and download the result." },
      { q: "Is it free?", a: "Yes. There is no signup, no watermark and no limit on how many images you compress." },
    ],
    related: ["compress-image", "reduce-image-size", "image-resizer", ...pages.filter((p) => p.kb !== kb).map((p) => `compress-image-to-${p.kb}kb`)],
    keywords: ["compress", "image", "photo", "kb", `${kb}kb`, `${kb} kb`, "reduce", "size", "form"],
  };
}

export const kbTools: Tool[] = pages.map(kbTool);
