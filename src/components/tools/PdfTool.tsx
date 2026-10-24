"use client";

import { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon, UpIcon } from "@/components/Icons";
import { track } from "@/lib/analytics";
import { downloadBlob, formatBytes, MB, reductionPercent, sanitizeBaseName, zipAndDownload } from "@/lib/files";
import { ACCEPT_IMAGES, decodeImage, encodeImage, ImageToolError, sniffFormat } from "@/lib/image/codecs";
import {
  compressionLevels,
  compressPdf,
  copyPages,
  isPdf,
  loadPdfLib,
  openPdf,
  openPdfjs,
  parseRanges,
  pdfBlob,
  PdfToolError,
  renderPage,
  type CompressionLevel,
  type CompressResult,
} from "@/lib/pdf";
import type { PdfAction } from "@/lib/types";
import { Dropzone, ErrorMessage, Notice, Progress, Segmented, Stat } from "./ui";

const MAX_PDF = 100 * MB;

const actions: { id: PdfAction; label: string }[] = [
  { id: "compress", label: "Compress" },
  { id: "merge", label: "Merge" },
  { id: "split", label: "Split" },
  { id: "images-to-pdf", label: "JPG to PDF" },
  { id: "pdf-to-jpg", label: "PDF to JPG" },
  { id: "pdf-to-png", label: "PDF to PNG" },
  { id: "rotate", label: "Rotate" },
  { id: "extract", label: "Extract Pages" },
  { id: "delete", label: "Delete Pages" },
  { id: "reorder", label: "Reorder Pages" },
];

const userMessage = (e: unknown) =>
  e instanceof PdfToolError || e instanceof ImageToolError ? e.message : "Processing failed. Please try another file.";

export default function PdfTool({ action = "compress", targetKB, toolkit = false }: { action?: PdfAction; targetKB?: number; toolkit?: boolean }) {
  const [current, setCurrent] = useState<PdfAction>(action);
  useEffect(() => track("tool_open", { tool: toolkit ? "pdf-toolkit" : `pdf-${action}` }), [action, toolkit]);

  return (
    <div className="space-y-6">
      {toolkit && (
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <Segmented label="PDF task" value={current} onChange={setCurrent} options={actions} />
        </div>
      )}
      <Panel key={current} action={current} targetKB={current === action ? targetKB : undefined} />
      {toolkit && <Notice>Coming later: PDF to Word, Word to PDF and PDF to Excel.</Notice>}
    </div>
  );
}

function Panel({ action, targetKB }: { action: PdfAction; targetKB?: number }) {
  switch (action) {
    case "compress":
      return <CompressPanel targetKB={targetKB} />;
    case "merge":
      return <MergePanel />;
    case "split":
      return <SplitPanel />;
    case "images-to-pdf":
      return <ImagesToPdfPanel />;
    case "pdf-to-jpg":
      return <PdfToImagesPanel format="jpg" />;
    case "pdf-to-png":
      return <PdfToImagesPanel format="png" />;
    case "rotate":
      return <RotatePanel />;
    case "extract":
      return <PagesPanel mode="extract" />;
    case "delete":
      return <PagesPanel mode="delete" />;
    case "reorder":
      return <ReorderPanel />;
  }
}

/* ---------- shared ---------- */

async function validatePdf(file: File) {
  if (file.size > MAX_PDF) throw new PdfToolError("File size exceeds the allowed limit of 100 MB.");
  if (!(await isPdf(file))) throw new PdfToolError("Please upload a valid PDF file.");
}

