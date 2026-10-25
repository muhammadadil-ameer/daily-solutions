import type { Tool } from "@/lib/types";

function squarePage(size: number, uses: string[], extra: string, metaUse: string): Tool {
  return {
    slug: `resize-image-${size}x${size}`,
    category: "image",
    name: `Resize Image to ${size}×${size}`,
    h1: `Resize Image to ${size}×${size} Pixels`,
    title: `Resize Image to ${size}x${size} Pixels Online – Free`,
    metaDescription: `Resize any photo to exactly ${size}x${size} pixels for ${metaUse}. Free, private and runs in your browser. JPG, PNG or WebP output.`,
    updated: "2026-10-24",
    short: `Make a ${size}×${size} square image in one step.`,
    intro: `Resize a photo to exactly ${size} × ${size} pixels. The width and height are already set; just add your image and download the result. ${extra}`,
    widget: { type: "image-resize", width: size, height: size, focus: "resize" },
    howTo: [
      "Add your image.",
      `The size is set to ${size} × ${size}. If your image is not square, choose “Crop to fill” to avoid stretching, or “Fit inside” to keep the full image.`,
      "Pick an output format and quality.",
      "Press “Apply” and download the resized image.",
    ],
    sections: [
      {
        heading: `Where ${size}×${size} images are used`,
        list: uses,
      },
      {
        heading: "Non-square photos",
        paragraphs: [
          "If the original photo is not square, forcing it into a square shape would stretch it. Turn off “Lock aspect ratio” only if you really want that. Otherwise use “Crop to fill”, which trims the edges so the center of the photo fills the square, or “Fit inside”, which keeps the whole image and adds a white or transparent border.",
        ],
      },
    ],
    faqs: [
      { q: "Will my image be stretched?", a: "Not if you use “Crop to fill” or “Fit inside”. Both keep the original proportions." },
      { q: "Which format should I download?", a: "JPG for photos, PNG for logos or images with transparency, WebP for websites." },
      { q: "Is my image uploaded?", a: "No. Resizing happens in your browser and the image stays on your device." },
    ],
    related: ["image-resizer", "resize-image-300x300", "resize-image-500x500", "resize-image-1080x1080", "compress-image", "image-converter"].filter(
      (s) => s !== `resize-image-${size}x${size}`,
    ),
    keywords: ["resize", "square", `${size}x${size}`, "pixels", "dimensions"],
  };
}

