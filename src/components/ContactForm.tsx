"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const reasons = ["General question", "Report a problem with a tool", "Suggest a new tool", "Privacy request", "Business inquiry"];

/** Opens the visitor's email app with the message prefilled; nothing is sent to a server. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState(reasons[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 10) return setError("Please write a message of at least 10 characters.");
    setError("");
    const subject = `${reason}${name ? ` – ${name}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-5 sm:p-6" noValidate>
      <div>
        <label htmlFor="c-name" className="field-label">
          Your name (optional)
        </label>
        <input id="c-name" className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
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
        <textarea id="c-msg" rows={6} className="input py-3" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Open in my email app
      </button>
      <p className="text-xs text-muted" aria-live="polite">
        {opened
          ? `If your email app didn’t open, send your message to ${site.email}.`
          : "This opens your email app with the message ready to send. We don’t store anything you type here."}
      </p>
    </form>
  );
}
