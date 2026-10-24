import type { PDFDocument as PDFDocumentType } from "pdf-lib";

export class PdfToolError extends Error {}

export async function loadPdfLib() {
  return import("pdf-lib");
}

export async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  // Copied to /public by scripts/copy-assets.mjs so it matches the installed version.
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

export async function openPdf(file: File): Promise<PDFDocumentType> {
  const { PDFDocument } = await loadPdfLib();
  try {
    return await PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
  } catch (e) {
    if (String(e).toLowerCase().includes("encrypt"))
      throw new PdfToolError("This PDF is password-protected. Please remove the password and try again.");
    throw new PdfToolError("This file could not be opened. Please upload a valid PDF.");
  }
}

export async function isPdf(file: File) {
  const head = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
  return new TextDecoder().decode(head).includes("%PDF-");
}

export function pdfBlob(bytes: Uint8Array) {
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

/**
 * Parses "1-3, 5, 8-10" into groups of zero-based page indexes.
 * Throws a user-facing error for out-of-range or malformed input.
 */
export function parseRanges(input: string, pageCount: number): number[][] {
  const groups: number[][] = [];
  for (const part of input.split(",").map((s) => s.trim()).filter(Boolean)) {
    const m = /^(\d+)\s*(?:-\s*(\d+))?$/.exec(part);
    if (!m) throw new PdfToolError(`“${part}” is not a valid page range. Use a format like 1-3, 5.`);
    const a = Number(m[1]);
    const b = m[2] ? Number(m[2]) : a;
    if (a < 1 || b < 1 || a > pageCount || b > pageCount)
      throw new PdfToolError(`Page numbers must be between 1 and ${pageCount}.`);
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    groups.push(Array.from({ length: hi - lo + 1 }, (_, i) => lo - 1 + i));
  }
  if (!groups.length) throw new PdfToolError("Please enter at least one page number.");
  return groups;
}

export async function copyPages(src: PDFDocumentType, indexes: number[]) {
  const { PDFDocument } = await loadPdfLib();
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, indexes);
  pages.forEach((p) => out.addPage(p));
  return out.save();
}

type PdfjsDoc = Awaited<ReturnType<Awaited<ReturnType<typeof loadPdfjs>>["getDocument"]>["promise"]> & {
  /** Releases the document and its worker resources. */
  close: () => Promise<void>;
};

export async function openPdfjs(file: File | Uint8Array): Promise<PdfjsDoc> {
  const pdfjs = await loadPdfjs();
  const data = file instanceof File ? new Uint8Array(await file.arrayBuffer()) : file.slice();
  try {
    const task = pdfjs.getDocument({ data });
    return Object.assign(await task.promise, { close: () => task.destroy() });
  } catch (e) {
    if ((e as Error)?.name === "PasswordException")
      throw new PdfToolError("This PDF is password-protected. Please remove the password and try again.");
    throw new PdfToolError("This file could not be opened. Please upload a valid PDF.");
  }
}

/** Renders one page (1-based) at `scale` (1 = 72 DPI) onto a white canvas. */
export async function renderPage(doc: PdfjsDoc, pageNumber: number, scale: number) {
  const page = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // "print" intent renders without requestAnimationFrame, so work continues while the tab is in the background.
  await page.render({ canvas, canvasContext: ctx, viewport, intent: "print" }).promise;
  const base = page.getViewport({ scale: 1 });
  page.cleanup();
  return { canvas, widthPt: base.width, heightPt: base.height };
}

export function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new PdfToolError("Rendering failed."))), "image/jpeg", quality),
  );
}

export const compressionLevels = {
  low: { scale: 2, quality: 0.8, label: "Low" },
  medium: { scale: 1.5, quality: 0.65, label: "Medium" },
  high: { scale: 1.1, quality: 0.45, label: "High" },
} as const;

export type CompressionLevel = keyof typeof compressionLevels;

/** Extra-strong steps tried only when hunting for a target size. */
const targetLadder = [
  compressionLevels.low,
  compressionLevels.medium,
  compressionLevels.high,
  { scale: 0.9, quality: 0.4 },
  { scale: 0.75, quality: 0.35 },
  { scale: 0.6, quality: 0.3 },
  { scale: 0.5, quality: 0.25 },
];

/** Re-saves the document with object streams; lossless, keeps text selectable. */
async function structuralOptimize(file: File) {
  const doc = await openPdf(file);
  return doc.save({ useObjectStreams: true });
}

/** Rasterizes every page to JPEG at the given settings. Text becomes part of the image. */
async function rasterize(file: File, scale: number, quality: number, onProgress?: (p: number) => void) {
  const { PDFDocument } = await loadPdfLib();
  const src = await openPdfjs(file);
  const out = await PDFDocument.create();
  for (let i = 1; i <= src.numPages; i++) {
    const { canvas, widthPt, heightPt } = await renderPage(src, i, scale);
    const jpg = await canvasToJpeg(canvas, quality);
    const img = await out.embedJpg(await jpg.arrayBuffer());
    out.addPage([widthPt, heightPt]).drawImage(img, { x: 0, y: 0, width: widthPt, height: heightPt });
    canvas.width = canvas.height = 0;
    onProgress?.(i / src.numPages);
  }
  await src.close();
  return out.save({ useObjectStreams: true });
}

export interface CompressResult {
  bytes: Uint8Array;
  method: "structure" | "raster";
  fits: boolean;
}

export async function compressPdf(
  file: File,
  opts: { level: CompressionLevel } | { targetBytes: number },
  onProgress?: (p: number, label: string) => void,
): Promise<CompressResult> {
  onProgress?.(0, "Optimizing structure…");
  const structural = await structuralOptimize(file);

  if ("level" in opts) {
    if (opts.level === "low" && structural.length < file.size * 0.9)
      return { bytes: structural, method: "structure", fits: true };
    const { scale, quality } = compressionLevels[opts.level];
    const raster = await rasterize(file, scale, quality, (p) => onProgress?.(p, "Compressing pages…"));
    return raster.length < structural.length
      ? { bytes: raster, method: "raster", fits: true }
      : { bytes: structural, method: "structure", fits: true };
  }

  if (structural.length <= opts.targetBytes) return { bytes: structural, method: "structure", fits: true };

  // Output size shrinks monotonically along the ladder, so binary-search for the
  // gentlest step that fits: ~3 renders instead of up to 7.
  const maxAttempts = Math.ceil(Math.log2(targetLadder.length + 1));
  let lo = 0;
  let hi = targetLadder.length - 1;
  let attempt = 0;
  let best: Uint8Array | null = null;
  let smallest: Uint8Array = structural;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const { scale, quality } = targetLadder[mid];
    const n = attempt++;
    const raster = await rasterize(file, scale, quality, (p) =>
      onProgress?.(Math.min(1, (n + p) / maxAttempts), `Compression pass ${n + 1} of about ${maxAttempts}…`),
    );
    if (raster.length < smallest.length) smallest = raster;
    if (raster.length <= opts.targetBytes) {
      best = raster;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  if (best) return { bytes: best, method: "raster", fits: true };
  return { bytes: smallest, method: smallest === structural ? "structure" : "raster", fits: false };
}
