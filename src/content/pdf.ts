import type { Tool } from "@/lib/types";

const compressionNote = {
  heading: "How PDF compression works here",
  paragraphs: [
    "First, the tool rebuilds the PDF structure, which removes unused data without changing how pages look. If that is not enough, it re-renders each page as an optimized image. That method can shrink scanned documents and image-heavy PDFs dramatically, but the text in the compressed file is no longer selectable or searchable.",
    "For a document that must keep selectable text, use “Low” compression and check the result. For scans, receipts and photo-based PDFs, “Medium” or a target size works well.",
  ],
};

function targetSizePage(kb: number, uses: string[]): Tool {
  const label = kb >= 1024 ? `${kb / 1024}MB` : `${kb}KB`;
  return {
    slug: `compress-pdf-to-${label.toLowerCase()}`,
    category: "pdf",
    name: `Compress PDF to ${label}`,
    h1: `Compress PDF to ${label}`,
    title: `Compress PDF to ${label} Online – Free, No Signup`,
    metaDescription: `Reduce a PDF to ${label} or less for online applications and email. Free, private PDF compressor that runs in your browser.`,
    short: `Shrink a PDF to under ${label} for upload limits.`,
    intro: `Many online forms only accept PDFs up to ${label}. Add your file and the tool tries progressively stronger compression until it fits under ${label}, then shows the final size.`,
    widget: { type: "pdf", action: "compress", targetKB: kb },
    howTo: [
      "Add your PDF.",
      `The target is set to ${label}. You can change it if your form has a different limit.`,
      "Press “Compress PDF”. The tool tries several levels and keeps the best one under the limit.",
      "Check the result size and download.",
    ],
    sections: [
      { heading: `Where a ${label} limit is common`, list: uses },
      compressionNote,
      {
        heading: "If the PDF is still too large",
        paragraphs: [
          `A PDF with many pages may not fit into ${label} even at the strongest setting. Split the PDF and upload only the pages you need, or remove blank and duplicate pages first with the Delete Pages tool.`,
        ],
      },
    ],
    faqs: [
      { q: `Can every PDF be compressed to ${label}?`, a: "Most short documents can. Long documents with many full-page images may need to be split first." },
      { q: "Will my text still be readable?", a: "Yes, but at strong compression levels the text becomes part of an image and cannot be selected or searched." },
      { q: "Is my PDF uploaded to a server?", a: "No. Compression runs in your browser and the file stays on your device." },
    ],
    related: ["pdf-compressor", "compress-pdf-to-100kb", "compress-pdf-to-200kb", "split-pdf", "jpg-to-pdf", "reduce-image-size"].filter(
      (s) => s !== `compress-pdf-to-${label.toLowerCase()}`,
    ),
    keywords: ["compress", "pdf", "kb", label.toLowerCase(), "reduce", "size"],
  };
}

