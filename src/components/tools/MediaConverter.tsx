"use client";

import { useEffect, useRef, useState } from "react";
import { DownloadIcon } from "@/components/Icons";
import { track } from "@/lib/analytics";
import { downloadBlob, extOf, formatBytes, MB, sanitizeBaseName } from "@/lib/files";
import {
  ACCEPT_MEDIA,
  audioFormats,
  cancelFFmpeg,
  ffmpegArgs,
  getFFmpeg,
  mediaKind,
  mediaLabel,
  mimeFor,
  videoFormats,
  type AudioQuality,
  type ConvertOptions,
  type GifWidth,
  type VideoQuality,
} from "@/lib/media";
import type { MediaFormat } from "@/lib/types";
import { Dropzone, ErrorMessage, Notice, Progress, Segmented } from "./ui";

const MAX_SIZE = 500 * MB;

export default function MediaConverter({ from, to = "mp3" }: { from?: MediaFormat; to?: MediaFormat }) {
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<"audio" | "video">("audio");
  const [target, setTarget] = useState<MediaFormat>(to);
  const [audio, setAudio] = useState<AudioQuality>("192k");
  const [video, setVideo] = useState<VideoQuality>("balanced");
  const [gifWidth, setGifWidth] = useState<GifWidth>("480");
  const [gifFps, setGifFps] = useState<"10" | "15">("10");
  const [stage, setStage] = useState<"idle" | "loading" | "converting">("idle");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string; url: string } | null>(null);
  const cancelled = useRef(false);

  useEffect(() => track("tool_open", { tool: "media-converter" }), []);
  useEffect(() => () => {
    if (result) URL.revokeObjectURL(result.url);
  }, [result]);

  const targets = kind === "video" ? [...audioFormats, ...videoFormats] : audioFormats;
  const isAudioTarget = audioFormats.includes(target);
  const busy = stage !== "idle";

  function pick(files: File[]) {
    const f = files[0];
    setError("");
    setResult(null);
    if (f.size > MAX_SIZE) return setError("File size exceeds the allowed limit of 500 MB.");
    const k = mediaKind(f);
    if (!k) return setError("Please upload a valid audio or video file.");
    setFile(f);
    setKind(k);
    if (k === "audio" && !audioFormats.includes(target)) setTarget("mp3");
    track("file_upload", { tool: "media-converter", kind: k, ext: extOf(f.name) });
  }

  async function convert() {
    if (!file) return;
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
      setError("The converter could not be loaded. Please check your internet connection and try again.");
      track("tool_error", { tool: "media-converter", stage: "load" });
      return;
    }
    setStage("converting");
    const input = `input.${extOf(file.name) || "bin"}`;
    const output = `output.${target}`;
    const onProgress = ({ progress: p }: { progress: number }) => setProgress(Math.min(1, Math.max(0, p)));
    ffmpeg.on("progress", onProgress);
    try {
      await ffmpeg.writeFile(input, new Uint8Array(await file.arrayBuffer()));
      const opts: ConvertOptions = { audio, video, gifWidth, gifFps };
      const code = await ffmpeg.exec(ffmpegArgs(input, output, target, opts));
      if (cancelled.current) return;
      if (code !== 0) throw new Error(`ffmpeg exit ${code}`);
      const data = (await ffmpeg.readFile(output)) as Uint8Array;
      if (!data.length) throw new Error("empty output");
      const blob = new Blob([data as BlobPart], { type: mimeFor[target] });
      setResult({ blob, name: `${sanitizeBaseName(file.name)}.${target}`, url: URL.createObjectURL(blob) });
      track("conversion_complete", { tool: "media-converter", from: extOf(file.name), to: target });
    } catch {
      if (!cancelled.current) {
        setError(
          kind === "audio" || isAudioTarget
            ? "Conversion failed. Please try another file."
            : "Conversion failed. The file may have no video track or use an unsupported codec. Please try another file.",
        );
        track("tool_error", { tool: "media-converter", to: target });
      }
    } finally {
      ffmpeg.off("progress", onProgress);
      await ffmpeg.deleteFile(input).catch(() => {});
      await ffmpeg.deleteFile(output).catch(() => {});
      setStage("idle");
      setProgress(null);
    }
  }

  function cancel() {
    cancelled.current = true;
    cancelFFmpeg();
  }

  if (!file) {
    return (
      <div className="space-y-4">
        <Dropzone
          accept={ACCEPT_MEDIA}
          onFiles={pick}
          title={from ? `Drag & drop your ${mediaLabel[from]} file here` : "Drag & drop your audio or video file here"}
          buttonLabel="Choose File"
          hint="MP3, WAV, M4A, AAC, OGG, FLAC, MP4, MOV, AVI, WebM, MKV · up to 500 MB · converted in your browser"
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
            {kind === "video" ? "Video" : "Audio"} · {extOf(file.name).toUpperCase()} · {formatBytes(file.size)}
          </p>
        </div>
        {!busy && (
          <button type="button" className="btn btn-ghost" onClick={() => { setFile(null); setResult(null); }}>
            Choose another file
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="media-target" className="field-label">
            Convert to
          </label>
          <select
            id="media-target"
            className="input"
            value={target}
            disabled={busy}
            onChange={(e) => { setTarget(e.target.value as MediaFormat); setResult(null); }}
          >
            <optgroup label="Audio">
              {audioFormats.map((f) => (
                <option key={f} value={f}>{mediaLabel[f]}</option>
              ))}
            </optgroup>
            {kind === "video" && (
              <optgroup label="Video">
                {videoFormats.map((f) => (
                  <option key={f} value={f}>{mediaLabel[f]}</option>
                ))}
              </optgroup>
            )}
          </select>
        </div>
        <div>
          {["mp3", "m4a", "aac", "ogg"].includes(target) && (
            <>
              <p className="field-label">Audio quality</p>
              <Segmented label="Audio bitrate" value={audio} onChange={setAudio} options={[
                { id: "128k", label: "128 kbps" },
                { id: "192k", label: "192 kbps" },
                { id: "320k", label: "320 kbps" },
              ]} />
            </>
          )}
          {["mp4", "mov", "mkv", "avi", "webm"].includes(target) && (
            <>
              <p className="field-label">Video quality</p>
              <Segmented label="Video quality" value={video} onChange={setVideo} options={[
                { id: "high", label: "High" },
                { id: "balanced", label: "Balanced" },
                { id: "small", label: "Small file" },
              ]} />
            </>
          )}
          {target === "gif" && (
            <div className="space-y-3">
              <div>
                <p className="field-label">GIF width</p>
                <Segmented label="GIF width" value={gifWidth} onChange={setGifWidth} options={[
                  { id: "320", label: "320 px" },
                  { id: "480", label: "480 px" },
                  { id: "640", label: "640 px" },
                ]} />
              </div>
              <div>
                <p className="field-label">Frame rate</p>
                <Segmented label="Frame rate" value={gifFps} onChange={setGifFps} options={[
                  { id: "10", label: "10 fps" },
                  { id: "15", label: "15 fps" },
                ]} />
              </div>
            </div>
          )}
        </div>
      </div>

      {!targets.includes(target) && <Notice>Video formats are only available for video files.</Notice>}
      {kind === "video" && !isAudioTarget && (
        <Notice>Video conversion runs on your device and can take about as long as the video plays, or longer on phones.</Notice>
      )}

      <ErrorMessage>{error}</ErrorMessage>

      {stage === "loading" && <Progress value={null} label="Loading converter (about 30 MB, only the first time)…" />}
      {stage === "converting" && <Progress value={progress} label="Converting…" />}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={busy} onClick={convert}>
          {busy ? "Working…" : `Convert to ${mediaLabel[target]}`}
        </button>
        {stage === "converting" && (
          <button type="button" className="btn btn-secondary" onClick={cancel}>
            Cancel
          </button>
        )}
      </div>

      {result && (
        <section aria-label="Result" className="space-y-4 rounded-2xl border border-line p-4">
          <p className="text-ink">
            {result.name} · <strong>{formatBytes(result.blob.size)}</strong>
          </p>
          {isAudioTarget ? (
            <audio controls src={result.url} className="w-full" />
          ) : target === "gif" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={result.url} alt="Converted GIF preview" className="max-h-72 rounded-xl" />
          ) : ["mp4", "webm", "mov"].includes(target) ? (
            <video controls src={result.url} className="max-h-72 w-full rounded-xl bg-black" />
          ) : null}
          <button
            type="button"
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => {
              downloadBlob(result.blob, result.name);
              track("download", { tool: "media-converter", to: target });
            }}
          >
            <DownloadIcon width={18} height={18} /> Download {mediaLabel[target]}
          </button>
        </section>
      )}
    </div>
  );
}
