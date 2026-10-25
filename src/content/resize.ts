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
    title: "Image Resizer & Compressor – Resize & Reduce Size Free",
    updated: "2026-10-25",
    metaDescription:
      "Resize images by pixels or percentage and compress them to a target file size. JPG, PNG, WebP and AVIF output. Free, private, runs in your browser.",
    short: "Resize images and reduce file size in seconds.",
    intro:
      "Change image dimensions, compress to a specific file size, or both at once. See the original and new size side by side before you download. Everything runs in your browser.",
    widget: { type: "image-resize" },
    primary: true,
    howTo: [
      "Add an image (JPG, PNG, WebP, AVIF, GIF, BMP or HEIC).",
      "Choose how to resize: by width, height, both, or percentage. Or pick a preset such as 1080×1080.",
      "Choose compression: a quality level or a maximum file size in KB.",
      "Select the output format, press “Apply” and download the result.",
    ],
    sections: [
      {
        heading: "Resizing vs. compressing",
        paragraphs: [
          "Resizing changes the number of pixels, for example from 4000×3000 to 1200×900. Compressing keeps the same pixels but stores them more efficiently, which can lower quality slightly. For the smallest files, do both: resize to the size you actually need, then compress.",
          "Phone photos are often 3–6 MB. Resizing to 1600 pixels wide and saving as JPG at 80% usually brings them under 300 KB with no visible difference on screen.",
        ],
      },
      {
        heading: "Compressing to a target file size",
        paragraphs: [
          "Many forms have limits such as “maximum 200 KB”. Choose “Max file size”, enter the limit, and the tool searches for the highest quality that fits. If the limit cannot be reached at the current dimensions, it tells you so; reducing the dimensions will help.",
          "Target size works with JPG, WebP and AVIF. PNG is lossless, so its size can only be reduced by making the image smaller.",
        ],
      },
    ],
    formats: [
      { name: "Input", desc: "JPG, PNG, WebP, AVIF, GIF (first frame), BMP, TIFF, HEIC/HEIF" },
      { name: "Output", desc: "JPG, PNG, WebP, AVIF" },
      { name: "Presets", desc: "100×100, 300×300, 500×500, 1080×1080, 1200×630, 1920×1080" },
    ],
    examples: [
      "Reduce a passport photo to under 100 KB for an online application.",
      "Resize a product photo to 1080×1080 for Instagram.",
      "Create a 1200×630 image for a blog post’s social preview.",
    ],
    faqs: [
      { q: "Will resizing reduce quality?", a: "Making an image smaller keeps it sharp. Making it larger than the original adds no detail and can look blurry." },
      { q: "What does “Lock aspect ratio” do?", a: "It keeps width and height in the same proportion so the image is not stretched. Change one value and the other updates automatically." },
      { q: "Why can’t I reach my target size with PNG?", a: "PNG is lossless and has no quality setting. Choose JPG or WebP, or reduce the dimensions." },
      { q: "Are my images uploaded?", a: "No. The image is processed in your browser and never leaves your device." },
    ],
    related: ["compress-image", "reduce-image-size", "resize-image-1080x1080", "image-converter", "compress-jpg", "pdf-compressor"],
    keywords: ["resize", "compress", "shrink", "dimensions", "pixels", "kb", "size"],
  },
  {
    slug: "compress-image",
    category: "image",
    name: "Image Compressor",
    h1: "Image Compressor",
    title: "Image Compressor – Compress JPG, PNG and WebP Online Free",
    metaDescription:
      "Compress images to reduce file size without visible quality loss. Set a quality level or a max size in KB. Free, private, browser-based.",
    short: "Reduce image file size with minimal quality loss.",
    intro:
      "Make images smaller for email, websites and upload forms. Choose a quality level or a maximum file size and compare the result before downloading.",
    widget: { type: "image-resize", focus: "compress" },
    popular: true,
    howTo: [
      "Add your image.",
      "Use the quality slider, or switch to “Max file size” and enter a limit in KB.",
      "Optionally reduce the dimensions for an even smaller file.",
      "Press “Apply”, check the before/after size and download.",
    ],
    sections: [
      {
        heading: "How image compression works",
        paragraphs: [
          "Lossy formats such as JPG, WebP and AVIF remove details the eye is unlikely to notice. Lowering quality from 100% to 80% often halves the file size with little visible change. Below about 60%, blockiness and color banding become noticeable.",
          "Switching format can help too: the same photo saved as WebP or AVIF is usually smaller than as JPG.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I reduce my image size?", a: "Typical phone photos shrink by 60–90% when resized to screen size and saved at 75–85% quality." },
      { q: "Can I compress a PNG?", a: "PNG is lossless, so compression options are limited. Converting a PNG photo to JPG or WebP gives much smaller files." },
      { q: "Is there a limit on file size?", a: "Images up to 50 MB can be processed." },
    ],
    related: ["image-resizer", "compress-jpg", "compress-png", "compress-webp", "reduce-image-size", "pdf-compressor"],
    keywords: ["compress", "image", "reduce", "size", "kb", "optimize"],
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
    h1: "Reduce Image Size in KB",
    title: "Reduce Image Size in KB – Compress to 20KB, 50KB, 100KB",
    metaDescription:
      "Reduce image size in KB to meet upload limits like 20 KB, 50 KB, 100 KB or 200 KB. Free, works in your browser, no signup.",
    short: "Get any image under an exact KB limit.",
    intro:
      "Need a photo or signature under 20 KB, 50 KB or 100 KB for an online form? Enter the limit and the tool finds the best quality that fits.",
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
    related: ["compress-image", "compress-jpg", "image-resizer", "compress-pdf-to-100kb", "heic-to-jpg"],
    keywords: ["reduce", "kb", "20kb", "50kb", "100kb", "200kb", "size", "limit", "form"],
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
