# Daily Solutions

Simple online tools that solve everyday problems: image converter, image resizer & compressor, PDF toolkit,
audio & video converter and health & fitness calculators.

All file processing happens **in the browser** (canvas, WebAssembly, pdf-lib, PDF.js, ffmpeg.wasm). No files are
uploaded to a server.

## Tech

- Next.js (App Router) + TypeScript + Tailwind CSS
- Every page is statically generated with its own title, description, canonical URL, breadcrumbs and JSON-LD
- Image: native canvas encoders, `heic2any` (HEIC input), `utif` (TIFF), `gifenc` (GIF), `@jsquash/webp` + `@jsquash/avif` (fallback encoders)
- PDF: `pdf-lib` (merge/split/rotate/reorder/images→PDF), `pdfjs-dist` (render pages, compression)
- Media: `@ffmpeg/ffmpeg` with the core loaded from jsDelivr on first use
- ZIP downloads: `fflate`

## Development

```bash
npm install
npm run dev
```

`npm run dev` / `npm run build` copy the PDF.js worker into `public/` first (`scripts/copy-assets.mjs`).

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, e.g. `https://daily-solutions.vercel.app` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (optional) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification token (optional) |

## Adding tools

- Tool pages live in `src/content/*.ts`. Add an entry with a unique `slug` and it gets a page at `/<slug>/`, a sitemap
  entry, search entry and related-tool links automatically.
- A new category: add it to `src/content/categories.ts`, create a content file and include it in `src/content/index.ts`.
- New interactive tool types: add a widget in `src/components/tools/` and register it in `src/components/ToolWidget.tsx`.

Analytics events (when `NEXT_PUBLIC_GA_ID` is set): `tool_open`, `file_upload`, `conversion_complete`, `download`,
`calculator_complete`, `tool_error`.
