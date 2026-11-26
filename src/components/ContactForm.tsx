"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { isEmail, mailtoLink, sendForm } from "@/lib/forms";
import { site } from "@/lib/site";

const reasons = ["General question", "Report a problem with a tool", "Suggest a new tool", "Privacy request", "Business inquiry"];

type Status = "idle" | "sending" | "sent" | "failed";

/** Sends the message to the site owner's inbox; if that fails, offers the visitor's email app instead. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(reasons[0]);
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const subject = `${reason}${name ? ` – ${name}` : ""} (Daily Solutions contact form)`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError("Please enter a valid email address so we can reply.");
    if (message.trim().length < 10) return setError("Please write a message of at least 10 characters.");
    setError("");
    setStatus("sending");
    const r = await sendForm(subject, { name, email, reason, message }, honey);
    setStatus(r.ok ? "sent" : "failed");
    track(r.ok ? "contact_sent" : "contact_failed", { reason });
  }

  if (status === "sent") {
    return (
      <div role="status" className="card space-y-2 p-5 sm:p-6">
        <p className="text-lg font-semibold text-ink">Thank you – your message has been sent.</p>
        <p className="text-muted">We’ll reply to {email} within a few working days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-5 sm:p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">
            Your name (optional)
          </label>
          <input id="c-name" className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="c-email" className="field-label">
            Your email
          </label>
          <input id="c-email" type="email" className="input" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="c-reason" className="field-label">
          Reason for contacting
        </label>
        <select id="c-reason" className="input" value={reason} onChange={(e) => setReason(e.target.value)}>
          {reasons.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-msg" className="field-label">
          Message
        </label>
        <textarea id="c-msg" rows={6} className="input py-3" required value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" aria-hidden="true" />
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="text-sm text-red-700">
          Sorry, the message could not be sent right now.{" "}
          <a className="font-medium underline" href={mailtoLink(subject, `${message}\n\n${name}\n${email}`)}>
            Send it with your email app
          </a>{" "}
          or write to {site.email}.
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-muted">Your message goes straight to our inbox. We only use your email address to reply.</p>
    </form>
  );
}
