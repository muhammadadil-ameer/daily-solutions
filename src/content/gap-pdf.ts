import type { Tool } from "@/lib/types";

/** PDF landing pages for queries the big PDF sites rank for, backed by existing toolkit features. */
export const gapPdfTools: Tool[] = [
  {
    slug: "rotate-pdf",
    category: "pdf",
    name: "Rotate PDF",
    h1: "Rotate PDF Pages",
    title: "Rotate PDF Online Free – Rotate All or Selected Pages",
    updated: "2026-10-27",
    metaDescription:
      "Rotate PDF pages online free: turn all pages or only selected pages by 90° or 180° and save the PDF permanently. No signup, no upload, works on any device.",
    short: "Turn PDF pages 90° or 180° and save.",
    intro:
      "Scanned a document sideways or upside down? Rotate all pages of a PDF, or only the pages you choose, by 90° left, 90° right or 180°, then download the fixed PDF. The rotation is saved in the file, so it opens the right way everywhere.",
    widget: { type: "pdf", action: "rotate" },
    howTo: [
      "Add your PDF.",
      "Choose the rotation: 90° right, 180° or 90° left.",
      "Rotate all pages, or choose “Selected pages” and type page numbers such as 2, 5-7.",
      "Press “Rotate PDF” and download.",
    ],
    sections: [
      {
        heading: "Rotate all pages or just one page",
        paragraphs: [
          "Most scanned PDFs have only a few sideways pages. Choose “Selected pages” and enter their numbers to rotate just those pages one by one, or rotate every page at once when the whole document was scanned the wrong way.",
        ],
      },
      {
        heading: "Rotate a PDF and save it permanently",
        paragraphs: [
          "Rotating in a PDF viewer usually changes only the view. This tool writes the new orientation into the file, so the pages stay rotated when you email, upload or print the PDF. Text, links and image quality are not changed.",
        ],
      },
      {
        heading: "Rotate, then merge or compress",
        paragraphs: [
          "After rotating, you can combine the file with others using Merge PDF, or make it smaller for an upload form with the PDF Compressor.",
        ],
      },
    ],
    faqs: [
      { q: "How do I rotate a PDF and save it?", a: "Add the PDF, pick the angle, press “Rotate PDF” and download. The rotation is stored in the new file permanently." },
      { q: "Can I rotate only one page of a PDF?", a: "Yes. Choose “Selected pages” and type the page number, for example 3, or several pages like 2, 5-7." },
      { q: "Does rotating reduce PDF quality?", a: "No. Only the page orientation changes; text and images are not recompressed." },
      { q: "Can I rotate a PDF on Android or iPhone?", a: "Yes. The tool works in your phone’s browser with no app." },
    ],
    related: ["organize-pdf", "merge-pdf", "pdf-compressor", "split-pdf", "pdf-tools"],
    keywords: ["rotate", "pdf", "pages", "90 degrees", "turn", "orientation", "sideways"],
  },
  {
    slug: "delete-pdf-pages",
    category: "pdf",
    name: "Delete PDF Pages",
    h1: "Delete Pages from PDF",
    title: "Delete Pages from PDF Online Free – Remove PDF Pages",
    updated: "2026-10-27",
    metaDescription:
      "Delete pages from a PDF online free. Remove blank, duplicate or unwanted pages by page number and download the cleaned PDF. No signup, no upload, no watermark.",
    short: "Remove unwanted pages from a PDF.",
    intro:
      "Remove blank, duplicate or private pages from a PDF in seconds. Type the page numbers you want to delete, and download a new PDF with the remaining pages in the same order and quality.",
    widget: { type: "pdf", action: "delete" },
    howTo: [
      "Add your PDF – the page count is shown.",
      "Type the pages to remove, for example 2, 5-7.",
      "Press “Delete Pages” and download the new PDF.",
    ],
    sections: [
      {
        heading: "Remove pages from a PDF by page number",
        paragraphs: [
          "Enter single pages and ranges separated by commas: “1, 4-6, 10” removes pages 1, 4, 5, 6 and 10. All other pages are kept in their original order. At least one page must remain.",
        ],
      },
      {
        heading: "Why delete pages before uploading",
        list: [
          "Remove blank pages that a scanner added.",
          "Drop instruction pages before submitting a filled form.",
          "Keep private pages out of a document you share.",
          "Make a PDF smaller so it fits an upload limit.",
        ],
      },
    ],
    faqs: [
      { q: "How do I delete pages from a PDF for free?", a: "Add the PDF, type the page numbers to remove, press “Delete Pages” and download. No account is needed." },
      { q: "Will the other pages lose quality?", a: "No. The remaining pages are copied exactly, without recompression." },
      { q: "Can I delete pages from a PDF on iPhone or Mac?", a: "Yes. Open this page in Safari or Chrome; nothing needs to be installed." },
      { q: "Can I keep only a few pages instead?", a: "Yes – use Extract PDF Pages to save just the pages you choose into a new file." },
    ],
    related: ["extract-pdf-pages", "organize-pdf", "split-pdf", "pdf-compressor", "merge-pdf"],
    keywords: ["delete", "remove", "pages", "pdf", "blank page"],
  },
  {
    slug: "extract-pdf-pages",
    category: "pdf",
    name: "Extract PDF Pages",
    h1: "Extract Pages from PDF",
    title: "Extract Pages from PDF Online Free – Save as New PDF",
    updated: "2026-10-27",
    metaDescription:
      "Extract pages from a PDF online free and save them as a new PDF. Pick pages by number or range, keep original quality. No signup, no upload.",
    short: "Save selected PDF pages as a new file.",
    intro:
      "Pull out only the pages you need – a single certificate, one chapter, or pages 3 to 8 – and save them as a new PDF. The original file stays unchanged and the extracted pages keep their full quality.",
    widget: { type: "pdf", action: "extract" },
    howTo: [
      "Add your PDF.",
      "Type the pages to keep, for example 1, 3-5.",
      "Press “Extract Pages” and download the new PDF.",
    ],
    sections: [
      {
        heading: "Extract pages and create a new PDF",
        paragraphs: [
          "All the pages you list are saved together in one new PDF, in page order. To get every page as its own separate file instead, use Split PDF with “Every page”.",
        ],
      },
      {
        heading: "Extract PDF pages as images",
        paragraphs: [
          "Need the pages as pictures instead? Extract them here, then convert the new PDF with PDF to JPG or PDF to PNG.",
        ],
      },
    ],
    faqs: [
      { q: "How do I extract pages from a PDF for free?", a: "Add the PDF, enter the page numbers, press “Extract Pages” and download the new PDF." },
      { q: "Can I extract pages as separate files?", a: "Yes. Use Split PDF and choose “Every page” or custom ranges – each range becomes its own file." },
      { q: "Is the quality kept?", a: "Yes. Pages are copied exactly, so text stays selectable and images are unchanged." },
    ],
    related: ["split-pdf", "delete-pdf-pages", "pdf-to-jpg", "pdf-to-png", "merge-pdf"],
    keywords: ["extract", "pages", "pdf", "save pages", "new pdf"],
  },
  {
    slug: "organize-pdf",
    category: "pdf",
    name: "Organize PDF",
    h1: "Organize PDF – Reorder PDF Pages",
    title: "Organize PDF Online Free – Reorder & Rearrange Pages",
    updated: "2026-10-27",
    metaDescription:
      "Organize PDF pages online free: see page thumbnails, move pages up or down to rearrange the order, remove pages and save. No signup, no upload.",
    short: "Rearrange PDF pages with thumbnails.",
    intro:
      "See every page of your PDF as a thumbnail, move pages up or down to put them in the right order, remove any you don’t need, and save the reorganized PDF – all in your browser.",
    widget: { type: "pdf", action: "reorder" },
    howTo: [
      "Add your PDF – page thumbnails appear.",
      "Use the arrows to move pages, or the bin icon to remove a page.",
      "Press “Save New Order” and download.",
    ],
    sections: [
      {
        heading: "Rearrange pages visually",
        paragraphs: [
          "Thumbnails make it easy to spot scanned pages that are out of order. Move a page up or down one step at a time; the page number under each thumbnail shows its original position so you never lose track.",
        ],
      },
      {
        heading: "Organize, then rotate or merge",
        paragraphs: [
          "Need to fix sideways pages too? Run Rotate PDF on the saved file. To add pages from another document, combine both files with Merge PDF first, then reorder them here.",
        ],
      },
    ],
    faqs: [
      { q: "How do I rearrange pages in a PDF?", a: "Add the PDF, use the up and down arrows under each thumbnail to change the order, then press “Save New Order”." },
      { q: "Can I also delete pages here?", a: "Yes. Use the bin icon under a page to remove it before saving." },
      { q: "Is page quality affected?", a: "No. Pages are copied exactly in the new order." },
    ],
    related: ["rotate-pdf", "delete-pdf-pages", "merge-pdf", "split-pdf", "pdf-tools"],
    keywords: ["organize", "reorder", "rearrange", "sort", "pages", "pdf"],
  },
  {
    slug: "pdf-to-png",
    category: "pdf",
    name: "PDF to PNG",
    h1: "PDF to PNG Converter",
    title: "PDF to PNG Converter – High Quality, Free Online",
    updated: "2026-10-27",
    metaDescription:
      "Convert PDF to PNG online free in high quality. Save every PDF page as a sharp PNG image at up to 220 DPI and download all pages as a ZIP. No signup.",
    short: "Save every PDF page as a sharp PNG.",
    intro:
      "Convert each page of a PDF into a lossless PNG image – ideal for diagrams, screenshots and documents with small text, where PNG stays sharper than JPG. Choose the resolution and download single pages or all of them as a ZIP.",
    widget: { type: "pdf", action: "pdf-to-png" },
    howTo: [
      "Add your PDF.",
      "Choose the quality: Standard (100 DPI), High (150 DPI) or Very high (220 DPI).",
      "Press “Convert to PNG”.",
      "Download the pages you need or “Download All (ZIP)”.",
    ],
    sections: [
      {
        heading: "PDF to PNG or PDF to JPG?",
        paragraphs: [
          "PNG is lossless, so text and lines stay crisp – the best choice for slides, charts, forms and anything you will edit or print. JPG makes smaller files for photos and scans. If size matters more than sharpness, use PDF to JPG instead.",
        ],
      },
      {
        heading: "High-quality PDF to PNG",
        paragraphs: [
          "“Very high (220 DPI)” renders each A4 page at roughly 1820 × 2570 pixels, which is enough for zooming and printing. Pages are rendered on a white background.",
        ],
      },
    ],
    faqs: [
      { q: "How do I convert PDF to PNG for free?", a: "Add your PDF, choose a quality, press “Convert to PNG” and download the images. No signup is needed." },
      { q: "Will the PNG have a transparent background?", a: "No. Pages are rendered on white, the same way they look in a PDF reader." },
      { q: "Can I convert all pages at once?", a: "Yes. Every page is converted and you can download them together as a ZIP." },
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "extract-pdf-pages", "compress-png", "pdf-tools"],
    keywords: ["pdf", "png", "convert", "image", "high quality", "pages"],
  },
  {
    slug: "png-to-pdf",
    category: "pdf",
    name: "PNG to PDF",
    h1: "PNG to PDF Converter",
    title: "PNG to PDF Converter – Merge PNG Images into One PDF",
    updated: "2026-10-27",
    metaDescription:
      "Convert PNG to PDF online free. Merge one or many PNG images into a single PDF in A4, Letter or original size, in high quality. No signup, no watermark.",
    short: "Turn PNG images into one PDF.",
    intro:
      "Turn PNG screenshots, scans or graphics into a PDF. Add one or many images, arrange the order, choose A4, Letter or fit-to-image pages, and download a single high-quality PDF.",
    widget: { type: "pdf", action: "images-to-pdf" },
    howTo: [
      "Add your PNG images (JPG, WebP and HEIC also work).",
      "Arrange them with the arrows.",
      "Choose page size and margin.",
      "Press “Create PDF” and download.",
    ],
    sections: [
      {
        heading: "Merge multiple PNG files into one PDF",
        paragraphs: [
          "Select all your PNG files at once – for example screenshots of a long chat or several scanned pages – and they become pages of one PDF in the order you choose.",
        ],
      },
      {
        heading: "PNG to PDF in A4 size",
        paragraphs: [
          "Choose A4 (or Letter) to place each image on a standard page, which is best for printing and official uploads. “Fit to image” makes each page exactly the size of the picture. PNG images are embedded without loss.",
        ],
      },
    ],
    faqs: [
      { q: "How do I convert PNG to PDF for free?", a: "Add your PNG images, choose a page size and press “Create PDF”. Download the PDF – no signup needed." },
      { q: "Will my PNG lose quality in the PDF?", a: "No. PNG images are embedded losslessly." },
      { q: "Can I combine PNG and JPG in one PDF?", a: "Yes. Add both kinds of images; they become pages in the order you set." },
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "heic-to-pdf", "merge-pdf", "pdf-compressor"],
    keywords: ["png", "pdf", "convert", "merge", "images", "a4"],
  },
  {
    slug: "heic-to-pdf",
    category: "pdf",
    name: "HEIC to PDF",
    h1: "HEIC to PDF Converter",
    title: "HEIC to PDF Converter – iPhone Photos to PDF Free",
    updated: "2026-10-27",
    metaDescription:
      "Convert HEIC to PDF online free. Turn iPhone HEIC photos of documents and receipts into one PDF in A4 size. Works on Windows, Android and iPhone, no app.",
    short: "Turn iPhone HEIC photos into one PDF.",
    intro:
      "Photographed documents or receipts with your iPhone? Convert the HEIC photos straight into a single PDF – no need to convert to JPG first. Arrange the pages, choose A4 or Letter, and download.",
    widget: { type: "pdf", action: "images-to-pdf" },
    howTo: [
      "Add your .heic or .heif photos.",
      "Put them in the right order.",
      "Choose page size and margin, then press “Create PDF”.",
      "Download the PDF.",
    ],
    sections: [
      {
        heading: "Why convert HEIC directly to PDF",
        paragraphs: [
          "Upload portals and email recipients often can’t open HEIC. A PDF opens everywhere and keeps several pages together in one file, which is exactly what most forms ask for.",
        ],
      },
      {
        heading: "Keep the PDF small",
        paragraphs: [
          "iPhone photos are large. If your PDF must be under a limit such as 200 KB or 1 MB, compress it afterwards with the PDF Compressor.",
        ],
      },
    ],
    faqs: [
      { q: "How do I convert HEIC to PDF on Windows?", a: "Open this page in Chrome or Edge, add the HEIC photos, press “Create PDF” and download. No software is needed." },
      { q: "Can I put several HEIC photos in one PDF?", a: "Yes. Each photo becomes one page, in the order you choose." },
      { q: "Are my photos uploaded?", a: "No. Conversion happens in your browser on your own device." },
    ],
    related: ["heic-to-jpg", "jpg-to-pdf", "png-to-pdf", "pdf-compressor", "compress-pdf-to-200kb"],
    keywords: ["heic", "heif", "pdf", "iphone", "photos", "convert"],
  },
  {
    slug: "webp-to-pdf",
    category: "pdf",
    name: "WebP to PDF",
    h1: "WebP to PDF Converter",
    title: "WebP to PDF Converter – Free, Merge into One PDF",
    updated: "2026-10-27",
    metaDescription:
      "Convert WebP to PDF online free. Combine multiple WebP images into one PDF in A4 or Letter size, in the order you choose. No signup, no upload, no watermark.",
    short: "Combine WebP images into one PDF.",
    intro:
      "Saved images from the web as WebP and need a PDF? Convert WebP to PDF directly – add one or many WebP files, put them in order, choose A4, Letter or fit-to-image pages, and download a single PDF. Everything happens in your browser.",
    widget: { type: "pdf", action: "images-to-pdf" },
    howTo: [
      "Add your .webp images (JPG, PNG and HEIC can be mixed in).",
      "Arrange them in the right order.",
      "Choose page size and margin, then press “Create PDF”.",
      "Download the PDF.",
    ],
    sections: [
      {
        heading: "Multiple WebP files to one PDF",
        paragraphs: [
          "Each image becomes one page, so you can merge screenshots, product pictures or scanned notes saved as WebP into a single document for printing, emailing or uploading to a form.",
        ],
      },
      {
        heading: "Page size and quality",
        paragraphs: [
          "A4 and Letter place each image centered on a standard page, rotated to landscape when the image is wide. “Fit” makes each page exactly the size of the image. WebP images are embedded as high-quality JPG inside the PDF, because PDF files can’t store WebP directly; transparent areas become white.",
        ],
      },
      {
        heading: "Make the PDF smaller",
        paragraphs: [
          "If a form needs the PDF under a size such as 200 KB or 1 MB, run it through the PDF Compressor afterwards.",
        ],
      },
    ],
    faqs: [
      { q: "Can I convert animated WebP to PDF?", a: "Only the first frame is used, because a PDF page is a still image." },
      { q: "Is there a watermark?", a: "No. The PDF contains only your images." },
      { q: "Are my images uploaded?", a: "No. The PDF is created in your browser on your own device." },
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "heic-to-pdf", "webp-to-jpg", "pdf-compressor"],
    keywords: ["webp", "pdf", "convert", "merge", "images", "a4"],
  },
];
