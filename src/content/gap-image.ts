import type { Tool } from "@/lib/types";

/** Image converter landing pages for formats the big image sites rank for, backed by the existing converter. */
export const gapImageTools: Tool[] = [
  {
    slug: "gif-to-jpg",
    category: "image",
    name: "GIF to JPG",
    h1: "GIF to JPG Converter",
    title: "GIF to JPG Converter – Free Online, Bulk",
    updated: "2026-10-27",
    metaDescription:
      "Convert GIF to JPG online free. Save GIF images (first frame of animations) as JPG for forms, documents and editors. Bulk convert, no signup, no upload.",
    short: "Save GIF images as JPG.",
    intro:
      "Convert GIF images to JPG when a website, document or app needs a JPG. For animated GIFs, the first frame is saved as a still JPG. Convert one or many files at once in your browser.",
    widget: { type: "image-convert", from: "gif", to: "jpg" },
    howTo: ["Add your .gif files.", "JPG is preselected.", "Press “Convert” and download, or “Download All” as ZIP."],
    sections: [
      {
        heading: "Animated GIF to JPG",
        paragraphs: [
          "JPG can’t store animation, so an animated GIF becomes a single still image – its first frame. Keep the original GIF if you need the motion.",
        ],
      },
      {
        heading: "Better colors with JPG",
        paragraphs: [
          "GIF is limited to 256 colors. JPG stores full color, so photos saved as GIF won’t gain detail, but the JPG won’t lose any more color either – and it usually opens in more apps.",
        ],
      },
    ],
    faqs: [
      { q: "Will my animated GIF stay animated?", a: "No. JPG is a still format; only the first frame is saved." },
      { q: "What happens to transparent GIFs?", a: "Transparent areas become white, because JPG has no transparency. Use PNG output to keep transparency." },
      { q: "Can I convert many GIFs at once?", a: "Yes. Add multiple files and download them as a ZIP." },
    ],
    related: ["image-converter", "png-to-jpg", "webp-to-jpg", "tiff-to-jpg", "compress-jpg"],
    keywords: ["gif", "jpg", "jpeg", "convert", "image"],
  },
  {
    slug: "tiff-to-jpg",
    category: "image",
    name: "TIFF to JPG",
    h1: "TIFF to JPG Converter",
    title: "TIFF to JPG Converter – Free Online, High Quality",
    updated: "2026-10-27",
    metaDescription:
      "Convert TIFF to JPG online free in high quality. Turn large TIF scans and camera files into small JPG images for email and upload. Bulk, no signup.",
    short: "Turn large TIFF scans into small JPGs.",
    intro:
      "TIFF (.tif, .tiff) files from scanners and cameras are big and many websites won’t accept them. Convert TIFF to high-quality JPG to cut the file size dramatically and open it anywhere.",
    widget: { type: "image-convert", from: "tiff", to: "jpg" },
    howTo: ["Add your .tif or .tiff files.", "JPG is preselected; keep quality at 90% for print-like results.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Why TIFF files are so large",
        paragraphs: [
          "TIFF usually stores images without lossy compression, which is ideal for archiving and printing but produces files of 10–100 MB. A JPG at 90% quality typically looks the same on screen at 5–10% of the size.",
        ],
      },
      {
        heading: "Multi-page TIFF",
        paragraphs: [
          "Scanners sometimes save several pages in one TIFF. This converter saves the first page as JPG. For multi-page documents, consider scanning to PDF instead.",
        ],
      },
    ],
    faqs: [
      { q: "Can I convert TIFF to JPG without losing quality?", a: "Use 90–100% quality – the difference is not visible in normal viewing – or choose PNG for fully lossless output." },
      { q: "Does it support .tif and .tiff?", a: "Yes, both extensions are supported." },
    ],
    related: ["image-converter", "compress-jpg", "gif-to-jpg", "bmp-to-jpg", "jpg-to-pdf"],
    keywords: ["tiff", "tif", "jpg", "jpeg", "scan", "convert"],
  },
  {
    slug: "bmp-to-jpg",
    category: "image",
    name: "BMP to JPG",
    h1: "BMP to JPG Converter",
    title: "BMP to JPG Converter – Free Online, Reduce Size",
    updated: "2026-10-27",
    metaDescription:
      "Convert BMP to JPG online free. Shrink large uncompressed BMP bitmaps into small JPG images that every app and website accepts. Bulk, no signup, no upload.",
    short: "Shrink BMP bitmaps into small JPGs.",
    intro:
      "BMP is an old, uncompressed Windows bitmap format – a single screenshot can be several megabytes. Convert BMP to JPG to make it up to 90% smaller and accepted everywhere.",
    widget: { type: "image-convert", from: "bmp", to: "jpg" },
    howTo: ["Add your .bmp files.", "JPG is preselected.", "Press “Convert” and download, or get all files as a ZIP."],
    sections: [
      {
        heading: "BMP to JPG or PNG?",
        paragraphs: [
          "For photos, JPG gives the smallest files. For screenshots and graphics with text, choose PNG in the “Convert to” list – it is lossless and keeps text perfectly sharp while still being much smaller than BMP.",
        ],
      },
    ],
    faqs: [
      { q: "How much smaller will my file be?", a: "Usually 80–95% smaller as JPG, depending on the image." },
      { q: "Can I convert many BMP files at once?", a: "Yes. Add them all and download a ZIP." },
    ],
    related: ["image-converter", "png-to-jpg", "tiff-to-jpg", "compress-jpg"],
    keywords: ["bmp", "bitmap", "jpg", "jpeg", "convert"],
  },
];
