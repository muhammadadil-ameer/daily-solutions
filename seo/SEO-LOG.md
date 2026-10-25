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

_None._

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
