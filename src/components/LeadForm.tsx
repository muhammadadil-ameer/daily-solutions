"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { isEmail, mailtoLink, sendForm } from "@/lib/forms";
import { site } from "@/lib/site";

export const seoServices = [
  "Complete SEO (ongoing)",
  "Technical SEO audit & fixes",
  "Pages not indexed / Search Console help",
  "On-page SEO & content",
  "Keyword research",
  "Local SEO (Google Business Profile)",
  "Link building",
  "AI search visibility (AEO / GEO)",
  "Not sure yet",
];

const budgets = ["Prefer to discuss", "Under $100 / month", "$100–300 / month", "$300–700 / month", "$700+ / month", "One-time project"];

type Status = "idle" | "sending" | "sent" | "failed";

/** "Hire an SEO expert" request form; the request is emailed to the site owner. */
export function LeadForm() {
  const [f, setF] = useState({ name: "", email: "", website: "", phone: "", service: seoServices[0], budget: budgets[0], message: "" });
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
        budget: f.budget,
        message: f.message,
      },
      honey,
    );
    setStatus(r.ok ? "sent" : "failed");
    track(r.ok ? "lead_sent" : "lead_failed", { service: f.service });
  }

  if (status === "sent") {
    return (
      <div role="status" className="card space-y-2 p-5 sm:p-6">
        <p className="text-lg font-semibold text-ink">Thank you, {f.name.split(" ")[0]} – your request has been sent.</p>
        <p className="text-muted">
          I’ll look at {f.website} and reply to {f.email}
          {f.phone ? " or on WhatsApp" : ""}, usually within 1–2 working days.
        </p>
      </div>
    );
  }

  return (
    <form id="seo-form" onSubmit={submit} className="card space-y-4 p-5 sm:p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="l-name" className="field-label">
            Your name
          </label>
          <input id="l-name" className="input" autoComplete="name" required value={f.name} onChange={set("name")} />
        </div>
        <div>
          <label htmlFor="l-email" className="field-label">
            Email
          </label>
          <input id="l-email" type="email" className="input" autoComplete="email" required value={f.email} onChange={set("email")} />
        </div>
        <div>
          <label htmlFor="l-site" className="field-label">
            Website URL
          </label>
          <input id="l-site" type="url" inputMode="url" className="input" placeholder="example.com" required value={f.website} onChange={set("website")} />
        </div>
        <div>
          <label htmlFor="l-phone" className="field-label">
            Phone / WhatsApp (optional)
          </label>
          <input id="l-phone" type="tel" className="input" autoComplete="tel" value={f.phone} onChange={set("phone")} />
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
          <label htmlFor="l-budget" className="field-label">
            Budget (optional)
          </label>
          <select id="l-budget" className="input" value={f.budget} onChange={set("budget")}>
            {budgets.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="l-msg" className="field-label">
          Tell me about your website and goals (optional)
        </label>
        <textarea id="l-msg" rows={5} className="input py-3" value={f.message} onChange={set("message")} />
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" aria-hidden="true" />
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="text-sm text-red-700">
          Sorry, the form could not be sent right now.{" "}
          <a
            className="font-medium underline"
            href={mailtoLink(subject, `Name: ${f.name}\nEmail: ${f.email}\nWebsite: ${f.website}\nPhone: ${f.phone}\nService: ${f.service}\nBudget: ${f.budget}\n\n${f.message}`)}
          >
            Send it by email
          </a>{" "}
          or write to {site.email}.
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my request"}
      </button>
      <p className="text-xs text-muted">Your details are sent only to me and used only to reply to your request.</p>
    </form>
  );
}
