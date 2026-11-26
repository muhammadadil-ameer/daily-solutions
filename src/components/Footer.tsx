import Link from "next/link";
import { categories, categoryHref, popularTools, primaryTools, toolHref } from "@/content";
import { site } from "@/lib/site";
import { Logo } from "./Header";

const company = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/all-tools/", label: "All Tools" },
];

const legal = [
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms of Service" },
  { href: "/cookie-policy/", label: "Cookie Policy" },
  { href: "/disclaimer/", label: "Disclaimer" },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-ink">{title}</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted hover:text-brand-700">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const tools = primaryTools().map((t) => ({ href: toolHref(t), label: t.name }));
  const hubs = categories.map((c) => ({ href: categoryHref(c.id), label: c.name }));
  const popular = popularTools()
    .slice(0, 8)
    .map((t) => ({ href: toolHref(t), label: t.name }));
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
        </div>
        <Column title="Categories" links={hubs} />
        <Column title="Tools" links={tools} />
        <Column title="Popular tools" links={popular} />
        <Column title="Company" links={company} />
        <Column title="Legal" links={legal} />
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-xs text-muted">
          © {site.name}. Free online tools for everyday problems.
        </p>
      </div>
    </footer>
  );
}
