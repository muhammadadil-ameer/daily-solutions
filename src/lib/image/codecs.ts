import type { ImageFormat } from "@/lib/types";

export type OutputFormat = Exclude<ImageFormat, "heic">;

export const outputFormats: { id: OutputFormat; label: string; lossy: boolean; alpha: boolean }[] = [
  { id: "jpg", label: "JPG", lossy: true, alpha: false },
  { id: "png", label: "PNG", lossy: false, alpha: true },
  { id: "webp", label: "WebP", lossy: true, alpha: true },
  { id: "avif", label: "AVIF", lossy: true, alpha: true },
  { id: "gif", label: "GIF", lossy: false, alpha: true },
  { id: "bmp", label: "BMP", lossy: false, alpha: false },
  { id: "tiff", label: "TIFF", lossy: false, alpha: true },
];

export const mimeOf: Record<OutputFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
  bmp: "image/bmp",
  tiff: "image/tiff",
};

export const ACCEPT_IMAGES =
  "image/*,.heic,.heif,.avif,.tif,.tiff,.bmp,.webp,.jpg,.jpeg,.jfif,.png,.gif";

export const formatLabel: Record<ImageFormat, string> = {
  jpg: "JPG",
  png: "PNG",
  webp: "WebP",
  avif: "AVIF",
  gif: "GIF",
  bmp: "BMP",
  tiff: "TIFF",
  heic: "HEIC",
};

/** Detects the real format from the file header, falling back to the extension. */
export async function sniffFormat(file: File): Promise<ImageFormat | null> {
  const head = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  const ascii = (a: number, b: number) => String.fromCharCode(...head.slice(a, b));
  if (head[0] === 0xff && head[1] === 0xd8) return "jpg";
  if (head[0] === 0x89 && ascii(1, 4) === "PNG") return "png";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
  if (ascii(0, 3) === "GIF") return "gif";
  if (ascii(0, 2) === "BM") return "bmp";
  if ((head[0] === 0x49 && head[1] === 0x49 && head[2] === 0x2a) || (head[0] === 0x4d && head[1] === 0x4d && head[3] === 0x2a))
    return "tiff";
  if (ascii(4, 8) === "ftyp") {
    const brands = ascii(8, 32);
    if (/avif|avis/.test(brands)) return "avif";
    if (/heic|heix|hevc|hevx|heim|heis|mif1|msf1/.test(brands)) return "heic";
  }
  const ext = file.name.split(".").pop()?.toLowerCase();
  const byExt: Record<string, ImageFormat> = {
    jpg: "jpg", jpeg: "jpg", jfif: "jpg", png: "png", webp: "webp", gif: "gif", bmp: "bmp",
    tif: "tiff", tiff: "tiff", heic: "heic", heif: "heic", avif: "avif",
  };
  return (ext && byExt[ext]) || null;
}

export class ImageToolError extends Error {}

function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

