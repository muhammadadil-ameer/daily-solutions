"use client";

import { useEffect, useRef, useState } from "react";
import { DownloadIcon } from "@/components/Icons";
import { track } from "@/lib/analytics";
import { downloadBlob, extOf, formatBytes, MB, reductionPercent, sanitizeBaseName } from "@/lib/files";
import {
  cancelFFmpeg,
  compressVideoArgs,
  getFFmpeg,
  mediaKind,
  type CompressOptions,
  type VideoHeight,
  type VideoQuality,
} from "@/lib/media";
import { Dropzone, ErrorMessage, Notice, Progress, Segmented, Stat } from "./ui";

const MAX_SIZE = 500 * MB;
const ACCEPT_VIDEO = "video/*,.mp4,.mov,.avi,.webm,.mkv,.m4v,.3gp,.wmv,.flv";
/** Audio is re-encoded at a fixed, transparent-enough bitrate; video carries the size. */
const AUDIO_KBPS = 128;

interface Meta {
  duration: number;
  height: number;
  width: number;
}

/** Reads duration and dimensions from the browser, so a target size can be turned into a bitrate. */
function readMeta(file: File): Promise<Meta | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    const done = (m: Meta | null) => {
      URL.revokeObjectURL(url);
      resolve(m);
    };
    v.onloadedmetadata = () =>
      done(
        Number.isFinite(v.duration) && v.duration > 0
          ? { duration: v.duration, height: v.videoHeight, width: v.videoWidth }
          : null,
      );
    v.onerror = () => done(null);
    v.src = url;
  });
}

const heightOptions: { id: VideoHeight; label: string }[] = [
  { id: "keep", label: "Keep" },
  { id: "1080", label: "1080p" },
  { id: "720", label: "720p" },
  { id: "480", label: "480p" },
  { id: "360", label: "360p" },
];

