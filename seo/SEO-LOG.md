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

## Waiting for approval

_None._

## Ideas backlog

- Off-page (to do manually by the owner): submit the site to tool directories (e.g. Product Hunt, AlternativeTo,
  SaaSHub), answer related questions on Reddit/Quora with genuinely useful links.

## Runs

- 2026-10-24 — Setup: IndexNow key added, sitemap lastmod added, sitemap submitted in Search Console.