export const resizeTools: Tool[] = [
  {
    slug: "image-resizer",
    category: "image",
    name: "Image Resizer & Compressor",
    h1: "Image Resizer & Compressor",
    title: "Image Resizer – Resize Image Online Free in KB & Pixels",
    updated: "2026-10-25",
    metaDescription:
      "Free online image resizer and compressor. Resize images in pixels or percentage and reduce size in KB (20KB, 50KB, 100KB, 200KB) without losing quality.",
    short: "Resize images and reduce file size in seconds.",
    intro:
      "Resize an image online in pixels or percentage, compress it to an exact size in KB, or do both at once – free, with no signup and no watermark. Compare the original and new size before you download. Your image stays on your device because everything runs in your browser.",
    widget: { type: "image-resize" },
    primary: true,
    howTo: [
      "Add an image (JPG, JPEG, PNG, WebP, AVIF, GIF, BMP or iPhone HEIC).",
      "Choose how to resize: by width, height, width + height, or percentage – or tap a preset such as 1080×1080.",
      "Choose compression: a quality level, or “Max file size” to resize the image to a size in KB.",
      "Pick the output format, press “Apply”, check the new size and download.",
    ],
    sections: [
      {
        heading: "Resize image in KB (20KB, 50KB, 100KB, 200KB, 500KB)",
        paragraphs: [
          "Online forms for jobs, exams, visas and banks often accept photos only up to a fixed size such as 20 KB, 50 KB, 100 KB or 200 KB. Switch to “Max file size”, type the limit and press “Apply”. The image resizer searches for the highest quality that stays under your limit and shows the final size in KB.",
          "For very small limits like 20 KB or 30 KB, also reduce the width to about 300–600 pixels – a photo that is thousands of pixels wide cannot look good at 20 KB. If the limit cannot be reached, the tool tells you instead of silently failing.",
        ],
      },
      {
        heading: "Resize image in pixels or percentage",
        paragraphs: [
          "Enter an exact width and height in pixels, set only the width or height and let the other side follow automatically, or scale by percentage (for example 50%). “Lock aspect ratio” keeps the picture from being stretched.",
          "When the new shape differs from the original, choose “Crop to fill” to fill the frame from the center, “Fit inside” to keep the whole picture, or “Stretch”.",
        ],
      },
      {
        heading: "Resize photos for WhatsApp DP, Instagram and YouTube",
        list: [
          "WhatsApp DP: a square image such as 500×500 – use “Fit inside” to resize without cropping.",
          "Instagram post: 1080×1080 (square) – use “Fit inside” to post a full photo without cropping.",
          "Facebook, LinkedIn and blog link previews: 1200×630.",
          "YouTube thumbnail and HD wallpapers: 1920×1080 (or 1280×720).",
        ],
      },
      {
        heading: "Resize and compress without losing quality",
        paragraphs: [
          "Making an image smaller in pixels keeps it sharp; this resizer uses step-by-step high-quality downscaling. For compression, a quality of 80–90% is visually identical to the original for most photos while the file becomes several times smaller.",
          "Phone photos are often 3–6 MB. Resizing to 1600 pixels wide and saving as JPG at 80% usually brings them under 300 KB with no visible difference on screen. To convert MB to KB, simply set the maximum size in KB.",
        ],
      },
      {
        heading: "Works on Android, iPhone and PC",
        paragraphs: [
          "No app download is needed. Open this page in Chrome, Safari, Edge or Firefox on any phone or computer, pick a photo from your gallery or files, and download the resized image.",
        ],
      },
    ],
    formats: [
      { name: "Input", desc: "JPG, JPEG, JFIF, PNG, WebP, AVIF, GIF (first frame), BMP, TIFF, HEIC/HEIF" },
      { name: "Output", desc: "JPG, PNG, WebP, AVIF" },
      { name: "Presets", desc: "100×100, 300×300, 500×500, 1080×1080, 1200×630, 1920×1080" },
    ],
    examples: [
      "Resize a passport-size photo to under 50 KB for an exam or job application form.",
      "Reduce a 4 MB phone photo to 200 KB for email or WhatsApp.",
      "Resize a product photo to 1080×1080 for Instagram without cropping.",
      "Create a 1200×630 image for a blog post’s social preview.",
    ],
    faqs: [
      { q: "How do I resize an image to 20 KB or 50 KB?", a: "Add the image, choose “Max file size”, enter 20 or 50 and press “Apply”. For 20 KB, also set the width to around 300–500 pixels. Then download the result." },
      { q: "Can I resize an image without losing quality?", a: "Reducing pixel size keeps images sharp, and compression at 80–90% quality is not visible to the eye. Avoid enlarging images beyond their original size, which can make them blurry." },
      { q: "Is this image resizer free?", a: "Yes. It is completely free, needs no account and adds no watermark." },
      { q: "How do I resize a photo for WhatsApp DP without cropping?", a: "Choose “Width + Height”, enter 500 × 500, and select “Fit inside”. The whole photo stays visible with a border instead of being cropped." },
      { q: "What does “Lock aspect ratio” do?", a: "It keeps width and height in the same proportion so the image is not stretched. Change one value and the other updates automatically." },
      { q: "Why can’t I reach my target size with PNG?", a: "PNG is lossless and has no quality setting. Choose JPG or WebP, or reduce the dimensions." },
      { q: "Are my images uploaded?", a: "No. The image is processed in your browser and never leaves your device." },
    ],
    related: ["compress-image", "reduce-image-size", "resize-image-1080x1080", "image-converter", "compress-jpg", "pdf-compressor"],
    keywords: ["resize", "resizer", "compress", "shrink", "dimensions", "pixels", "kb", "size", "whatsapp", "instagram", "photo"],
  },
  {
    slug: "compress-image",
    category: "image",
    name: "Image Compressor",
    h1: "Image Compressor – Compress Image to KB",
    title: "Image Compressor – Compress Image to 20KB, 50KB, 100KB",
    updated: "2026-10-25",
    metaDescription:
      "Compress images online free to 20KB, 50KB, 100KB, 200KB or any size. Reduce JPG, PNG and WebP file size without losing visible quality. No signup.",
    short: "Reduce image file size with minimal quality loss.",
    intro:
      "Compress JPG, PNG and WebP images online for free. Choose a quality level, or enter an exact limit such as 20 KB, 50 KB, 100 KB or 200 KB and the image compressor finds the best quality that fits. Compare the before and after size, then download.",
    widget: { type: "image-resize", focus: "compress" },
    popular: true,
    howTo: [
      "Add your image (JPG, PNG, WebP, HEIC and more).",
      "Use the quality slider, or switch to “Max file size” and enter a limit in KB.",
      "For very small sizes, also reduce the width (for example to 500 pixels).",
      "Press “Apply”, check the before/after size and download.",
    ],
    sections: [
      {
        heading: "Compress image to a specific size in KB",
        list: [
          "Compress image to 20 KB or 25 KB: signatures and small photos for exam forms – set the width to about 300–400 px.",
          "Compress image to 50 KB: passport-size photos for job and admission portals.",
          "Compress image to 100 KB: ID cards, certificates and profile photos.",
          "Compress image to 200 KB or 500 KB: documents and full-size photos for online applications.",
          "Compress image below 1 MB or 2 MB: email attachments and website uploads.",
        ],
      },
      {
        heading: "How image compression works",
        paragraphs: [
          "Lossy formats such as JPG, WebP and AVIF remove details the eye is unlikely to notice. Lowering quality from 100% to 80% often halves the file size with little visible change. Below about 60%, blockiness and color banding become noticeable.",
          "Switching format can help too: the same photo saved as WebP or AVIF is usually smaller than as JPG. Compressing from MB to KB works best when you also reduce the pixel size to what you actually need.",
        ],
      },
      {
        heading: "Compress images for websites",
        paragraphs: [
          "Smaller images make pages load faster, which improves user experience and Core Web Vitals. For website photos, use WebP at 75–85% quality and keep large hero images under about 200 KB.",
        ],
      },
    ],
    faqs: [
      { q: "How do I compress an image to 100 KB?", a: "Add your image, choose “Max file size”, type 100 and press “Apply”. The compressor picks the highest quality under 100 KB. Download the result." },
      { q: "How much can I reduce my image size?", a: "Typical phone photos shrink by 60–90% when resized to screen size and saved at 75–85% quality." },
      { q: "Will compressing reduce image quality?", a: "Slightly, but at 75–90% quality the difference is usually not visible. Very small targets such as 20 KB need lower quality and smaller dimensions." },
      { q: "Can I compress a PNG?", a: "PNG is lossless, so compression options are limited. Converting a PNG photo to JPG or WebP gives much smaller files." },
      { q: "Is the image compressor free and safe?", a: "Yes. It is free, needs no signup, and your images are compressed in your browser without being uploaded." },
      { q: "Is there a limit on file size?", a: "Images up to 50 MB can be processed." },
    ],
    related: ["compress-image-to-20kb", "compress-image-to-50kb", "compress-image-to-100kb", "compress-image-to-200kb", "image-resizer", "reduce-image-size"],
    keywords: ["compress", "compressor", "image", "photo", "reduce", "size", "kb", "20kb", "50kb", "100kb", "200kb", "optimize"],
  },
  {
    slug: "compress-jpg",
    category: "image",
    name: "Compress JPG",
    h1: "Compress JPG",
    title: "Compress JPG – Reduce JPEG File Size Online",
    metaDescription:
      "Compress JPG and JPEG photos to a smaller file size. Pick quality or a target size in KB. Free, no signup, processed in your browser.",
    short: "Shrink JPG and JPEG photos for upload or email.",
    intro:
      "Reduce the size of JPG or JPEG photos for email attachments, online forms and websites. Output stays as JPG so it works everywhere.",
    widget: { type: "image-resize", focus: "compress", format: "jpg" },
    howTo: [
      "Add your JPG photo.",
      "Lower the quality slider, or set a maximum size in KB.",
      "Press “Apply” and download the compressed JPG.",
    ],
    sections: [
      {
        heading: "Recommended JPG quality settings",
        list: [
          "90%: near-original quality, for printing or archiving.",
          "80%: best all-round setting for websites and sharing.",
          "60–70%: small files for strict upload limits; slight artifacts may appear.",
        ],
      },
    ],
    faqs: [
      { q: "Does compressing a JPG twice reduce quality?", a: "Yes, each lossy save loses a little detail. Compress from the original file when possible." },
      { q: "Can I compress a JPG to exactly 100 KB?", a: "Set “Max file size” to 100. The tool finds the best quality that stays under that limit." },
    ],
    related: ["compress-image", "compress-png", "compress-webp", "reduce-image-size", "jpg-to-webp"],
    keywords: ["jpg", "jpeg", "compress", "reduce"],
  },
  {
    slug: "compress-png",
    category: "image",
    name: "Compress PNG",
    h1: "Compress PNG",
    title: "Compress PNG – Reduce PNG File Size Online",
    metaDescription:
      "Reduce PNG file size by resizing or converting to WebP while keeping transparency. Free online PNG compressor that runs in your browser.",
    short: "Make PNG images smaller while keeping transparency.",
    intro:
      "PNG files are lossless and can be large. Reduce their size by lowering the dimensions, or by saving as WebP, which keeps transparency at a fraction of the size.",
    widget: { type: "image-resize", focus: "compress", format: "webp" },
    howTo: [
      "Add your PNG image.",
      "WebP output is preselected because it keeps transparency and compresses well. Choose PNG if you must keep the PNG format.",
      "Reduce the dimensions if the image is larger than needed.",
      "Press “Apply” and download.",
    ],
    sections: [
      {
        heading: "Options for smaller PNG files",
        paragraphs: [
          "Because PNG is lossless, it has no quality slider. The two effective ways to shrink a PNG are reducing its pixel dimensions and converting it to a more efficient format. WebP is the best choice when transparency matters; JPG is fine for photos without transparency.",
          "If you must keep the PNG format, choose PNG as output and reduce the dimensions. The tool re-encodes the image, which can remove unused metadata.",
        ],
      },
    ],
    faqs: [
      { q: "Will WebP keep my transparent background?", a: "Yes. WebP fully supports transparency." },
      { q: "Can I keep the PNG format?", a: "Yes. Select PNG as the output format and reduce dimensions to make it smaller." },
    ],
    related: ["compress-image", "png-to-webp", "compress-jpg", "image-resizer"],
    keywords: ["png", "compress", "transparent", "reduce"],
  },
  {
    slug: "compress-webp",
    category: "image",
    name: "Compress WebP",
    h1: "Compress WebP",
    title: "Compress WebP Images Online – Free WebP Optimizer",
    metaDescription:
      "Compress WebP images further for faster websites. Adjust quality or set a target size in KB. Free and processed in your browser.",
    short: "Optimize WebP images for even faster pages.",
    intro: "Make WebP images even smaller by lowering quality or dimensions. Ideal for page speed optimization.",
    widget: { type: "image-resize", focus: "compress", format: "webp" },
    howTo: ["Add your WebP image.", "Set quality (70–80% is common for photos) or a maximum file size.", "Press “Apply” and download."],
    sections: [
      {
        heading: "When to compress WebP again",
        paragraphs: [
          "WebP images exported at 100% quality by some tools are much larger than necessary. Re-saving at 75–85% often cuts the size in half. For hero images on a website, aim for under 200 KB; for thumbnails, under 50 KB.",
        ],
      },
    ],
    faqs: [
      { q: "Is AVIF smaller than WebP?", a: "Often yes, by 20–30%. You can choose AVIF as output to compare." },
      { q: "Will transparency be kept?", a: "Yes, if you keep WebP or choose AVIF/PNG as output." },
    ],
    related: ["compress-image", "png-to-webp", "jpg-to-webp", "image-resizer"],
    keywords: ["webp", "compress", "optimize"],
  },
  {
    slug: "reduce-image-size",
    category: "image",
    name: "Reduce Image Size in KB",
    h1: "Reduce Photo Size in KB (MB to KB)",
    title: "Reduce Photo Size in KB – MB to KB Photo Size Reducer",
    updated: "2026-10-25",
    metaDescription:
      "Photo size reducer for online forms: reduce image size from MB to KB, e.g. under 20 KB, 50 KB or 100 KB for job, exam and visa applications. Free, no signup.",
    short: "Get any image under an exact KB limit.",
    intro:
      "Need a photo or signature under 20 KB, 50 KB or 100 KB for a job, exam, admission or visa form? This photo size reducer turns a large MB photo into a small KB file: enter the limit and it finds the best quality that fits.",
    widget: { type: "image-resize", focus: "compress", format: "jpg", maxKB: 100 },
    howTo: [
      "Add your photo, signature or document image.",
      "“Max file size” is selected. Enter the limit from your form, for example 50.",
      "If the limit is very small, also reduce the width (for example to 600 pixels).",
      "Press “Apply” and download the image.",
    ],
    sections: [
      {
        heading: "Common upload limits",
        list: [
          "Exam and job application photos: often 20–50 KB.",
          "Scanned signatures: often 10–30 KB.",
          "ID documents and certificates: often 100–300 KB.",
          "Email attachments: keep images under 1 MB each for easy sending.",
        ],
      },
      {
        heading: "If the size limit cannot be reached",
        paragraphs: [
          "Very small limits require smaller dimensions as well as compression. A 3000-pixel-wide photo cannot fit into 20 KB with acceptable quality, but a 400-pixel-wide version usually can. The tool tells you when the limit is not met so you can lower the width.",
        ],
      },
    ],
    faqs: [
      { q: "Can I reduce an image to 20 KB?", a: "Yes, in most cases. Enter 20 as the max size and reduce the width to around 300–500 pixels." },
      { q: "Which format gives the smallest size?", a: "AVIF and WebP are the smallest, but many forms only accept JPG. JPG is preselected for compatibility." },
      { q: "Does the form also require specific pixel dimensions?", a: "If so, set the width and height first, then the max size." },
    ],
    related: ["compress-image-to-20kb", "compress-image-to-50kb", "compress-image-to-100kb", "compress-image", "image-resizer", "compress-pdf-to-100kb"],
    keywords: ["reduce", "reducer", "photo", "kb", "mb to kb", "20kb", "50kb", "100kb", "200kb", "size", "limit", "form", "signature"],
  },
  squarePage(
    300,
    [
      "Profile pictures on forums and websites",
      "Product thumbnails in online stores",
      "App and directory listing icons",
      "Avatar images for email signatures",
    ],
    "300×300 is a common size for thumbnails and profile pictures.",
    "profile pictures and thumbnails",
  ),
  squarePage(
    500,
    ["E-commerce product images", "Blog post thumbnails", "Marketplace listing photos", "Medium-size profile photos"],
    "500×500 gives a sharp square image while keeping file size small.",
    "product photos and blog thumbnails",
  ),
  squarePage(
    1080,
    ["Instagram square posts (1080×1080 is the recommended size)", "Facebook and LinkedIn square images", "WhatsApp status images", "Square ads and carousel slides"],
    "1080×1080 is the recommended size for square Instagram posts.",
    "Instagram posts, Facebook and WhatsApp",
  ),
];
