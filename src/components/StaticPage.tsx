import type { ReactNode } from "react";
import { Breadcrumbs } from "./Blocks";

export function StaticPage({ title, path, intro, children }: { title: string; path: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <div className="border-b border-line bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page pt-6 pb-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title, href: path }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 max-w-3xl text-lg text-muted">{intro}</p>}
        </div>
      </div>
      <div className="container-page">
        <div className="prose-tool max-w-3xl pt-4">{children}</div>
      </div>
    </>
  );
}

export const LAST_UPDATED = "October 24, 2026";
