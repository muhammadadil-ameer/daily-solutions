import type { ToolExtra } from "./extras";

/**
 * Content written against the site's own Search Console queries (exported 2026-11-28,
 * 151 queries / 690 impressions over 29 days — see seo/gsc-queries-2026-11-28.tsv).
 *
 * Each addition answers the need behind a query people actually typed, in their words.
 * Nothing here is a keyword list: a page ranks because it answers the question better,
 * and the phrasing follows from answering it, not the other way round.
 *
 * Priority was impressions × distance from page 1, limited to the US-intent queries —
 * the United States is 48% of impressions and every click the site has had.
 */
export const queryExtras: Record<string, ToolExtra> = {
  // 56 impressions, position 60. "extract audio from mov" (30), "extract sound from mov" (48),
  // "mov to audio" (58), "mov file to mp3" (71), "mov a mp3" (43).
  "mov-to-mp3": {
    metaDescription:
      "Extract audio from MOV and save it as MP3. Free converter for iPhone and QuickTime recordings – runs in your browser, no upload, no signup.",
    sections: [
      {
        heading: "Extracting audio from a MOV file",
        paragraphs: [
          "A .mov file holds a video track and an audio track side by side. Pulling the sound out does not re-record anything – the audio is read from the file and written into an MP3, so a long recording finishes in seconds rather than the minutes a full video conversion would take.",
          "This is the usual way to get a lecture, interview, sermon, podcast recording or a song out of a video you shot on an iPhone or captured with QuickTime on a Mac.",
        ],
      },
      {
        heading: "Which bitrate to pick",
        list: [
          "128 kbps – speech of any kind: lectures, interviews, voice notes, meetings. Smallest file, and talking sounds no better above this.",
          "192 kbps – a safe middle for a recording that mixes speech and music, such as a performance or a church service.",
          "320 kbps – music you want to keep. It cannot add quality the MOV never had, but it will not take any away either.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I extract audio from a MOV file without software?",
        a: "Add the .mov here and the audio track is written straight into an MP3 by your own browser. Nothing is installed and nothing is uploaded, so it works the same on a Mac, a Windows PC or a phone.",
      },
      {
        q: "Does extracting the sound change the original video?",
        a: "No. Your .mov file is read, never modified. You end up with a separate MP3 alongside it.",
      },
      {
        q: "Can I convert a QuickTime recording to MP3?",
        a: "Yes – QuickTime saves as .mov, which is exactly what this tool takes. A screen recording made with QuickTime on a Mac works the same way.",
      },
    ],
  },

  // 24 impressions, 8.3% CTR, position 68. "quicktime to gif" (94.7), "convert mov to gif mac" (84),
  // "mov into gif" (76), ".mov to gif" (83).
  "mov-to-gif": {
    metaDescription:
      "Convert MOV to GIF online free. Turn an iPhone clip or a QuickTime screen recording from a Mac into an animated GIF – no upload, no signup, no watermark.",
    sections: [
      {
        heading: "Turning a QuickTime or iPhone clip into a GIF",
        paragraphs: [
          "The .mov format is what QuickTime writes on a Mac and what the iPhone camera records, so a Mac screen recording and a phone video land here the same way. Both become a GIF that plays automatically in a chat, a bug report, a README or a slide, with no player and no sound.",
          "Keep the clip short. A GIF stores every frame as its own image, so a 30-second recording can easily be larger than the video it came from. Three to six seconds is the sweet spot – trim the clip first if it runs longer.",
        ],
      },
      {
        heading: "Choosing a width and frame rate",
        list: [
          "320 px, 10 fps – chat messages and Slack. Smallest file, and the motion still reads clearly.",
          "480 px, 10 fps – the usual choice for a screen recording in a bug report or a pull request, where text has to stay legible.",
          "640 px, 15 fps – smoother motion for a demo that will be looked at closely. Expect a noticeably bigger file.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert a MOV to a GIF on a Mac?",
        a: "Open this page in any browser on the Mac and add the .mov – macOS has no built-in way to export a GIF, and this runs on the Mac itself rather than uploading the clip anywhere.",
      },
      {
        q: "Why is my GIF bigger than the original video?",
        a: "A GIF keeps every frame as a separate image and cannot compress across frames the way video does. Shorten the clip, drop the width to 320 px, or use 10 fps instead of 15 – each of those cuts the size substantially.",
      },
      {
        q: "Does the GIF keep the sound?",
        a: "No. The GIF format has no audio at all. If you need the sound, convert the clip to MP3 separately.",
      },
    ],
  },

  // 21 impressions, 9.5% CTR, position 46. "mkv to mp4 converter free" (80),
  // "mkv to mp4 converter no limit" (89), "mkv to mp4 converter online" (48).
  "mkv-to-mp4": {
    metaDescription:
      "Free MKV to MP4 converter – files up to 500 MB, no watermark, no signup, no queue. Converts in your browser, so the file is never uploaded.",
    sections: [
      {
        heading: "No upload queue, no watermark, no account",
        paragraphs: [
          "Most free MKV converters upload your file, put it in a queue, cap it at a few hundred megabytes and then ask you to pay once the file is large or the queue is long. None of that applies here: the conversion runs inside your browser, so there is no server to queue behind and no one to charge you. Files up to 500 MB open, nothing is watermarked, and no account is needed.",
          "Because your own device does the work, the time it takes depends on your computer rather than on how busy a website is – and a large file is never sent over your connection.",
        ],
      },
      {
        heading: "Why MKV often will not play",
        paragraphs: [
          "MKV is a container, not a video format. It can hold the same H.264 video that MP4 holds, along with several audio tracks and subtitle tracks. The trouble is that Safari, QuickTime, most smart TVs, the PlayStation and the Xbox simply do not open .mkv files, even when the video inside is one they could play perfectly well.",
          "Converting to MP4 moves the content into the container those devices do accept, which is why an MKV that refuses to open on a TV plays without complaint once it is an MP4.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a file size limit?",
        a: "Files up to 500 MB can be opened, and there is no limit on how many you convert – no daily cap, no queue and no paid tier. On a phone, stay under about 100 MB for a smooth run.",
      },
      {
        q: "Will the video quality drop?",
        a: "The video is re-encoded, so there is a small loss, the same as with any converter. At normal settings the difference is very hard to see on a TV or a phone.",
      },
      {
        q: "What happens to subtitles and extra audio tracks?",
        a: "The main video and audio tracks are converted. Embedded subtitle tracks and additional language tracks are not carried over, which is the usual trade when moving from MKV to MP4.",
      },
    ],
  },

  // "mp4a to wav" (71), "convert mp4a to wav" (80) — people read "MPEG-4 Audio" and write mp4a.
  "m4a-to-wav": {
    metaDescription:
      "Convert M4A to WAV online free, including files your computer shows as MP4A or MPEG-4 Audio. Uncompressed WAV for editing – works in your browser, no upload.",
    sections: [
      {
        heading: "M4A, MP4A and MPEG-4 Audio are the same file",
        paragraphs: [
          "Windows and some players describe an .m4a file as “MPEG-4 Audio”, and plenty of people reasonably write that as MP4A. It is one format under three names – an AAC audio stream in an MP4 container – and anything labelled any of the three converts here.",
          "If your file genuinely ends in .mp4 and contains video as well, use the video-to-audio tools instead; those pull the audio track out rather than converting it.",
        ],
      },
      {
        heading: "Why convert to WAV at all",
        paragraphs: [
          "WAV is uncompressed, which makes it the format audio editors, DAWs and transcription tools prefer: there is no decoding step and no generation loss while you cut, mix and re-save. The cost is size – expect roughly ten times the original, around 10 MB per minute in stereo.",
          "Converting to WAV cannot restore detail the M4A compression already discarded. What it does is stop any further quality being lost while you work on the file.",
        ],
      },
    ],
    faqs: [
      {
        q: "My file says MP4A – can I still convert it?",
        a: "Yes. MP4A, M4A and MPEG-4 Audio all describe the same thing, and all of them work here.",
      },
      {
        q: "Why is the WAV so much larger?",
        a: "WAV stores every sample uncompressed, with no compression at all. Around 10 MB per minute of stereo audio is normal, against roughly 1 MB per minute for the M4A.",
      },
    ],
  },

  // "bulk convert image to webp" (29), "bulk jpg to webp" (68), "jpg to webp bulk" (91).
  "jpg-to-webp": {
    metaDescription:
      "Bulk convert JPG to WebP online free. Drop in a whole folder of photos, convert them all at once and download a ZIP. No upload, no signup, no watermark.",
    sections: [
      {
        heading: "Converting a whole folder at once",
        paragraphs: [
          "Select or drag in as many JPGs as you like and they are all converted in one pass, then handed back as a single ZIP. There is no per-file step and no limit on how many you do in a day, which is the point when a product catalogue or a photo gallery needs moving over to WebP.",
          "Because the work happens on your own machine, a hundred photos never leave it – a real consideration for client work and for anything not yet published.",
        ],
      },
      {
        heading: "What you gain by moving a site to WebP",
        paragraphs: [
          "WebP files are typically 25–35% smaller than a JPG of the same visual quality. On an image-heavy page that is the single easiest way to improve Largest Contentful Paint, which Google measures as part of Core Web Vitals.",
          "Every current browser supports WebP, including Safari on macOS and iOS, so there is no longer a fallback to maintain for ordinary website use.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I convert images in bulk?",
        a: "Yes. Add as many JPGs as you want in one go, press convert once, and download them together as a ZIP. Nothing is capped and nothing is queued.",
      },
      {
        q: "How much smaller will the files be?",
        a: "Usually 25–35% smaller than the JPG at a similar quality, though photos with lots of fine detail save less than flat graphics do.",
      },
    ],
  },

  // "aac to mps" (38) — mps is a common typo for mp3.
  "aac-to-mp3": {
    metaDescription:
      "Convert AAC to MP3 online free so iTunes and YouTube audio plays on any old car stereo or MP3 player. No upload, no signup – runs in your browser.",
    sections: [
      {
        heading: "When AAC needs to become MP3",
        paragraphs: [
          "AAC sounds slightly better than MP3 at the same bitrate, so it is what iTunes, YouTube and most streaming services use. The problem is older hardware: car stereos, gym equipment, DJ controllers and standalone MP3 players from before roughly 2010 very often read MP3 and nothing else.",
          "Converting to MP3 trades a little quality for a format that plays essentially everywhere. For speech the difference is inaudible; for music, convert at 320 kbps to keep the loss as small as possible.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does converting AAC to MP3 lose quality?",
        a: "A little. Both formats are lossy, so re-encoding one into the other discards a small amount more. Choosing 320 kbps keeps the loss to the point where most people cannot hear it.",
      },
      {
        q: "Will the track name and artist survive?",
        a: "Basic tags carry over where the source file has them. Album artwork may not, so check in your player if the cover matters to you.",
      },
    ],
  },

  // 173 impressions but position 79. "compress to exact size" (29), "jpg to kb" (75), "kb to jpg" (19).
  "compress-jpg": {
    metaDescription:
      "Compress JPG online free and hit an exact size in KB. Type the target, download the result – nothing is uploaded, it all runs in your browser.",
    sections: [
      {
        heading: "Compressing to an exact size in KB",
        paragraphs: [
          "Upload forms rarely ask for “a smaller photo” – they ask for a file under a specific number of kilobytes. Type that number in and the quality is adjusted until the result lands underneath it, instead of leaving you to guess at a quality slider and check the file size afterwards.",
          "If a target is very small for the dimensions of the photo, reducing the width as well as the quality gives a much better-looking result than compression alone. A 4000-pixel-wide photo squeezed into 50 KB will look poor; the same photo resized to 1000 pixels first will not.",
        ],
      },
      {
        heading: "How small can you go before it shows",
        list: [
          "Down to about 60% of the original: no visible difference on screen for an ordinary photo.",
          "Around 200–300 KB for a full-screen photo: still looks clean on a phone and on most laptops.",
          "Under 100 KB: soft edges and blotchy patches start to appear in skies and flat backgrounds.",
          "Under 50 KB: acceptable for a document or form photo, visibly compressed for anything else.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I compress a JPG to an exact file size?",
        a: "Yes. Enter the size you need in KB and the compression is adjusted to land under it. That is usually what an upload form or an application portal is asking for.",
      },
      {
        q: "Are my photos uploaded anywhere?",
        a: "No. The compression runs in your browser, so the photos stay on your device – which matters for ID documents, application forms and client work.",
      },
    ],
  },

  // "converter tools - heic to webp converter" (19).
  "heic-to-webp": {
    metaDescription:
      "Convert HEIC to WebP online free. Turn iPhone photos into small, web-ready WebP files in bulk, with a ZIP download. Nothing is uploaded, no signup needed.",
    sections: [
      {
        heading: "iPhone photos straight to web-ready files",
        paragraphs: [
          "HEIC is what an iPhone saves by default and almost nothing on the web accepts it. WebP is the opposite: every browser reads it and the files are small. Going straight from one to the other skips the usual detour through JPG, which would throw away quality on the way.",
          "Add a whole camera roll export at once and the converted files come back as a single ZIP.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is WebP or JPG better for iPhone photos on a website?",
        a: "WebP, in nearly every case – roughly 25–35% smaller at the same visual quality, and supported by every current browser including Safari. Pick JPG only when something you are uploading to specifically demands it.",
      },
    ],
  },
};
