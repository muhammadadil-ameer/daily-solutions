import type { MediaFormat } from "@/lib/types";

export const audioFormats: MediaFormat[] = ["mp3", "wav", "m4a", "aac", "ogg", "flac"];
export const videoFormats: MediaFormat[] = ["mp4", "mov", "avi", "webm", "mkv", "gif"];

export const mediaLabel: Record<MediaFormat, string> = {
  mp3: "MP3", wav: "WAV", m4a: "M4A", aac: "AAC", ogg: "OGG", flac: "FLAC",
  mp4: "MP4", mov: "MOV", avi: "AVI", webm: "WebM", mkv: "MKV", gif: "GIF",
};

const audioExt = ["mp3", "wav", "m4a", "aac", "ogg", "oga", "opus", "flac", "wma", "aiff", "aif", "amr"];
const videoExt = ["mp4", "m4v", "mov", "avi", "webm", "mkv", "3gp", "wmv", "flv", "mpeg", "mpg", "ts"];

export const ACCEPT_MEDIA = `audio/*,video/*,${[...audioExt, ...videoExt].map((e) => `.${e}`).join(",")}`;

export function mediaKind(file: File): "audio" | "video" | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (videoExt.includes(ext)) return "video";
  if (audioExt.includes(ext)) return "audio";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  return null;
}

export type AudioQuality = "128k" | "192k" | "320k";
export type VideoQuality = "high" | "balanced" | "small";
export type GifWidth = "320" | "480" | "640";

export interface ConvertOptions {
  audio: AudioQuality;
  video: VideoQuality;
  gifWidth: GifWidth;
  gifFps: "10" | "15";
}

const crf: Record<VideoQuality, string> = { high: "20", balanced: "26", small: "32" };
const vp8Bitrate: Record<VideoQuality, string> = { high: "2M", balanced: "1M", small: "500k" };
const mpeg4Q: Record<VideoQuality, string> = { high: "3", balanced: "5", small: "8" };

/** FFmpeg arguments that turn `input` into `output` for the target format. */
export function ffmpegArgs(input: string, output: string, to: MediaFormat, o: ConvertOptions): string[] {
  const i = ["-i", input];
  switch (to) {
    case "mp3":
      return [...i, "-vn", "-c:a", "libmp3lame", "-b:a", o.audio, output];
    case "wav":
      return [...i, "-vn", "-c:a", "pcm_s16le", output];
    case "m4a":
      return [...i, "-vn", "-c:a", "aac", "-b:a", o.audio, output];
    case "aac":
      return [...i, "-vn", "-c:a", "aac", "-b:a", o.audio, "-f", "adts", output];
    case "ogg":
      return [...i, "-vn", "-c:a", "libvorbis", "-b:a", o.audio, output];
    case "flac":
      return [...i, "-vn", "-c:a", "flac", output];
    case "mp4":
    case "mov":
    case "mkv":
      return [
        ...i, "-c:v", "libx264", "-preset", "superfast", "-crf", crf[o.video], "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "160k", ...(to === "mkv" ? [] : ["-movflags", "+faststart"]), output,
      ];
    case "avi":
      return [...i, "-c:v", "mpeg4", "-q:v", mpeg4Q[o.video], "-c:a", "libmp3lame", "-b:a", "192k", output];
    case "webm":
      return [
        ...i, "-c:v", "libvpx", "-b:v", vp8Bitrate[o.video], "-deadline", "realtime", "-cpu-used", "8",
        "-c:a", "libvorbis", "-b:a", "128k", output,
      ];
    case "gif":
      return [
        ...i,
        "-filter_complex",
        `fps=${o.gifFps},scale=${o.gifWidth}:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`,
        "-loop", "0", output,
      ];
  }
}

export const mimeFor: Record<MediaFormat, string> = {
  mp3: "audio/mpeg", wav: "audio/wav", m4a: "audio/mp4", aac: "audio/aac", ogg: "audio/ogg", flac: "audio/flac",
  mp4: "video/mp4", mov: "video/quicktime", avi: "video/x-msvideo", webm: "video/webm", mkv: "video/x-matroska", gif: "image/gif",
};

const CORE_BASE = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

type FFmpegInstance = InstanceType<(typeof import("@ffmpeg/ffmpeg"))["FFmpeg"]>;
let loading: Promise<FFmpegInstance> | null = null;

/** Loads FFmpeg once per page; the ~30 MB core is fetched from jsDelivr and cached by the browser. */
export function getFFmpeg(): Promise<FFmpegInstance> {
  if (!loading) {
    loading = (async () => {
      const [{ FFmpeg }, { toBlobURL }] = await Promise.all([import("@ffmpeg/ffmpeg"), import("@ffmpeg/util")]);
      const ffmpeg = new FFmpeg();
      await ffmpeg.load({
        // Absolute URL: the bundler rewrites import.meta.url, which the library resolves this against.
        classWorkerURL: `${location.origin}/ffmpeg/worker.js`,
        coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm"),
      });
      return ffmpeg;
    })().catch((e) => {
      loading = null;
      throw e;
    });
  }
  return loading;
}

/** Stops a running conversion by killing the worker; the next call to getFFmpeg() starts a fresh one. */
export function cancelFFmpeg() {
  const current = loading;
  loading = null;
  current?.then((f) => f.terminate()).catch(() => {});
}
