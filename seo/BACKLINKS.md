# Backlink kit – Daily Solutions

Goal: earn genuine, relevant links that build authority and send real visitors. Every listing below is a legitimate
directory, launch site or community. **No** comment spam, forum-profile links, link exchanges, paid link packages or PBNs –
Google treats those as link schemes and they can get a new site penalized.

Accounts must be created by the owner. Claude can fill and submit forms in the owner's logged-in browser **only after the owner
approves each submission**.

## Important: custom domain

Many good directories (SaaSHub, Uneed and most launch sites) reject `*.vercel.app` URLs. A custom domain (≈ $10/year,
e.g. dailysolutions.com / .app / .io) unlocks them and also looks more trustworthy in Google results. After buying it:
add it in Vercel, set `NEXT_PUBLIC_SITE_URL`, keep vercel.app redirecting, add the new property in Search Console.

## Ready-to-paste copy

- **Name:** Daily Solutions
- **URL:** https://dailysolution.org
- **Tagline (≤60):** Free online tools for images, PDFs, media and health
- **Short description (≤260):** Free, private online tools that run in your browser: convert and compress images (HEIC, WebP, PNG, JPG),
  compress to an exact size in KB, merge/split/rotate/compress PDFs, convert MP4/MOV/MKV to MP3 or MP4, and calculate BMI and
  calories. No signup, no upload.
- **Long description:**
  Daily Solutions is a collection of simple tools for small everyday digital problems. Every file tool runs entirely in your
  browser using WebAssembly – images, PDFs, audio and video are never uploaded to a server.
  - Image: converter (HEIC, WebP, AVIF, PNG, JPG, JFIF, GIF, TIFF, BMP), resizer, compressor to 20/50/100/200 KB
  - PDF: compress to 100 KB/200 KB/1 MB, merge, split, rotate, delete/extract/reorder pages, PDF↔JPG/PNG, JPG/HEIC to PDF
  - Media: MP4/MOV/MKV/WebM/AVI to MP4 or MP3, M4A/WAV/FLAC to MP3, MP4 to GIF (ffmpeg.wasm)
  - Health: calorie, BMI (kg + feet supported), BMR, TDEE, macro, protein, calorie deficit and ideal-weight calculators
  Free, no account, no watermark, works on mobile.
- **Categories / tags:** Productivity, Image tools, PDF tools, File converter, Developer tools, Privacy, Free, Web app
- **Pricing:** Free
- **Logo:** https://dailysolution.org/logo.svg · **Screenshot/OG image:** https://dailysolution.org/opengraph-image/
- **Maker / contact:** muhammadadilameer5@gmail.com

## Where to list (priority order)

