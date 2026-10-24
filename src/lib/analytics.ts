declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type ToolEvent =
  | "tool_open"
  | "file_upload"
  | "conversion_complete"
  | "download"
  | "calculator_complete"
  | "tool_error";

/** Sends a GA4 event when GA is configured (NEXT_PUBLIC_GA_ID); otherwise does nothing. */
export function track(event: ToolEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, { page_path: window.location.pathname, ...params });
}
