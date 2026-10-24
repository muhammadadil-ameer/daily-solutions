import Link from "next/link";
import { site } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/image-tools/", label: "Image Tools" },
  { href: "/pdf-tools/", label: "PDF Tools" },
  { href: "/media-tools/", label: "Media Tools" },
  { href: "/health-tools/", label: "Health Tools" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-ink" aria-label={`${site.name} home`}>
      <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-sm font-extrabold text-white">DS</span>
      <span className="text-[17px]">{site.name}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/all-tools/" className="btn btn-primary hidden min-h-9 px-4 py-2 sm:inline-flex">
            All Tools
          </Link>
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
