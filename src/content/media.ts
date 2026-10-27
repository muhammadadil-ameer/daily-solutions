import type { Tool } from "@/lib/types";

const engineNote = {
  heading: "How the converter works",
  paragraphs: [
    "Conversion uses FFmpeg, the widely used open-source media engine, compiled to WebAssembly so it runs inside your browser. The first time you convert, your browser downloads the engine (about 30 MB) from a public CDN; after that it is cached. Your media file itself is not uploaded.",
    "Because the work is done by your own device, long videos can take a while, especially on phones. Files up to 500 MB are supported; for best results on mobile keep files under 100 MB.",
  ],
};

export const mediaTools: Tool[] = [
  {
    slug: "media-converter",
    category: "media",
    name: "Audio & Video Converter",
    h1: "Online Video & Audio Converter",
    title: "Online Video & Audio Converter – MP4, MP3, MOV Free",
    updated: "2026-10-27",
    metaDescription:
      "Free online video converter and audio converter. Convert to MP4, MP3, WAV, MOV, WebM or GIF, or extract audio from video. No signup, no watermark, no upload.",
    short: "Convert popular audio and video formats quickly.",
    intro:
      "A free online video converter and audio converter in one: convert any video to MP4, extract the audio from a video as MP3, change audio between MP3, WAV, M4A, FLAC and OGG, or make a GIF from a short clip. Everything runs in your browser on Windows, Mac, Android or iPhone – no software download and no watermark.",
    widget: { type: "media" },
    primary: true,
    howTo: [
      "Add an audio or video file.",
      "Choose the output format. Audio formats are available for every file; video formats only for video files.",
      "Optionally choose a quality setting.",
      "Press “Convert”, wait for the progress bar, then download.",
    ],
    sections: [
      {
        heading: "Convert any video to MP4",
        paragraphs: [
          "MP4 with H.264 video is the format that plays on almost every phone, TV, laptop, WhatsApp, YouTube and video editor. The converter opens MOV, AVI, WebM, MKV, WMV, FLV, 3GP, MPEG and TS files and turns them into MP4. Choose High for the best quality, Balanced for sharing, or Small file when you need to send a video in a chat app or by email.",
        ],
      },
      {
        heading: "Audio converter: MP3, WAV, M4A, FLAC, OGG and AAC",
        paragraphs: [
          "Use it as an audio converter for songs, voice memos, podcasts and recordings. MP3 plays everywhere, WAV is best for editing, FLAC keeps full quality in a smaller file, and M4A/AAC suits Apple devices. You can also extract audio from any video: choose MP3 as the output format and only the sound is saved.",
        ],
      },
      {
        heading: "What this converter does not do",
        list: [
          "It converts files from your device – it does not download videos from links or websites.",
          "One file at a time; there is no batch mode for audio and video.",
          "It converts the whole file; trim long videos in another app first if you only need a short part (for GIFs especially).",
        ],
      },
      engineNote,
    ],
    formats: [
      { name: "MP3", desc: "Universal compressed audio. Plays on every device." },
      { name: "WAV", desc: "Uncompressed audio. Large files, best for editing." },
      { name: "M4A / AAC", desc: "Apple’s default audio format. Good quality at small sizes." },
      { name: "OGG", desc: "Open audio format used by games and some web apps." },
      { name: "FLAC", desc: "Lossless compressed audio for archiving music." },
      { name: "MP4", desc: "The most compatible video format (H.264 + AAC)." },
      { name: "MOV", desc: "Apple QuickTime video, used by iPhone cameras." },
      { name: "AVI", desc: "Older Windows video format." },
      { name: "WebM", desc: "Open web video format (VP8 + Vorbis)." },
      { name: "MKV", desc: "Flexible container for video with multiple tracks." },
      { name: "GIF", desc: "Silent looping animation for short clips." },
    ],
    faqs: [
      { q: "Is the media converter free?", a: "Yes, it is free and needs no account." },
      { q: "Are my files uploaded?", a: "No. Your file is processed in your browser. Only the FFmpeg engine itself is downloaded from a CDN the first time." },
      { q: "Why is conversion slow?", a: "Video encoding is demanding and runs on your own device. Shorter clips and lower quality settings are faster." },
      { q: "What is the maximum file size?", a: "500 MB. On phones, files under 100 MB work best." },
      { q: "Does the video converter add a watermark?", a: "No. There is no watermark and no time limit on the converted video." },
      { q: "Can I convert a video for WhatsApp?", a: "Yes. Convert it to MP4 and choose “Small file” – that gives a widely compatible H.264 video that is easier to send." },
    ],
    related: ["video-to-mp3", "mkv-to-mp4", "webm-to-mp4", "mp4-to-mp3", "m4a-to-mp3", "mov-to-mp4", "wav-to-mp3"],
    keywords: ["audio", "video", "convert", "mp3", "mp4", "wav", "mov", "m4a", "aac", "ogg", "flac", "webm", "mkv", "avi"],
  },
  {
    slug: "m4a-to-mp3",
    category: "media",
    name: "M4A to MP3",
    h1: "M4A to MP3 Converter",
    title: "M4A to MP3 Converter – Free Online, Best Quality",
    updated: "2026-10-26",
    metaDescription:
      "Convert M4A to MP3 online free. Turn iPhone voice memos, recordings and songs into MP3 at up to 320 kbps on PC, Android or iPhone. No app, no signup.",
    short: "Convert iPhone voice memos and M4A audio to MP3.",
    intro:
      "Convert M4A files, such as iPhone voice memos and recordings, to MP3 so they play on any device, car stereo or website. It works online on Windows, Mac, Android and iPhone without installing iTunes, Audacity or any app.",
    widget: { type: "media", from: "m4a", to: "mp3" },
    popular: true,
    howTo: ["Add your .m4a file.", "MP3 is preselected. Choose 128, 192 or 320 kbps.", "Press “Convert” and download the MP3."],
    sections: [
      {
        heading: "Which bitrate should I choose?",
        list: [
          "128 kbps: voice recordings, podcasts and lectures. Smallest files.",
          "192 kbps: good quality music for everyday listening.",
          "320 kbps: highest MP3 quality, for music you want to archive.",
        ],
      },
      {
        heading: "How to convert M4A to MP3 on iPhone, Windows and Mac",
        list: [
          "iPhone: in Voice Memos tap ⋯ › Share › Save to Files, then open this page in Safari and choose the M4A from Files.",
          "Windows 10/11: open this page in Chrome or Edge and pick the .m4a file; no Audacity or VLC needed.",
          "Mac: open the page in Safari or Chrome and select the file from Finder; the MP3 is saved to Downloads.",
          "Android: choose the recording from your file manager or Downloads folder.",
        ],
      },
      {
        heading: "M4A vs MP3: which is better?",
        paragraphs: [
          "At the same bitrate M4A (AAC) usually sounds slightly better than MP3, so M4A is not a worse format. MP3 is simply more compatible: older car stereos, some Android apps, website upload forms and many audio players accept only MP3. Convert when a device or site refuses your M4A.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "Is this M4A to MP3 converter free?", a: "Yes. It is free with no signup, and your audio is converted on your own device." },
      { q: "Will my voice memo lose quality?", a: "At 128 kbps or higher, speech sounds the same. Converting cannot add quality that the original did not have." },
      { q: "Can I convert songs bought on iTunes?", a: "Only DRM-free files can be converted. Most iTunes purchases since 2009 are DRM-free." },
      { q: "Can I batch convert many M4A files to MP3?", a: "The converter handles one file at a time. Each conversion takes only seconds for a voice memo, so convert them one after another." },
      { q: "How do I convert M4A to MP3 on iPhone?", a: "Save the recording to the Files app, open this page in Safari, choose the file and press “Convert”. The MP3 is saved to Files › Downloads." },
    ],
    related: ["m4a-to-wav", "wav-to-mp3", "mp4-to-mp3", "media-converter"],
    keywords: ["m4a", "mp3", "voice memo", "iphone", "audio"],
  },
  {
    slug: "m4a-to-wav",
    category: "media",
    name: "M4A to WAV",
    h1: "M4A to WAV Converter",
    title: "M4A to WAV Converter – Free Online, 16-bit PCM",
    updated: "2026-10-26",
    metaDescription:
      "Convert M4A to WAV online free. Get 16-bit PCM WAV files for Audacity, Premiere, a DAW or transcription, on Windows, Mac or iPhone. No upload, no signup.",
    short: "Convert M4A to WAV for audio editing.",
    intro: "Convert M4A to uncompressed WAV for editing in audio software, transcription services or devices that need WAV.",
    widget: { type: "media", from: "m4a", to: "wav" },
    howTo: ["Add your .m4a file.", "WAV is preselected.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Why convert to WAV?",
        paragraphs: [
          "WAV stores audio without compression, which makes editing, cutting and applying effects straightforward in any audio program. Some transcription and speech-recognition services also prefer WAV. Expect WAV files to be about 10 times larger than M4A.",
        ],
      },
      {
        heading: "M4A to WAV for Audacity, Mac and iPhone",
        paragraphs: [
          "Audacity on Windows needs the optional FFmpeg library before it can open M4A files. Converting the M4A to WAV first lets you import it straight away without installing anything. On a Mac or iPhone, open this page in Safari, pick the voice memo or song and the WAV is saved to your Downloads folder.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "Does WAV improve quality?", a: "No. WAV preserves the decoded audio exactly but cannot restore detail lost in the M4A." },
      { q: "What sample rate is used?", a: "The original sample rate is kept, with 16-bit PCM encoding." },
      { q: "Can I convert M4A to 24-bit WAV?", a: "No. The output is standard 16-bit PCM, which is CD quality and is accepted by every editor. M4A sources rarely contain more detail than 16-bit can hold." },
      { q: "Is M4A or WAV better?", a: "WAV is better for editing because it is uncompressed; M4A is better for storing and sharing because the files are about ten times smaller." },
    ],
    related: ["m4a-to-mp3", "wav-to-mp3", "media-converter"],
    keywords: ["m4a", "wav", "audio", "edit"],
  },
  {
    slug: "mov-to-mp4",
    category: "media",
    name: "MOV to MP4",
    h1: "MOV to MP4 Converter",
    title: "MOV to MP4 Converter – Free, High Quality, No Upload",
    updated: "2026-10-25",
    metaDescription:
      "Convert MOV to MP4 online free without losing quality. Change iPhone and QuickTime MOV videos to MP4 for Windows, Android and WhatsApp. No signup, no upload.",
    short: "Make iPhone MOV videos play everywhere as MP4.",
    intro: "Convert MOV videos, such as iPhone recordings and QuickTime exports, to MP4 so they play on Windows, Android and every website.",
    widget: { type: "media", from: "mov", to: "mp4" },
    popular: true,
    howTo: [
      "Add your .mov video.",
      "MP4 is preselected. Choose quality: High, Balanced or Small file.",
      "Press “Convert”. A progress bar shows the status.",
      "Download the MP4.",
    ],
    sections: [
      {
        heading: "MOV vs MP4",
        paragraphs: [
          "MOV is Apple’s QuickTime format. MP4 is the universal standard supported by every phone, browser and video platform. The converter re-encodes the video with H.264 and AAC, the most compatible combination.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "How do I convert MOV to MP4 without losing quality?", a: "Choose “High” quality. It keeps the video visually the same as the original while producing a widely compatible MP4 (H.264 + AAC)." },
      { q: "How long does it take?", a: "Roughly as long as the video plays, or longer on phones. Shorter clips finish quickly." },
      { q: "Will the video lose quality?", a: "“High” keeps quality very close to the original. “Small file” reduces size more with some quality loss." },
    ],
    related: ["webm-to-mp4", "mkv-to-mp4", "mov-to-mp3", "mp4-to-gif", "mp4-to-mp3", "media-converter"],
    keywords: ["mov", "mp4", "iphone", "video", "quicktime"],
  },
  {
    slug: "mov-to-mp3",
    category: "media",
    name: "MOV to MP3",
    h1: "MOV to MP3 Converter",
    title: "MOV to MP3 – Extract Audio from MOV Video",
    metaDescription:
      "Extract the audio track from a MOV video and save it as MP3. Free, works in your browser, no signup.",
    short: "Extract the audio from a MOV video as MP3.",
    intro: "Extract the sound from a MOV video, such as an iPhone recording of a lecture or a song, and save it as an MP3 file.",
    widget: { type: "media", from: "mov", to: "mp3" },
    howTo: ["Add your .mov video.", "MP3 is preselected. Choose a bitrate.", "Press “Convert” and download the MP3."],
    sections: [
      {
        heading: "Faster than video conversion",
        paragraphs: [
          "Extracting audio is much faster than converting video, because only the audio track is processed. This is handy for saving recorded lectures, interviews or performances as audio you can listen to anywhere.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "Is the video kept?", a: "No, only the audio is saved in the MP3 file. Your original MOV file is unchanged." },
      { q: "Which bitrate is best for speech?", a: "128 kbps is plenty for speech." },
    ],
    related: ["mp4-to-mp3", "mov-to-mp4", "m4a-to-mp3", "media-converter"],
    keywords: ["mov", "mp3", "extract audio", "video"],
  },
  {
    slug: "mp4-to-mp3",
    category: "media",
    name: "MP4 to MP3",
    h1: "MP4 to MP3 Converter",
    title: "MP4 to MP3 Converter – Free Online, High Quality 320kbps",
    updated: "2026-10-25",
    metaDescription:
      "Convert MP4 to MP3 online free. Extract audio from video in high quality (128, 192 or 320 kbps) on PC, Android or iPhone. No app, no signup, no upload.",
    short: "Extract audio from MP4 videos as MP3.",
    intro: "Extract audio from an MP4 video and save it as MP3. Useful for recorded lectures, podcasts, meetings and your own videos.",
    widget: { type: "media", from: "mp4", to: "mp3" },
    popular: false,
    howTo: ["Add your .mp4 video.", "MP3 is preselected. Choose the bitrate.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Use your own content",
        paragraphs: [
          "Only convert videos you own or have permission to use. This tool works with files on your device; it does not download videos from websites.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "How do I convert MP4 to MP3 in the best quality?", a: "Choose 320 kbps before converting. That is the highest MP3 quality; 192 kbps is enough for most music and 128 kbps for speech." },
      { q: "Can I convert MP4 to MP3 on Android or iPhone?", a: "Yes. Open this page in your phone’s browser, pick the video from your gallery and download the MP3. No app is needed." },
      { q: "Can I paste a YouTube link?", a: "No. The converter only works with files on your device." },
      { q: "How big will the MP3 be?", a: "About 1 MB per minute at 128 kbps, or 2.4 MB per minute at 320 kbps." },
    ],
    related: ["mov-to-mp3", "mp4-to-gif", "m4a-to-mp3", "media-converter"],
    keywords: ["mp4", "mp3", "extract audio", "video to audio"],
  },
  {
    slug: "mp4-to-gif",
    category: "media",
    name: "MP4 to GIF",
    h1: "MP4 to GIF Converter",
    title: "MP4 to GIF Converter – Make GIFs from Video Free",
    metaDescription:
      "Turn a short MP4 clip into an animated GIF. Choose frame rate and width. Free, in-browser, no watermark.",
    short: "Turn a short video clip into an animated GIF.",
    intro: "Turn a short MP4 clip into a looping GIF for chats, documentation or social posts. Choose the width and frame rate to control file size.",
    widget: { type: "media", from: "mp4", to: "gif" },
    howTo: [
      "Add a short MP4 clip (a few seconds is ideal).",
      "GIF is preselected. Choose width and frame rate.",
      "Press “Convert” and download the GIF.",
    ],
    sections: [
      {
        heading: "Keep GIFs small",
        paragraphs: [
          "GIF is an old, inefficient format. A 10-second clip at 480 pixels and 10 fps is often 2–5 MB. Use shorter clips, smaller widths and lower frame rates for smaller files. The converter builds an optimized color palette for each GIF to keep colors accurate.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "Is there a watermark?", a: "No." },
      { q: "Does the GIF have sound?", a: "No. GIF does not support audio." },
    ],
    related: ["mov-to-mp4", "mp4-to-mp3", "image-converter", "media-converter"],
    keywords: ["mp4", "gif", "animation", "video"],
  },
  {
    slug: "wav-to-mp3",
    category: "media",
    name: "WAV to MP3",
    h1: "WAV to MP3 Converter",
    title: "WAV to MP3 Converter – Shrink Audio Files Free",
    metaDescription:
      "Convert large WAV audio files to MP3 and reduce size by up to 90%. Choose bitrate, convert in your browser, no upload.",
    short: "Shrink large WAV recordings into MP3.",
    intro: "Convert WAV recordings to MP3 to save space and make sharing easier. MP3 files are typically 80–90% smaller than WAV.",
    widget: { type: "media", from: "wav", to: "mp3" },
    howTo: ["Add your .wav file.", "MP3 is preselected. Choose the bitrate.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Size comparison",
        paragraphs: [
          "One minute of CD-quality WAV audio is about 10 MB. The same minute as a 192 kbps MP3 is about 1.4 MB. That makes MP3 better for email, messaging and uploading to websites.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "Will I hear a difference?", a: "At 192 kbps or 320 kbps most listeners cannot tell MP3 from WAV on normal speakers or headphones." },
    ],
    related: ["mp3-to-wav", "flac-to-mp3", "m4a-to-mp3", "m4a-to-wav", "mp4-to-mp3", "media-converter"],
    keywords: ["wav", "mp3", "audio", "compress"],
  },
  {
    slug: "ogg-to-mp3",
    category: "media",
    name: "OGG to MP3",
    h1: "OGG to MP3 Converter",
    title: "OGG to MP3 Converter – Free Online Audio Converter",
    metaDescription:
      "Convert OGG audio files, including WhatsApp and Telegram voice messages, to MP3. Free, private, runs in your browser.",
    short: "Convert OGG voice notes and audio to MP3.",
    intro: "Convert OGG files, such as voice notes saved from WhatsApp or Telegram, to MP3 for playback on any device.",
    widget: { type: "media", from: "ogg", to: "mp3" },
    howTo: ["Add your .ogg or .opus file.", "MP3 is preselected.", "Press “Convert” and download."],
    sections: [
      {
        heading: "Voice messages in OGG format",
        paragraphs: [
          "Messaging apps often save voice notes as OGG files with the Opus codec. Some phones, car systems and editing apps cannot play them. Converting to MP3 makes them playable everywhere.",
        ],
      },
      engineNote,
    ],
    faqs: [
      { q: "Can I convert .opus files?", a: "Yes, .opus files are accepted and converted the same way." },
    ],
    related: ["m4a-to-mp3", "wav-to-mp3", "media-converter"],
    keywords: ["ogg", "opus", "mp3", "whatsapp", "voice note"],
  },
];
