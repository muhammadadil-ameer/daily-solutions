"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { SearchEntry } from "@/content";
import { SearchIcon } from "./Icons";

export function ToolSearch({ index, autoFocus = false }: { index: SearchEntry[]; autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const listId = useId();

  const results = useMemo(() => {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return index
      .map((e) => {
        let score = 0;
        for (const w of words) {
          if (!e.terms.includes(w)) return null;
          if (e.name.toLowerCase().startsWith(w)) score += 3;
          else if (e.name.toLowerCase().includes(w)) score += 2;
          else score += 1;
        }
        return { e, score };
      })
      .filter((r): r is { e: SearchEntry; score: number } => !!r)
      .sort((a, b) => b.score - a.score || a.e.name.length - b.e.name.length)
      .slice(0, 8)
      .map((r) => r.e);
  }, [q, index]);

  return (
    <div className="relative w-full">
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search tools
      </label>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" width={20} height={20} />
      <input
        id={`${listId}-input`}
        type="search"
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder="Search tools… e.g. HEIC, PDF, BMI"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="input min-h-13 rounded-2xl pl-12 text-base shadow-sm"
        aria-controls={listId}
      />
      {q.trim() && (
        <div id={listId} className="card absolute inset-x-0 top-full z-30 mt-2 overflow-hidden shadow-lg" role="region" aria-live="polite">
          {results.length ? (
            <ul>
              {results.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${r.slug}/`} className="block px-4 py-3 hover:bg-surface">
                    <span className="block font-medium text-ink">{r.name}</span>
                    <span className="block text-sm text-muted">
                      {r.category} · {r.short}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted">No tools found. Try another word, like “jpg” or “calories”.</p>
          )}
        </div>
      )}
    </div>
  );
}