| # | Site | Type | Link value | How | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | GitHub – https://github.com/muhammadadil-ameer/daily-solutions | Developer | Discovery, trust | Repo public, website field, topics, README links | **Done 2026-10-27** |
| 2 | Product Hunt – https://www.producthunt.com | Launch | High authority, traffic on launch day | Owner account → “Submit” (plan a launch day) | **Draft ready 2026-10-27** – waiting for owner to pick a launch date |
| 3 | AlternativeTo – https://alternativeto.net | Directory | Strong, long-term traffic (“alternative to iLovePDF/TinyPNG”) | Owner account → “Suggest new app” | **Skipped** – FAQ says converters, resizers, compressors, PDF tools, calculators and “a collection of simple online tools” are declined; links are nofollow |
| 4 | SaaSHub – https://www.saashub.com/services/submit | Directory | Good authority | Submit form (account) | **Blocked** – rejects free subdomains like *.vercel.app; retry after a custom domain |
| 5 | Uneed – https://www.uneed.best | Launch directory | Dofollow listing | Account → submit tool | **Blocked** – “Deploy URLs (vercel.app, netlify.app) are not allowed”; retry after a custom domain |
| 6 | Fazier – https://fazier.com | Launch directory | Dofollow listing | Account → launch | To do |
| 7 | MicroLaunch – https://microlaunch.net | Launch | Listing | Account → submit | To do |
| 8 | TinyLaunch – https://tinylaunch.com | Launch | Listing | Account → submit | To do |
| 9 | Launching Next – https://launchingnext.com | Directory | Listing | Submit form | To do |
| 10 | StartupBase – https://www.startupbase.io | Directory | Listing | Account → add product | To do |
| 11 | Toolfolio – https://www.toolfolio.io | Tool directory | Relevant | Submit | To do |
| 12 | DEV Community – https://dev.to | Article | Strong, relevant (developers) | Owner account → publish article (draft below) | **Published 2026-10-27** – https://dev.to/daily-solution/i-built-browser-only-image-pdf-and-video-tools-nothing-gets-uploaded-8a (6 dofollow links to the site, indexable) |
| 13 | Hashnode – https://hashnode.com | Article | Relevant | Cross-post the same article with canonical to dev.to | To do |
| 14 | Hacker News – Show HN | Community | High traffic if it lands | Owner account → https://news.ycombinator.com/submit (draft below) | To do |
| 15 | Reddit – r/SideProject, r/webdev, r/InternetIsBeautiful | Community | Traffic (nofollow) | Owner account, follow each sub’s rules, one post each, no spam | To do |
| 16 | Quora / Reddit answers | Q&A | Traffic | Answer real questions (“how to compress pdf to 100kb”) with genuinely helpful steps + link only where it fits | Ongoing |
| 17 | Pinterest | Visual | Traffic | Pins of “image size cheat sheet” graphics linking to tool pages | Later |
| 18 | Bing Webmaster Tools | Webmaster | Not a backlink – indexing for Bing/DuckDuckGo/Yahoo | Import from Google Search Console | To do |

## Drafts

### DEV / Hashnode article (genuine technical write-up)
**Title:** I built free image, PDF and video tools that never upload your files – here’s how (WebAssembly, pdf-lib, ffmpeg.wasm)
Outline: why privacy matters for converters → architecture (Next.js static pages + client-side processing) → images
(canvas encoders, HEIC via libheif, AVIF/WebP fallbacks) → PDFs (pdf-lib for merge/split/rotate, PDF.js for rendering,
binary-search compression to a target size) → video (ffmpeg.wasm, loading the core lazily, cancel/terminate) → lessons
(Turbopack vs webpack, rAF-throttled rendering in background tabs) → link to the site and the GitHub repo (if public).

### Show HN
**Title:** Show HN: Daily Solutions – image/PDF/video tools that run fully in the browser
**Text:** Hi HN, I built a set of free tools (HEIC→JPG, compress image to an exact KB size, merge/split/compress PDF,
MKV/MOV→MP4, etc.) where nothing is uploaded: images use canvas + WebAssembly codecs, PDFs use pdf-lib and PDF.js, video
uses ffmpeg.wasm. Feedback on speed and missing tools welcome.

### Reddit (r/SideProject)
**Title:** I made free file tools that work offline in your browser – no uploads, no signup
**Body:** short story of the problem (forms that need a 50 KB photo, HEIC photos Windows can’t open), what the site does,
ask for feedback. Follow subreddit rules, reply to comments, don’t repost.

## Log

| Date | Site | Result / link |
| --- | --- | --- |
| 2026-10-27 | Product Hunt | Draft created (tagline, description, tags Productivity/Privacy/Design Tools, category PDF Editor, Free, maker comment) – not launched |
| 2026-10-27 | DEV.to | **Published** with owner approval: https://dev.to/daily-solution/i-built-browser-only-image-pdf-and-video-tools-nothing-gets-uploaded-8a – links dofollow, AI disclosure set |
| 2026-10-27 | AlternativeTo / SaaSHub / Uneed | Not submitted – rules (tool collections / vercel.app) |
| 2026-10-27 | GitHub | Repo made public; homepage = site URL; 7 topics; README links to site + 11 popular tools |
