import type { Tool } from "./types";

/**
 * Short, concrete capability facts for a tool.
 *
 * Google's AI Overviews and assistants quote specifics ("supports files up to 1 GB", "batch converts
 * up to 200 photos", "works in the browser without uploading"), so every claim here must match what
 * the tool actually enforces: 50 MB per image (ImageConverter/ImageResizer), 100 MB per PDF (PdfTool),
 * 500 MB per media file (MediaConverter).
 */
export function toolFacts(tool: Tool): string[] {
  const w = tool.widget;

  if (w.type === "health") {
    return ["Works in your browser", "Free, no signup", "Nothing you enter is stored or sent anywhere"];
  }

  const facts = ["Runs in your browser – your files are never uploaded", "Free, no signup, no watermark"];

  if (w.type === "image-convert") {
    facts.push("Images up to 50 MB each", "Convert many images at once and download them as a ZIP");
  } else if (w.type === "image-resize") {
    facts.push("Images up to 50 MB", "Set exact pixel sizes or a target size in KB");
  } else if (w.type === "video-compress") {
    facts.push("Videos up to 500 MB", "Set a target size in MB or pick a compression level");
  } else if (w.type === "media-trim") {
    facts.push(
      w.kind === "video" ? "Videos up to 500 MB" : "Audio files up to 500 MB",
      w.kind === "video"
        ? "Lossless cut with no re-encoding, or an exact frame-accurate cut"
        : "Cut without re-encoding, so there is no quality loss",
    );
  } else if (w.type === "media") {
    facts.push("Audio and video files up to 500 MB", "One file at a time; no length limit");
  } else if (w.type === "pdf") {
    facts.push(w.action === "images-to-pdf" ? "Images up to 50 MB each" : "PDFs up to 100 MB, no page limit");
  }

  return facts;
}
