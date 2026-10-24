"use client";

import { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon } from "@/components/Icons";
import { track } from "@/lib/analytics";
import { downloadBlob, formatBytes, MB, sanitizeBaseName, zipAndDownload } from "@/lib/files";
import {
  ACCEPT_IMAGES,
  decodeImage,
  encodeImage,
  formatLabel,
  ImageToolError,
  outputFormats,
  sniffFormat,
  type OutputFormat,
} from "@/lib/image/codecs";
import type { ImageFormat } from "@/lib/types";
import { Dropzone, ErrorMessage, Notice } from "./ui";

const MAX_SIZE = 50 * MB;

interface Item {
  id: string;
  file: File;
  format: ImageFormat | null;
  status: "ready" | "working" | "done" | "error";
  result?: Blob;
  error?: string;
}

const outName = (file: File, fmt: OutputFormat) => `${sanitizeBaseName(file.name)}.${fmt === "jpg" ? "jpg" : fmt}`;

export default function ImageConverter({ from, to = "jpg" }: { from?: ImageFormat; to?: ImageFormat }) {
  const initialTarget: OutputFormat = to === "heic" ? "jpg" : to;
  const [items, setItems] = useState<Item[]>([]);
  const [target, setTarget] = useState<OutputFormat>(initialTarget);
  const [quality, setQuality] = useState(90);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => track("tool_open", { tool: "image-converter" }), []);

  const lossy = outputFormats.find((f) => f.id === target)!.lossy;
  const done = items.filter((i) => i.status === "done");

  async function addFiles(files: File[]) {
    setError("");
    const next: Item[] = [];
    const rejected: string[] = [];
    for (const file of files) {
      if (file.size > MAX_SIZE) {
        rejected.push(`${file.name}: file size exceeds the 50 MB limit.`);
        continue;
      }
      const format = await sniffFormat(file);
      if (!format) {
        rejected.push(`${file.name}: please upload a valid image.`);
        continue;
      }
      next.push({ id: crypto.randomUUID(), file, format, status: "ready" });
    }
    if (rejected.length) setError(rejected.join(" "));
    if (next.length) {
      track("file_upload", { tool: "image-converter", count: next.length });
      setItems((cur) => [...cur, ...next]);
    }
  }

  async function convert() {
    if (!items.length) return setError("Please add at least one image.");
    setBusy(true);
    setError("");
    const updated = [...items];
    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "working", result: undefined, error: undefined };
      setItems([...updated]);
      try {
        const { canvas } = await decodeImage(updated[i].file);
        const blob = await encodeImage(canvas, target, quality / 100);
        updated[i] = { ...updated[i], status: "done", result: blob };
        track("conversion_complete", { tool: "image-converter", from: updated[i].format ?? "", to: target });
      } catch (e) {
        const msg = e instanceof ImageToolError ? e.message : "Conversion failed. Please try another file.";
        updated[i] = { ...updated[i], status: "error", error: msg };
        track("tool_error", { tool: "image-converter", to: target });
      }
      setItems([...updated]);
    }
    setBusy(false);
  }

  function reset() {
    setItems([]);
    setError("");
  }

  return (
    <div className="space-y-5">
      {items.length === 0 ? (
        <Dropzone
          accept={ACCEPT_IMAGES}
          multiple
          onFiles={addFiles}
          title={from ? `Drag & drop your ${formatLabel[from]} images here` : "Drag & drop your images here"}
          buttonLabel="Choose Images"
          hint="JPG, PNG, WebP, HEIC, HEIF, AVIF, GIF, BMP, TIFF · up to 50 MB each · processed in your browser"
        />
      ) : (
        <>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {items.map((it) => (
              <li key={it.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{it.file.name}</p>
                  <p className="text-sm text-muted">
                    {it.format ? formatLabel[it.format] : "?"} · {formatBytes(it.file.size)}
                    {it.result && (
                      <>
                        {" "}→ {formatLabel[target]} · {formatBytes(it.result.size)}
                      </>
                    )}
                  </p>
                  {it.error && <p className="mt-1 text-sm text-red-700">{it.error}</p>}
                </div>
                {it.status === "working" && <span className="text-sm text-brand-700">Converting…</span>}
                {it.status === "done" && it.result && (
                  <button
                    type="button"
                    className="btn btn-secondary min-h-10 px-3"
                    onClick={() => {
                      downloadBlob(it.result!, outName(it.file, target));
                      track("download", { tool: "image-converter" });
                    }}
                  >
                    <DownloadIcon width={18} height={18} /> Download
                  </button>
                )}
                {!busy && (
                  <button
                    type="button"
                    className="grid size-10 place-items-center rounded-lg text-muted hover:bg-surface hover:text-red-700"
                    aria-label={`Remove ${it.file.name}`}
                    onClick={() => setItems((cur) => cur.filter((x) => x.id !== it.id))}
                  >
                    <TrashIcon width={18} height={18} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          <Dropzone accept={ACCEPT_IMAGES} multiple compact onFiles={addFiles} title="Add more images" buttonLabel="Choose Images" />
        </>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="target-format" className="field-label">
            Convert to
          </label>
          <select
            id="target-format"
            className="input"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value as OutputFormat);
              setItems((cur) => cur.map((x) => ({ ...x, status: "ready", result: undefined, error: undefined })));
            }}
          >
            {outputFormats.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        {lossy && (
          <div>
            <label htmlFor="quality" className="field-label">
              Quality: {quality}%
            </label>
            <input
              id="quality"
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="h-11 w-full accent-brand-600"
            />
          </div>
        )}
      </div>

      {(target === "jpg" || target === "bmp") && <Notice>{formatLabel[target]} does not support transparency. Transparent areas will become white.</Notice>}
      {target === "avif" && <Notice>AVIF encoding can take a few seconds per image on some browsers.</Notice>}

      <ErrorMessage>{error}</ErrorMessage>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" disabled={busy || !items.length} onClick={convert}>
          {busy ? "Converting…" : `Convert to ${formatLabel[target]}`}
        </button>
        {done.length > 1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              zipAndDownload(
                done.map((d) => ({ name: outName(d.file, target), blob: d.result! })),
                `converted-${target}.zip`,
              );
              track("download", { tool: "image-converter", type: "zip" });
            }}
          >
            <DownloadIcon width={18} height={18} /> Download All (ZIP)
          </button>
        )}
        {items.length > 0 && !busy && (
          <button type="button" className="btn btn-ghost" onClick={reset}>
            New Conversion
          </button>
        )}
      </div>
    </div>
  );
}
