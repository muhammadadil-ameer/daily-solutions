"use client";

import dynamic from "next/dynamic";
import type { ToolWidget as Widget } from "@/lib/types";
// Calculators are small and need no browser-only APIs: render them on the server and hydrate with the page.
import HealthCalculator from "./tools/HealthCalculator";

function Loading() {
  return <div className="h-64 animate-pulse rounded-2xl bg-surface" aria-label="Loading tool" />;
}

// Each widget is its own chunk, so a page only downloads the code for its own tool.
const ImageConverter = dynamic(() => import("./tools/ImageConverter"), { ssr: false, loading: Loading });
const ImageResizer = dynamic(() => import("./tools/ImageResizer"), { ssr: false, loading: Loading });
const PdfTool = dynamic(() => import("./tools/PdfTool"), { ssr: false, loading: Loading });
const MediaConverter = dynamic(() => import("./tools/MediaConverter"), { ssr: false, loading: Loading });


export function ToolWidget({ widget }: { widget: Widget }) {
  switch (widget.type) {
    case "image-convert":
      return <ImageConverter from={widget.from} to={widget.to} />;
    case "image-resize":
      return <ImageResizer width={widget.width} height={widget.height} focus={widget.focus} format={widget.format} maxKB={widget.maxKB} />;
    case "pdf":
      return <PdfTool action={widget.action} targetKB={widget.targetKB} toolkit={widget.toolkit} />;
    case "media":
      return <MediaConverter from={widget.from} to={widget.to} />;
    case "health":
      return <HealthCalculator calc={widget.calc} hub={widget.hub} />;
  }
}
