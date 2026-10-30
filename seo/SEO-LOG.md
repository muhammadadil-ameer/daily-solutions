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
| / | 2026-10-27 – quota exceeded | **Indexed** (URL Inspection 2026-10-27) |
| /image-converter/ | 2026-10-26 – clicked twice; live test ran, "Submitting request" shown, then no result dialog (no quota error seen) – unconfirmed | URL is unknown to Google (2026-10-26) |
| /image-resizer/ | 2026-10-26 – clicked; outcome unknown (Chrome tab group closed mid-request) | Discovered – currently not indexed (via sitemap) |

## Waiting for approval

_None._

## Priority #1 (owner, 2026-10-27): worldwide competitor keyword gaps

Find the keywords that similar tool websites rank for worldwide and cover them on our pages, so the site can get global
organic traffic. Method: `python scripts/competitors.py` (sitemaps of iLoveIMG, iLovePDF, Smallpdf, TinyPNG, FreeConvert,
imageresizer.com, calculator.net – their landing-page slugs = the queries they target) + `scripts/keywords.py` for intent
modifiers. Work in this order: (1) keywords we can already serve with existing features but have no page for, (2) wording of
existing pages, (3) new features that unlock big keyword groups (always as a PR).

Gap backlog (from 2026-10-27 analysis; remove items once a page exists):
- Existing features, no page yet: jpg-to-avif / png-to-avif / webp-to-avif / heic-to-avif, jpg-to-gif,
  resize-jpg / resize-png (iLoveIMG), compress-pdf-to-2mb, webp-to-pdf, gif-to-pdf, bmp-to-pdf, mp3-to-m4a?, wav-to-flac,
  aac-to-mp3, mov-to-gif / video-to-gif, mp4-to-webm, mov-to-avi, m4a-to-ogg, audio-converter / video-converter hubs.
- New features with big search volume (PR + owner approval): body-fat calculator, calories-burned, lean body mass,
  carbohydrate / fat-intake calculators (calculator.net); crop image, rotate image, flip image (iLoveIMG); add page numbers
  to PDF, PDF watermark (iLovePDF/Smallpdf); image to PDF with size limit.
- Not feasible client-side / out of scope for now: PDF to Word/Excel/PPT, OCR, background remover, upscaler, RAW camera formats.
- Worldwide: English pages first. Later consider localized versions (Spanish, Portuguese, Indonesian, Hindi, Arabic) as a
  separate PR with hreflang – only with genuinely translated content.

## Keyword map (page → main queries)

- /image-resizer/ – image resizer, resize image online, image resizer in kb, resize image in pixels, whatsapp dp, instagram without cropping
- /compress-image/ – image compressor, compress image to 20kb/50kb/100kb/200kb, compress image online free
- /reduce-image-size/ – reduce photo size in kb, mb to kb, photo size reducer for forms
- /image-converter/ – image converter, convert image to jpg/png/webp, jfif/jpeg to jpg, bulk
- /heic-to-jpg/ – heic to jpg converter free, bulk, windows, without losing quality
- /pdf-to-jpg/ – pdf to jpg converter (free/online/high quality), pdf to jpg converter download (GSC pos 2.0!), below 100kb/200kb, iphone, aadhar card
- /m4a-to-mp3/ – m4a to mp3 converter online free, iphone, windows, mac, m4a vs mp3, batch (not supported – one file at a time)
- /m4a-to-wav/ – m4a to wav converter free, audacity, 16 bit, mac, iphone, m4a or wav better
- /pdf-compressor/ – pdf compressor, compress pdf to 100kb/200kb/1mb, below 2mb
- /jpg-to-pdf/ – jpg to pdf converter, a4 size, combine multiple images
- /resize-image-300x300/ – resize image to 300x300 (pixels/online/free), 300x300 image converter 100 kb jpg, 300x300 in inches (GSC "300x300" pos 61)
- /resize-image-500x500/ – resize image to 500x500, 500x500 image resizer/converter, 500x500 aspect ratio (GSC "500*300" pos 7)
- /jpg-to-webp/ – jpg to webp converter free, jpg to webp bulk, jpg to webp and compress, android/iphone
- /bmi-calculator/ – bmi calculator in kg and feet, for women/men, asian bmi
- /calorie-calculator/ – calorie calculator to lose weight / gain weight
- /compress-image-to-20kb/, /-50kb/, /-100kb/, /-200kb/ – compress image to N kb, image resizer N kb, resize image to N kb
- /jfif-to-jpg/ – jfif to jpg, jfif to jpg converter
- /compress-pdf-to-100kb/, /-200kb/, /-500kb/, /-1mb/ – compress pdf to N kb, below N kb, without losing quality, merge and compress
- /split-pdf/ – split pdf pages, by page number, custom range, into multiple files
- /compress-jpg/ – compress jpg, below 20/50/100/200 kb, compress and resize
- /jpg-to-png/ – jpg to png converter, bulk, high quality (not "transparent": no background removal)

