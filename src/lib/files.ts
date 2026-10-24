export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function reductionPercent(before: number, after: number): number {
  if (!before) return 0;
  return Math.round(((before - after) / before) * 100);
}

/** Strips path parts and unsafe characters so generated download names are always clean. */
export function sanitizeBaseName(name: string): string {
  const base = name.replace(/^.*[\\/]/, "").replace(/\.[^.]+$/, "");
  const clean = base
    .normalize("NFKD")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
  return clean || "file";
}

export function extOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  return m ? m[1].toLowerCase() : "";
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export async function zipAndDownload(files: { name: string; blob: Blob }[], zipName: string) {
  const { zipSync } = await import("fflate");
  const entries: Record<string, Uint8Array> = {};
  const used = new Set<string>();
  for (const f of files) {
    let name = f.name;
    let i = 2;
    while (used.has(name)) name = f.name.replace(/(\.[^.]+)?$/, `-${i++}$1`);
    used.add(name);
    entries[name] = new Uint8Array(await f.blob.arrayBuffer());
  }
  // Images and PDFs are already compressed; storing avoids wasted CPU.
  const zipped = zipSync(entries, { level: 0 });
  downloadBlob(new Blob([zipped as BlobPart], { type: "application/zip" }), zipName);
}

export const MB = 1024 * 1024;
