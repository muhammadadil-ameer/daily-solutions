// Notifies IndexNow (Bing, Yandex, Seznam, Naver…) about changed URLs.
// Usage: node scripts/indexnow.mjs <url-or-path> [...]   or   node scripts/indexnow.mjs --all
const HOST = "dailysolutions.vercel.app";
const KEY = "96e96a9bc1eb96ef8b02f8d4392b2f71";
const origin = `https://${HOST}`;

let urls = process.argv.slice(2);
if (urls.includes("--all")) {
  const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
urls = urls.map((u) => (u.startsWith("http") ? u : `${origin}${u.startsWith("/") ? "" : "/"}${u}`));
if (!urls.length) {
  console.error("No URLs given. Pass paths/URLs or --all.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status >= 300) {
  console.log(await res.text());
  process.exit(1);
}