## Ideas backlog

- GSC "Crawled – currently not indexed" (12, data 10/23): /, /about/, /contact/, /disclaimer/, /cookie-policy/, /media-converter/,
  /m4a-to-mp3/, /m4a-to-wav/, /jpg-to-webp/, /heic-to-webp/, /resize-image-300x300/, /resize-image-500x500/. Strengthen content of the
  tool pages in this list next (m4a done 10-26; jpg-to-webp + square resize done 10-27; next: /heic-to-webp/, /media-converter/).
- Next GSC requests (not done 10-26 and 10-27): /pdf-to-jpg/, /resize-image-300x300/, /resize-image-500x500/, /jpg-to-webp/,
  /m4a-to-mp3/, /m4a-to-wav/, then the priority list below. Note: the URL /search-console/inspect?id=… gives a Google 404 – open
  Inspection via the top search bar of the property overview instead.
- Lighthouse /pdf-to-jpg/ mobile 2026-10-26: perf 55 (LCP 4.5 s, TBT 1.36 s): main costs are framework chunk (~850 ms scripting),
  gtag.js (~620 ms) and Clarity (~300 ms). Idea: load Clarity/GA only after first user interaction or on idle – needs a careful PR.
- Request indexing has returned "Quota exceeded" on the first URL two days running (new property). Keep trying 1 URL first each run;
  rely on sitemap + IndexNow + internal links meanwhile.
- Next run: request indexing first. Priority: /image-converter/, /image-resizer/, /pdf-tools/,
  /media-converter/, /health-calculator/, /heic-to-jpg/, /compress-image/, /pdf-compressor/, /calorie-calculator/, /resize-image-1080x1080/.
- Short titles (<30 chars) on /about/, /contact/, /disclaimer/ – low priority, they are brand pages.
- PageSpeed API was rate-limited (429) – retry next run.

- Off-page (to do manually by the owner): submit the site to tool directories (e.g. Product Hunt, AlternativeTo,
  SaaSHub), answer related questions on Reddit/Quora with genuinely useful links.

## Runs