function useSinglePdf(tool: string) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(files: File[]) {
    setError("");
    setBusy(true);
    try {
      await validatePdf(files[0]);
      const doc = await openPdf(files[0]);
      setPages(doc.getPageCount());
      setFile(files[0]);
      track("file_upload", { tool });
    } catch (e) {
      setError(userMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return { file, pages, error, setError, busy, setBusy, load, reset: () => setFile(null) };
}

function PdfDrop({ onFiles, multiple = false, busy }: { onFiles: (f: File[]) => void; multiple?: boolean; busy?: boolean }) {
  return (
    <Dropzone
      accept="application/pdf,.pdf"
      multiple={multiple}
      onFiles={onFiles}
      title={multiple ? "Drag & drop your PDF files here" : "Drag & drop your PDF here"}
      buttonLabel={busy ? "Opening…" : multiple ? "Choose PDFs" : "Choose PDF"}
      hint="Up to 100 MB · processed in your browser, not uploaded"
    />
  );
}

function FileBar({ file, pages, onReset }: { file: File; pages: number; onReset: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-ink">{file.name}</p>
        <p className="text-sm text-muted">
          {pages} page{pages === 1 ? "" : "s"} · {formatBytes(file.size)}
        </p>
      </div>
      <button type="button" className="btn btn-ghost" onClick={onReset}>
        Choose another file
      </button>
    </div>
  );
}

function DownloadButton({ blob, name, tool, label = "Download PDF" }: { blob: Blob; name: string; tool: string; label?: string }) {
  return (
    <button
      type="button"
      className="btn btn-primary w-full sm:w-auto"
      onClick={() => {
        downloadBlob(blob, name);
        track("download", { tool });
      }}
    >
      <DownloadIcon width={18} height={18} /> {label}
    </button>
  );
}

function OutputList({ outputs, tool, zipName }: { outputs: { name: string; blob: Blob }[]; tool: string; zipName: string }) {
  return (
    <section aria-label="Results" className="space-y-3 rounded-2xl border border-line p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-medium text-ink">
          {outputs.length} file{outputs.length === 1 ? "" : "s"} ready
        </p>
        {outputs.length > 1 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              zipAndDownload(outputs, zipName);
              track("download", { tool, type: "zip" });
            }}
          >
            <DownloadIcon width={18} height={18} /> Download All (ZIP)
          </button>
        )}
      </div>
      <ul className="max-h-80 divide-y divide-line overflow-y-auto rounded-xl border border-line">
        {outputs.map((o) => (
          <li key={o.name} className="flex items-center justify-between gap-3 px-3 py-2">
            <span className="min-w-0 truncate text-sm text-ink">
              {o.name} <span className="text-muted">· {formatBytes(o.blob.size)}</span>
            </span>
            <button
              type="button"
              className="btn btn-secondary min-h-9 px-3 py-1"
              onClick={() => {
                downloadBlob(o.blob, o.name);
                track("download", { tool });
              }}
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- compress ---------- */

const targetOptions = [100, 200, 500, 1024, 2048];
const kbLabel = (kb: number) => (kb >= 1024 ? `${kb / 1024} MB` : `${kb} KB`);

function CompressPanel({ targetKB }: { targetKB?: number }) {
  const s = useSinglePdf("pdf-compress");
  const [mode, setMode] = useState<"level" | "size">(targetKB ? "size" : "level");
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [target, setTarget] = useState(targetKB ?? 200);
  const [progress, setProgress] = useState<{ p: number; label: string } | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);

  async function run() {
    if (!s.file) return;
    s.setError("");
    s.setBusy(true);
    setResult(null);
    try {
      const r = await compressPdf(s.file, mode === "level" ? { level } : { targetBytes: target * 1024 }, (p, label) =>
        setProgress({ p, label }),
      );
      setResult(r);
      track("conversion_complete", { tool: "pdf-compress", method: r.method });
    } catch (e) {
      s.setError(userMessage(e));
      track("tool_error", { tool: "pdf-compress" });
    } finally {
      s.setBusy(false);
      setProgress(null);
    }
  }

  if (!s.file)
    return (
      <div className="space-y-4">
        <PdfDrop onFiles={s.load} busy={s.busy} />
        <ErrorMessage>{s.error}</ErrorMessage>
      </div>
    );

  const larger = result && result.bytes.length >= s.file.size;
  return (
    <div className="space-y-5">
      <FileBar file={s.file} pages={s.pages} onReset={() => { s.reset(); setResult(null); }} />
      <Segmented
        label="Compression type"
        value={mode}
        onChange={(m) => { setMode(m); setResult(null); }}
        options={[
          { id: "level", label: "Compression level" },
          { id: "size", label: "Target size" },
        ]}
      />
      {mode === "level" ? (
        <Segmented
          label="Compression level"
          value={level}
          onChange={(l) => { setLevel(l); setResult(null); }}
          options={(Object.keys(compressionLevels) as CompressionLevel[]).map((k) => ({ id: k, label: compressionLevels[k].label }))}
        />
      ) : (
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Target size">
          {targetOptions.map((kb) => (
            <button
              key={kb}
              type="button"
              role="radio"
              aria-checked={target === kb}
              className={`chip ${target === kb ? "chip-active" : ""}`}
              onClick={() => { setTarget(kb); setResult(null); }}
            >
              Under {kbLabel(kb)}
            </button>
          ))}
        </div>
      )}
      <Notice>Strong compression turns pages into images, so text may no longer be selectable. Low compression keeps text when possible.</Notice>
      <ErrorMessage>{s.error}</ErrorMessage>
      {progress && <Progress value={progress.p} label={progress.label} />}
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={s.busy} onClick={run}>
        {s.busy ? "Compressing…" : "Compress PDF"}
      </button>
      {result && (
        <section aria-label="Result" className="space-y-4 rounded-2xl border border-line p-4">
          {!result.fits && <ErrorMessage>Could not reach {kbLabel(target)}. This is the smallest result. Try splitting the PDF or removing pages.</ErrorMessage>}
          {larger && <Notice>This PDF is already well optimized; the compressed version is not smaller. Keep your original file.</Notice>}
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="Original size" value={formatBytes(s.file.size)} />
            <Stat label="Compressed size" value={formatBytes(result.bytes.length)} />
            <Stat label="Reduction" value={`${Math.max(0, reductionPercent(s.file.size, result.bytes.length))}%`} tone={larger ? undefined : "good"} />
          </dl>
          <p className="text-sm text-muted">
            {result.method === "structure" ? "Text remains selectable (structure optimized)." : "Pages were re-rendered as optimized images."}
          </p>
          <DownloadButton blob={pdfBlob(result.bytes)} name={`${sanitizeBaseName(s.file.name)}-compressed.pdf`} tool="pdf-compress" label="Download compressed PDF" />
        </section>
      )}
    </div>
  );
}

/* ---------- merge ---------- */

function MoveButtons({ index, length, move, remove, name }: { index: number; length: number; move: (from: number, to: number) => void; remove: () => void; name: string }) {
  const cls = "grid size-10 place-items-center rounded-lg text-muted hover:bg-surface hover:text-ink disabled:opacity-30";
  return (
    <div className="flex shrink-0 items-center">
      <button type="button" className={cls} disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={`Move ${name} up`}>
        <UpIcon width={18} height={18} />
      </button>
      <button type="button" className={cls} disabled={index === length - 1} onClick={() => move(index, index + 1)} aria-label={`Move ${name} down`}>
        <UpIcon width={18} height={18} className="rotate-180" />
      </button>
      <button type="button" className={`${cls} hover:text-red-700`} onClick={remove} aria-label={`Remove ${name}`}>
        <TrashIcon width={18} height={18} />
      </button>
    </div>
  );
}

function moveItem<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
}

function MergePanel() {
  const [files, setFiles] = useState<{ id: string; file: File; pages: number }[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  async function add(list: File[]) {
    setError("");
    setResult(null);
    const added: typeof files = [];
    for (const f of list) {
      try {
        await validatePdf(f);
        const doc = await openPdf(f);
        added.push({ id: crypto.randomUUID(), file: f, pages: doc.getPageCount() });
      } catch (e) {
        setError(`${f.name}: ${userMessage(e)}`);
      }
    }
    if (added.length) track("file_upload", { tool: "pdf-merge", count: added.length });
    setFiles((cur) => [...cur, ...added]);
  }

  async function merge() {
    if (files.length < 2) return setError("Please add at least two PDF files.");
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await loadPdfLib();
      const out = await PDFDocument.create();
      for (const { file } of files) {
        const src = await openPdf(file);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      setResult(pdfBlob(await out.save({ useObjectStreams: true })));
      track("conversion_complete", { tool: "pdf-merge", files: files.length });
    } catch (e) {
      setError(userMessage(e));
      track("tool_error", { tool: "pdf-merge" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      {files.length === 0 ? (
        <PdfDrop multiple onFiles={add} />
      ) : (
        <>
          <ol className="divide-y divide-line rounded-2xl border border-line">
            {files.map((f, i) => (
              <li key={f.id} className="flex items-center gap-3 px-4 py-2">
                <span className="w-6 text-sm font-semibold text-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{f.file.name}</p>
                  <p className="text-sm text-muted">
                    {f.pages} pages · {formatBytes(f.file.size)}
                  </p>
                </div>
                <MoveButtons
                  index={i}
                  length={files.length}
                  name={f.file.name}
                  move={(a, b) => { setFiles((c) => moveItem(c, a, b)); setResult(null); }}
                  remove={() => { setFiles((c) => c.filter((x) => x.id !== f.id)); setResult(null); }}
                />
              </li>
            ))}
          </ol>
          <Dropzone accept="application/pdf,.pdf" multiple compact onFiles={add} title="Add more PDFs" buttonLabel="Choose PDFs" />
        </>
      )}
      <ErrorMessage>{error}</ErrorMessage>
      {files.length > 0 && (
        <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={busy} onClick={merge}>
          {busy ? "Merging…" : `Merge ${files.length} PDFs`}
        </button>
      )}
      {result && (
        <section className="space-y-3 rounded-2xl border border-line p-4" aria-label="Result">
          <p className="text-ink">
            Merged PDF ready · <strong>{formatBytes(result.size)}</strong>
          </p>
          <DownloadButton blob={result} name="merged.pdf" tool="pdf-merge" />
        </section>
      )}
    </div>
  );
}

/* ---------- split ---------- */

function SplitPanel() {
  const s = useSinglePdf("pdf-split");
  const [mode, setMode] = useState<"every" | "ranges">("every");
  const [ranges, setRanges] = useState("");
  const [outputs, setOutputs] = useState<{ name: string; blob: Blob }[]>([]);

  async function run() {
    if (!s.file) return;
    s.setError("");
    s.setBusy(true);
    setOutputs([]);
    try {
      const groups = mode === "every" ? Array.from({ length: s.pages }, (_, i) => [i]) : parseRanges(ranges, s.pages);
      const src = await openPdf(s.file);
      const base = sanitizeBaseName(s.file.name);
      const out: { name: string; blob: Blob }[] = [];
      for (const g of groups) {
        const label = g.length === 1 ? `page-${g[0] + 1}` : `pages-${g[0] + 1}-${g[g.length - 1] + 1}`;
        out.push({ name: `${base}-${label}.pdf`, blob: pdfBlob(await copyPages(src, g)) });
      }
      setOutputs(out);
      track("conversion_complete", { tool: "pdf-split", parts: out.length });
    } catch (e) {
      s.setError(userMessage(e));
    } finally {
      s.setBusy(false);
    }
  }

  if (!s.file)
    return (
      <div className="space-y-4">
        <PdfDrop onFiles={s.load} busy={s.busy} />
        <ErrorMessage>{s.error}</ErrorMessage>
      </div>
    );

  return (
    <div className="space-y-5">
      <FileBar file={s.file} pages={s.pages} onReset={() => { s.reset(); setOutputs([]); }} />
      <Segmented
        label="Split mode"
        value={mode}
        onChange={setMode}
        options={[
          { id: "every", label: "Every page" },
          { id: "ranges", label: "Custom ranges" },
        ]}
      />
      {mode === "ranges" && (
        <div className="sm:max-w-md">
          <label htmlFor="ranges" className="field-label">
            Page ranges (each range becomes one PDF)
          </label>
          <input id="ranges" className="input" placeholder={`e.g. 1-3, 4-${Math.max(4, s.pages)}`} value={ranges} onChange={(e) => setRanges(e.target.value)} />
        </div>
      )}
      <ErrorMessage>{s.error}</ErrorMessage>
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={s.busy} onClick={run}>
        {s.busy ? "Splitting…" : "Split PDF"}
      </button>
      {outputs.length > 0 && <OutputList outputs={outputs} tool="pdf-split" zipName={`${sanitizeBaseName(s.file.name)}-split.zip`} />}
    </div>
  );
}

/* ---------- extract / delete ---------- */

function PagesPanel({ mode }: { mode: "extract" | "delete" }) {
  const tool = `pdf-${mode}`;
  const s = useSinglePdf(tool);
  const [ranges, setRanges] = useState("");
  const [result, setResult] = useState<Blob | null>(null);

  async function run() {
    if (!s.file) return;
    s.setError("");
    setResult(null);
    try {
      const chosen = new Set(parseRanges(ranges, s.pages).flat());
      const keep =
        mode === "extract"
          ? [...chosen].sort((a, b) => a - b)
          : Array.from({ length: s.pages }, (_, i) => i).filter((i) => !chosen.has(i));
      if (!keep.length) throw new PdfToolError("You cannot delete every page. At least one page must remain.");
      s.setBusy(true);
      setResult(pdfBlob(await copyPages(await openPdf(s.file), keep)));
      track("conversion_complete", { tool, pages: keep.length });
    } catch (e) {
      s.setError(userMessage(e));
    } finally {
      s.setBusy(false);
    }
  }

  if (!s.file)
    return (
      <div className="space-y-4">
        <PdfDrop onFiles={s.load} busy={s.busy} />
        <ErrorMessage>{s.error}</ErrorMessage>
      </div>
    );

  return (
    <div className="space-y-5">
      <FileBar file={s.file} pages={s.pages} onReset={() => { s.reset(); setResult(null); }} />
      <div className="sm:max-w-md">
        <label htmlFor="pages" className="field-label">
          {mode === "extract" ? "Pages to keep in the new PDF" : "Pages to delete"}
        </label>
        <input id="pages" className="input" placeholder="e.g. 1, 3-5" value={ranges} onChange={(e) => setRanges(e.target.value)} />
      </div>
      <ErrorMessage>{s.error}</ErrorMessage>
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={s.busy} onClick={run}>
        {mode === "extract" ? "Extract Pages" : "Delete Pages"}
      </button>
      {result && (
        <section className="space-y-3 rounded-2xl border border-line p-4" aria-label="Result">
          <p className="text-ink">New PDF ready · {formatBytes(result.size)}</p>
          <DownloadButton blob={result} name={`${sanitizeBaseName(s.file.name)}-${mode === "extract" ? "extracted" : "edited"}.pdf`} tool={tool} />
        </section>
      )}
    </div>
  );
}

/* ---------- rotate ---------- */

function RotatePanel() {
  const s = useSinglePdf("pdf-rotate");
  const [angle, setAngle] = useState<"90" | "180" | "270">("90");
  const [scope, setScope] = useState<"all" | "some">("all");
  const [ranges, setRanges] = useState("");
  const [result, setResult] = useState<Blob | null>(null);

  async function run() {
    if (!s.file) return;
    s.setError("");
    setResult(null);
    try {
      const { degrees } = await loadPdfLib();
      const doc = await openPdf(s.file);
      const targets = scope === "all" ? doc.getPageIndices() : parseRanges(ranges, s.pages).flat();
      s.setBusy(true);
      for (const i of new Set(targets)) {
        const page = doc.getPage(i);
        page.setRotation(degrees((page.getRotation().angle + Number(angle)) % 360));
      }
      setResult(pdfBlob(await doc.save()));
      track("conversion_complete", { tool: "pdf-rotate" });
    } catch (e) {
      s.setError(userMessage(e));
    } finally {
      s.setBusy(false);
    }
  }

  if (!s.file)
    return (
      <div className="space-y-4">
        <PdfDrop onFiles={s.load} busy={s.busy} />
        <ErrorMessage>{s.error}</ErrorMessage>
      </div>
    );

  return (
    <div className="space-y-5">
      <FileBar file={s.file} pages={s.pages} onReset={() => { s.reset(); setResult(null); }} />
      <Segmented
        label="Rotation"
        value={angle}
        onChange={setAngle}
        options={[
          { id: "90", label: "90° right" },
          { id: "180", label: "180°" },
          { id: "270", label: "90° left" },
        ]}
      />
      <Segmented
        label="Pages to rotate"
        value={scope}
        onChange={setScope}
        options={[
          { id: "all", label: "All pages" },
          { id: "some", label: "Selected pages" },
        ]}
      />
      {scope === "some" && (
        <div className="sm:max-w-md">
          <label htmlFor="rot-pages" className="field-label">
            Pages
          </label>
          <input id="rot-pages" className="input" placeholder="e.g. 1, 3-5" value={ranges} onChange={(e) => setRanges(e.target.value)} />
        </div>
      )}
      <ErrorMessage>{s.error}</ErrorMessage>
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={s.busy} onClick={run}>
        Rotate PDF
      </button>
      {result && (
        <section className="space-y-3 rounded-2xl border border-line p-4" aria-label="Result">
          <p className="text-ink">Rotated PDF ready · {formatBytes(result.size)}</p>
          <DownloadButton blob={result} name={`${sanitizeBaseName(s.file.name)}-rotated.pdf`} tool="pdf-rotate" />
        </section>
      )}
    </div>
  );
}

/* ---------- reorder ---------- */

function ReorderPanel() {
  const s = useSinglePdf("pdf-reorder");
  const [order, setOrder] = useState<{ index: number; thumb: string }[]>([]);
  const [result, setResult] = useState<Blob | null>(null);

  async function load(files: File[]) {
    await s.load(files);
  }

  useEffect(() => {
    if (!s.file) return;
    let cancelled = false;
    (async () => {
      try {
        const doc = await openPdfjs(s.file!);
        const list: { index: number; thumb: string }[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const { canvas } = await renderPage(doc, i, 0.3);
          list.push({ index: i - 1, thumb: canvas.toDataURL("image/jpeg", 0.6) });
          if (cancelled) return;
          if (i % 4 === 0 || i === doc.numPages) setOrder([...list]);
        }
        await doc.close();
      } catch (e) {
        s.setError(userMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.file]);

  async function save() {
    if (!s.file) return;
    s.setBusy(true);
    try {
      setResult(pdfBlob(await copyPages(await openPdf(s.file), order.map((o) => o.index))));
      track("conversion_complete", { tool: "pdf-reorder" });
    } catch (e) {
      s.setError(userMessage(e));
    } finally {
      s.setBusy(false);
    }
  }

  if (!s.file)
    return (
      <div className="space-y-4">
        <PdfDrop onFiles={load} busy={s.busy} />
        <ErrorMessage>{s.error}</ErrorMessage>
      </div>
    );

  return (
    <div className="space-y-5">
      <FileBar file={s.file} pages={s.pages} onReset={() => { s.reset(); setOrder([]); setResult(null); }} />
      {order.length < s.pages && <Progress value={order.length / s.pages} label="Loading page previews…" />}
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {order.map((o, i) => (
          <li key={o.index} className="rounded-xl border border-line p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.thumb} alt={`Page ${o.index + 1}`} className="aspect-[3/4] w-full rounded-lg bg-surface object-contain" />
            <div className="mt-1 flex items-center justify-between gap-1">
              <span className="text-sm text-muted">Page {o.index + 1}</span>
              <MoveButtons
                index={i}
                length={order.length}
                name={`page ${o.index + 1}`}
                move={(a, b) => { setOrder((c) => moveItem(c, a, b)); setResult(null); }}
                remove={() => { setOrder((c) => c.filter((x) => x.index !== o.index)); setResult(null); }}
              />
            </div>
          </li>
        ))}
      </ol>
      <ErrorMessage>{s.error}</ErrorMessage>
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={s.busy || !order.length || order.length < 1} onClick={save}>
        Save New Order
      </button>
      {result && (
        <section className="space-y-3 rounded-2xl border border-line p-4" aria-label="Result">
          <p className="text-ink">Reordered PDF ready · {formatBytes(result.size)}</p>
          <DownloadButton blob={result} name={`${sanitizeBaseName(s.file.name)}-reordered.pdf`} tool="pdf-reorder" />
        </section>
      )}
    </div>
  );
}

/* ---------- PDF to images ---------- */

const dpiOptions = [
  { id: "100", label: "Standard (100 DPI)" },
  { id: "150", label: "High (150 DPI)" },
  { id: "220", label: "Very high (220 DPI)" },
] as const;

function PdfToImagesPanel({ format }: { format: "jpg" | "png" }) {
  const tool = `pdf-to-${format}`;
  const s = useSinglePdf(tool);
  const [dpi, setDpi] = useState<"100" | "150" | "220">("150");
  const [progress, setProgress] = useState<number | null>(null);
  const [outputs, setOutputs] = useState<{ name: string; blob: Blob }[]>([]);

  async function run() {
    if (!s.file) return;
    s.setError("");
    s.setBusy(true);
    setOutputs([]);
    try {
      const doc = await openPdfjs(s.file);
      const base = sanitizeBaseName(s.file.name);
      const out: { name: string; blob: Blob }[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const { canvas } = await renderPage(doc, i, Number(dpi) / 72);
        const blob = await encodeImage(canvas, format, 0.85);
        canvas.width = canvas.height = 0;
        out.push({ name: `${base}-page-${i}.${format}`, blob });
        setProgress(i / doc.numPages);
      }
      await doc.close();
      setOutputs(out);
      track("conversion_complete", { tool, pages: out.length });
    } catch (e) {
      s.setError(userMessage(e));
      track("tool_error", { tool });
    } finally {
      s.setBusy(false);
      setProgress(null);
    }
  }

  if (!s.file)
    return (
      <div className="space-y-4">
        <PdfDrop onFiles={s.load} busy={s.busy} />
        <ErrorMessage>{s.error}</ErrorMessage>
      </div>
    );

  return (
    <div className="space-y-5">
      <FileBar file={s.file} pages={s.pages} onReset={() => { s.reset(); setOutputs([]); }} />
      <Segmented label="Image quality" value={dpi} onChange={setDpi} options={[...dpiOptions]} />
      <ErrorMessage>{s.error}</ErrorMessage>
      {progress !== null && <Progress value={progress} label="Converting pages…" />}
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={s.busy} onClick={run}>
        {s.busy ? "Converting…" : `Convert to ${format.toUpperCase()}`}
      </button>
      {outputs.length > 0 && <OutputList outputs={outputs} tool={tool} zipName={`${sanitizeBaseName(s.file.name)}-${format}.zip`} />}
    </div>
  );
}

/* ---------- images to PDF ---------- */

const pageSizes = {
  fit: null,
  a4: [595.28, 841.89],
  letter: [612, 792],
} as const;

function ImagesToPdfPanel() {
  const [images, setImages] = useState<{ id: string; file: File }[]>([]);
  const [size, setSize] = useState<"fit" | "a4" | "letter">("a4");
  const [margin, setMargin] = useState<"0" | "20" | "40">("20");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);

  async function add(files: File[]) {
    setError("");
    setResult(null);
    const ok: { id: string; file: File }[] = [];
    for (const f of files) {
      if (f.size > 50 * MB) setError(`${f.name}: file size exceeds the 50 MB limit.`);
      else if (!(await sniffFormat(f))) setError(`${f.name}: please upload a valid image.`);
      else ok.push({ id: crypto.randomUUID(), file: f });
    }
    if (ok.length) track("file_upload", { tool: "images-to-pdf", count: ok.length });
    setImages((c) => [...c, ...ok]);
  }

  async function run() {
    if (!images.length) return setError("Please add at least one image.");
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await loadPdfLib();
      const doc = await PDFDocument.create();
      const m = Number(margin);
      for (let i = 0; i < images.length; i++) {
        const file = images[i].file;
        const fmt = await sniffFormat(file);
        // Embed JPGs untouched; everything else is decoded and re-encoded.
        const embedded =
          fmt === "jpg"
            ? await doc.embedJpg(await file.arrayBuffer())
            : fmt === "png"
              ? await doc.embedPng(await file.arrayBuffer())
              : await doc.embedJpg(await (await encodeImage((await decodeImage(file)).canvas, "jpg", 0.92)).arrayBuffer());
        const iw = embedded.width;
        const ih = embedded.height;
        const preset = pageSizes[size];
        let pw: number, ph: number;
        if (!preset) {
          pw = iw + 2 * m;
          ph = ih + 2 * m;
        } else {
          const landscape = iw > ih;
          pw = landscape ? preset[1] : preset[0];
          ph = landscape ? preset[0] : preset[1];
        }
        const scale = Math.min((pw - 2 * m) / iw, (ph - 2 * m) / ih, preset ? Infinity : 1);
        const dw = iw * scale;
        const dh = ih * scale;
        doc.addPage([pw, ph]).drawImage(embedded, { x: (pw - dw) / 2, y: (ph - dh) / 2, width: dw, height: dh });
        setProgress((i + 1) / images.length);
      }
      setResult(pdfBlob(await doc.save({ useObjectStreams: true })));
      track("conversion_complete", { tool: "images-to-pdf", images: images.length });
    } catch (e) {
      setError(userMessage(e));
      track("tool_error", { tool: "images-to-pdf" });
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  return (
    <div className="space-y-5">
      {images.length === 0 ? (
        <Dropzone
          accept={ACCEPT_IMAGES}
          multiple
          onFiles={add}
          title="Drag & drop your images here"
          buttonLabel="Choose Images"
          hint="JPG, PNG, WebP, HEIC, AVIF and more · processed in your browser"
        />
      ) : (
        <>
          <ol className="divide-y divide-line rounded-2xl border border-line">
            {images.map((im, i) => (
              <li key={im.id} className="flex items-center gap-3 px-4 py-2">
                <span className="w-6 text-sm font-semibold text-muted">{i + 1}</span>
                <p className="min-w-0 flex-1 truncate text-ink">
                  {im.file.name} <span className="text-sm text-muted">· {formatBytes(im.file.size)}</span>
                </p>
                <MoveButtons
                  index={i}
                  length={images.length}
                  name={im.file.name}
                  move={(a, b) => { setImages((c) => moveItem(c, a, b)); setResult(null); }}
                  remove={() => { setImages((c) => c.filter((x) => x.id !== im.id)); setResult(null); }}
                />
              </li>
            ))}
          </ol>
          <Dropzone accept={ACCEPT_IMAGES} multiple compact onFiles={add} title="Add more images" buttonLabel="Choose Images" />
        </>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="field-label">Page size</p>
          <Segmented
            label="Page size"
            value={size}
            onChange={(v) => { setSize(v); setResult(null); }}
            options={[
              { id: "a4", label: "A4" },
              { id: "letter", label: "Letter" },
              { id: "fit", label: "Fit to image" },
            ]}
          />
        </div>
        <div>
          <p className="field-label">Margin</p>
          <Segmented
            label="Margin"
            value={margin}
            onChange={(v) => { setMargin(v); setResult(null); }}
            options={[
              { id: "0", label: "None" },
              { id: "20", label: "Small" },
              { id: "40", label: "Large" },
            ]}
          />
        </div>
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      {progress !== null && <Progress value={progress} label="Adding images…" />}
      <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={busy || !images.length} onClick={run}>
        {busy ? "Creating PDF…" : "Create PDF"}
      </button>
      {result && (
        <section className="space-y-3 rounded-2xl border border-line p-4" aria-label="Result">
          <p className="text-ink">PDF ready · {images.length} page{images.length === 1 ? "" : "s"} · {formatBytes(result.size)}</p>
          <DownloadButton blob={result} name="images.pdf" tool="images-to-pdf" />
        </section>
      )}
    </div>
  );
}
