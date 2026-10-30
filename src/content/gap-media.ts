import type { Tool } from "@/lib/types";

const engine =
  "Conversion runs in your browser with FFmpeg (WebAssembly), so your file is not uploaded. The first conversion downloads the converter engine (about 30 MB) once; files up to 500 MB are supported.";

/** Audio/video landing pages for queries big converter sites rank for, backed by the existing FFmpeg converter. */
export const gapMediaTools: Tool[] = [
  {
    slug: "webm-to-mp4",
    category: "media",
    name: "WebM to MP4",
    h1: "WebM to MP4 Converter",
    title: "WebM to MP4 Converter – Free Online, No Watermark",
    updated: "2026-10-27",
    metaDescription:
      "Convert WebM to MP4 online free with no watermark. Make screen recordings and browser videos play on iPhone, Windows and WhatsApp. No signup, no upload.",
    short: "Make WebM videos play everywhere as MP4.",
    intro:
      "WebM videos from screen recorders, browsers and downloads often won’t play on iPhone, in WhatsApp or in video editors. Convert WebM to MP4 (H.264 + AAC) so it plays everywhere – free, with no watermark.",
    widget: { type: "media", from: "webm", to: "mp4" },
    howTo: ["Add your .webm video.", "MP4 is preselected. Choose High, Balanced or Small file.", "Press “Convert” and download the MP4."],
    sections: [
      {
        heading: "Why convert WebM to MP4",
        paragraphs: [
          "WebM (VP8/VP9) is great for the web but poorly supported by iPhones, older Windows players, PowerPoint and many editing apps. MP4 with H.264 video is the most compatible format there is.",
        ],
      },
      {
        heading: "Quality and file size",
        list: [
          "High: visually the same as the original, larger file.",
          "Balanced: recommended for sharing and uploading.",
          "Small file: smallest size for messaging apps.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Is there a watermark or time limit?", a: "No watermark and no time limit. Files up to 500 MB are supported." },
      { q: "Can I convert WebM to MP4 on iPhone?", a: "Yes, in Safari on iOS. Long videos are faster to convert on a computer." },
      { q: "Can I extract only the audio?", a: "Yes. Choose MP3 as the output format to get the sound only." },
    ],
    related: ["mkv-to-mp4", "avi-to-mp4", "mov-to-mp4", "mp4-to-gif", "media-converter"],
    keywords: ["webm", "mp4", "video", "convert", "screen recording"],
  },
  {
    slug: "mkv-to-mp4",
    category: "media",
    name: "MKV to MP4",
    h1: "MKV to MP4 Converter",
    title: "MKV to MP4 Converter – Free Online, No Upload",
    updated: "2026-10-27",
    metaDescription:
      "Convert MKV to MP4 online free. Make MKV videos play on TVs, phones and editors as standard MP4. Files up to 500 MB, no signup, no upload, no watermark.",
    short: "Convert MKV videos to compatible MP4.",
    intro:
      "MKV is a flexible container, but many TVs, phones and editing apps can’t play it. Convert MKV to MP4 (H.264 + AAC) right in your browser – no software download, no watermark.",
    widget: { type: "media", from: "mkv", to: "mp4" },
    howTo: ["Add your .mkv file.", "MP4 is preselected. Pick a quality.", "Press “Convert” and download the MP4."],
    sections: [
      {
        heading: "MKV vs MP4",
        paragraphs: [
          "Both are containers. MKV can hold many audio and subtitle tracks, while MP4 is supported by practically every device and platform. Converting re-encodes the main video and audio track into the most compatible MP4 format.",
        ],
      },
      {
        heading: "Large MKV files",
        paragraphs: [
          "Because conversion runs on your own device, very long movies take time. Files up to 500 MB are supported; for bigger files, desktop software such as HandBrake or FFmpeg is a better fit.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Are subtitles kept?", a: "Only the main video and audio tracks are converted. Embedded subtitle tracks are not carried over." },
      { q: "Is MKV to MP4 free here?", a: "Yes, completely free with no watermark and no signup." },
      { q: "How long does it take?", a: "Roughly as long as the video plays, often longer on phones. Choose “Small file” for faster results." },
    ],
    related: ["webm-to-mp4", "avi-to-mp4", "mov-to-mp4", "video-to-mp3", "media-converter"],
    keywords: ["mkv", "mp4", "video", "convert", "movie"],
  },
  {
    slug: "avi-to-mp4",
    category: "media",
    name: "AVI to MP4",
    h1: "AVI to MP4 Converter",
    title: "AVI to MP4 Converter – Free Online Video Converter",
    updated: "2026-10-27",
    metaDescription:
      "Convert AVI to MP4 online free. Turn old AVI videos from cameras and PCs into modern MP4 that plays on phones, TVs and YouTube. No signup, no upload.",
    short: "Turn old AVI videos into modern MP4.",
    intro:
      "AVI is an old Windows video format that phones and many platforms don’t handle well. Convert AVI to MP4 to play it anywhere and to make the file smaller – free and private, in your browser.",
    widget: { type: "media", from: "avi", to: "mp4" },
    howTo: ["Add your .avi video.", "MP4 is preselected. Choose a quality.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Smaller files with MP4",
        paragraphs: [
          "Old AVI files often use outdated codecs and are large. Converting to MP4 with H.264 usually makes them noticeably smaller at the same visual quality, which helps when uploading or sharing.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Will my AVI lose quality?", a: "Choose “High” to keep the video visually the same as the original." },
      { q: "Can I upload the MP4 to YouTube?", a: "Yes. MP4 with H.264 and AAC is YouTube’s recommended format." },
    ],
    related: ["mkv-to-mp4", "webm-to-mp4", "mov-to-mp4", "media-converter"],
    keywords: ["avi", "mp4", "video", "convert"],
  },
  {
    slug: "mp3-to-wav",
    category: "media",
    name: "MP3 to WAV",
    h1: "MP3 to WAV Converter",
    title: "MP3 to WAV Converter – Free Online, High Quality",
    updated: "2026-10-27",
    metaDescription:
      "Convert MP3 to WAV online free. Get uncompressed 16-bit WAV for editing, DJ software, Audacity or devices that need WAV. No signup, no upload.",
    short: "Convert MP3 to uncompressed WAV.",
    intro:
      "Convert MP3 to uncompressed WAV for audio editors, DJ and music software, phone systems or any device that only accepts WAV. The conversion keeps the original sample rate and runs in your browser.",
    widget: { type: "media", from: "mp3", to: "wav" },
    howTo: ["Add your .mp3 file.", "WAV is preselected.", "Press “Convert” and download the WAV."],
    sections: [
      {
        heading: "Does MP3 to WAV improve quality?",
        paragraphs: [
          "No – WAV stores the decoded MP3 audio without further loss, but it can’t restore detail removed by MP3 compression. The benefit is compatibility and lossless editing: you can cut, mix and re-save a WAV without adding more compression.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Why is the WAV file so big?", a: "WAV is uncompressed – about 10 MB per minute of stereo audio. That is normal." },
      { q: "Which WAV format is created?", a: "16-bit PCM at the original sample rate, the most widely supported WAV format." },
    ],
    related: ["wav-to-mp3", "m4a-to-wav", "flac-to-mp3", "media-converter"],
    keywords: ["mp3", "wav", "audio", "convert", "uncompressed"],
  },
  {
    slug: "flac-to-mp3",
    category: "media",
    name: "FLAC to MP3",
    h1: "FLAC to MP3 Converter",
    title: "FLAC to MP3 Converter – Free Online, 320 kbps",
    updated: "2026-10-27",
    metaDescription:
      "Convert FLAC to MP3 online free at up to 320 kbps. Shrink lossless music files for phones, cars and players that don’t support FLAC. No signup, no upload.",
    short: "Shrink lossless FLAC music to MP3.",
    intro:
      "FLAC files sound great but are large and not supported by every phone, car stereo or player. Convert FLAC to MP3 at 320 kbps for near-identical sound at a fraction of the size.",
    widget: { type: "media", from: "flac", to: "mp3" },
    howTo: ["Add your .flac file.", "MP3 is preselected – choose 320 kbps for the best quality.", "Press “Convert” and download."],
    sections: [
      {
        heading: "How much smaller is MP3?",
        paragraphs: [
          "A typical FLAC album track is 25–40 MB; the same track as a 320 kbps MP3 is about 8–10 MB, and at 192 kbps about 5–6 MB. Most listeners can’t tell 320 kbps MP3 from FLAC on everyday headphones.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Which bitrate should I choose?", a: "320 kbps for music you care about, 192 kbps for everyday listening." },
      { q: "Are tags like title and artist kept?", a: "Basic metadata is usually carried over by FFmpeg, but cover art may not be." },
    ],
    related: ["wav-to-mp3", "mp3-to-wav", "m4a-to-mp3", "media-converter"],
    keywords: ["flac", "mp3", "music", "audio", "convert", "lossless"],
  },
  {
    slug: "video-to-mp3",
    category: "media",
    name: "Video to MP3",
    h1: "Video to MP3 Converter",
    title: "Video to MP3 Converter – Extract Audio from Any Video",
    updated: "2026-10-27",
    metaDescription:
      "Convert video to MP3 online free. Extract the audio from MP4, MOV, MKV, AVI or WebM videos at up to 320 kbps. No signup, no upload, works on mobile.",
    short: "Extract audio from any video as MP3.",
    intro:
      "Extract the sound from any video file – MP4, MOV, MKV, AVI or WebM – and save it as an MP3. Perfect for lectures, interviews, meetings and your own recordings.",
    widget: { type: "media", to: "mp3" },
    howTo: ["Add your video file.", "MP3 is preselected – choose 128, 192 or 320 kbps.", "Press “Convert” and download the MP3."],
    sections: [
      {
        heading: "Works with every common video format",
        paragraphs: [
          "MP4, MOV (iPhone), MKV, AVI, WebM, 3GP and more are supported. Only the audio track is processed, so extracting audio is much faster than converting video.",
        ],
      },
      {
        heading: "Use your own files",
        paragraphs: [
          "The converter works with files on your device; it does not download videos from websites. Only convert content you own or have permission to use.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Can I convert a video to MP3 on my phone?", a: "Yes. Pick the video from your gallery in Chrome or Safari and download the MP3." },
      { q: "Which bitrate is best?", a: "128 kbps for speech, 192 kbps for most music, 320 kbps for the highest MP3 quality." },
      { q: "Can I paste a link instead?", a: "No. Only files from your device are supported." },
    ],
    related: ["mp4-to-mp3", "mov-to-mp3", "m4a-to-mp3", "media-converter"],
    keywords: ["video", "mp3", "audio", "extract", "convert"],
  },
  {
    slug: "aac-to-mp3",
    category: "media",
    name: "AAC to MP3",
    h1: "AAC to MP3 Converter",
    title: "AAC to MP3 Converter – Free Online, Up to 320 kbps",
    updated: "2026-10-27",
    metaDescription:
      "Convert AAC to MP3 online free at 128, 192 or 320 kbps. Make AAC recordings and songs play in any car stereo, player or app. No signup, no upload, no app.",
    short: "Convert AAC audio to universal MP3.",
    intro:
      "AAC audio from phones, recorders and video downloads doesn’t play on every car stereo, MP3 player or editing app. Convert AAC to MP3 in your browser on Windows, Mac, Android or iPhone – no software, no account.",
    widget: { type: "media", from: "aac", to: "mp3" },
    howTo: ["Add your .aac file.", "MP3 is preselected. Choose 128, 192 or 320 kbps.", "Press “Convert” and download the MP3."],
    sections: [
      {
        heading: "AAC vs MP3: bitrate and quality",
        paragraphs: [
          "AAC is more efficient than MP3, so a 128 kbps AAC sounds roughly like a 160–192 kbps MP3. When converting, pick an MP3 bitrate at least as high as the AAC source – 192 kbps for most music, 320 kbps if you want to lose as little as possible, 128 kbps for speech.",
        ],
      },
      {
        heading: "Convert AAC to MP3 without iTunes or Audacity",
        paragraphs: [
          "Instead of installing iTunes, Apple Music settings or Audacity with extra plugins, open this page, add the file and convert. Files with the .m4a extension are usually AAC too – use the M4A to MP3 converter for those.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Does converting AAC to MP3 lose quality?", a: "A little, because both formats are lossy. At 192–320 kbps the difference is very hard to hear." },
      { q: "Can I convert AAC files in bulk?", a: "Not yet – the converter handles one file at a time." },
      { q: "Can I convert AAC to WAV instead?", a: "Yes. Choose WAV as the output format for an uncompressed file for editing." },
    ],
    related: ["m4a-to-mp3", "wav-to-mp3", "flac-to-mp3", "ogg-to-mp3", "media-converter"],
    keywords: ["aac", "mp3", "audio", "convert", "320 kbps"],
  },
  {
    slug: "mov-to-gif",
    category: "media",
    name: "MOV to GIF",
    h1: "MOV to GIF Converter",
    title: "MOV to GIF Converter – iPhone & Mac Videos to GIF",
    updated: "2026-10-27",
    metaDescription:
      "Convert MOV to GIF online free. Turn short iPhone or Mac screen recordings into high-quality looping GIFs. Pick width and frame rate. No watermark, no upload.",
    short: "Turn short MOV clips into looping GIFs.",
    intro:
      "iPhone videos and Mac screen recordings are saved as MOV. Convert a short MOV clip into an animated GIF for chats, Discord, documentation or bug reports – choose the width and frame rate, and download a looping GIF without a watermark.",
    widget: { type: "media", from: "mov", to: "gif" },
    howTo: [
      "Add a short .mov clip (a few seconds is ideal).",
      "GIF is preselected. Choose width (320, 480 or 640 px) and 10 or 15 fps.",
      "Press “Convert” and download the GIF.",
    ],
    sections: [
      {
        heading: "High-quality GIF from MOV",
        paragraphs: [
          "The converter builds an optimized 256-color palette for each GIF, which keeps colors much more accurate than a generic palette. For the sharpest result choose 640 px and 15 fps; for a smaller file choose 320–480 px and 10 fps.",
        ],
      },
      {
        heading: "Mac screen recording to GIF",
        paragraphs: [
          "Screen recordings made with Shift-Command-5 on a Mac are MOV files. Convert them here to share a quick demo in a README, chat or support ticket. GIFs have no sound, and the whole clip is converted – trim long recordings first (QuickTime: Edit → Trim) to keep the GIF small.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Can I convert MOV to GIF on iPhone?", a: "Yes, in Safari. Short clips work best on a phone." },
      { q: "Does the GIF keep a transparent background?", a: "Transparency from MOV files is not guaranteed to be kept; expect a solid background." },
      { q: "Why is my GIF so big?", a: "GIF is an old, inefficient format. Use a shorter clip, a smaller width and 10 fps to reduce the size." },
    ],
    related: ["mp4-to-gif", "mov-to-mp4", "mov-to-mp3", "media-converter"],
    keywords: ["mov", "gif", "iphone", "mac", "screen recording", "animation"],
  },
  {
    slug: "wav-to-flac",
    category: "media",
    name: "WAV to FLAC",
    h1: "WAV to FLAC Converter",
    title: "WAV to FLAC Converter – Free Online, Lossless",
    updated: "2026-10-27",
    metaDescription:
      "Convert WAV to FLAC online free with no quality loss. Shrink WAV recordings and CD rips by about 40–60% while keeping every detail. No signup, no upload.",
    short: "Shrink WAV files losslessly as FLAC.",
    intro:
      "FLAC stores exactly the same audio as WAV in a much smaller file. Convert WAV to FLAC to save space on music, CD rips and recordings without losing any quality – right in your browser.",
    widget: { type: "media", from: "wav", to: "flac" },
    howTo: ["Add your .wav file.", "FLAC is preselected.", "Press “Convert” and download the FLAC file."],
    sections: [
      {
        heading: "Is WAV to FLAC lossless?",
        paragraphs: [
          "Yes. FLAC is lossless compression: when the FLAC is played or converted back to WAV, the audio is bit-for-bit identical. Files are typically 40–60% smaller than WAV, depending on the music.",
        ],
      },
      {
        heading: "Sample rate and bit depth",
        paragraphs: [
          "The converter keeps the sample rate and channels of your WAV, so a 44.1 kHz CD-quality file stays 44.1 kHz. 16-bit and 24-bit sources are stored losslessly; some 32-bit float WAVs may be saved at 24-bit, which FLAC supports at most.",
        ],
      },
      {
        heading: "WAV or FLAC: which is better?",
        paragraphs: [
          "The sound is the same. WAV is simpler and preferred by some editing software; FLAC is smaller and supports tags like artist and album. Use FLAC for your library and WAV while you are editing.",
        ],
      },
      { heading: "How the converter works", paragraphs: [engine] },
    ],
    faqs: [
      { q: "Will WAV to FLAC reduce quality?", a: "No. FLAC is lossless, so quality stays exactly the same." },
      { q: "How much smaller will the file be?", a: "Usually 40–60% smaller than the WAV." },
      { q: "Can I convert FLAC back to WAV?", a: "Yes. Add the FLAC file and choose WAV as the output." },
    ],
    related: ["flac-to-mp3", "wav-to-mp3", "mp3-to-wav", "m4a-to-wav", "media-converter"],
    keywords: ["wav", "flac", "lossless", "audio", "convert"],
  },
];
