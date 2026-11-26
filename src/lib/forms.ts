import { site } from "@/lib/site";

/**
 * Sends a website form to the site owner's inbox through FormSubmit (https://formsubmit.co), so messages
 * arrive even when the visitor has no email app set up. The very first submission makes FormSubmit send
 * an "Activate Form" email to site.email; forms are delivered once that link has been clicked.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

export interface SendResult {
  ok: boolean;
  message?: string;
}

export async function sendForm(subject: string, fields: Record<string, string>, honeypot = ""): Promise<SendResult> {
  // Bots fill the hidden field; pretend success so they don't retry.
  if (honeypot) return { ok: true };
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
        _template: "table",
        _captcha: "false",
        _url: typeof window !== "undefined" ? window.location.href : site.url,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    const ok = res.ok && (data.success === true || data.success === "true");
    return { ok, message: data.message };
  } catch {
    return { ok: false };
  }
}

/** mailto: link with the same content, offered when sending fails. */
export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
