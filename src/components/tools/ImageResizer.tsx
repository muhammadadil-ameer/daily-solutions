"use client";

import { useEffect, useMemo, useState } from "react";
import { DownloadIcon } from "@/components/Icons";
import { track } from "@/lib/analytics";
import { downloadBlob, formatBytes, MB, reductionPercent, sanitizeBaseName } from "@/lib/files";
import {
  ACCEPT_IMAGES,
  decodeImage,
  encodeImage,
  encodeToMaxSize,
  formatLabel,
  ImageToolError,
  resizeCanvas,
  type FitMode,
  type OutputFormat,
} from "@/lib/image/codecs";
import type { ImageFormat } from "@/lib/types";
import { Dropzone, ErrorMessage, Notice, Segmented, Stat } from "./ui";

type ResizeMode = "none" | "width" | "height" | "both" | "percent";
type OutChoice = "keep" | "jpg" | "png" | "webp" | "avif";

const presets = [
  [100, 100],
  [300, 300],
  [500, 500],
  [1080, 1080],
  [1200, 630],
  [1920, 1080],
] as const;

const MAX_SIZE = 50 * MB;
const MAX_DIM = 12000;

interface Loaded {
  file: File;
  canvas: HTMLCanvasElement;
  format: ImageFormat | null;
  url: string;
}

interface Result {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  format: OutputFormat;
  fits: boolean;
}

