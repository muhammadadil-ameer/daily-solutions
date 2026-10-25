# Collects real search queries from Google autocomplete for keyword research.
# Usage: python scripts/keywords.py "image resizer" "pdf compressor" ...
import json, sys, urllib.request, urllib.parse, time
seeds = sys.argv[1:]
seen = {}
for seed in seeds:
    for suffix in ["", " a", " b", " c", " f", " i", " o", " p", " t", " to", " for", " in", " online", " free", " kb"]:
        q = seed + suffix
        url = "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=" + urllib.parse.quote(q)
        try:
            data = json.loads(urllib.request.urlopen(url, timeout=10).read().decode("utf-8", "ignore"))
        except Exception as e:
            continue
        for s in data[1]:
            seen.setdefault(seed, [])
            if s not in seen[seed]: seen[seed].append(s)
        time.sleep(0.15)
for k, v in seen.items():
    print(f"## {k} ({len(v)})")
    print(" | ".join(v[:60]))
