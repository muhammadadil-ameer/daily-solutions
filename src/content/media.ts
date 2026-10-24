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
    h1: "Audio & Video Converter",
    title: "Audio & Video Converter – MP3, MP4, WAV, MOV, M4A Online",
    metaDescription:
      "Convert audio and video between MP3, WAV, M4A, AAC, OGG, FLAC, MP4, MOV, AVI, WebM, MKV and GIF. Free, no signup, runs in your browser.",
    short: "Convert popular audio and video formats quickly.",
    intro:
      "Convert audio and video files between common formats, extract audio from video, or make a GIF from a short clip. The conversion runs in your browser.",
    widget: { type: "media" },
    primary: true,
    howTo: [
      "Add an audio or video file.",
      "Choose the output format. Audio formats are available for every file; video formats only for video files.",
      "Optionally choose a quality setting.",
      "Press “Convert”, wait for the progress bar, then download.",
    ],
    sections: [engineNote],
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
    ],
    related: ["mp4-to-mp3", "m4a-to-mp3", "mov-to-mp4", "wav-to-mp3", "mp4-to-gif"],
    keywords: ["audio", "video", "convert", "mp3", "mp4", "wav", "mov", "m4a", "aac", "ogg", "flac", "webm", "mkv", "avi"],
  },
  {
    slug: "m4a-to-mp3",
    category: "media",
    name: "M4A to MP3",
    h1: "M4A to MP3 Converter",
    title: "M4A to MP3 Converter – Free Online, No Signup",
    metaDescription:
      "Convert M4A audio, such as iPhone voice memos and iTunes songs, to MP3. Choose bitrate, convert in your browser, no upload.",
    short: "Convert iPhone voice memos and M4A audio to MP3.",
    intro:
      "Convert M4A files, such as iPhone voice memos and recordings, to MP3 so they play on any device, car stereo or website.",
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
      engineNote,
    ],
    faqs: [
      { q: "Will my voice memo lose quality?", a: "At 128 kbps or higher, speech sounds the same. Converting cannot add quality that the original did not have." },
      { q: "Can I convert songs bought on iTunes?", a: "Only DRM-free files can be converted. Most iTunes purchases since 2009 are DRM-free." },
    ],
    related: ["m4a-to-wav", "wav-to-mp3", "mp4-to-mp3", "media-converter"],
    keywords: ["m4a", "mp3", "voice memo", "iphone", "audio"],
  },
  {
    slug: "m4a-to-wav",
    category: "media",
    name: "M4A to WAV",
    h1: "M4A to WAV Converter",
    title: "M4A to WAV Converter – Uncompressed Audio for Editing",
    metaDescription:
      "Convert M4A audio to uncompressed WAV for editing in Audacity, Premiere or a DAW. Free browser-based converter, no upload.",
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
      engineNote,
    ],
    faqs: [
      { q: "Does WAV improve quality?", a: "No. WAV preserves the decoded audio exactly but cannot restore detail lost in the M4A." },
      { q: "What sample rate is used?", a: "The original sample rate is kept, with 16-bit PCM encoding." },
    ],
    related: ["m4a-to-mp3", "wav-to-mp3", "media-converter"],
    keywords: ["m4a", "wav", "audio", "edit"],
  },
  {
    slug: "mov-to-mp4",
    category: "media",
    name: "MOV to MP4",
    h1: "MOV to MP4 Converter",
    title: "MOV to MP4 Converter – Convert iPhone Videos Free",
    metaDescription:
      "Convert MOV videos from iPhone or Mac to MP4 for Windows, Android and websites. Free, private, runs in your browser.",
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
      { q: "How long does it take?", a: "Roughly as long as the video plays, or longer on phones. Shorter clips finish quickly." },
      { q: "Will the video lose quality?", a: "“High” keeps quality very close to the original. “Small file” reduces size more with some quality loss." },
    ],
    related: ["mov-to-mp3", "mp4-to-gif", "mp4-to-mp3", "media-converter"],
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
    title: "MP4 to MP3 Converter – Extract Audio from Video Free",
    metaDescription:
      "Convert MP4 video to MP3 audio in your browser. Choose 128, 192 or 320 kbps. Free, private, no signup.",
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
    related: ["m4a-to-mp3", "m4a-to-wav", "mp4-to-mp3", "media-converter"],
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
