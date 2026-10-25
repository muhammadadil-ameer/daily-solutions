# SEO log – Daily Solutions

The daily SEO task reads this file first and appends one entry per run (newest at the top of "Runs").
It is the memory between runs: keep it short and factual.

## Rules for the daily task

- Small, safe fixes go straight to `main` (meta titles/descriptions, typos, internal links, schema, alt text,
  broken links, performance tweaks, FAQ additions, sitemap `updated` dates).
- New pages, new tools, design/layout changes or removing pages: create a branch `seo/<short-name>`, push it,
  open a Pull Request, and do NOT merge it. List it under "Waiting for approval".
- Never keyword-stuff, never mass-generate thin pages, never buy or spam backlinks.
- Search Console "Request indexing": at most 10 URLs per day; skip URLs already indexed or requested in the last 14 days.
- When a page's content changes, set its `updated` field (YYYY-MM-DD) in `src/content/*.ts` and ping IndexNow.

## Indexing requests (URL → date requested)

| URL | Requested | Status |
| --- | --- | --- |
| / | — | Indexed (checked 2026-10-24) |
| /image-converter/ | Tried 2026-10-24 and 2026-10-25 – quota exceeded both times | URL is unknown to Google (2026-10-25) |

## Waiting for approval

- PR #1 `seo/kb-landing-pages` – new pages /compress-image-to-20kb/, /compress-image-to-50kb/, /compress-image-to-100kb/,
  /compress-image-to-200kb/, /jfif-to-jpg/ (https://github.com/muhammadadil-ameer/daily-solutions/pull/1). Opened 2026-10-25.

## Main goal (owner, 2026-10-25)

Get every page indexed and ranking on Google page 1. Each run: research real queries with
`python scripts/keywords.py "<topic>"` (Google autocomplete) plus Search Console queries, then improve the page that
best matches those queries (title, description, H2 sections, FAQs, internal links) – naturally, no stuffing.
Target realistic long-tail queries first (e.g. "compress image to 50kb", "bmi calculator in kg and feet"),
because head terms like "image resizer" are dominated by very strong sites.

## Keyword map (page → main queries)

- /image-resizer/ – image resizer, resize image online, image resizer in kb, resize image in pixels, whatsapp dp, instagram without cropping
- /compress-image/ – image compressor, compress image to 20kb/50kb/100kb/200kb, compress image online free
- /reduce-image-size/ – reduce photo size in kb, mb to kb, photo size reducer for forms
- /image-converter/ – image converter, convert image to jpg/png/webp, jfif/jpeg to jpg, bulk
- /heic-to-jpg/ – heic to jpg converter free, bulk, windows, without losing quality
- /pdf-compressor/ – pdf compressor, compress pdf to 100kb/200kb/1mb, below 2mb
- /jpg-to-pdf/ – jpg to pdf converter, a4 size, combine multiple images
- /bmi-calculator/ – bmi calculator in kg and feet, for women/men, asian bmi
- /calorie-calculator/ – calorie calculator to lose weight / gain weight

## Ideas backlog

- Request indexing has returned "Quota exceeded" on the first URL two days running (new property). Keep trying 1 URL first each run;
  rely on sitemap + IndexNow + internal links meanwhile.
- Next run: request indexing first. Priority: /image-converter/, /image-resizer/, /pdf-tools/,
  /media-converter/, /health-calculator/, /heic-to-jpg/, /compress-image/, /pdf-compressor/, /calorie-calculator/, /resize-image-1080x1080/.
- Short titles (<30 chars) on /about/, /contact/, /disclaimer/ – low priority, they are brand pages.
- PageSpeed API was rate-limited (429) – retry next run.

- Off-page (to do manually by the owner): submit the site to tool directories (e.g. Product Hunt, AlternativeTo,
  SaaSHub), answer related questions on Reddit/Quora with genuinely useful links.

## Runs

- 2026-10-25 (manual, owner request) — Keyword research via Google autocomplete for 18 seed topics. Rewrote titles,
  descriptions, sections and FAQs of 18 pages for real queries (commit 89cde28); added .jfif support and a "kg + feet"
  unit option in health calculators; lazy-loaded gtag.js; fixed 3 accessibility issues. Lighthouse mobile before:
  perf 66–72, a11y 94–96, best practices 79 (third-party cookies from GA/Clarity), SEO 100.
  IndexNow: 18 URLs (HTTP 200). Request indexing /image-resizer/: "Quota Exceeded" again (3rd day).
  Opened PR #1 with 5 new landing pages (waiting for owner approval).

- 2026-10-25 (run 2) — GSC: Pages report still "processing data"; Performance 0 clicks / 0 impressions; sitemap Success, 60 discovered;
  no manual actions. /image-converter/ inspection: "URL is unknown to Google".
  Audit: 60 sitemap URLs 200, 404 OK, one h1 each, canonicals OK, JSON-LD valid, no broken internal links, all images have alt.
  Fixed (9ff725d): footer "Popular tools" column (8 tool links on every page); /image-resizer/ and /health-calculator/ titles
  shortened (62→54/53 chars); /terms/ and /cookie-policy/ descriptions expanded (57/59→~125 chars).
  IndexNow pinged (HTTP 200): /, /image-resizer/, /health-calculator/, /terms/, /cookie-policy/.
  Request indexing: quota exceeded on first URL, 0 submitted. PageSpeed: 429 again, skipped.

- 2026-10-24 (run 1) — GSC: property new, Pages/Performance still "processing data"; sitemap read OK (60 URLs); no manual actions.
  Audit: all 60 sitemap URLs 200, 404 works, one h1 each, canonicals OK, JSON-LD valid, no broken internal links, all images have alt.
  Fixed (ce93e18): titles over 60 chars now drop the " | Daily Solutions" suffix (~40 pages); homepage description 184→159 chars;
  square-resize descriptions rewritten (1080x1080 was 177 chars); "All Tools" → "All Free Online Tools".
  IndexNow pinged: /, /all-tools/, /resize-image-300x300/, /resize-image-500x500/, /resize-image-1080x1080/.
  Request indexing: quota exceeded, 0 URLs submitted. PageSpeed: 429, skipped.

- 2026-10-24 — Setup: IndexNow key added, sitemap lastmod added, sitemap submitted in Search Console.