export default function ImageResizer({
  width: presetW,
  height: presetH,
  focus = "resize",
  format = "keep",
  maxKB,
}: {
  width?: number;
  height?: number;
  focus?: "resize" | "compress";
  format?: OutChoice;
  maxKB?: number;
}) {
  const [img, setImg] = useState<Loaded | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  // A width-only preset (e.g. KB landing pages) resizes by width; never upscale beyond the original.
  const [mode, setMode] = useState<ResizeMode>(presetW && presetH ? "both" : presetW ? "width" : focus === "compress" ? "none" : "width");
  const [w, setW] = useState(presetW ?? 1200);
  const [h, setH] = useState(presetH ?? 800);
  const [percent, setPercent] = useState(50);
  const [lock, setLock] = useState(!(presetW && presetH));
  const [fit, setFit] = useState<FitMode>("fill");

  const [compressMode, setCompressMode] = useState<"quality" | "size">(maxKB ? "size" : "quality");
  const [quality, setQuality] = useState(focus === "compress" ? 75 : 90);
  const [targetKB, setTargetKB] = useState(maxKB ?? 200);
  const [out, setOut] = useState<OutChoice>(format);

  useEffect(() => track("tool_open", { tool: "image-resizer" }), []);
  useEffect(() => () => {
    if (img) URL.revokeObjectURL(img.url);
  }, [img]);
  useEffect(() => () => {
    if (result) URL.revokeObjectURL(result.url);
  }, [result]);

  const ow = img?.canvas.width ?? 0;
  const oh = img?.canvas.height ?? 0;
  const ratio = ow && oh ? ow / oh : 1;

  const keepFormat: OutputFormat = img?.format === "png" || img?.format === "webp" || img?.format === "avif" ? img.format : "jpg";
  const outFormat: OutputFormat = out === "keep" ? keepFormat : out;

  const target = useMemo(() => {
    if (!img) return { tw: 0, th: 0 };
    switch (mode) {
      case "none":
        return { tw: ow, th: oh };
      case "width":
        return { tw: w, th: Math.round(w / ratio) };
      case "height":
        return { tw: Math.round(h * ratio), th: h };
      case "percent":
        return { tw: Math.round((ow * percent) / 100), th: Math.round((oh * percent) / 100) };
      case "both":
        return { tw: w, th: h };
    }
  }, [img, mode, w, h, percent, ow, oh, ratio]);

  async function load(files: File[]) {
    const file = files[0];
    setError("");
    setResult(null);
    if (file.size > MAX_SIZE) return setError("File size exceeds the allowed limit of 50 MB.");
    setBusy(true);
    try {
      const { canvas, format } = await decodeImage(file);
      const url = URL.createObjectURL(file.type.startsWith("image/") && format !== "heic" && format !== "tiff" ? file : await encodeImage(canvas, "png"));
      setImg({ file, canvas, format, url });
      if (!(presetW && presetH)) {
        const startW = Math.min(canvas.width, presetW ?? 1200);
        setW(startW);
        setH(Math.round(startW / (canvas.width / canvas.height)));
      }
      track("file_upload", { tool: "image-resizer", format: format ?? "" });
    } catch (e) {
      setError(e instanceof ImageToolError ? e.message : "Please upload a valid image.");
    } finally {
      setBusy(false);
    }
  }

  function setWidth(v: number) {
    setW(v);
    if (mode === "both" && lock) setH(Math.max(1, Math.round(v / ratio)));
  }
  function setHeight(v: number) {
    setH(v);
    if (mode === "both" && lock) setW(Math.max(1, Math.round(v * ratio)));
  }

  async function apply() {
    if (!img) return;
    const { tw, th } = target;
    if (!tw || !th || tw < 1 || th < 1) return setError("Please enter a valid width and height.");
    if (tw > MAX_DIM || th > MAX_DIM) return setError(`Maximum size is ${MAX_DIM} × ${MAX_DIM} pixels.`);
    if (compressMode === "size" && (!targetKB || targetKB < 1)) return setError("Please enter a valid maximum file size.");
    setError("");
    setBusy(true);
    try {
      const fitMode: FitMode = mode === "both" && !lock ? fit : "stretch";
      // "Fit inside" borders stay transparent; JPG output flattens them to white.
      const canvas = tw === ow && th === oh ? img.canvas : resizeCanvas(img.canvas, tw, th, fitMode);
      const lossy = outFormat !== "png";
      let blob: Blob;
      let fits = true;
      if (compressMode === "size" && lossy) {
        const r = await encodeToMaxSize(canvas, outFormat, targetKB * 1024);
        blob = r.blob;
        fits = r.fits;
      } else {
        blob = await encodeImage(canvas, outFormat, quality / 100);
        if (compressMode === "size") fits = blob.size <= targetKB * 1024;
      }
      setResult({ blob, url: URL.createObjectURL(blob), width: tw, height: th, format: outFormat, fits });
      track("conversion_complete", { tool: "image-resizer", to: outFormat });
    } catch (e) {
      setError(e instanceof ImageToolError ? e.message : "Processing failed. Please try another file.");
      track("tool_error", { tool: "image-resizer" });
    } finally {
      setBusy(false);
    }
  }

  if (!img) {
    return (
      <div className="space-y-4">
        <Dropzone
          accept={ACCEPT_IMAGES}
          onFiles={load}
          title="Drag & drop your image here"
          buttonLabel={busy ? "Opening…" : "Choose Image"}
          hint="JPG, PNG, WebP, AVIF, HEIC, GIF, BMP, TIFF · up to 50 MB · processed in your browser"
        />
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{img.file.name}</p>
          <p className="text-sm text-muted">
            {img.format ? formatLabel[img.format] : ""} · {ow} × {oh} px · {formatBytes(img.file.size)}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setImg(null);
            setResult(null);
          }}
        >
          Choose another image
        </button>
      </div>

      <fieldset className="space-y-3">
        <legend className="field-label">Resize</legend>
        <Segmented
          label="Resize mode"
          value={mode}
          onChange={(m) => {
            setMode(m);
            setResult(null);
          }}
          options={[
            { id: "none", label: "Keep size" },
            { id: "width", label: "Width" },
            { id: "height", label: "Height" },
            { id: "both", label: "Width + Height" },
            { id: "percent", label: "Percentage" },
          ]}
        />
        <div className="flex flex-wrap gap-2" aria-label="Size presets">
          {presets.map(([pw, ph]) => (
            <button
              key={`${pw}x${ph}`}
              type="button"
              className={`chip ${mode === "both" && w === pw && h === ph ? "chip-active" : ""}`}
              onClick={() => {
                setMode("both");
                setLock(false);
                setW(pw);
                setH(ph);
                setResult(null);
              }}
            >
              {pw}×{ph}
            </button>
          ))}
        </div>
        {(mode === "width" || mode === "both") && (
          <NumberField id="w" label="Width (px)" value={w} onChange={setWidth} />
        )}
        {(mode === "height" || mode === "both") && (
          <NumberField id="h" label="Height (px)" value={h} onChange={setHeight} />
        )}
        {mode === "percent" && (
          <div>
            <label htmlFor="pct" className="field-label">
              Scale: {percent}%
            </label>
            <input id="pct" type="range" min={1} max={200} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="h-11 w-full accent-brand-600" />
          </div>
        )}
        {mode === "both" && (
          <label className="flex min-h-11 items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={lock} onChange={(e) => {
              setLock(e.target.checked);
              if (e.target.checked) setH(Math.round(w / ratio));
            }} className="size-5 accent-brand-600" />
            Lock aspect ratio
          </label>
        )}
        {mode === "both" && !lock && Math.abs(w / h - ratio) > 0.01 && (
          <div>
            <p className="field-label">Your image has a different shape. How should it fit?</p>
            <Segmented
              label="Fit mode"
              value={fit}
              onChange={setFit}
              options={[
                { id: "fill", label: "Crop to fill" },
                { id: "fit", label: "Fit inside" },
                { id: "stretch", label: "Stretch" },
              ]}
            />
          </div>
        )}
        <p className="text-sm text-muted">
          New size: <strong className="text-ink">{target.tw} × {target.th} px</strong>
          {target.tw > ow && " (larger than original – may look blurry)"}
        </p>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="field-label">Compression</legend>
        <Segmented
          label="Compression mode"
          value={compressMode}
          onChange={setCompressMode}
          options={[
            { id: "quality", label: "Quality" },
            { id: "size", label: "Max file size" },
          ]}
        />
        {compressMode === "quality" ? (
          outFormat === "png" ? (
            <Notice>PNG is lossless and has no quality setting. Reduce the dimensions or choose WebP/JPG for smaller files.</Notice>
          ) : (
            <div>
              <label htmlFor="q" className="field-label">
                Quality: {quality}%
              </label>
              <input id="q" type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="h-11 w-full accent-brand-600" />
            </div>
          )
        ) : (
          <>
            <NumberField id="kb" label="Target / maximum size (KB)" value={targetKB} onChange={setTargetKB} />
            {outFormat === "png" && <Notice>Target size works with JPG, WebP and AVIF. PNG can only get smaller by reducing dimensions.</Notice>}
          </>
        )}
      </fieldset>

      <div>
        <label htmlFor="outfmt" className="field-label">
          Output format
        </label>
        <select id="outfmt" className="input sm:max-w-xs" value={out} onChange={(e) => setOut(e.target.value as OutChoice)}>
          <option value="keep">Same as original ({formatLabel[keepFormat]})</option>
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
          <option value="avif">AVIF</option>
        </select>
      </div>

      <ErrorMessage>{error}</ErrorMessage>

      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={busy} onClick={apply}>
        {busy ? "Processing…" : "Apply"}
      </button>

      {result && (
        <section aria-label="Result" className="space-y-4 rounded-2xl border border-line p-4 sm:p-5">
          {!result.fits && (
            <ErrorMessage>
              Could not reach {targetKB} KB at {result.width} × {result.height} px. The smallest result is shown. Try a smaller width.
            </ErrorMessage>
          )}
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Original" value={`${ow} × ${oh}`} />
            <Stat label="New dimensions" value={`${result.width} × ${result.height}`} />
            <Stat label="Size" value={`${formatBytes(img.file.size)} → ${formatBytes(result.blob.size)}`} />
            <Stat
              label="Reduction"
              value={`${reductionPercent(img.file.size, result.blob.size)}%`}
              tone={result.blob.size < img.file.size ? "good" : undefined}
            />
          </dl>
          <div className="grid gap-4 sm:grid-cols-2">
            <figure>
              <figcaption className="mb-2 text-sm text-muted">Original</figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="Original image preview" className="max-h-72 w-full rounded-xl bg-surface object-contain" />
            </figure>
            <figure>
              <figcaption className="mb-2 text-sm text-muted">Result</figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.url} alt="Processed image preview" className="max-h-72 w-full rounded-xl bg-surface object-contain" />
            </figure>
          </div>
          <button
            type="button"
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => {
              downloadBlob(result.blob, `${sanitizeBaseName(img.file.name)}-${result.width}x${result.height}.${result.format}`);
              track("download", { tool: "image-resizer" });
            }}
          >
            <DownloadIcon width={18} height={18} /> Download {formatLabel[result.format]}
          </button>
        </section>
      )}
    </div>
  );
}

function NumberField({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="sm:max-w-xs">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={1}
        className="input"
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(Math.round(Number(e.target.value)))}
      />
    </div>
  );
}
