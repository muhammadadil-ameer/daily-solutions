"use client";

import { useRef, useState, type ReactNode } from "react";
import { UploadIcon } from "@/components/Icons";

export function Dropzone({
  accept,
  multiple = false,
  onFiles,
  title,
  hint,
  buttonLabel,
  compact = false,
}: {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  title: string;
  hint?: string;
  buttonLabel: string;
  compact?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(multiple ? files : files.slice(0, 1));
      }}
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition ${
        compact ? "gap-2 px-4 py-5" : "gap-3 px-4 py-10 sm:py-14"
      } ${over ? "border-brand-500 bg-brand-50" : "border-brand-200 bg-brand-50/40"}`}
    >
      {!compact && (
        <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
          <UploadIcon />
        </span>
      )}
      <p className="font-semibold text-ink">{title}</p>
      <p className="text-sm text-muted">or</p>
      <button type="button" className="btn btn-primary" onClick={() => input.current?.click()}>
        {buttonLabel}
      </button>
      {hint && <p className="max-w-md text-xs text-muted">{hint}</p>}
      <input
        ref={input}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        aria-label={buttonLabel}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (files.length) onFiles(files);
        }}
      />
    </div>
  );
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {children}
    </p>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">{children}</p>;
}

export function Progress({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      <div className="flex justify-between text-sm text-muted">
        <span>{label}</span>
        {value !== null && <span>{Math.round(value * 100)}%</span>}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-brand-100">
        <div
          className={`h-full rounded-full bg-brand-600 transition-[width] ${value === null ? "w-1/3 animate-pulse" : ""}`}
          style={value === null ? undefined : { width: `${Math.max(2, value * 100)}%` }}
        />
      </div>
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`chip ${value === o.id ? "chip-active" : ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Stat({ label, value, tone }: { label: string; value: ReactNode; tone?: "good" }) {
  return (
    <div className="rounded-xl bg-surface px-4 py-3">
      <dt className="text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
      <dd className={`mt-0.5 text-lg font-semibold ${tone === "good" ? "text-emerald-700" : "text-ink"}`}>{value}</dd>
    </div>
  );
}
