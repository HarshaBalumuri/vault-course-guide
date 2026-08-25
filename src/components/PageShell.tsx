import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SupportChat } from "@/components/SupportChat";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background bg-gradient-page">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          Vault<span className="text-brand">Of</span>Course
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-highlight hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-28">
        <section className="py-8 sm:py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            {eyebrow}
          </span>
          <h1 className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </section>

        {children}

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>

      <SupportChat />
    </div>
  );
}

export function InfoCards({ items }: { items: readonly string[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {items.map((body, index) => (
        <article
          key={body}
          className="rounded-2xl border border-border bg-card p-5 shadow-bubble transition hover:-translate-y-0.5 hover:border-highlight"
        >
          <span className="font-display inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-xs font-bold text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{body}</p>
        </article>
      ))}
    </section>
  );
}
