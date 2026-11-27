import type { ToolExtra } from "./extras";

/**
 * Device-specific "how do I do this on Mac / Windows / iPhone" content and plain definitions.
 *
 * Google's AI Overview for queries like "heic to jpg" is built out of exactly these sub-questions
 * ("Convert on Mac", "Convert on Windows", "stop saving future photos as HEIC"), and competitors that
 * get cited answer them on the page. Only steps that are stable across recent OS versions are listed.
 */
export const deviceExtras: Record<string, ToolExtra> = {
  "heic-to-jpg": {
    sections: [
      {
        heading: "How to convert HEIC to JPG on a Mac",
        paragraphs: ["macOS can do this without any download, in two built-in ways:"],
        list: [
          "Finder: select the HEIC files, right-click, choose Quick Actions → Convert Image, pick JPEG and a size, then Convert.",
          "Preview: open the photo, choose File → Export, set Format to JPEG, adjust the quality slider and Save.",
        ],
      },
      {
        heading: "Stop your iPhone saving photos as HEIC",
        paragraphs: [
          "If you would rather not convert every time, change the camera format: Settings → Camera → Formats → Most Compatible. New photos are then saved as JPG. Photos already on the phone stay HEIC, so convert those here.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a HEIC file?",
        a: "HEIC is Apple's version of the HEIF format. It is the format iPhones and iPads use for photos because it stores the same picture in roughly half the space of a JPG. The trade-off is that many websites, Windows programs and older apps cannot open it.",
      },
      {
        q: "Is HEIC the same as HEIF?",
        a: "Almost. HEIF is the container format; HEIC is the name Apple uses for HEIF images encoded with HEVC. This converter accepts both .heic and .heif files.",
      },
    ],
  },

  "heic-to-png": {
    sections: [
      {
        heading: "How to convert HEIC to PNG on Mac, Windows and iPhone",
        list: [
          "Mac: select the files in Finder, right-click, choose Quick Actions → Convert Image and pick PNG. Preview also works through File → Export.",
          "Windows: install the free HEIF Image Extensions from the Microsoft Store, open the photo in Photos or Paint, then Save as → PNG.",
          "iPhone or Android: use this page in your phone's browser – there is nothing to install and the photo never leaves the device.",
        ],
      },
      {
        heading: "What is a HEIC file, and why convert it?",
        paragraphs: [
          "HEIC is the photo format Apple devices use by default. It saves space, but many editors, website upload forms and Windows programs still reject it. PNG is lossless and opens everywhere, which makes it the safer choice when you plan to edit the image or need a transparent background.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I convert HEIC to PNG or JPG?",
        a: "Choose PNG for screenshots, graphics, logos or anything you will keep editing, because PNG is lossless. Choose JPG for ordinary photos you just need to share or upload – the file will be far smaller.",
      },
    ],
  },

  "webp-to-jpg": {
    sections: [
      {
        heading: "How to convert WebP to JPG on Windows and Mac",
        list: [
          "Windows: open the .webp file in Paint, then File → Save as → JPEG picture.",
          "Mac: open it in Preview, then File → Export and set Format to JPEG.",
          "Any device: use this page – it handles several files at once and does not need an app or extension.",
        ],
      },
      {
        heading: "What is a WebP file?",
        paragraphs: [
          "WebP is an image format made by Google for the web. It produces smaller files than JPG or PNG at similar quality, which is why so many sites now serve it. The downside appears when you save such an image and an upload form, an older editor or a printing service refuses the .webp extension.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why did my download save as .webp instead of .jpg?",
        a: "The website served the image as WebP, and your browser saved exactly what it received. The picture is fine – it just needs converting to JPG to be accepted everywhere.",
      },
    ],
  },

  "mov-to-mp4": {
    sections: [
      {
        heading: "How to convert MOV to MP4 on iPhone, Mac and Windows",
        list: [
          "Any device: use this page in the browser. The video is converted on your own device and is never uploaded.",
          "Mac: open the clip in iMovie, then Share → File, which writes an MP4 (H.264).",
          "Windows 11: open the clip in Clipchamp, the built-in video editor, and export it as MP4.",
        ],
      },
      {
        heading: "What is a MOV file?",
        paragraphs: [
          "MOV is Apple's QuickTime container, and it is what an iPhone or a Mac records by default. The video inside is usually H.264 or HEVC – the same video an MP4 holds. Converting to MP4 mostly changes the wrapper, which is why quality stays close to the original while compatibility improves on Windows, Android, smart TVs and social platforms.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is MP4 better quality than MOV?",
        a: "Neither container is better by itself – quality comes from the video codec and bitrate inside. MP4 simply plays on far more devices and websites, which is the usual reason to convert.",
      },
      {
        q: "Why does my iPhone record in MOV?",
        a: "MOV is Apple's own format and is what the Camera app writes. To record in a more compatible format from the start, open Settings → Camera → Formats and choose Most Compatible.",
      },
    ],
  },
};
