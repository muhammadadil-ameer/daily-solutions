export type CategoryId = "image" | "pdf" | "media" | "health";

export type ImageFormat = "jpg" | "png" | "webp" | "avif" | "gif" | "bmp" | "tiff" | "heic";

export type PdfAction =
  | "compress"
  | "merge"
  | "split"
  | "images-to-pdf"
  | "pdf-to-jpg"
  | "pdf-to-png"
  | "rotate"
  | "extract"
  | "delete"
  | "reorder";

export type MediaFormat =
  | "mp3"
  | "wav"
  | "m4a"
  | "aac"
  | "ogg"
  | "flac"
  | "mp4"
  | "mov"
  | "avi"
  | "webm"
  | "mkv"
  | "gif";

export type HealthCalc =
  | "calorie"
  | "bmi"
  | "bmr"
  | "tdee"
  | "macro"
  | "protein"
  | "deficit"
  | "ideal-weight";

/** Which interactive widget a tool page renders, plus its preset options. */
export type ToolWidget =
  | { type: "image-convert"; from?: ImageFormat; to?: ImageFormat }
  | {
      type: "image-resize";
      width?: number;
      height?: number;
      focus?: "resize" | "compress";
      format?: "keep" | "jpg" | "png" | "webp" | "avif";
      maxKB?: number;
    }
  | { type: "pdf"; action?: PdfAction; targetKB?: number; toolkit?: boolean }
  | { type: "media"; from?: MediaFormat; to?: MediaFormat }
  | { type: "health"; calc?: HealthCalc; hub?: boolean };

export interface Faq {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Tool {
  slug: string;
  category: CategoryId;
  /** Short name used in cards, menus and breadcrumbs. */
  name: string;
  h1: string;
  /** <title> without the site name suffix. */
  title: string;
  metaDescription: string;
  /** One-line card description. */
  short: string;
  /** Paragraph shown under the H1, above the tool. */
  intro: string;
  widget: ToolWidget;
  howTo: string[];
  sections: ContentSection[];
  formats?: { name: string; desc: string }[];
  examples?: string[];
  faqs: Faq[];
  related: string[];
  keywords?: string[];
  popular?: boolean;
  /** Main tool of its category (shown on homepage category cards). */
  primary?: boolean;
  disclaimer?: boolean;
}

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  navLabel: string;
  description: string;
  intro: string;
  /** Slug of the tool that hosts this category's page when the category has no page of its own. */
  hostTool?: string;
}
