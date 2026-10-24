import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 18,
              background: "#2563eb",
              color: "#fff",
              fontSize: 36,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            DS
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: "#0f172a" }}>{site.name}</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 68, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
          Simple Tools for Everyday Problems
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#475569" }}>
          Image converter · PDF tools · Audio &amp; video · Health calculators
        </div>
      </div>
    ),
    size,
  );
}
