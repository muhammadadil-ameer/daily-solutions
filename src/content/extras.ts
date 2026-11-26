import type { ContentSection, Faq } from "@/lib/types";

/**
 * Extra content for pages Google reported as thin ("Crawled – currently not indexed").
 * Merged into the tool definitions in content/index.ts: sections and FAQs are appended,
 * metaDescription (when set) replaces the original, and `updated` moves the sitemap lastmod.
 */
export interface ToolExtra {
  metaDescription?: string;
  sections?: ContentSection[];
  faqs?: Faq[];
}

export const extrasUpdated = "2026-11-26";

export const toolExtras: Record<string, ToolExtra> = {
  "avif-to-png": {
    metaDescription:
      "Convert AVIF to PNG online free and keep transparent backgrounds. Lossless PNG output for Photoshop, Canva and Word. Bulk convert with ZIP, no upload.",
    sections: [
      {
        heading: "AVIF to PNG or AVIF to JPG?",
        paragraphs: [
          "Choose PNG when the image has a transparent background (logos, stickers, product cut-outs) or when you will keep editing it, because PNG is lossless and every re-save keeps the exact same pixels.",
          "Choose JPG when the image is a photo and you just need it to open or upload somewhere – the file will be much smaller than PNG.",
        ],
      },
      {
        heading: "Where AVIF images come from",
        paragraphs: [
          "Many websites, image CDNs and newer Android phones save pictures as AVIF because it is very small. When you download such an image, older programs such as Windows Photo Viewer, older Photoshop versions, Word or many upload forms may refuse to open it.",
        ],
        list: [
          "Images saved from websites (right-click → Save image as… often gives .avif).",
          "Photos from Android phones that use AVIF as the camera format.",
          "Exports from design tools and image optimizers.",
        ],
      },
    ],
    faqs: [
      { q: "Why is the PNG so much bigger than the AVIF?", a: "AVIF is a lossy, highly compressed format, while PNG is lossless. The PNG stores every pixel exactly, so it is often 5–10 times larger. Use AVIF to JPG if file size matters more than transparency." },
      { q: "Can I open AVIF on Windows without converting?", a: "Windows 10 and 11 need the free AV1 Video Extension from the Microsoft Store to show AVIF thumbnails. Converting to PNG avoids that and works in every program." },
    ],
  },
  "compress-webp": {
    metaDescription:
      "Compress WebP images online free. Lower quality or set a target size in KB to make WebP files smaller for faster websites. No upload, keeps transparency.",
    sections: [
      {
        heading: "Recommended WebP sizes for websites",
        list: [
          "Full-width hero or banner image: under 150–200 KB.",
          "Blog or product images: under 100 KB.",
          "Thumbnails and cards: under 30–50 KB.",
          "Logos and icons: under 20 KB (or use SVG where possible).",
        ],
      },
      {
        heading: "Resize first, then compress",
        paragraphs: [
          "The biggest saving usually comes from the pixel size, not the quality setting. A 4000 px wide photo shown in a 1200 px column wastes most of its bytes. Reduce the width to the size it is displayed at (twice that for sharp retina screens), then lower the quality to 75–85%.",
        ],
      },
    ],
    faqs: [
      { q: "What quality should I use for WebP?", a: "75–85% is the usual sweet spot: the image looks the same on screen while the file is much smaller. Go lower only for thumbnails." },
      { q: "Can I compress a WebP to a specific KB size?", a: "Yes. Set a target size in KB and the tool lowers quality step by step until the file fits." },
    ],
  },
  "webp-to-png": {
    metaDescription:
      "Convert WebP to PNG online free and keep the transparent background. Lossless PNG for Canva, PowerPoint, Photoshop and Word. Bulk convert, no upload.",
    sections: [
      {
        heading: "WebP to PNG or WebP to JPG?",
        paragraphs: [
          "PNG keeps transparency and is lossless, so it is the right choice for logos, icons, stickers and screenshots. JPG has no transparency but makes much smaller files, which is better for photos you only need to share or upload.",
        ],
      },
      {
        heading: "How to save a WebP image from a website as PNG",
        list: [
          "Right-click the image and choose “Save image as…”. Most sites deliver a .webp file.",
          "Add the downloaded file above – PNG is already selected.",
          "Press “Convert” and download the PNG. For many files, use “Download All” to get a ZIP.",
        ],
      },
    ],
    faqs: [
      { q: "Does converting WebP to PNG improve quality?", a: "No. PNG keeps the WebP pixels exactly, but it can’t add detail that WebP compression removed. The benefit is compatibility and lossless editing." },
      { q: "Can I convert animated WebP to PNG?", a: "PNG output is a still image, so only the first frame of an animated WebP is saved." },
    ],
  },
  "bmp-to-jpg": {
    sections: [
      {
        heading: "Where BMP files come from",
        paragraphs: [
          "BMP (bitmap) is the original Windows image format. You still get BMP files from Microsoft Paint, older scanners, some medical and industrial devices, and screenshots saved by older software. Because BMP stores every pixel without compression, a full-HD screenshot is about 6 MB – the same image as JPG is typically 200–500 KB.",
        ],
      },
      {
        heading: "Make the JPG fit an upload limit",
        paragraphs: [
          "If a form needs the image under a size such as 100 KB or 50 KB, convert BMP to JPG here first and then use Compress Image to a target size in KB.",
        ],
      },
    ],
    faqs: [
      { q: "Does BMP to JPG lose quality?", a: "JPG is lossy, but at 90% quality the difference is not visible for photos. For screenshots with small text, choose PNG output to keep text perfectly sharp." },
    ],
  },
  "avif-to-jpg": {
    metaDescription:
      "Convert AVIF to JPG online free so images open in every app, editor and upload form. Bulk convert AVIF photos to JPG in your browser, no signup, no upload.",
    sections: [
      {
        heading: "How to convert AVIF to JPG on Windows, Mac and phone",
        list: [
          "Open this page in Chrome, Edge, Firefox or Safari on any device.",
          "Add one or more .avif files – JPG is preselected.",
          "Keep quality at 90% for photos, then press “Convert”.",
          "Download each JPG, or all of them at once as a ZIP.",
        ],
      },
      {
        heading: "AVIF vs JPG at a glance",
        list: [
          "File size: AVIF is often 30–50% smaller at similar quality.",
          "Compatibility: JPG opens everywhere; AVIF still fails in many editors, older Windows apps and upload forms.",
          "Transparency: AVIF supports it, JPG does not (transparent areas turn white).",
        ],
      },
    ],
    faqs: [
      { q: "Is converting AVIF to JPG safe?", a: "Yes. The conversion runs in your browser, so the images never leave your device." },
    ],
  },
  "avi-to-mp4": {
    sections: [
      {
        heading: "Why AVI files don’t play on phones",
        paragraphs: [
          "AVI is only a container. Inside, old AVI files often use codecs such as DivX, Xvid or MJPEG that iPhones, Android phones, smart TVs and social media apps no longer support. MP4 with H.264 video and AAC audio is the format almost every device and platform accepts.",
        ],
      },
    ],
    faqs: [
      { q: "How long does AVI to MP4 conversion take?", a: "It depends on the video length and your device, because the conversion runs on your own computer or phone. Short clips take seconds; a long video can take several minutes." },
    ],
  },
  "tiff-to-jpg": {
    sections: [
      {
        heading: "TIFF to JPG for email and online forms",
        paragraphs: [
          "Email providers often limit attachments to 20–25 MB and online forms usually accept only JPG or PNG. Converting a scanned TIFF to JPG makes it small enough to send and upload. If the form also has a KB limit, compress the JPG afterwards.",
        ],
      },
    ],
    faqs: [{ q: "Should I keep the original TIFF?", a: "Yes, if it is an archive scan or a file for printing. Keep the TIFF as your master copy and use the JPG for sharing." }],
  },
  "merge-pdf": {
    sections: [
      {
        heading: "How to merge PDF files on phone or computer",
        list: [
          "Add all the PDF files you want to combine.",
          "Use the up and down arrows to put them in order – the first file becomes the first pages.",
          "Press “Merge” and download one combined PDF.",
        ],
      },
      {
        heading: "Merged PDF too big to upload?",
        paragraphs: [
          "Merging adds the file sizes together. If the combined PDF is over an upload limit, run it through the PDF Compressor or one of the target-size tools such as Compress PDF to 200KB.",
        ],
      },
    ],
    faqs: [{ q: "Is there a watermark on the merged PDF?", a: "No. The merged file contains only your pages – no watermark, no added page." }],
  },
  "protein-calculator": {
    metaDescription:
      "Protein calculator: find how much protein you need per day in grams for your weight, activity and goal – from 0.8 g/kg (RDA) up to 2.2 g/kg for muscle gain.",
    sections: [
      {
        heading: "Protein per day: quick examples",
        list: [
          "60 kg sedentary adult: about 48 g (0.8 g/kg).",
          "70 kg person exercising 3–4 times a week: about 85–110 g (1.2–1.6 g/kg).",
          "80 kg person building muscle: about 130–175 g (1.6–2.2 g/kg).",
        ],
      },
    ],
    faqs: [
      { q: "How much protein is in common foods?", a: "Roughly: 1 egg 6 g, 100 g chicken breast 31 g, 100 g lentils (cooked) 9 g, 200 g Greek yogurt 20 g, 100 g tofu 8–15 g." },
    ],
  },
  "mp3-to-wav": {
    sections: [
      {
        heading: "When you need WAV instead of MP3",
        list: [
          "Audio and video editors that work best with uncompressed audio.",
          "Phone systems, IVR and on-hold messages that only accept WAV.",
          "Sample-based music software, DJ tools and some hardware players.",
          "Avoiding further quality loss when you will edit and re-export several times.",
        ],
      },
    ],
    faqs: [{ q: "How big is a WAV compared with MP3?", a: "About 10 MB per minute for CD-quality stereo WAV, versus 1–2.5 MB per minute for MP3." }],
  },
  "ogg-to-mp3": {
    metaDescription:
      "Convert OGG to MP3 online free, including WhatsApp and Telegram voice messages (.ogg, .opus). Play them on any phone, car or PC. Private, runs in your browser.",
    sections: [
      {
        heading: "How to save a WhatsApp voice note as MP3",
        list: [
          "Export or share the voice message from WhatsApp to your files (it is saved as .ogg or .opus).",
          "Add the file here – MP3 is preselected.",
          "Press “Convert” and download the MP3.",
        ],
      },
      {
        heading: "OGG vs MP3",
        paragraphs: [
          "OGG is an open container that usually holds Vorbis or Opus audio. Opus sounds very good at low bitrates, which is why messaging apps use it, but car stereos, older phones and many editors only understand MP3. MP3 is the most widely supported audio format.",
        ],
      },
    ],
    faqs: [{ q: "Which MP3 bitrate should I choose for voice messages?", a: "128 kbps is plenty for speech and keeps the file small. Use 192 or 320 kbps for music." }],
  },
  "png-to-webp": {
    sections: [
      {
        heading: "PNG to WebP for WordPress and Shopify",
        paragraphs: [
          "Both WordPress (since 5.8) and Shopify accept WebP uploads. Converting product photos and blog images from PNG to WebP before uploading reduces page weight and can improve Largest Contentful Paint (LCP).",
        ],
      },
    ],
    faqs: [{ q: "Is WebP supported by all browsers?", a: "Yes. All current versions of Chrome, Edge, Firefox and Safari display WebP." }],
  },
  "flac-to-mp3": {
    sections: [
      {
        heading: "FLAC vs MP3",
        list: [
          "FLAC is lossless: a perfect copy of the CD audio, roughly 25–40 MB per song.",
          "MP3 is lossy: it removes sounds most people can’t hear, roughly 8–10 MB per song at 320 kbps.",
          "Keep FLAC as your archive; use MP3 for phones, cars and portable players.",
        ],
      },
    ],
    faqs: [{ q: "Can I convert a whole album at once?", a: "Convert one track at a time; each conversion runs on your device without uploading." }],
  },
  "compress-png": {
    sections: [
      {
        heading: "Which method gives the smallest PNG?",
        list: [
          "Screenshot or graphic, must stay PNG: reduce the width (for example from 2400 px to 1200 px).",
          "Logo or sticker with transparency for a website: convert to WebP.",
          "Photo saved as PNG: convert to JPG – often 80–90% smaller.",
        ],
      },
    ],
    faqs: [{ q: "Why are PNG files so large?", a: "PNG is lossless: it never throws away detail. That is perfect for sharp graphics, but photos stored as PNG become very large." }],
  },
  "gif-to-jpg": {
    sections: [
      {
        heading: "GIF to JPG or GIF to PNG?",
        paragraphs: [
          "If the GIF has a transparent background or is a simple graphic with few colors, PNG keeps it sharp and transparent. For photo-like GIFs, JPG produces a smaller file that opens everywhere.",
        ],
      },
    ],
  },
  "wav-to-mp3": {
    metaDescription:
      "Convert WAV to MP3 online free and shrink audio files by up to 90%. Choose 128, 192 or 320 kbps and convert in your browser – no signup, no upload.",
    sections: [
      {
        heading: "Which bitrate should I choose?",
        list: [
          "Speech, podcasts and voice recordings: 128 kbps.",
          "Music for everyday listening: 192 kbps.",
          "Music where quality matters most: 320 kbps.",
        ],
      },
    ],
    faqs: [{ q: "Can I convert WAV to MP3 on iPhone or Android?", a: "Yes. Open this page in your phone’s browser, add the WAV file and download the MP3. Keep files under about 100 MB for the best speed on phones." }],
  },
  "heic-to-pdf": {
    sections: [
      {
        heading: "Scan documents with your iPhone camera",
        paragraphs: [
          "Take each page in good light, flat on a dark surface, and hold the phone parallel to the paper. Add the HEIC photos here in page order, choose A4 or Letter, and you get a clean multi-page PDF ready to email or upload.",
        ],
      },
    ],
  },
  "png-to-jpg": {
    sections: [
      {
        heading: "Convert PNG to JPG for online forms",
        paragraphs: [
          "Job portals, exam forms and visa applications often accept only JPG and set a size limit. Convert the PNG to JPG here, then use Compress Image to 50KB or 100KB if the file is still too big.",
        ],
      },
    ],
  },
  "calorie-deficit-calculator": {
    metaDescription:
      "Calorie deficit calculator: see how many calories to eat per day to lose 0.25–1 kg (0.5–2 lb) a week and the estimated date you reach your goal weight.",
    sections: [
      {
        heading: "Example",
        paragraphs: [
          "A person with a TDEE of 2,300 kcal who wants to lose 0.5 kg per week needs an average deficit of about 550 kcal per day, so a daily target of about 1,750 kcal. Losing 10 kg at that rate takes roughly 20 weeks.",
        ],
      },
    ],
  },
  "extract-pdf-pages": {
    sections: [
      {
        heading: "How to write page ranges",
        list: ["Single pages: 2, 5, 9", "A range: 3-8", "Mixed: 1, 3-5, 10"],
      },
    ],
  },
  "mov-to-mp3": {
    metaDescription:
      "Extract audio from MOV videos and save it as MP3 online free. Turn iPhone lecture, interview or song recordings into MP3 in your browser – no signup, no upload.",
    sections: [
      {
        heading: "Save an iPhone video as audio",
        list: [
          "Transfer the .mov video from your iPhone (AirDrop, Files app or cable).",
          "Add it here – MP3 is preselected.",
          "Press “Convert”; only the sound is kept, so it is quick.",
          "Download the MP3 and play it on any device.",
        ],
      },
    ],
  },
  "ideal-weight-calculator": {
    metaDescription:
      "Ideal weight calculator: find a healthy weight for your height with the Devine, Robinson, Miller and Hamwi formulas plus the healthy BMI range. Free to use.",
  },
  "mp4-to-gif": {
    metaDescription:
      "Convert MP4 to GIF online free. Turn short video clips into looping animated GIFs, choose width and frame rate, no watermark. Runs in your browser, no upload.",
    sections: [
      {
        heading: "Best settings for different uses",
        list: [
          "Chat apps and Slack: 320 or 480 px wide, 10 fps, clips under 5 seconds.",
          "Documentation and tutorials: 640 px wide, 10–15 fps.",
          "Social posts: keep it short – many platforms convert GIFs to video anyway.",
        ],
      },
    ],
  },
  "macro-calculator": {
    metaDescription:
      "Macro calculator: get daily protein, carbs and fat targets in grams for weight loss, maintenance or muscle gain, based on your TDEE. Free, metric and imperial.",
  },
  "bmr-calculator": {
    metaDescription:
      "BMR calculator: find your Basal Metabolic Rate – the calories your body burns at complete rest – with the Mifflin-St Jeor equation. Free, metric and imperial.",
  },
  "tdee-calculator": {
    metaDescription:
      "TDEE calculator: estimate your Total Daily Energy Expenditure and maintenance calories at every activity level, from sedentary to extra active. Free and simple.",
  },
};
