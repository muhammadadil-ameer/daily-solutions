import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for support, bug reports, tool suggestions or business inquiries.`,
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <StaticPage title="Contact Us" path="/contact/" intro="Questions, bug reports or ideas for new tools — we’d like to hear from you.">
      <p>
        Email us directly at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>, or use the form below. We usually reply within a few
        working days.
      </p>
      <p className="text-sm">
        For problems with a tool, please mention the tool name, your device and browser, and the type of file you used.
        Please do not email us confidential files.
      </p>
      <div className="not-prose mt-6">
        <ContactForm />
      </div>
    </StaticPage>
  );
}
