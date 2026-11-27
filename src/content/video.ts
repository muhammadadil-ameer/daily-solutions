import type { Tool } from "@/lib/types";

const UPDATED = "2026-11-27";

const engine =
  "Compression runs in your browser with FFmpeg (WebAssembly), so the video is never uploaded. The first run downloads the engine (about 30 MB) once, then it is cached. Videos up to 500 MB are supported.";

const sizeHelp = {
  heading: "What actually makes a video smaller",
  list: [
    "Resolution: going from 4K or 1080p down to 720p is the single biggest saving, and on a phone screen the difference is hard to see.",
    "Bitrate: fewer kilobits per second of video means a smaller file. This is what the compression level and the target size control.",
    "Length: a shorter clip is a smaller file. Trim before compressing if you only need part of the video.",
    "Audio: the audio track is re-encoded to 128 kbps AAC, which is transparent for speech and fine for most music.",
  ],
};

const privacyFaq = {
  q: "Is my video uploaded to a server?",
  a: "No. The video is compressed by your own browser and never leaves your device, which matters for family videos, client work and anything confidential.",
};

export const videoTools: Tool[] = [
  {
    slug: "compress-video",
    category: "media",
    name: "Video Compressor",
    h1: "Compress Video Online",
    title: "Compress Video Online Free – Reduce Video File Size",
    updated: UPDATED,
    metaDescription:
      "Compress video online free. Reduce MP4, MOV, AVI, WebM and MKV file size with a target size in MB or a quality level. No upload, no signup, no watermark.",
    short: "Make videos smaller for email, chat and uploads.",
    intro:
      "Make a video small enough to send or upload, without installing anything. Choose a compression level or type the exact size you need in MB, and the video is re-encoded as MP4 in your browser – it is never uploaded.",
    widget: { type: "video-compress" },
    howTo: [
      "Add your video file.",
      "Choose a compression level, or switch to “Target size” and type the limit in MB.",
      "Optionally lower the resolution – this makes the biggest difference.",
      "Press “Compress Video” and download the smaller MP4.",
    ],
    sections: [
      sizeHelp,
      {
        heading: "Common upload limits",
        paragraphs: ["If you are compressing to get past a limit, these are the ones people hit most often:"],
        list: [
          "WhatsApp: 16 MB for a video sent in a chat.",
          "Discord: 10 MB on a free account.",
          "Gmail and most email: 25 MB per message in total.",
          "Outlook: 20 MB for an attachment sent from the desktop app.",
        ],
      },
      {
        heading: "How long does compressing take?",
        paragraphs: [
          "Because your own device does the encoding, expect roughly the length of the video, and longer on a phone or for 4K footage. A 1-minute clip is usually quick; a 20-minute recording is better handled on a computer. Nothing is uploaded while it runs, and you can cancel at any point.",
        ],
      },
      { heading: "How the compressor works", paragraphs: [engine] },
    ],
    faqs: [
      privacyFaq,
      {
        q: "How do I compress a video without losing quality?",
        a: "There is always some loss when a video is re-encoded, but at the “High quality” level the difference is hard to see while the file still gets noticeably smaller. If you need a big reduction, lowering the resolution usually looks better than pushing the bitrate very low.",
      },
      {
        q: "What format do I get back?",
        a: "An MP4 with H.264 video and AAC audio. That combination plays on practically every phone, computer, TV and website.",
      },
      {
        q: "Is there a file size limit?",
        a: "Videos up to 500 MB can be opened. On phones, keep files under about 100 MB for a smooth run.",
      },
      {
        q: "Can I compress a video on my phone?",
        a: "Yes. Open this page in Chrome or Safari on Android or iPhone, pick the video and compress. Longer clips take a while, so keep the phone screen on.",
      },
    ],
    related: ["media-converter", "mov-to-mp4", "mp4-to-gif", "video-to-mp3", "mkv-to-mp4"],
    keywords: ["compress video", "video compressor", "reduce video size", "shrink video", "make video smaller"],
    popular: true,
  },

  {
    slug: "compress-video-to-10mb",
    category: "media",
    name: "Compress Video to 10MB",
    h1: "Compress Video to 10MB",
    title: "Compress Video to 10MB Online Free – For Discord",
    updated: UPDATED,
    metaDescription:
      "Compress a video to under 10MB online free – the limit for Discord on a free account. Works in your browser, no upload, no signup and no watermark.",
    short: "Get a video under the 10 MB Discord limit.",
    intro:
      "Discord rejects anything over 10 MB on a free account. Add your clip below – the target is already set to 10 MB – and the video is re-encoded in your browser to fit, without being uploaded anywhere.",
    widget: { type: "video-compress", targetMB: 10 },
    howTo: [
      "Add your video. The target size is already set to 10 MB.",
      "For a long clip, also drop the resolution to 720p or 480p.",
      "Press “Compress Video” and download the MP4.",
    ],
    sections: [
      {
        heading: "Getting a video under 10 MB",
        paragraphs: [
          "10 MB is a tight limit, so the length of the clip decides how it will look. A 30-second clip can stay at 720p and still look sharp. A five-minute video squeezed into 10 MB will look soft whatever you do – trimming it first gives a far better result than compressing harder.",
        ],
      },
      sizeHelp,
      { heading: "How the compressor works", paragraphs: [engine] },
    ],
    faqs: [
      {
        q: "Why does Discord say my file is too large?",
        a: "Free Discord accounts cap uploads at 10 MB per file. Nitro raises that limit. Compressing the video to under 10 MB is the way to send it without paying.",
      },
      {
        q: "My video still looks blurry at 10 MB. What can I do?",
        a: "Shorten the clip, or lower the resolution rather than the bitrate. Ten megabytes spread over 30 seconds looks far better than the same ten megabytes spread over five minutes.",
      },
      privacyFaq,
    ],
    related: ["compress-video", "compress-video-to-25mb", "mp4-to-gif", "media-converter", "mov-to-mp4"],
    keywords: ["compress video to 10mb", "discord video limit", "10mb video"],
  },

  {
    slug: "compress-video-to-25mb",
    category: "media",
    name: "Compress Video to 25MB",
    h1: "Compress Video to 25MB",
    title: "Compress Video to 25MB Online Free – For Email",
    updated: UPDATED,
    metaDescription:
      "Compress a video to under 25MB online free – the Gmail attachment limit. Runs in your browser, nothing is uploaded, no signup and no watermark.",
    short: "Get a video under the 25 MB email limit.",
    intro:
      "Gmail and most email providers cap attachments at 25 MB. Add your video – the target is already set to 25 MB – and it is compressed in your browser so it can be attached and sent.",
    widget: { type: "video-compress", targetMB: 25 },
    howTo: [
      "Add your video. The target size is already set to 25 MB.",
      "Lower the resolution if the clip is long.",
      "Press “Compress Video” and download the MP4 to attach.",
    ],
    sections: [
      {
        heading: "Email attachment limits",
        list: [
          "Gmail: 25 MB total per message, including every attachment.",
          "Outlook.com: 20 MB from the desktop app, 25 MB from the web.",
          "Yahoo Mail: 25 MB per message.",
          "Many company mail servers cut this to 10 MB, so check before sending something important.",
        ],
      },
      {
        heading: "When a link beats an attachment",
        paragraphs: [
          "If the video will not fit at a quality you are happy with, upload it to Google Drive, OneDrive or Dropbox and email the link instead. Gmail offers this automatically once an attachment goes over the limit, and the recipient gets the full-quality video.",
        ],
      },
      sizeHelp,
      { heading: "How the compressor works", paragraphs: [engine] },
    ],
    faqs: [
      {
        q: "Why won't my video attach to an email?",
        a: "Most providers reject a message once the attachments total more than 25 MB. Compressing the video below that limit lets it attach normally.",
      },
      {
        q: "Will a 25 MB video still look good?",
        a: "For a clip of a minute or two at 720p, yes. For anything much longer, drop the resolution or send a link to the full-quality file instead.",
      },
      privacyFaq,
    ],
    related: ["compress-video", "compress-video-to-10mb", "video-to-mp3", "media-converter", "mov-to-mp4"],
    keywords: ["compress video to 25mb", "email video attachment", "25mb video"],
  },
];
