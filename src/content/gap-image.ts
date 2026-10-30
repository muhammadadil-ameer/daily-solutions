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
  {
    slug: "jpg-to-avif",
    category: "image",
    name: "JPG to AVIF",
    h1: "JPG to AVIF Converter",
    title: "JPG to AVIF Converter – Free Online, Bulk",
    updated: "2026-10-27",
    metaDescription:
      "Convert JPG to AVIF online free. Bulk convert and compress photos into AVIF, the next-gen format that is often half the size of JPG. No signup, no upload.",
    short: "Make JPG photos much smaller as AVIF.",
    intro:
      "AVIF is a modern image format that usually makes photos far smaller than JPG at the same visible quality – ideal for faster websites and online shops. Convert one or many JPG files to AVIF in your browser and download them as a ZIP.",
    widget: { type: "image-convert", from: "jpg", to: "avif" },
    howTo: [
      "Add your .jpg or .jpeg files.",
      "AVIF is preselected. Adjust the quality slider to compress more or less.",
      "Press “Convert” and download, or “Download All” as ZIP.",
    ],
    sections: [
      {
        heading: "How much smaller is AVIF than JPG?",
        paragraphs: [
          "For typical photos, an AVIF file is often 30–50% smaller than a JPG that looks the same. The exact saving depends on the picture: smooth areas such as sky and skin compress best, very detailed or noisy photos save less.",
        ],
      },
      {
        heading: "Bulk JPG to AVIF and compress",
        paragraphs: [
          "Add a whole folder of JPGs at once; every image uses the same quality setting. 70–80% suits most website photos, lower values give even smaller files. AVIF encoding is heavier than JPG, so large photos can take a few seconds each – the work happens on your own device, not on a server.",
        ],
      },
      {
        heading: "Where can AVIF be used?",
        paragraphs: [
          "Current versions of Chrome, Edge, Firefox and Safari display AVIF, and many website builders and CDNs accept it. Some older apps, email clients and upload forms still only take JPG or PNG – keep your originals, or use WebP when you need wider support.",
        ],
      },
    ],
    faqs: [
      { q: "Is AVIF better than WebP?", a: "AVIF usually compresses photos a bit better than WebP, while WebP encodes faster and works in slightly more older software. Both are much smaller than JPG." },
      { q: "Can I convert many JPGs to AVIF at once?", a: "Yes. Add as many files as you like and download them together as a ZIP." },
      { q: "Will converting JPG to AVIF improve quality?", a: "No. Converting can’t add detail that the JPG already lost; it only makes the file smaller." },
    ],
    related: ["png-to-avif", "avif-to-jpg", "jpg-to-webp", "compress-jpg", "image-converter"],
    keywords: ["jpg", "jpeg", "avif", "convert", "compress", "next-gen"],
  },
  {
    slug: "png-to-avif",
    category: "image",
    name: "PNG to AVIF",
    h1: "PNG to AVIF Converter",
    title: "PNG to AVIF Converter – Free, Keeps Transparency",
    updated: "2026-10-27",
    metaDescription:
      "Convert PNG to AVIF online free and keep transparent backgrounds. Shrink large PNG graphics and screenshots for faster websites. Bulk convert, no upload.",
    short: "Shrink PNGs into AVIF and keep transparency.",
    intro:
      "PNG files are lossless but often very large. Convert PNG to AVIF to cut the file size dramatically while keeping transparent backgrounds – useful for logos, product photos and website graphics. Convert many files at once in your browser.",
    widget: { type: "image-convert", from: "png", to: "avif" },
    howTo: [
      "Add your .png files.",
      "AVIF is preselected. Choose the quality (higher keeps more detail).",
      "Press “Convert” and download the AVIF files or a ZIP.",
    ],
    sections: [
      {
        heading: "PNG to AVIF with a transparent background",
        paragraphs: [
          "AVIF supports an alpha channel, so transparent areas of your PNG stay transparent in the AVIF file. That makes it a good replacement for PNG cut-outs and logos on modern websites.",
        ],
      },
      {
        heading: "Lossless or lossy?",
        paragraphs: [
          "This converter creates lossy AVIF files, which is what makes them so small. At high quality settings the difference is hard to see for photos and graphics. For screenshots with small text or pixel art where every pixel must stay exact, keep the original PNG.",
        ],
      },
    ],
    faqs: [
      { q: "Does PNG to AVIF keep transparency?", a: "Yes. Transparent pixels stay transparent." },
      { q: "PNG to AVIF or WebP?", a: "AVIF usually gives smaller files; WebP encodes faster and is supported by a few more older apps. Both keep transparency." },
      { q: "Can I convert PNG to AVIF in bulk?", a: "Yes. Add many PNGs at once and download them as a ZIP." },
    ],
    related: ["jpg-to-avif", "avif-to-png", "png-to-webp", "compress-png", "image-converter"],
    keywords: ["png", "avif", "transparent", "convert", "compress"],
  },
];