export const pdfTools: Tool[] = [
  {
    slug: "pdf-tools",
    category: "pdf",
    name: "PDF Toolkit",
    h1: "PDF Toolkit",
    title: "PDF Toolkit – Compress, Merge, Split and Convert PDF Free",
    metaDescription:
      "Free PDF tools in one place: compress, merge, split, rotate, extract, delete and reorder pages, and convert between PDF and JPG/PNG. Runs in your browser.",
    short: "Compress, merge, split and convert PDF files.",
    intro:
      "Choose a PDF task below. Every tool works in your browser, so your documents are not uploaded to a server.",
    widget: { type: "pdf", toolkit: true, action: "compress" },
    primary: true,
    howTo: [
      "Choose a task, such as Compress, Merge or PDF to JPG.",
      "Add your PDF or image files.",
      "Set the options for that task.",
      "Press the action button and download the result.",
    ],
    sections: [
      {
        heading: "What you can do with the PDF Toolkit",
        list: [
          "Compress PDF: reduce file size with three levels or a target size.",
          "Merge PDF: combine several PDFs into one, in the order you choose.",
          "Split PDF: save each page separately, or split by page ranges.",
          "JPG to PDF: turn photos and scans into a single PDF.",
          "PDF to JPG / PNG: save each page as an image.",
          "Rotate, extract, delete and reorder pages.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          "PDF processing uses pdf-lib and Mozilla’s PDF.js running inside your browser. Files are read from your device, processed in memory and offered back to you as downloads. Nothing is uploaded or stored on our side.",
        ],
      },
    ],
    faqs: [
      { q: "Are the PDF tools free?", a: "Yes, all PDF tools are free and need no account." },
      { q: "Can I edit password-protected PDFs?", a: "Encrypted PDFs cannot be processed. Remove the password in your PDF reader first, if you are allowed to." },
      { q: "What is the maximum file size?", a: "PDFs up to 100 MB can be opened. Very large files may be slow on phones." },
      { q: "Will PDF to Word be added?", a: "PDF to Word, Word to PDF and PDF to Excel are planned for a future update." },
    ],
    related: ["pdf-compressor", "merge-pdf", "split-pdf", "pdf-to-jpg", "jpg-to-pdf", "compress-pdf-to-200kb"],
    keywords: ["pdf", "toolkit", "rotate", "extract", "delete", "reorder", "pages", "png"],
  },
  {
    slug: "pdf-compressor",
    category: "pdf",
    name: "PDF Compressor",
    h1: "PDF Compressor",
    title: "PDF Compressor – Compress PDF to 100KB, 200KB, 1MB Free",
    updated: "2026-10-25",
    metaDescription:
      "Free online PDF compressor. Reduce PDF file size to 100KB, 200KB, 500KB, 1MB or below 2MB, or pick low/medium/high compression. No signup, files stay private.",
    short: "Reduce PDF file size for email and uploads.",
    intro:
      "Reduce the size of a PDF for email, WhatsApp or online applications. Choose a compression level or a target size, then compare the original and compressed size.",
    widget: { type: "pdf", action: "compress" },
    popular: true,
    howTo: [
      "Add your PDF.",
      "Choose Low, Medium or High compression, or select a target size.",
      "Press “Compress PDF”.",
      "Check the size reduction and download the compressed file.",
    ],
    sections: [
      {
        heading: "Compress PDF to a specific size",
        paragraphs: [
          "Choose “Target size” and pick under 100 KB, 200 KB, 500 KB, 1 MB or 2 MB – the usual limits on job, exam, university, bank and visa portals. The compressor tries progressively stronger settings and keeps the best-looking result that fits.",
        ],
        list: [
          "Compress PDF to 100 KB or 200 KB: scanned certificates, CNIC/ID copies and forms.",
          "Compress PDF below 500 KB or 1 MB: resumes, assignments and multi-page scans.",
          "Compress PDF below 2 MB: email attachments and large reports.",
        ],
      },
      compressionNote,
      {
        heading: "Compress PDF without losing quality",
        paragraphs: [
          "“Low” compression first tries a lossless optimization that keeps text sharp and selectable. For scanned PDFs, “Medium” keeps documents easy to read while cutting the size substantially. Only very small targets need “High” compression.",
        ],
      },
      {
        heading: "Choosing a compression level",
        list: [
          "Low: keeps text selectable when the structure-only optimization is enough; otherwise renders at high resolution.",
          "Medium: good balance for scanned documents and forms.",
          "High: smallest files; fine for reading on screen, less suitable for printing.",
        ],
      },
    ],
    faqs: [
      { q: "How do I compress a PDF to 200 KB?", a: "Add your PDF, choose “Target size”, select “Under 200 KB” and press “Compress PDF”. Download the result once the final size is shown." },
      { q: "Is this PDF compressor free?", a: "Yes. It is free, has no daily limit and needs no account." },
      { q: "Can I compress a PDF on my phone?", a: "Yes. The PDF compressor works in Chrome and Safari on Android and iPhone – no app is needed." },
      { q: "How much smaller will my PDF be?", a: "Scanned and image-heavy PDFs often shrink by 50–90%. Text-only PDFs are usually already small and may shrink less." },
      { q: "Why did my PDF get bigger?", a: "Some text-only PDFs are already optimized. If the result is larger, the tool tells you and you can keep the original." },
      { q: "Is my file safe?", a: "The file is processed entirely in your browser and is not uploaded." },
    ],
    related: ["compress-pdf-to-100kb", "compress-pdf-to-200kb", "merge-pdf", "split-pdf", "pdf-to-jpg", "compress-image"],
    keywords: ["compress", "pdf", "reduce", "size", "shrink", "optimize"],
  },
  targetSizePage(100, [
    "Government job and exam application portals",
    "University admission forms",
    "Bank and KYC document uploads",
    "Visa and passport application portals",
  ]),
  targetSizePage(200, [
    "Scholarship and admission document uploads",
    "Online job portals",
    "Insurance claim forms",
    "Tax and utility portals",
  ]),
  targetSizePage(500, [
    "Resume and CV uploads",
    "Assignment submission systems",
    "Email attachments on slow connections",
  ]),
  targetSizePage(1024, [
    "Email attachments for multi-page scans",
    "Tender and business document portals",
    "Messaging apps with file limits",
  ]),
  {
    slug: "merge-pdf",
    category: "pdf",
    name: "Merge PDF",
    h1: "Merge PDF Files",
    title: "Merge PDF – Combine PDF Files into One Online Free",
    updated: "2026-10-25",
    metaDescription:
      "Merge PDF files online free. Combine multiple PDFs into one file in any order without losing quality. No signup, no watermark, files stay private.",
    short: "Combine several PDFs into one file.",
    intro:
      "Combine two or more PDF files into a single document. Arrange the files in the order you want, then merge and download.",
    widget: { type: "pdf", action: "merge" },
    popular: true,
    howTo: [
      "Add two or more PDF files.",
      "Use the up and down arrows to set the order.",
      "Press “Merge PDF” and download the combined file.",
    ],
    sections: [
      {
        heading: "Common reasons to merge PDFs",
        list: [
          "Submit several certificates or documents as one upload.",
          "Combine scanned pages that were saved as separate files.",
          "Join an invoice and its supporting receipts.",
        ],
      },
      {
        heading: "Quality is preserved",
        paragraphs: [
          "Merging copies the original pages exactly. Text stays selectable and images are not recompressed, so the merged file looks identical to the originals.",
        ],
      },
    ],
    faqs: [
      { q: "How many PDFs can I merge?", a: "There is no fixed limit. Very large merges depend on your device’s memory." },
      { q: "Can I merge images and PDFs together?", a: "Convert images with JPG to PDF first, then merge the resulting PDF with your other files." },
      { q: "Will links and bookmarks be kept?", a: "Page content is copied exactly. Document-level bookmarks are not combined." },
    ],
    related: ["split-pdf", "jpg-to-pdf", "pdf-compressor", "pdf-tools"],
    keywords: ["merge", "combine", "join", "pdf"],
  },
  {
    slug: "split-pdf",
    category: "pdf",
    name: "Split PDF",
    h1: "Split PDF",
    title: "Split PDF – Separate PDF Pages Online Free",
    metaDescription:
      "Split a PDF into separate pages or custom page ranges. Download each part or a ZIP. Free and processed in your browser.",
    short: "Separate a PDF into single pages or ranges.",
    intro: "Split a PDF into one file per page, or into custom ranges such as 1-3, 4-6. Download parts individually or as a ZIP.",
    widget: { type: "pdf", action: "split" },
    popular: false,
    howTo: [
      "Add your PDF.",
      "Choose “Every page” or “Custom ranges” and enter ranges like 1-3, 5, 8-10.",
      "Press “Split PDF” and download the files.",
    ],
    sections: [
      {
        heading: "Split by ranges",
        paragraphs: [
          "Each range becomes its own PDF. For example, “1-2, 3-5” creates two files: one with pages 1 and 2, another with pages 3 to 5. To keep only some pages in a single file, use Extract Pages in the PDF Toolkit.",
        ],
      },
    ],
    faqs: [
      { q: "Does splitting reduce quality?", a: "No. Pages are copied exactly, with no recompression." },
      { q: "Can I split a scanned PDF?", a: "Yes. Any unencrypted PDF can be split." },
    ],
    related: ["merge-pdf", "pdf-compressor", "pdf-to-jpg", "pdf-tools"],
    keywords: ["split", "separate", "pages", "pdf", "extract"],
  },
  {
    slug: "jpg-to-pdf",
    category: "pdf",
    name: "JPG to PDF",
    h1: "JPG to PDF Converter",
    title: "JPG to PDF Converter – Merge Images into One PDF Free",
    updated: "2026-10-25",
    metaDescription:
      "Convert JPG to PDF online free. Combine multiple JPG, PNG or HEIC images into one high-quality PDF in A4 or Letter size. No signup, no watermark.",
    short: "Turn photos and scans into a single PDF.",
    intro:
      "Turn photos of documents, receipts or notes into a single PDF. Add images, arrange them, choose a page size and download.",
    widget: { type: "pdf", action: "images-to-pdf" },
    popular: true,
    howTo: [
      "Add JPG, PNG, WebP or HEIC images.",
      "Arrange them in the right order.",
      "Choose a page size (fit to image, A4 or Letter) and margin.",
      "Press “Create PDF” and download.",
    ],
    sections: [
      {
        heading: "Combine multiple JPGs into one PDF",
        paragraphs: [
          "Select all your photos or scanned pages at once, put them in the right order with the arrows, and create a single PDF. This is the easiest way to send several pictures as one document or upload multi-page scans to a portal.",
        ],
      },
      {
        heading: "Page size options",
        list: [
          "Fit to image: each page has exactly the size of its image.",
          "A4 / Letter: images are scaled to fit standard paper, which is best for printing and official uploads.",
        ],
      },
      {
        heading: "Keep the PDF small",
        paragraphs: [
          "Phone photos are large. If the PDF must be under a size limit, compress it afterwards with the PDF Compressor or reduce the photos first with the Image Compressor.",
        ],
      },
    ],
    faqs: [
      { q: "How do I convert JPG to PDF in A4 size?", a: "Add your images, keep “A4” selected as the page size, choose a margin and press “Create PDF”. Each image is scaled to fit an A4 page." },
      { q: "Will my images lose quality in the PDF?", a: "No. JPG files are placed into the PDF without recompression, so the PDF keeps the original image quality." },
      { q: "Can I add PNG or HEIC images?", a: "Yes. JPG, PNG, WebP, GIF, BMP, AVIF and HEIC images are accepted." },
      { q: "Is there a limit on the number of images?", a: "No fixed limit. Many large photos may take longer on phones." },
    ],
    related: ["pdf-to-jpg", "merge-pdf", "pdf-compressor", "compress-image", "heic-to-jpg"],
    keywords: ["jpg", "image", "photo", "pdf", "convert", "png", "scan"],
  },
  {
    slug: "pdf-to-jpg",
    category: "pdf",
    name: "PDF to JPG",
    h1: "PDF to JPG Converter",
    title: "PDF to JPG Converter – High Quality, All Pages, Free",
    updated: "2026-10-25",
    metaDescription:
      "Convert PDF to JPG online free in high quality. Turn every PDF page into a JPG image at 100–220 DPI and download all pages as a ZIP. No signup.",
    short: "Save every PDF page as a JPG image.",
    intro: "Convert PDF pages to JPG images for sharing on social media, inserting into slides or uploading where PDFs are not accepted.",
    widget: { type: "pdf", action: "pdf-to-jpg" },
    popular: true,
    howTo: [
      "Add your PDF.",
      "Choose image quality: Standard (screen), High or Very high (print).",
      "Press “Convert to JPG”.",
      "Download single pages or all pages as a ZIP.",
    ],
    sections: [
      {
        heading: "Choosing the right resolution",
        paragraphs: [
          "Standard renders pages at about 100 DPI, which is enough for viewing on a phone or sharing in chat. High (150 DPI) suits presentations. Very high (200+ DPI) is best when you need to zoom in or print.",
        ],
      },
    ],
    faqs: [
      { q: "How do I convert a PDF to high-quality JPG?", a: "Choose “Very high (220 DPI)” before converting. Higher DPI gives sharper images for printing or zooming, at the cost of larger files." },
      { q: "Can I convert PDF to JPG on my phone?", a: "Yes. Open this page on Android or iPhone, choose the PDF from your files and download the JPG images." },
      { q: "Can I convert only one page?", a: "All pages are converted, and you can download only the pages you need." },
      { q: "Should I use JPG or PNG?", a: "JPG gives smaller files for scanned and photo pages. Use PDF to PNG for crisp text and diagrams." },
    ],
    related: ["jpg-to-pdf", "pdf-compressor", "split-pdf", "pdf-tools", "compress-jpg"],
    keywords: ["pdf", "jpg", "image", "convert", "png", "pages"],
  },
];
