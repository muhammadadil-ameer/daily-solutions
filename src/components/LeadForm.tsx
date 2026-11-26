"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { isEmail, mailtoLink, sendForm } from "@/lib/forms";
import { site } from "@/lib/site";

export const seoServices = [
  "Complete SEO (ongoing)",
  "Technical SEO audit & fixes",
  "Pages not indexed / Search Console",
  "On-page SEO & content",
  "Keyword research",
  "Local SEO & Google Business Profile (GMB)",
  "AEO – answer engine optimisation",
  "GEO – visibility in AI search",
  "Link building / off-page SEO",
  "E-commerce SEO",
  "Migration or traffic-drop recovery",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * "Hire an SEO expert" request form; the request is emailed to the site owner.
 * Kept compact (paired fields, short labels) so it sits beside the page heading
 * without making the hero taller than the text next to it.
 */
export function LeadForm() {
  const [f, setF] = useState({ name: "", email: "", website: "", phone: "", service: seoServices[0], message: "" });
  const [honey, setHoney] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((c) => ({ ...c, [k]: e.target.value }));

  const subject = `SEO enquiry: ${f.service}${f.website ? ` – ${f.website}` : ""}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (f.name.trim().length < 2) return setError("Please enter your name.");
    if (!isEmail(f.email)) return setError("Please enter a valid email address.");
    if (f.website.trim().length < 4) return setError("Please enter your website address.");
    setError("");
    setStatus("sending");
    const r = await sendForm(
      subject,
      {
        name: f.name,
        email: f.email,
        website: f.website,
        "phone / WhatsApp": f.phone,
        service: f.service,
        message: f.message,
      },
      honey,
    );
    setStatus(r.ok ? "sent" : "failed");
    track(r.ok ? "lead_sent" : "lead_failed", { service: f.service });
  }

  if (status === "sent") {
    return (
      <div role="status" className="card space-y-2 p-5 shadow-sm">
        <p className="text-lg font-semibold text-ink">Thank you, {f.name.split(" ")[0]} – your request has been sent.</p>
        <p className="text-sm text-muted">
          I’ll look at {f.website} and reply to {f.email}
          {f.phone ? " or on WhatsApp" : ""}, usually within 1–2 working days.
        </p>
      </div>
    );
  }

  const optional = <span className="font-normal text-muted">(optional)</span>;

  return (
    <form id="seo-form" onSubmit={submit} className="card p-5 shadow-sm" noValidate>
      <h2 className="text-base font-bold text-ink">Request a free SEO review</h2>
      <p className="mt-1 text-xs text-muted">No cost, no obligation. I reply within 1–2 working days.</p>

      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="l-name" className="field-label">
              Name
            </label>
            <input id="l-name" className="input" autoComplete="name" required value={f.name} onChange={set("name")} />
          </div>
          <div>
            <label htmlFor="l-email" className="field-label">
              Email
            </label>
            <input id="l-email" type="email" className="input" autoComplete="email" required value={f.email} onChange={set("email")} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="l-site" className="field-label">
              Website
            </label>
            <input id="l-site" type="url" inputMode="url" className="input" placeholder="example.com" required value={f.website} onChange={set("website")} />
          </div>
          <div>
            <label htmlFor="l-phone" className="field-label">
              WhatsApp {optional}
            </label>
            <input id="l-phone" type="tel" className="input" autoComplete="tel" value={f.phone} onChange={set("phone")} />
          </div>
        </div>
        <div>
          <label htmlFor="l-service" className="field-label">
            What do you need?
          </label>
          <select id="l-service" className="input" value={f.service} onChange={set("service")}>
            {seoServices.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="l-msg" className="field-label">
            Your goals {optional}
          </label>
          <textarea id="l-msg" rows={2} className="input py-2.5" value={f.message} onChange={set("message")} />
        </div>
      </div>

      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" aria-hidden="true" />

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          Sorry, the form could not be sent right now.{" "}
          <a
            className="font-medium underline"
            href={mailtoLink(subject, `Name: ${f.name}\nEmail: ${f.email}\nWebsite: ${f.website}\nPhone: ${f.phone}\nService: ${f.service}\n\n${f.message}`)}
          >
            Send it by email
          </a>{" "}
          or write to {site.email}.
        </p>
      )}

      <button type="submit" className="btn btn-primary mt-4 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my request"}
      </button>
      <p className="mt-2.5 text-xs text-muted">Your details are sent only to me, and used only to reply.</p>
    </form>
  );
}
