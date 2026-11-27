"use client";

import { useEffect, useRef, useState } from "react";
import { DownloadIcon } from "@/components/Icons";
import { track } from "@/lib/analytics";
import { downloadBlob, extOf, formatBytes, MB, sanitizeBaseName } from "@/lib/files";
import { ACCEPT_MEDIA, cancelFFmpeg, getFFmpeg, mediaKind, mimeFor, trimArgs } from "@/lib/media";
import type { MediaFormat } from "@/lib/types";
import { Dropzone, ErrorMessage, Notice, Progress, Segmented, Stat } from "./ui";

const MAX_SIZE = 500 * MB;
const ACCEPT_AUDIO = "audio/*,.mp3,.wav,.m4a,.aac,.ogg,.oga,.opus,.flac,.wma,.aiff,.amr";
const ACCEPT_VIDEO = "video/*,.mp4,.mov,.avi,.webm,.mkv,.m4v,.3gp,.wmv,.flv";

/** Seconds as m:ss, or h:mm:ss once the file runs past an hour. */
function toClock(s: number): string {
  const total = Math.max(0, Math.floor(s));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(sec).padStart(2, "0")}`;
}

/** Accepts "12", "1:05" or "1:02:03"; returns null when it is not a time. */
function fromClock(value: string): number | null {
  const parts = value.trim().split(":");
  if (parts.length > 3 || parts.some((p) => p !== "" && !/^\d*\.?\d*$/.test(p))) return null;
  const nums = parts.map((p) => (p === "" ? 0 : Number(p)));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  const seconds = nums.reduce((acc, n) => acc * 60 + n, 0);
  return Number.isFinite(seconds) ? seconds : null;
}

function readDuration(file: File, kind: "video" | "audio"): Promise<number | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const el = document.createElement(kind === "video" ? "video" : "audio");
    el.preload = "metadata";
    const done = (d: number | null) => {
      URL.revokeObjectURL(url);
      resolve(d);
    };
    el.onloadedmetadata = () => done(Number.isFinite(el.duration) && el.duration > 0 ? el.duration : null);
    el.onerror = () => done(null);
    el.src = url;
  });
}

export default function MediaTrimmer({ kind }: { kind: "video" | "audio" }) {
  const tool = kind === "video" ? "trim-video" : "mp3-cutter";
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [startText, setStartText] = useState("0:00");
  const [endText, setEndText] = useState("0:00");
  const [mode, setMode] = useState<"copy" | "precise">("copy");
  const [stage, setStage] = useState<"idle" | "loading" | "working">("idle");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const player = useRef<HTMLVideoElement & HTMLAudioElement>(null);
  const cancelled = useRef(false);

  useEffect(() => track("tool_open", { tool }), [tool]);
  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  const busy = stage !== "idle";
  const span = Math.max(0, end - start);

  function setStartAt(value: number) {
    const v = Math.min(Math.max(0, value), Math.max(0, end - 0.1));
    setStart(v);
    setStartText(toClock(v));
  }

  function setEndAt(value: number) {
    const v = Math.max(Math.min(duration ?? value, value), start + 0.1);
    setEnd(v);
    setEndText(toClock(v));
  }

  function reset() {
    if (url) URL.revokeObjectURL(url);
    setFile(null);
    setUrl("");
    setDuration(null);
    setResult(null);
    setError("");
  }

  async function pick(files: File[]) {
    const f = files[0];
    setError("");
    setResult(null);
    if (f.size > MAX_SIZE) return setError("File size exceeds the allowed limit of 500 MB.");
    const detected = mediaKind(f);
    if (detected !== kind) {
      return setError(kind === "video" ? "Please upload a video file." : "Please upload an audio file.");
    }
    const d = await readDuration(f, kind);
    if (!d) {
      return setError("The length of this file could not be read, so it cannot be trimmed here. Please try another file.");
    }
    if (url) URL.revokeObjectURL(url);
    setFile(f);
    setUrl(URL.createObjectURL(f));
    setDuration(d);
    setStart(0);
    setStartText("0:00");
    setEnd(d);
    setEndText(toClock(d));
    setMode("copy");
    track("file_upload", { tool, ext: extOf(f.name) });
  }

  async function run() {
    if (!file || !duration) return;
    if (span < 0.1) return setError("The end has to come after the start.");
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
      setError("The trimmer could not be loaded. Please check your internet connection and try again.");
      track("tool_error", { tool, stage: "load" });
      return;
    }

    setStage("working");
    const ext = extOf(file.name) || (kind === "video" ? "mp4" : "mp3");
    const outExt = mode === "precise" && kind === "video" ? "mp4" : ext;
    const input = `input.${ext}`;
    const output = `output.${outExt}`;
    const onProgress = ({ progress: p }: { progress: number }) => setProgress(Math.min(1, Math.max(0, p)));
    ffmpeg.on("progress", onProgress);
    try {
      await ffmpeg.writeFile(input, new Uint8Array(await file.arrayBuffer()));
      const code = await ffmpeg.exec(trimArgs(input, output, { start, end, mode, kind }));
      if (cancelled.current) return;
      if (code !== 0) throw new Error(`ffmpeg exit ${code}`);
      const data = (await ffmpeg.readFile(output)) as Uint8Array;
      if (!data.length) throw new Error("empty output");
      const type = mimeFor[outExt as MediaFormat] ?? (kind === "video" ? "video/mp4" : "audio/mpeg");
      setResult({
        blob: new Blob([data as BlobPart], { type }),
        name: `${sanitizeBaseName(file.name)}-trimmed.${outExt}`,
      });
      track("conversion_complete", { tool, mode });
    } catch {
      if (!cancelled.current) {
        setError(
          mode === "copy"
            ? "The cut failed. This file may not support a lossless cut – switch to “Exact cut” and try again."
            : "The cut failed. The file may use an unsupported codec. Please try another file.",
        );
        track("tool_error", { tool });
      }
    } finally {
      ffmpeg.off("progress", onProgress);
      await ffmpeg.deleteFile(input).catch(() => {});
      await ffmpeg.deleteFile(output).catch(() => {});
      setStage("idle");
      setProgress(null);
    }
  }

  if (!file || !duration) {
    return (
      <div className="space-y-4">
        <Dropzone
          accept={kind === "video" ? ACCEPT_VIDEO : ACCEPT_AUDIO}
          onFiles={pick}
          title={kind === "video" ? "Drag & drop your video here" : "Drag & drop your audio here"}
          buttonLabel={kind === "video" ? "Choose Video" : "Choose Audio"}
          hint={
            kind === "video"
              ? "MP4, MOV, AVI, WebM, MKV · up to 500 MB · trimmed in your browser"
              : "MP3, WAV, M4A, AAC, OGG, FLAC · up to 500 MB · trimmed in your browser"
          }
        />
        <ErrorMessage>{error}</ErrorMessage>
        <p className="sr-only">{ACCEPT_MEDIA}</p>
      </div>
    );
  }

  const Player = kind === "video" ? "video" : "audio";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{file.name}</p>
          <p className="text-sm text-muted">
            {formatBytes(file.size)} · {toClock(duration)} long
          </p>
        </div>
        <button type="button" className="btn btn-ghost" disabled={busy} onClick={reset}>
          Choose another file
        </button>
      </div>

      <Player
        ref={player}
        src={url}
        controls
        preload="metadata"
        className={kind === "video" ? "w-full rounded-2xl bg-black" : "w-full"}
      />

      <div className="space-y-4 rounded-2xl border border-line p-4">
        {(
          [
            { id: "start", label: "Start", value: start, text: startText },
            { id: "end", label: "End", value: end, text: endText },
          ] as const
        ).map(({ id, label, value, text }) => (
          <div key={id}>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={`t-${id}`} className="field-label mb-0">
                {label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`t-${id}-text`}
                  type="text"
                  inputMode="numeric"
                  aria-label={`${label} time`}
                  className="input w-24 py-1 text-center font-mono text-sm"
                  value={text}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (id === "start") setStartText(raw);
                    else setEndText(raw);
                    const parsed = fromClock(raw);
                    if (parsed === null) return;
                    if (id === "start") setStart(Math.min(Math.max(0, parsed), Math.max(0, end - 0.1)));
                    else setEnd(Math.max(Math.min(duration, parsed), start + 0.1));
                  }}
                  onBlur={() => (id === "start" ? setStartAt(start) : setEndAt(end))}
                />
                <button
                  type="button"
                  className="btn btn-ghost px-2 py-1 text-xs"
                  disabled={busy}
                  onClick={() => {
                    const t = player.current?.currentTime;
                    if (typeof t === "number") (id === "start" ? setStartAt : setEndAt)(t);
                  }}
                >
                  Use playhead
                </button>
              </div>
            </div>
            <input
              id={`t-${id}`}
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={value}
              disabled={busy}
              aria-label={`${label} position`}
              className="mt-2 w-full accent-[var(--accent)]"
              onChange={(e) => (id === "start" ? setStartAt : setEndAt)(Number(e.target.value))}
            />
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
          <p className="text-sm text-muted">
            Keeping <span className="font-medium text-ink">{toClock(span)}</span> of {toClock(duration)}
          </p>
          <button
            type="button"
            className="btn btn-ghost px-3 py-1 text-xs"
            disabled={busy}
            onClick={() => {
              const p = player.current;
              if (!p) return;
              p.currentTime = start;
              void p.play();
            }}
          >
            Play from start point
          </button>
        </div>
      </div>

      {kind === "video" && (
        <div>
          <p className="field-label">Cut type</p>
          <Segmented
            label="Cut type"
            value={mode}
            onChange={setMode}
            options={[
              { id: "copy", label: "Fast & lossless" },
              { id: "precise", label: "Exact cut" },
            ]}
          />
          <p className="mt-1.5 text-xs text-muted">
            {mode === "copy"
              ? "Instant, and the video keeps its original quality. The cut can start up to a couple of seconds early, at the nearest keyframe."
              : "The clip is re-encoded as MP4 so it starts on the exact frame. Slower, and quality drops very slightly."}
          </p>
        </div>
      )}

      <Notice>
        {kind === "video"
          ? "Trimming happens on your own device – the video is never uploaded."
          : "The audio is cut without re-encoding, so there is no quality loss, and the file is never uploaded."}
      </Notice>

      {busy ? (
        <div className="space-y-3">
          <Progress
            value={progress}
            label={stage === "loading" ? "Loading trimmer (about 30 MB, only the first time)…" : "Trimming…"}
          />
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
          {kind === "video" ? "Trim Video" : "Cut MP3"}
        </button>
      )}

      <ErrorMessage>{error}</ErrorMessage>

      {result && (
        <div className="space-y-4 rounded-2xl border border-line p-4">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Original" value={formatBytes(file.size)} />
            <Stat label="Trimmed" value={formatBytes(result.blob.size)} />
            <Stat label="Length kept" value={toClock(span)} tone="good" />
          </dl>
          <button
            type="button"
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => downloadBlob(result.blob, result.name)}
          >
            <DownloadIcon width={18} height={18} />
            Download {result.name.split(".").pop()?.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  );
}
