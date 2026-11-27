import type { Tool } from "@/lib/types";

const UPDATED = "2026-11-27";

const engine =
  "Trimming runs in your browser with FFmpeg (WebAssembly), so the file is never uploaded. The first run downloads the engine (about 30 MB) once, then it is cached for next time. Files up to 500 MB are supported.";

const privacyFaq = {
  q: "Is my file uploaded to a server?",
  a: "No. The cut is made by your own browser and the file never leaves your device, so interviews, client work and anything private stay with you.",
};

export const trimTools: Tool[] = [
  {
    slug: "trim-video",
    category: "media",
    name: "Video Trimmer",
    h1: "Trim Video Online",
    title: "Trim Video Online Free – Cut Video Without Losing Quality",
    updated: UPDATED,
    metaDescription:
      "Trim and cut video online free. Keep just the part you need from MP4, MOV, AVI, WebM or MKV with no re-encoding, no upload, no signup and no watermark.",
    short: "Cut a clip out of a video, losslessly.",
    intro:
      "Keep only the part of a video you actually need. Drag the start and end points, or set them from the playhead while you watch, and the clip is cut in your browser – nothing is uploaded. A fast cut copies the original video straight through, so there is no quality loss at all.",
    widget: { type: "media-trim", kind: "video" },
    howTo: [
      "Add your video file.",
      "Play it, then set the start and end points with the sliders or the “Use playhead” buttons.",
      "Leave “Fast & lossless” selected, or pick “Exact cut” if you need the clip to start on an exact frame.",
      "Press “Trim Video” and download the clip.",
    ],
    sections: [
      {
        heading: "Fast cut or exact cut – which one to use",
        paragraphs: [
          "A video is not stored as a plain list of frames. Most frames only describe what changed since the last keyframe, and a keyframe typically appears every one to ten seconds. That single fact decides which cut type you want:",
          "For a rough cut, a social clip or trimming dead air off the front of a recording, the fast cut is almost always the right answer – the exact cut is for when a frame matters.",
        ],
        list: [
          "Fast & lossless copies the original video and audio straight into a new file. It finishes in a second or two whatever the length, and the picture is bit-for-bit identical to the source – but the clip has to begin at a keyframe, so it can start up to a couple of seconds before the point you chose.",
          "Exact cut re-encodes the clip, so it begins on the precise frame you picked. It takes roughly as long as the clip you keep, not as long as the whole video, and the quality drop is slight but real.",
        ],
      },
      {
        heading: "Trim first, then compress",
        paragraphs: [
          "Length is one of the three things that decide a video's file size, alongside resolution and bitrate. If you are trying to get under an upload limit, cutting the parts you do not need is the one change that costs you nothing in quality. Trim here first, and if the clip is still too big, send it through the video compressor afterwards.",
        ],
      },
      {
        heading: "What you get back",
        paragraphs: [
          "A fast cut returns the same format you put in – an MP4 stays an MP4, a MOV stays a MOV – with the original video and audio untouched. An exact cut returns an MP4 with H.264 video and AAC audio, which plays on practically every phone, computer, TV and website.",
        ],
      },
      { heading: "How the trimmer works", paragraphs: [engine] },
    ],
    faqs: [
      privacyFaq,
      {
        q: "Does trimming reduce video quality?",
        a: "Not with the fast cut. It copies the original video stream into a new file without decoding or re-encoding it, so the frames you keep are identical to the source. The exact cut does re-encode, which loses a small amount of quality in exchange for a frame-accurate start.",
      },
      {
        q: "Why did my clip start slightly earlier than I set it?",
        a: "A lossless cut can only begin at a keyframe, and the nearest one before your start point can be a second or two earlier. Switch to “Exact cut” if you need it to begin on the exact frame.",
      },
      {
        q: "Can I cut a section out of the middle and join the rest?",
        a: "Not yet – this tool keeps one continuous span. To remove a middle section you would trim the part before it, trim the part after it, and join the two clips in a video editor.",
      },
      {
        q: "How long does it take?",
        a: "A fast cut is practically instant, however long the source video is. An exact cut takes roughly the length of the clip you are keeping, because only that part is re-encoded.",
      },
      {
        q: "Is there a file size limit?",
        a: "Files up to 500 MB can be opened. On phones, keep them under about 100 MB for a smooth run.",
      },
    ],
    related: ["compress-video", "mp3-cutter", "mp4-to-gif", "video-to-mp3", "media-converter"],
  },
  {
    slug: "mp3-cutter",
    category: "media",
    name: "MP3 Cutter",
    h1: "MP3 Cutter Online",
    title: "MP3 Cutter Online Free – Cut & Trim Audio, No Quality Loss",
    updated: UPDATED,
    metaDescription:
      "Free online MP3 cutter. Trim MP3, WAV, M4A, AAC, OGG and FLAC to the part you want with no re-encoding, no upload and no signup. Works in your browser.",
    short: "Cut MP3 and other audio without re-encoding.",
    intro:
      "Cut a song, a voice note or a podcast down to the part you need. Listen while you set the start and end points, and the audio is cut in your browser with no re-encoding at all – so the piece you keep sounds exactly like the original, and nothing is uploaded.",
    widget: { type: "media-trim", kind: "audio" },
    howTo: [
      "Add your MP3 or other audio file.",
      "Press play, then set the start and end points with the sliders or the “Use playhead” buttons.",
      "Check the length you are keeping, shown under the sliders.",
      "Press “Cut MP3” and download the trimmed file.",
    ],
    sections: [
      {
        heading: "Why cutting audio here does not lose quality",
        paragraphs: [
          "Most audio editors decode your file, cut it, then encode it again – and every re-encode of a lossy format like MP3 or AAC throws away a little more detail. This tool copies the original audio frames straight into a new file instead. An MP3 is made of frames about 26 milliseconds long, so a copied cut lands close enough to the point you picked to be inaudible, and what you keep is bit-for-bit the original.",
        ],
      },
      {
        heading: "What you can cut",
        paragraphs: [
          "The file you download keeps the format you put in, so an MP3 comes back as an MP3 at its original bitrate.",
        ],
        list: [
          "MP3 – the usual case: ringtones, samples, trimming silence off a voice memo.",
          "M4A and AAC – audio from an iPhone voice recording or an Apple Music download you own.",
          "WAV and FLAC – lossless to begin with, so the cut is lossless either way.",
          "OGG, OPUS and WMA – cut the same way, and returned in the same format.",
        ],
      },
      {
        heading: "Making a ringtone",
        paragraphs: [
          "For an iPhone ringtone, cut the section you want to 30 seconds or less – anything longer is rejected. Android is more relaxed and will take a longer clip. Set the start a beat before the hook so it does not feel abrupt, and listen back with “Play from start point” before you download.",
        ],
      },
      { heading: "How the cutter works", paragraphs: [engine] },
    ],
    faqs: [
      privacyFaq,
      {
        q: "Does cutting an MP3 reduce its quality?",
        a: "No. The audio is copied rather than re-encoded, so the part you keep is identical to the original file – same bitrate, same sound. This is the main advantage over editors that decode and re-encode.",
      },
      {
        q: "Can I cut a song to make a ringtone?",
        a: "Yes, as long as it is music you own. Keep it to 30 seconds or less for an iPhone; Android accepts longer clips. The file comes back in the same format you uploaded.",
      },
      {
        q: "Can I join two audio files together?",
        a: "Not here – this tool cuts one continuous section out of a single file. Joining files needs an audio editor.",
      },
      {
        q: "Will the cut be exactly where I set it?",
        a: "Within a few hundredths of a second. The cut has to land on an audio frame boundary – about 26 milliseconds for MP3 – which is far too small to hear.",
      },
      {
        q: "Is there a file size limit?",
        a: "Files up to 500 MB can be opened, which covers even a long lossless recording.",
      },
    ],
    related: ["trim-video", "video-to-mp3", "mp4-to-mp3", "wav-to-mp3", "media-converter"],
  },
];
