# Lists the tool landing pages that big tool websites publish in their sitemaps.
# Each page usually targets one search query, so the URL slugs show which keywords they rank for.
# Usage: python scripts/competitors.py [domain ...]
import gzip
import re
import sys
import urllib.request

DEFAULT = [
    "www.iloveimg.com", "www.ilovepdf.com", "imageresizer.com", "www.11zon.com", "www.freeconvert.com",
    "cloudconvert.com", "convertio.co", "tinypng.com", "pi7.org", "www.calculator.net", "smallpdf.com",
]
UA = {"User-Agent": "Mozilla/5.0 (compatible; DailySolutionsResearch/1.0)"}


def fetch(url):
    try:
        data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20).read()
    except Exception:
        return ""
    if url.endswith(".gz") or data[:2] == b"\x1f\x8b":
        try:
            data = gzip.decompress(data)
        except Exception:
            return ""
    return data.decode("utf-8", "ignore")


def sitemap_urls(domain):
    robots = fetch(f"https://{domain}/robots.txt")
    maps = re.findall(r"(?im)^sitemap:\s*(\S+)", robots) or [f"https://{domain}/sitemap.xml"]
    urls, seen = [], set()
    while maps and len(seen) < 15:
        m = maps.pop(0)
        if m in seen:
            continue
        seen.add(m)
        xml = fetch(m)
        locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
        if "<sitemapindex" in xml:
            # Prefer English / tool sitemaps over blog and localized ones.
            locs.sort(key=lambda u: ("blog" in u or "post" in u, len(u)))
            maps.extend(locs[:10])
        else:
            urls.extend(locs)
    return urls


def slug(u, domain):
    path = re.sub(r"^https?://[^/]+", "", u).strip("/")
    parts = [p for p in path.split("/") if p]
    # Skip localized copies (/es/, /pt/, /de-de/ ...) so the list stays readable.
    if parts and re.fullmatch(r"[a-z]{2}([-_][a-zA-Z]{2,4})?", parts[0]):
        return None
    return "/".join(parts)


for domain in sys.argv[1:] or DEFAULT:
    urls = sitemap_urls(domain)
    slugs = sorted({s for s in (slug(u, domain) for u in urls) if s and "blog" not in s and len(s) < 80})
    print(f"## {domain} ({len(slugs)} pages)")
    print(" | ".join(slugs[:400]))
    print()
