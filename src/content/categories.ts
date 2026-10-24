import type { Category, CategoryId } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "image",
    slug: "image-tools",
    name: "Image Tools",
    navLabel: "Image Tools",
    description: "Convert, resize and compress images.",
    intro:
      "Change image formats, resize photos to exact dimensions and shrink file sizes for websites, forms and social media. Every image tool runs in your browser, so your pictures are not uploaded to a server.",
  },
  {
    id: "pdf",
    slug: "pdf-tools",
    name: "PDF Tools",
    navLabel: "PDF Tools",
    description: "Manage, convert and optimize PDF files.",
    intro:
      "Compress, merge, split, rotate and convert PDF files without installing software. All PDF processing happens in your browser.",
    hostTool: "pdf-tools",
  },
  {
    id: "media",
    slug: "media-tools",
    name: "Media Tools",
    navLabel: "Media Tools",
    description: "Convert audio and video files.",
    intro:
      "Convert audio and video between popular formats such as MP3, WAV, M4A, MP4 and MOV, or turn short clips into GIFs. Conversion runs in your browser using FFmpeg compiled to WebAssembly.",
  },
  {
    id: "health",
    slug: "health-tools",
    name: "Health Tools",
    navLabel: "Health Tools",
    description: "Calculate calories, BMI, BMR and fitness metrics.",
    intro:
      "Estimate your daily calorie needs, BMI, BMR, TDEE, macros and protein intake with clear, well-known formulas. Results are estimates for general information, not medical advice.",
  },
];

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug && !c.hostTool);
}