async function bitmapFromBlob(blob: Blob): Promise<CanvasImageSource & { width: number; height: number }> {
  if ("createImageBitmap" in window) {
    try {
      return await createImageBitmap(blob);
    } catch {
      /* fall through to <img> decoding (older Safari) */
    }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return Object.assign(img, { width: img.naturalWidth, height: img.naturalHeight });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Decodes any supported image into a canvas at its original size. */
export async function decodeImage(file: File): Promise<{ canvas: HTMLCanvasElement; format: ImageFormat | null }> {
  const format = await sniffFormat(file);
  try {
    if (format === "heic") {
      const { default: heic2any } = await import("heic2any");
      const out = await heic2any({ blob: file, toType: "image/png" });
      const png = Array.isArray(out) ? out[0] : out;
      return { canvas: drawToCanvas(await bitmapFromBlob(png)), format };
    }
    if (format === "tiff") {
      const UTIF = (await import("utif")).default;
      const buf = await file.arrayBuffer();
      const ifds = UTIF.decode(buf);
      if (!ifds.length) throw new Error("empty tiff");
      UTIF.decodeImage(buf, ifds[0]);
      const rgba = UTIF.toRGBA8(ifds[0]);
      const w = ifds[0].width as number;
      const h = ifds[0].height as number;
      const canvas = makeCanvas(w, h);
      canvas.getContext("2d")!.putImageData(new ImageData(new Uint8ClampedArray(rgba), w, h), 0, 0);
      return { canvas, format };
    }
    return { canvas: drawToCanvas(await bitmapFromBlob(file)), format };
  } catch (e) {
    if (format === "avif") throw new ImageToolError("Your browser cannot open AVIF images. Please update your browser or try Chrome or Firefox.");
    if (format === "heic") throw new ImageToolError("This HEIC photo could not be read. Please try another photo.");
    throw new ImageToolError("This file could not be opened. Please upload a valid image.", { cause: e });
  }
}

function drawToCanvas(src: CanvasImageSource & { width: number; height: number }) {
  const canvas = makeCanvas(src.width, src.height);
  canvas.getContext("2d")!.drawImage(src, 0, 0);
  if ("close" in src && typeof src.close === "function") src.close();
  return canvas;
}

export type FitMode = "stretch" | "fit" | "fill";

/** Draws `src` into a new canvas of w×h. "fit" letterboxes, "fill" crops from the center. */
export function resizeCanvas(src: HTMLCanvasElement, w: number, h: number, fit: FitMode = "stretch", background?: string) {
  const out = makeCanvas(w, h);
  const ctx = out.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
  }
  if (fit === "stretch") {
    stepDownDraw(ctx, src, 0, 0, src.width, src.height, 0, 0, w, h);
    return out;
  }
  const scale = fit === "fit" ? Math.min(w / src.width, h / src.height) : Math.max(w / src.width, h / src.height);
  const dw = src.width * scale;
  const dh = src.height * scale;
  stepDownDraw(ctx, src, 0, 0, src.width, src.height, (w - dw) / 2, (h - dh) / 2, dw, dh);
  return out;
}

/** Halves repeatedly before the final draw so big downscales stay sharp instead of aliased. */
function stepDownDraw(
  ctx: CanvasRenderingContext2D,
  src: HTMLCanvasElement,
  sx: number, sy: number, sw: number, sh: number,
  dx: number, dy: number, dw: number, dh: number,
) {
  let cur: HTMLCanvasElement = src;
  let cw = sw;
  let ch = sh;
  while (cw / 2 > dw && ch / 2 > dh) {
    const next = makeCanvas(Math.round(cw / 2), Math.round(ch / 2));
    const nctx = next.getContext("2d")!;
    nctx.imageSmoothingQuality = "high";
    nctx.drawImage(cur, cur === src ? sx : 0, cur === src ? sy : 0, cw, ch, 0, 0, next.width, next.height);
    cur = next;
    cw = next.width;
    ch = next.height;
  }
  ctx.drawImage(cur, cur === src ? sx : 0, cur === src ? sy : 0, cw, ch, dx, dy, dw, dh);
}

function flatten(src: HTMLCanvasElement, color = "#ffffff") {
  const out = makeCanvas(src.width, src.height);
  const ctx = out.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(src, 0, 0);
  return out;
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function imageData(canvas: HTMLCanvasElement) {
  return canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height);
}

/** Encodes a canvas. `quality` is 0–1 and only affects lossy formats. */
export async function encodeImage(canvas: HTMLCanvasElement, format: OutputFormat, quality = 0.9): Promise<Blob> {
  switch (format) {
    case "jpg": {
      const b = await toBlob(flatten(canvas), "image/jpeg", quality);
      if (!b) throw new ImageToolError("Conversion failed. Please try another file.");
      return b;
    }
    case "png": {
      const b = await toBlob(canvas, "image/png");
      if (!b) throw new ImageToolError("Conversion failed. Please try another file.");
      return b;
    }
    case "webp": {
      const native = await toBlob(canvas, "image/webp", quality);
      if (native && native.type === "image/webp") return native;
      const { default: encode } = await import("@jsquash/webp/encode");
      const buf = await encode(imageData(canvas), { quality: Math.round(quality * 100) });
      return new Blob([buf], { type: "image/webp" });
    }
    case "avif": {
      const native = await toBlob(canvas, "image/avif", quality);
      if (native && native.type === "image/avif") return native;
      const { default: encode } = await import("@jsquash/avif/encode");
      // jsquash AVIF quality maps lower than JPG's for similar visual quality.
      const buf = await encode(imageData(canvas), { quality: Math.round(Math.max(1, quality * 100 - 15)), speed: 8 });
      return new Blob([buf], { type: "image/avif" });
    }
    case "gif":
      return encodeGif(canvas);
    case "bmp":
      return encodeBmp(flatten(canvas));
    case "tiff": {
      const UTIF = (await import("utif")).default;
      const d = imageData(canvas);
      const buf = UTIF.encodeImage(d.data.buffer as ArrayBuffer, canvas.width, canvas.height);
      return new Blob([buf], { type: "image/tiff" });
    }
  }
}

async function encodeGif(canvas: HTMLCanvasElement): Promise<Blob> {
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
  const { data, width, height } = imageData(canvas);
  const palette = quantize(data, 256, { format: "rgba4444", oneBitAlpha: true });
  const index = applyPalette(data, palette, "rgba4444");
  const transparentIndex = palette.findIndex((c: number[]) => c[3] === 0);
  const gif = GIFEncoder();
  gif.writeFrame(index, width, height, {
    palette,
    transparent: transparentIndex >= 0,
    transparentIndex: Math.max(0, transparentIndex),
  });
  gif.finish();
  return new Blob([gif.bytes() as BlobPart], { type: "image/gif" });
}

function encodeBmp(canvas: HTMLCanvasElement): Blob {
  const { data, width, height } = imageData(canvas);
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const size = 54 + rowSize * height;
  const buf = new ArrayBuffer(size);
  const v = new DataView(buf);
  v.setUint16(0, 0x4d42, true);
  v.setUint32(2, size, true);
  v.setUint32(10, 54, true);
  v.setUint32(14, 40, true);
  v.setInt32(18, width, true);
  v.setInt32(22, height, true);
  v.setUint16(26, 1, true);
  v.setUint16(28, 24, true);
  v.setUint32(34, rowSize * height, true);
  v.setInt32(38, 2835, true);
  v.setInt32(42, 2835, true);
  const out = new Uint8Array(buf);
  for (let y = 0; y < height; y++) {
    const row = 54 + (height - 1 - y) * rowSize;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const o = row + x * 3;
      out[o] = data[i + 2];
      out[o + 1] = data[i + 1];
      out[o + 2] = data[i];
    }
  }
  return new Blob([buf], { type: "image/bmp" });
}

/**
 * Finds the highest quality whose output is ≤ maxBytes via binary search.
 * Returns the smallest attempt (with fits=false) when even the lowest quality is too big.
 */
export async function encodeToMaxSize(canvas: HTMLCanvasElement, format: OutputFormat, maxBytes: number) {
  let lo = 0.05;
  let hi = 0.95;
  let best: { blob: Blob; quality: number } | null = null;
  let smallest: { blob: Blob; quality: number } | null = null;
  for (let i = 0; i < 7; i++) {
    const q = (lo + hi) / 2;
    const blob = await encodeImage(canvas, format, q);
    if (!smallest || blob.size < smallest.blob.size) smallest = { blob, quality: q };
    if (blob.size <= maxBytes) {
      best = { blob, quality: q };
      lo = q;
    } else {
      hi = q;
    }
  }
  if (!best) {
    const blob = await encodeImage(canvas, format, 0.05);
    if (blob.size <= maxBytes) return { blob, quality: 0.05, fits: true };
    return { ...(blob.size < smallest!.blob.size ? { blob, quality: 0.05 } : smallest!), fits: false };
  }
  return { ...best, fits: true };
}
