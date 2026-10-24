import type { Tool } from "@/lib/types";

const formatGuide = [
  { name: "JPG / JPEG", desc: "The most widely supported photo format. Small files, lossy compression, no transparency." },
  { name: "PNG", desc: "Lossless format with transparency. Best for screenshots, logos and graphics with sharp edges." },
  { name: "WebP", desc: "Modern web format from Google. Usually 25–35% smaller than JPG at similar quality, supports transparency." },
  { name: "AVIF", desc: "Newer format with very strong compression. Supported by current browsers, but not by every app yet." },
  { name: "HEIC / HEIF", desc: "Default photo format on iPhones and iPads. Efficient, but many websites and Windows apps cannot open it." },
  { name: "GIF", desc: "Old format limited to 256 colors. Still used for simple graphics and animations." },
  { name: "BMP", desc: "Uncompressed bitmap format. Large files; mainly used by older Windows software." },
  { name: "TIFF", desc: "High-quality format used in printing, scanning and archiving." },
];

export const imageTools: Tool[] = [
  {
    slug: "image-converter",
    category: "image",
    name: "Image Converter",
    h1: "Image Converter",
    title: "Free Image Converter – JPG, PNG, WebP, HEIC, AVIF Online",
    metaDescription:
      "Convert images between JPG, PNG, WebP, AVIF, HEIC, GIF, BMP and TIFF for free. Works in your browser, no signup, no uploads to a server.",
    short: "Convert images between JPG, PNG, WebP, HEIC and more.",
    intro:
      "Convert one or many images to JPG, PNG, WebP, AVIF, GIF, BMP or TIFF. HEIC and HEIF photos from iPhone are supported as input. Conversion runs in your browser, so your images stay on your device.",
    widget: { type: "image-convert" },
    primary: true,
    howTo: [
      "Drag and drop your images into the upload box, or tap “Choose Images”.",
      "Pick the output format from the “Convert to” list.",
      "Press “Convert” and wait a moment while your browser processes the files.",
      "Download each image, or use “Download All” to get a ZIP file.",
    ],
    sections: [
      {
        heading: "What is an image converter?",
        paragraphs: [
          "An image converter changes a picture from one file format to another, for example from HEIC to JPG or from PNG to WebP. The picture itself stays the same, but the way it is stored changes. That affects the file size, whether transparency is kept, and which apps and websites can open it.",
          "People usually need to convert images when a website rejects their upload, when a photo from an iPhone will not open on Windows, or when they want smaller images for a faster website.",
        ],
      },
      {
        heading: "How this converter handles your files",
        paragraphs: [
          "Decoding and encoding happen inside your web browser using built-in image APIs and WebAssembly libraries. Your images are not sent to our server. Large images may take a few seconds on older phones because the work is done by your own device.",
          "When converting a transparent image (PNG, WebP or AVIF) to JPG or BMP, transparent areas are filled with white because those formats cannot store transparency.",
        ],
      },
    ],
    formats: formatGuide,
    examples: [
      "Convert iPhone HEIC photos to JPG before uploading them to a job application form.",
      "Turn a PNG screenshot into WebP to reduce its size for a blog post.",
      "Convert a TIFF scan into PNG so it can be opened on any device.",
    ],
    faqs: [
      { q: "Is the image converter free?", a: "Yes. The converter is free to use and does not require an account." },
      { q: "Are my images uploaded to a server?", a: "No. Images are converted in your browser on your own device. They are not uploaded to our server." },
      { q: "Can I convert images to HEIC?", a: "HEIC and HEIF are supported as input formats only. You can convert HEIC to JPG, PNG, WebP and other formats, but browsers cannot create HEIC files." },
      { q: "Can I convert several images at once?", a: "Yes. Add multiple images, choose one output format and download them one by one or together as a ZIP file." },
      { q: "Is there a file size limit?", a: "Each image can be up to 50 MB. Very large images may be slow on phones with limited memory." },
    ],
    related: ["heic-to-jpg", "webp-to-jpg", "png-to-webp", "jpg-to-webp", "image-resizer", "compress-image"],
    keywords: ["convert", "format", "jpg", "png", "webp", "heic", "avif", "gif", "bmp", "tiff"],
    popular: false,
  },
  {
    slug: "heic-to-jpg",
    category: "image",
    name: "HEIC to JPG",
    h1: "HEIC to JPG Converter",
    title: "HEIC to JPG Converter – Convert iPhone Photos Free",
    metaDescription:
      "Convert HEIC and HEIF photos from your iPhone to JPG in seconds. Free, works in your browser, supports multiple photos and ZIP download.",
    short: "Turn iPhone HEIC photos into JPG files that open everywhere.",
    intro:
      "iPhones save photos as HEIC by default, and many websites, Windows apps and printers cannot open them. Convert HEIC or HEIF photos to standard JPG here. Photos are converted in your browser, not on a server.",
    widget: { type: "image-convert", from: "heic", to: "jpg" },
    popular: true,
    howTo: [
      "Add one or more .heic or .heif photos.",
      "JPG is already selected as the output format. Adjust the quality if you want smaller files.",
      "Press “Convert”.",
      "Download each JPG or all of them as a ZIP.",
    ],
    sections: [
      {
        heading: "Why iPhone photos are saved as HEIC",
        paragraphs: [
          "Since iOS 11, iPhones use the High Efficiency Image Format (HEIC) because it stores photos at roughly half the size of JPG with similar quality. The downside is compatibility: older versions of Windows, many web forms and some photo printing services only accept JPG or PNG.",
          "Converting to JPG gives you a file that works almost everywhere, at the cost of a somewhat larger file size.",
        ],
      },
      {
        heading: "Tips for better results",
        list: [
          "Quality 85–92% keeps photos visually identical to the original while keeping file sizes reasonable.",
          "If you only need the photo for email or messaging, try the Image Resizer afterwards to reduce the dimensions.",
          "To stop your iPhone creating HEIC files, go to Settings → Camera → Formats and choose “Most Compatible”.",
        ],
      },
    ],
    examples: [
      "Upload iPhone photos to a government or university form that only accepts JPG.",
      "Share photos with someone using an older Windows PC.",
      "Send photos to an online printing service.",
    ],
    faqs: [
      { q: "Will converting HEIC to JPG reduce quality?", a: "JPG uses lossy compression, but at the default 90% quality the difference is not visible in normal viewing." },
      { q: "Can I convert Live Photos?", a: "The converter uses the still image stored in the HEIC file. The motion part of a Live Photo is a separate video and is not included." },
      { q: "Is photo location data (EXIF) kept?", a: "No. The converted JPG does not include EXIF metadata such as GPS location, which is useful if you share photos publicly." },
      { q: "Does it work on iPhone?", a: "Yes. Open this page in Safari or Chrome on your iPhone, choose photos from your library, and download the JPG files." },
    ],
    related: ["heic-to-png", "heic-to-webp", "image-converter", "compress-jpg", "image-resizer", "webp-to-jpg"],
    keywords: ["heic", "heif", "iphone", "jpg", "jpeg", "apple", "photo"],
  },
  {
    slug: "heic-to-png",
    category: "image",
    name: "HEIC to PNG",
    h1: "HEIC to PNG Converter",
    title: "HEIC to PNG Converter – Free and Lossless",
    metaDescription:
      "Convert HEIC and HEIF images to lossless PNG files for free. Ideal for editing and screenshots. Runs in your browser with no signup.",
    short: "Convert HEIC images to lossless PNG for editing.",
    intro:
      "Convert iPhone HEIC or HEIF images to PNG when you want a lossless file for editing, design work or screenshots. PNG files are larger than JPG but keep every pixel exactly.",
    widget: { type: "image-convert", from: "heic", to: "png" },
    howTo: [
      "Add your HEIC or HEIF files.",
      "PNG is preselected as the output format.",
      "Press “Convert”.",
      "Download the PNG files individually or as a ZIP.",
    ],
    sections: [
      {
        heading: "When to choose PNG instead of JPG",
        paragraphs: [
          "PNG is lossless: saving the image again does not reduce its quality. That makes PNG a good choice when you plan to edit the picture in Photoshop, Canva or another editor, or when the image contains text, such as a screenshot of a document.",
          "For ordinary photos you plan to share, JPG is usually the better choice because PNG files can be three to five times larger.",
        ],
      },
    ],
    examples: [
      "Prepare iPhone screenshots of receipts or documents for a report.",
      "Import a photo into a design tool without adding compression artifacts.",
    ],
    faqs: [
      { q: "Why is my PNG file much larger than the HEIC?", a: "HEIC uses very efficient lossy compression, while PNG stores the image without loss. Larger files are normal. Use HEIC to JPG if size matters." },
      { q: "Does PNG keep transparency?", a: "Yes, PNG supports transparency. Most iPhone photos have no transparent areas, so the result looks the same." },
      { q: "Is there a limit on the number of files?", a: "You can add many files at once. Processing time depends on the speed of your device." },
    ],
    related: ["heic-to-jpg", "heic-to-webp", "image-converter", "compress-png", "png-to-webp"],
    keywords: ["heic", "heif", "png", "iphone", "lossless"],
  },
  {
    slug: "heic-to-webp",
    category: "image",
    name: "HEIC to WebP",
    h1: "HEIC to WebP Converter",
    title: "HEIC to WebP Converter – Small Images for the Web",
    metaDescription:
      "Convert iPhone HEIC photos to WebP for fast-loading websites. Free browser-based converter with adjustable quality and batch download.",
    short: "Convert HEIC photos to WebP for fast websites.",
    intro:
      "Turn HEIC photos straight into WebP, the compact image format recommended for websites. You keep small file sizes like HEIC, but with support in every modern browser.",
    widget: { type: "image-convert", from: "heic", to: "webp" },
    howTo: [
      "Add your HEIC photos.",
      "WebP is selected as the output format. Choose a quality between 75% and 85% for web use.",
      "Press “Convert”, then download the files or a ZIP.",
    ],
    sections: [
      {
        heading: "Why WebP is a good fit for HEIC photos",
        paragraphs: [
          "HEIC files are small but browsers such as Chrome and Firefox cannot display them. WebP is supported by all current browsers and also compresses photos well, so converting HEIC directly to WebP avoids the extra size of a JPG step.",
          "This is useful for bloggers, online shop owners and anyone uploading phone photos to a website builder that supports WebP.",
        ],
      },
    ],
    faqs: [
      { q: "Can WordPress use WebP images?", a: "Yes. WordPress has supported WebP uploads since version 5.8." },
      { q: "What quality should I use?", a: "For website photos, 75–85% usually gives a good balance between quality and size." },
      { q: "Will WebP open on my computer?", a: "Windows 10/11 and macOS can open WebP files in their default photo apps and in any modern browser." },
    ],
    related: ["heic-to-jpg", "jpg-to-webp", "png-to-webp", "compress-webp", "image-converter"],
    keywords: ["heic", "webp", "iphone", "web"],
  },
  {
    slug: "webp-to-jpg",
    category: "image",
    name: "WebP to JPG",
    h1: "WebP to JPG Converter",
    title: "WebP to JPG Converter – Free Online, No Signup",
    metaDescription:
      "Convert WebP images to JPG so they open in any app or upload form. Free, fast, works in your browser and supports batch conversion.",
    short: "Make WebP images compatible with any app or form.",
    intro:
      "Saved an image from a website and got a .webp file that will not open or upload? Convert WebP to JPG here. JPG works with almost every app, editor and upload form.",
    widget: { type: "image-convert", from: "webp", to: "jpg" },
    popular: true,
    howTo: [
      "Add one or more .webp files.",
      "JPG is preselected. Keep quality at 90% for a close match to the original.",
      "Press “Convert” and download the JPG files.",
    ],
    sections: [
      {
        heading: "Why do images download as WebP?",
        paragraphs: [
          "Many websites serve WebP because it loads faster than JPG. When you right-click and save such an image, you get a .webp file. Some older programs, social media schedulers and online forms still do not accept WebP, which is why converting to JPG is a common fix.",
        ],
      },
      {
        heading: "Transparent WebP images",
        paragraphs: [
          "JPG cannot store transparency. If your WebP has a transparent background, the converter fills it with white. If you need to keep transparency, use WebP to PNG instead.",
        ],
      },
    ],
    faqs: [
      { q: "Does converting WebP to JPG lower quality?", a: "Both formats are usually lossy, so a small amount of extra compression is added. At 90% quality the difference is hard to see." },
      { q: "Can I convert animated WebP?", a: "Only the first frame of an animated WebP is converted, because JPG cannot store animation." },
      { q: "Why is the JPG larger than the WebP?", a: "WebP compresses more efficiently than JPG, so the same image usually needs more bytes as a JPG." },
    ],
    related: ["webp-to-png", "jpg-to-webp", "png-to-webp", "image-converter", "compress-jpg", "image-resizer"],
    keywords: ["webp", "jpg", "jpeg", "convert"],
  },
  {
    slug: "webp-to-png",
    category: "image",
    name: "WebP to PNG",
    h1: "WebP to PNG Converter",
    title: "WebP to PNG Converter – Keep Transparency",
    metaDescription:
      "Convert WebP images to PNG and keep transparent backgrounds. Free browser-based converter, no signup and no server uploads.",
    short: "Convert WebP to PNG and keep transparent backgrounds.",
    intro:
      "Convert WebP images to PNG when you need a lossless file or want to keep a transparent background, for example for logos, stickers and icons.",
    widget: { type: "image-convert", from: "webp", to: "png" },
    howTo: ["Add your .webp files.", "PNG is preselected.", "Press “Convert” and download your PNG files."],
    sections: [
      {
        heading: "PNG keeps transparency",
        paragraphs: [
          "Logos and stickers saved from websites are often transparent WebP files. PNG supports the same transparency, so the converted image can be placed on any background in Canva, PowerPoint or a document editor.",
        ],
      },
    ],
    faqs: [
      { q: "Will the PNG file be larger?", a: "Usually yes, because PNG is lossless. That is the trade-off for perfect quality and broad compatibility." },
      { q: "Is the transparent background preserved?", a: "Yes. Transparent areas in the WebP stay transparent in the PNG." },
    ],
    related: ["webp-to-jpg", "png-to-webp", "image-converter", "compress-png"],
    keywords: ["webp", "png", "transparent"],
  },
  {
    slug: "png-to-webp",
    category: "image",
    name: "PNG to WebP",
    h1: "PNG to WebP Converter",
    title: "PNG to WebP Converter – Smaller Images, Same Look",
    metaDescription:
      "Convert PNG images to WebP to cut file size for your website while keeping transparency. Free, in-browser, batch conversion with ZIP.",
    short: "Shrink PNG images for the web with WebP.",
    intro:
      "Convert PNG images to WebP to make your web pages load faster. WebP supports transparency like PNG, but files are often much smaller.",
    widget: { type: "image-convert", from: "png", to: "webp" },
    popular: true,
    howTo: [
      "Add your PNG images.",
      "WebP is preselected. Use 90–100% quality for graphics with text or sharp edges.",
      "Press “Convert” and compare the new file sizes.",
      "Download the WebP files or a ZIP.",
    ],
    sections: [
      {
        heading: "How much smaller will my images be?",
        paragraphs: [
          "Results depend on the image. Photos saved as PNG often shrink by 70–90% as WebP. Flat graphics and screenshots typically shrink by 20–50%. The converter shows the before and after size so you can check the result.",
          "Smaller images help pages load faster, which improves user experience and can help Core Web Vitals scores.",
        ],
      },
    ],
    faqs: [
      { q: "Does WebP support transparency?", a: "Yes. Transparent PNG images stay transparent after conversion." },
      { q: "Should I convert every PNG to WebP?", a: "For websites, usually yes. Keep the original PNG if you need to edit the image later." },
      { q: "Which quality setting should I use?", a: "For logos and screenshots use 90–100%. For photos, 75–85% is normally enough." },
    ],
    related: ["jpg-to-webp", "webp-to-png", "compress-png", "image-converter", "image-resizer"],
    keywords: ["png", "webp", "website", "speed"],
  },
  {
    slug: "jpg-to-webp",
    category: "image",
    name: "JPG to WebP",
    h1: "JPG to WebP Converter",
    title: "JPG to WebP Converter – Faster Loading Photos",
    metaDescription:
      "Convert JPG photos to WebP and reduce file size for your website or online store. Free, runs in your browser, adjustable quality.",
    short: "Convert JPG photos to lighter WebP files.",
    intro:
      "Convert JPG or JPEG photos to WebP for a website, blog or online store. WebP photos are typically 25–35% smaller than JPG at similar visual quality.",
    widget: { type: "image-convert", from: "jpg", to: "webp" },
    popular: true,
    howTo: ["Add your JPG files.", "WebP is preselected; 80% quality works well for photos.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Why websites use WebP",
        paragraphs: [
          "Images are often the heaviest part of a web page. Serving WebP instead of JPG reduces the amount of data visitors download, which makes pages faster on mobile connections.",
          "If you run a WordPress or Shopify site, converting product photos to WebP before upload is a simple way to speed up your pages without plugins.",
        ],
      },
    ],
    faqs: [
      { q: "Is WebP supported by all browsers?", a: "Yes. All current versions of Chrome, Safari, Firefox and Edge support WebP." },
      { q: "Will my photo lose quality?", a: "At 80% quality or higher, most people cannot see a difference from the original JPG." },
      { q: "Can I also resize the photo?", a: "Use the Image Resizer & Compressor to set exact dimensions and output WebP in one step." },
    ],
    related: ["png-to-webp", "webp-to-jpg", "compress-jpg", "image-resizer", "image-converter"],
    keywords: ["jpg", "jpeg", "webp", "website"],
  },
  {
    slug: "jpg-to-png",
    category: "image",
    name: "JPG to PNG",
    h1: "JPG to PNG Converter",
    title: "JPG to PNG Converter – Free and Instant",
    metaDescription:
      "Convert JPG images to PNG for free. Lossless output, works in your browser, supports multiple files and ZIP download.",
    short: "Convert JPG images to lossless PNG.",
    intro:
      "Convert JPG or JPEG files to PNG when a website or app asks for PNG, or when you want to edit an image without adding more compression each time you save.",
    widget: { type: "image-convert", from: "jpg", to: "png" },
    howTo: ["Add your JPG images.", "PNG is preselected.", "Press “Convert” and download the PNG files."],
    sections: [
      {
        heading: "Will converting to PNG improve quality?",
        paragraphs: [
          "No. Converting a JPG to PNG does not restore detail that JPG compression already removed. What PNG does is prevent further loss: you can edit and re-save the PNG many times without it getting worse.",
          "Note that a JPG has no transparency, so the PNG will not have a transparent background either.",
        ],
      },
    ],
    faqs: [
      { q: "Why is the PNG bigger than the JPG?", a: "PNG is lossless and stores more data. That is expected." },
      { q: "Can I make the background transparent?", a: "Not with a format converter. Background removal requires a separate editing tool." },
    ],
    related: ["png-to-jpg", "jpg-to-webp", "image-converter", "compress-png"],
    keywords: ["jpg", "jpeg", "png"],
  },
  {
    slug: "png-to-jpg",
    category: "image",
    name: "PNG to JPG",
    h1: "PNG to JPG Converter",
    title: "PNG to JPG Converter – Reduce Image Size",
    metaDescription:
      "Convert PNG images to JPG to reduce file size and meet upload requirements. Free, in-browser, adjustable quality, batch download.",
    short: "Convert PNG to JPG for smaller files.",
    intro:
      "Convert PNG images to JPG when a form only accepts JPG or when you need a smaller file for email or upload. Transparent areas are filled with white.",
    widget: { type: "image-convert", from: "png", to: "jpg" },
    howTo: ["Add your PNG files.", "JPG is preselected. Lower the quality for smaller files.", "Press “Convert” and download."],
    sections: [
      {
        heading: "PNG to JPG for photos and screenshots",
        paragraphs: [
          "Photos saved as PNG are often very large. Converting them to JPG can reduce the file size by 80% or more with little visible change. Screenshots with lots of text can show slight blurring around letters as JPG; use 90%+ quality for those.",
        ],
      },
    ],
    faqs: [
      { q: "What happens to transparent backgrounds?", a: "JPG does not support transparency, so transparent areas become white." },
      { q: "Which quality setting is best?", a: "85–92% is a good default. Go lower if you must meet a strict upload size limit." },
    ],
    related: ["jpg-to-png", "png-to-webp", "compress-jpg", "image-converter", "image-resizer"],
    keywords: ["png", "jpg", "jpeg"],
  },
  {
    slug: "avif-to-jpg",
    category: "image",
    name: "AVIF to JPG",
    h1: "AVIF to JPG Converter",
    title: "AVIF to JPG Converter – Open AVIF Images Anywhere",
    metaDescription:
      "Convert AVIF images to JPG so they open in every app, editor and upload form. Free online converter that runs in your browser.",
    short: "Convert AVIF images to widely supported JPG.",
    intro:
      "AVIF is a new, highly compressed image format. Many editors and upload forms do not accept it yet. Convert AVIF to JPG for maximum compatibility.",
    widget: { type: "image-convert", from: "avif", to: "jpg" },
    howTo: ["Add your .avif files.", "JPG is preselected.", "Press “Convert” and download the result."],
    sections: [
      {
        heading: "What is AVIF?",
        paragraphs: [
          "AVIF (AV1 Image File Format) is based on the AV1 video codec. It produces smaller files than JPG and WebP, which is why some websites use it. Support outside browsers is still limited, so converting to JPG is useful when you need to edit, print or upload the image elsewhere.",
          "Your browser must be able to decode AVIF. Current versions of Chrome, Edge, Firefox and Safari (iOS 16+ / macOS 13+) can.",
        ],
      },
    ],
    faqs: [
      { q: "Why does my AVIF fail to convert?", a: "Older browsers cannot decode AVIF. Update your browser or try another one such as Chrome or Firefox." },
      { q: "Will the JPG be larger?", a: "Yes, usually. AVIF compresses more efficiently than JPG." },
    ],
    related: ["avif-to-png", "webp-to-jpg", "image-converter", "compress-jpg"],
    keywords: ["avif", "jpg", "jpeg"],
  },
  {
    slug: "avif-to-png",
    category: "image",
    name: "AVIF to PNG",
    h1: "AVIF to PNG Converter",
    title: "AVIF to PNG Converter – Lossless and Free",
    metaDescription:
      "Convert AVIF images to PNG with transparency preserved. Free browser-based converter with batch processing and ZIP download.",
    short: "Convert AVIF to PNG and keep transparency.",
    intro:
      "Convert AVIF images to PNG for editing or when you need transparency preserved. PNG works in every image editor and design tool.",
    widget: { type: "image-convert", from: "avif", to: "png" },
    howTo: ["Add your .avif files.", "PNG is preselected.", "Press “Convert” and download."],
    sections: [
      {
        heading: "AVIF to PNG for editing",
        paragraphs: [
          "Design tools and older editors often cannot import AVIF. Converting to PNG gives you a lossless file that keeps any transparent areas, so you can continue working on it without quality loss.",
        ],
      },
    ],
    faqs: [
      { q: "Is transparency kept?", a: "Yes. Transparent pixels in the AVIF remain transparent in the PNG." },
      { q: "Can I convert many AVIF files at once?", a: "Yes. Add several files and download them together as a ZIP." },
    ],
    related: ["avif-to-jpg", "webp-to-png", "image-converter", "compress-png"],
    keywords: ["avif", "png"],
  },
];