export default function VideoCompressor({ targetMB }: { targetMB?: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [mode, setMode] = useState<"quality" | "size">(targetMB ? "size" : "quality");
  const [quality, setQuality] = useState<VideoQuality>("balanced");
  const [size, setSize] = useState(String(targetMB ?? 25));
  const [height, setHeight] = useState<VideoHeight>("keep");
  const [stage, setStage] = useState<"idle" | "loading" | "working">("idle");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const cancelled = useRef(false);

  useEffect(() => track("tool_open", { tool: "compress-video" }), []);

  const busy = stage !== "idle";
  // Only offer resolutions that would actually make the video smaller.
  const heights = heightOptions.filter((h) => h.id === "keep" || !meta || Number(h.id) < meta.height);

  async function pick(files: File[]) {
    const f = files[0];
    setError("");
    setResult(null);
    if (f.size > MAX_SIZE) return setError("File size exceeds the allowed limit of 500 MB.");
    if (mediaKind(f) !== "video") return setError("Please upload a video file.");
    setFile(f);
    setHeight("keep");
    setMeta(await readMeta(f));
    track("file_upload", { tool: "compress-video", ext: extOf(f.name) });
  }

  async function run() {
    if (!file) return;
    const targetBytes = Number(size) * MB;
    if (mode === "size") {
      if (!Number.isFinite(targetBytes) || targetBytes <= 0) return setError("Please enter a target size in MB.");
      if (!meta) return setError("The length of this video could not be read, so a target size cannot be used. Choose a compression level instead.");
      if (targetBytes >= file.size) return setError("That target is already larger than your video. Enter a smaller size.");
    }
    setError("");
    setResult(null);
    cancelled.current = false;
    setStage("loading");
    setProgress(null);

    let ffmpeg;
    try {
      ffmpeg = await getFFmpeg();
    } catch {
      setStage("idle");
      setError("The compressor could not be loaded. Please check your internet connection and try again.");
      track("tool_error", { tool: "compress-video", stage: "load" });
      return;
    }

    setStage("working");
    const input = `input.${extOf(file.name) || "bin"}`;
    const output = "output.mp4";
    const onProgress = ({ progress: p }: { progress: number }) => setProgress(Math.min(1, Math.max(0, p)));
    ffmpeg.on("progress", onProgress);
    try {
      await ffmpeg.writeFile(input, new Uint8Array(await file.arrayBuffer()));
      // Leave 4% headroom for the container so the result lands under the requested size.
      const videoKbps =
        meta && mode === "size"
          ? Math.max(100, Math.floor((targetBytes * 8 * 0.96) / meta.duration / 1000) - AUDIO_KBPS)
          : 0;
      const opts: CompressOptions = { mode, quality, videoKbps, audioKbps: AUDIO_KBPS, height };
      const code = await ffmpeg.exec(compressVideoArgs(input, output, opts));
      if (cancelled.current) return;
      if (code !== 0) throw new Error(`ffmpeg exit ${code}`);
      const data = (await ffmpeg.readFile(output)) as Uint8Array;
      if (!data.length) throw new Error("empty output");
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      setResult({ blob, name: `${sanitizeBaseName(file.name)}-compressed.mp4` });
      track("conversion_complete", { tool: "compress-video", mode });
    } catch {
      if (!cancelled.current) {
        setError("Compression failed. The file may have no video track or use an unsupported codec. Please try another file.");
        track("tool_error", { tool: "compress-video" });
      }
    } finally {
      ffmpeg.off("progress", onProgress);
      await ffmpeg.deleteFile(input).catch(() => {});
      await ffmpeg.deleteFile(output).catch(() => {});
      setStage("idle");
      setProgress(null);
    }
  }

  if (!file) {
    return (
      <div className="space-y-4">
        <Dropzone
          accept={ACCEPT_VIDEO}
          onFiles={pick}
          title="Drag & drop your video here"
          buttonLabel="Choose Video"
          hint="MP4, MOV, AVI, WebM, MKV · up to 500 MB · compressed in your browser"
        />
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{file.name}</p>
          <p className="text-sm text-muted">
            {formatBytes(file.size)}
            {meta ? ` · ${meta.width} × ${meta.height} px · ${Math.round(meta.duration)}s` : ""}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          disabled={busy}
          onClick={() => {
            setFile(null);
            setMeta(null);
            setResult(null);
            setError("");
          }}
        >
          Choose another file
        </button>
      </div>

      <Segmented
        label="How to compress"
        value={mode}
        onChange={setMode}
        options={[
          { id: "quality", label: "Compression level" },
          { id: "size", label: "Target size" },
        ]}
      />

      {mode === "quality" ? (
        <div>
          <p className="field-label">Compression level</p>
          <Segmented
            label="Compression level"
            value={quality}
            onChange={setQuality}
            options={[
              { id: "high", label: "High quality" },
              { id: "balanced", label: "Balanced" },
              { id: "small", label: "Small file" },
            ]}
          />
        </div>
      ) : (
        <div>
          <label htmlFor="v-size" className="field-label">
            Target size (MB)
          </label>
          <input
            id="v-size"
            type="number"
            min={1}
            inputMode="numeric"
            className="input max-w-[12rem]"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <p className="mt-1.5 text-xs text-muted">
            Common limits: WhatsApp 16 MB, Discord 10 MB, Gmail 25 MB.
          </p>
        </div>
      )}

      <div>
        <p className="field-label">Resolution</p>
        <Segmented label="Resolution" value={height} onChange={setHeight} options={heights} />
        <p className="mt-1.5 text-xs text-muted">
          Lowering the resolution is the quickest way to make a video much smaller.
        </p>
      </div>

      <Notice>
        Video is re-encoded on your own device, so a long clip can take several minutes. The result is an MP4
        (H.264) that plays almost everywhere.
      </Notice>

      {busy ? (
        <div className="space-y-3">
          <Progress value={progress} label={stage === "loading" ? "Loading compressor (about 30 MB, only the first time)…" : "Compressing…"} />
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              cancelled.current = true;
              cancelFFmpeg();
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={run}>
          Compress Video
        </button>
      )}

      <ErrorMessage>{error}</ErrorMessage>

      {result && (
        <div className="space-y-4 rounded-2xl border border-line p-4">
          {result.blob.size >= file.size && (
            <Notice>
              This video is already well compressed, so the result is not smaller. Try a lower resolution or a
              smaller target size, or keep your original.
            </Notice>
          )}
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Original" value={formatBytes(file.size)} />
            <Stat label="Compressed" value={formatBytes(result.blob.size)} />
            <Stat
              label="Reduction"
              value={`${Math.max(0, reductionPercent(file.size, result.blob.size))}%`}
              tone={result.blob.size < file.size ? "good" : undefined}
            />
          </dl>
          <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={() => downloadBlob(result.blob, result.name)}>
            <DownloadIcon width={18} height={18} />
            Download MP4
          </button>
        </div>
      )}
    </div>
  );
}
