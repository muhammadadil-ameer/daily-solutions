import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, SectionHeading, ToolCard, ToolGrid } from "@/components/Blocks";
import {
  BoltIcon,
  CheckIcon,
  GiftIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  ToolIcon,
  UploadIcon,
  UserOffIcon,
  ArrowRight,
} from "@/components/Icons";
import { ToolSearch } from "@/components/ToolSearch";
import { categories, categoryHref, popularTools, primaryTools, recentTools, searchIndex } from "@/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Free Online Tools for Everyday Problems – ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: `Free Online Tools – ${site.name}`, description: site.description, url: "/" },
};

const steps = [
  { icon: SearchIcon, title: "Choose a tool", text: "Pick the tool that matches your problem, or search for it." },
  { icon: UploadIcon, title: "Upload or enter your data", text: "Add your file or type in the details the tool needs." },
  { icon: CheckIcon, title: "Get your result", text: "The tool processes it right away. Download or read your result." },
];

const benefits = [
  { icon: GiftIcon, title: "Free to use", text: "Every tool is free, with no trial or paywall." },
  { icon: UserOffIcon, title: "No account required", text: "Open a tool and use it. No signup, no email." },
  { icon: ShieldIcon, title: "Files stay on your device", text: "Images, PDFs, audio and video are processed in your browser, not uploaded to our server." },
  { icon: BoltIcon, title: "Fast processing", text: "No upload or download wait. Results appear as soon as your device finishes." },
  { icon: SparkIcon, title: "Simple interface", text: "Clear steps, no clutter and no pop-ups." },
  { icon: PhoneIcon, title: "Mobile friendly", text: "Every tool works on phones, tablets and computers." },
];

const homeFaqs = [
  { q: "Are these tools free?", a: "Yes. All tools on Daily Solutions are free to use." },
  { q: "Do I need to create an account?", a: "No. You can use every tool without signing up or giving your email address." },
  { q: "Can I use these tools on mobile?", a: "Yes. The site is designed for phones first and every tool works in mobile browsers such as Chrome and Safari." },
  {
    q: "Are my uploaded files secure?",
    a: "Your files are not uploaded to our server at all. Image, PDF, audio and video tools process files inside your browser, and the results are created on your device.",
  },
  {
    q: "How long does file processing take?",
    a: "Most images and PDFs finish in a few seconds. Video conversion takes longer because it runs on your own device; the first media conversion also downloads the converter engine (about 30 MB).",
  },
  {
    q: "What file formats are supported?",
    a: "Images: JPG, PNG, WebP, AVIF, GIF, BMP, TIFF and HEIC. Documents: PDF. Audio: MP3, WAV, M4A, AAC, OGG, FLAC. Video: MP4, MOV, AVI, WebM, MKV.",
  },
  { q: "Is there a file size limit?", a: "Images up to 50 MB, PDFs up to 100 MB, and audio or video files up to 500 MB." },
];

export default function Home() {
  const primary = primaryTools();
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page pt-12 pb-14 text-center sm:pt-16">
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-700">
            Free · No signup · Works in your browser
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Simple Tools for Everyday Problems
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Convert, resize and compress images, fix PDFs, convert audio and video, and calculate calories and BMI with
            fast, easy-to-use online tools.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <ToolSearch index={searchIndex()} />
          </div>
        </div>
        <div className="container-page pb-14">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {primary.map((t) => (
              <li key={t.slug}>
                <ToolCard tool={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page space-y-20 pt-16">
        <section aria-labelledby="popular">
          <SectionHeading id="popular" title="Popular Tools" sub="Quick fixes people use every day." />
          <ToolGrid tools={popularTools()} cols={4} />
        </section>

        <section aria-labelledby="how">
          <SectionHeading id="how" title="How It Works" />
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="card p-6">
                <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                  <s.icon width={22} height={22} />
                </span>
                <p className="text-sm font-semibold text-brand-700">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="why">
          <SectionHeading id="why" title="Why Use Our Tools?" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4 rounded-2xl bg-surface p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-sm">
                  <b.icon width={20} height={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="explore">
          <SectionHeading id="explore" title="Explore Our Tools" sub="Browse tools by category." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={categoryHref(c.id)} className="card flex h-full flex-col p-5 transition hover:border-brand-200">
                  <ToolIcon slug={c.slug} category={c.id} className="mb-3 text-brand-700" />
                  <span className="font-semibold text-ink">{c.name}</span>
                  <span className="mt-1 text-sm text-muted">{c.description}</span>
                </Link>
              </li>
            ))}
            <li>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-line p-5">
                <PlusIcon className="mb-3 text-muted" />
                <span className="font-semibold text-ink">More Tools</span>
                <span className="mt-1 text-sm text-muted">New categories are on the way. Tell us what you need.</span>
                <Link href="/contact/" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Suggest a tool <ArrowRight width={16} height={16} />
                </Link>
              </div>
            </li>
          </ul>
        </section>

        <section aria-labelledby="recent">
          <SectionHeading id="recent" title="Recently Added" />
          <ToolGrid tools={recentTools()} cols={4} />
        </section>

        <section aria-labelledby="faq" className="mx-auto max-w-3xl">
          <SectionHeading id="faq" title="Frequently Asked Questions" />
          <FaqList faqs={homeFaqs} />
        </section>
      </div>
    </>
  );
}