- 2026-10-30 (manual, owner request) — **Moved to custom domain https://dailysolution.org** (Hostinger domain; note: no “s”).
  Vercel: added dailysolution.org (production) + www.dailysolution.org (308 → apex). Hostinger DNS for dailysolution.org only:
  CNAME www → 3270d8c6e190f9cb.vercel-dns-017.com (was www.dailysolution.org.cdn.hstgr.net); ALIAS @ → dailysolution.org.cdn.hstgr.net
  deleted and A @ 216.198.79.1 added; A ftp 145.79.31.24 unchanged; no MX existed. The previous Hostinger WordPress site
  “Daily Solutions” is no longer served on this domain (still in Hostinger; restore by reverting those two records).
  Code: site URL → dailysolution.org (canonical, sitemap, robots, OG, JSON-LD); single-hop 308 from dailysolutions.vercel.app/*.
  GSC: new URL-prefix property https://dailysolution.org/ verified via HTML file (public/google3dc3ca748dbe79c9.html – keep it),
  sitemap submitted, Change of Address from dailysolutions.vercel.app confirmed (“site is moving”). IndexNow: 81 URLs (202).
  GitHub homepage updated. GA4 stream / Clarity project still show the old URL label (data collection unaffected).

- 2026-10-27 (manual, owner request: competitor keywords) — Ran scripts/competitors.py on 11 competitor sitemaps
  (iLoveIMG 63 pages, iLovePDF 53, Smallpdf 299, TinyPNG 95, FreeConvert 6,765, imageresizer.com 15,904, calculator.net 221).
  Built 16 gap landing pages backed by existing features → PR #2 (waiting for owner). Autocomplete research for rotate pdf,
  delete/extract pages, pdf↔png, webm/mkv to mp4, mp3 to wav. Tested Rotate PDF, GIF to JPG, WebM to MP4 in the browser.
  Daily task updated: competitor gap analysis is now priority #1.
  Owner approved PR #2 the same day → merged (6d5e350), all 16 pages live (200), sitemap 81 URLs, IndexNow pinged 20 URLs.
  Next runs: request indexing for these pages when the GSC quota allows.

- 2026-10-27 (manual, owner request, after scheduled run) — GSC (Browser 1, muhammadadilameer5): homepage URL Inspection =
  **"Page is indexed"** (first indexed page). /image-resizer/ = "URL is unknown to Google", last crawl N/A. Pages report (lagging):
  0 indexed / 12 crawled-not-indexed. Request indexing: "Quota Exceeded" on the first URL → stopped (owner: skip GSC when quota is out).
  Keywords researched: compress pdf to 100kb/200kb, split pdf, compress jpg, jpg to png.
  Changed (see commit "SEO: target real queries on PDF-to-KB…"): compress-pdf-to-100kb/200kb/500kb/1mb template (title "Below N",
  description, intro, 3 new H2s, 3 FAQs); /split-pdf/ (title, description, intro, 3 H2s, 3 FAQs); /compress-jpg/ (title, description,
  intro, 2 H2s, FAQs, links to KB pages); /jpg-to-png/ (title, description, intro, transparent-background + batch H2s, FAQs).
  Build OK (71 pages), all titles ≤ 54 chars, descriptions ≤ 156. IndexNow: 7 URLs HTTP 200.

- 2026-10-27 — GSC (signed in as muhammadadilameer5, Browser 2): Pages report still 0 indexed, 12 "Crawled – currently not indexed".
  Performance (28 days, data to 10/25): 1 click, 24 impressions, CTR 4.2%, avg pos 51.8; queries: site:vercel.app (3, pos 56),
  "pdf to jpg converter download" (1, pos 2), "500*300" (1, pos 7), "300x300" (pos 61), "300x300 image" (pos 66).
  Keywords researched: 300x300, resize image to 300x300, 300x300 photo, 500x500, resize image to 500x500, jpg to webp.
  Strong intents: "300x300 image converter 100 kb jpg", "resize image 300x300 100kb", "300x300 in inches", "500x500 image resizer",
  "how to resize an image to 500x500", "jpg to webp bulk", "jpg to webp converter free", "jpg to webp and compress".
  Changed: square resize pages /resize-image-300x300/, /-500x500/, /-1080x1080/ (new description with "under N KB", intro, H2s
  "Resize image to NxN and under N KB" and "NxN pixels in inches and aspect ratio", 3 FAQs); /jpg-to-webp/ (new title/description,
  H2s "Bulk JPG to WebP converter" and "JPG to WebP and compress: which quality to choose", 3 FAQs, fixed wrong "80% default" –
  the converter starts at 90%, link to /compress-webp/). Commit c7d0627.
  Audit: 65 sitemap URLs 200, unknown URL 404, one h1 per changed page. IndexNow: 4 URLs HTTP 200.
  Request indexing: not done – after reading the reports, the browser/tool safety check kept failing (navigation blocked), so
  URL Inspection could not be opened. Lighthouse skipped for the same reason (local server start was declined).

- 2026-10-26 — GSC: Pages report (data 10/23) 0 indexed, 12 "Crawled – currently not indexed"; Performance (2 days): 0 clicks,
  10 impressions, avg pos 91.5; queries: site:vercel.app (3), "pdf to jpg converter download" (1, pos 2.0). Sitemap Success
  (last read 10/24, 60 URLs). Manual actions: none.
  Keywords researched: pdf to jpg, pdf to jpg converter, m4a to mp3, m4a to wav.
  Changed (4bb8f44): /pdf-to-jpg/ (new description, intro, H2s "PDF to JPG converter without downloading software" and
  "PDF to JPG below 100 KB or 200 KB", 3 FAQs, link to /compress-image-to-100kb/); /m4a-to-mp3/ (H2 "How to convert M4A to MP3 on
  iPhone, Windows and Mac", "M4A vs MP3", 2 FAQs); /m4a-to-wav/ (new title/description, Audacity/Mac/iPhone H2, 2 FAQs).
  Audit: 65 sitemap URLs 200, 404 OK. IndexNow: 3 URLs HTTP 200.
  Request indexing: /image-converter/ and /image-resizer/ attempted, result not confirmed; then the Chrome browser with Search Console
  disconnected (other browser is signed in as a different account – not used). Lighthouse /pdf-to-jpg/ mobile: perf 55, a11y 100,
  best practices 79, SEO 100.

- 2026-10-25 (manual, owner request) — Keyword research via Google autocomplete for 18 seed topics. Rewrote titles,
  descriptions, sections and FAQs of 18 pages for real queries (commit 89cde28); added .jfif support and a "kg + feet"
  unit option in health calculators; lazy-loaded gtag.js; fixed 3 accessibility issues. Lighthouse mobile before:
  perf 66–72, a11y 94–96, best practices 79 (third-party cookies from GA/Clarity), SEO 100.
  IndexNow: 18 URLs (HTTP 200). Request indexing /image-resizer/: "Quota Exceeded" again (3rd day).
  Opened PR #1 with 5 new landing pages; owner approved, merged the same day (74742de) – live, sitemap 65 URLs,
  IndexNow pinged. Next runs: request indexing for these 5 pages once the GSC quota allows.

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
