// Copies browser runtime files that must be served from /public and match installed package versions.
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = dirname(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")));
const pub = join(root, "public");
mkdirSync(pub, { recursive: true });

const pdfjsDir = dirname(require.resolve("pdfjs-dist/package.json"));
copyFileSync(join(pdfjsDir, "build", "pdf.worker.min.mjs"), join(pub, "pdf.worker.min.mjs"));
console.log("copied pdf.worker.min.mjs");

// ffmpeg.wasm's worker must load its core with a native import(), which bundlers rewrite,
// so the worker is served unbundled from /ffmpeg/ and passed as classWorkerURL.
const ffmpegDir = join(root, "node_modules", "@ffmpeg", "ffmpeg", "dist", "esm");
mkdirSync(join(pub, "ffmpeg"), { recursive: true });
for (const f of ["worker.js", "const.js", "errors.js"]) copyFileSync(join(ffmpegDir, f), join(pub, "ffmpeg", f));
console.log("copied ffmpeg worker");
