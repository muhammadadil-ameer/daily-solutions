import Link from "next/link";
import { ToolGrid } from "@/components/Blocks";
import { popularTools } from "@/content";

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-700">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for doesn’t exist or has moved.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go to homepage
          </Link>
          <Link href="/all-tools/" className="btn btn-secondary">
            Browse all tools
          </Link>
        </div>
      </div>
      <h2 className="mt-16 mb-5 text-xl font-bold text-ink">Popular tools</h2>
      <ToolGrid tools={popularTools().slice(0, 8)} cols={4} />
    </div>
  );
}
