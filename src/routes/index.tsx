import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, ShieldCheck, FileText, Trophy, MessageSquare } from "lucide-react";
import { SupportChat } from "@/components/SupportChat";
import { SITE_ROUTES, TEST_QUERIES } from "@/lib/vaultofcourse-kb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VaultOfCourse Support Assistant — Instant Student Help" },
      {
        name: "description",
        content:
          "Get instant answers about VaultOfCourse courses, training programs, internships, certificates, offer letters and verification — with WhatsApp support escalation.",
      },
      { property: "og:title", content: "VaultOfCourse Support Assistant" },
      {
        property: "og:description",
        content:
          "AI support assistant for VaultOfCourse students: courses, internships, certificates, offer letters and verification help.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HELP_TOPICS = [
  { icon: GraduationCap, title: "Courses", desc: "Domains, syllabus pages and how self-paced learning works.", path: SITE_ROUTES.courses },
  { icon: Trophy, title: "Training Programs", desc: "Mentor-led cohorts, live sessions and capstone reviews.", path: SITE_ROUTES.training },
  { icon: Briefcase, title: "Internships", desc: "How to apply, task phases and completion certificates.", path: SITE_ROUTES.internships },
  { icon: FileText, title: "Offer Letters", desc: "When offer letters are issued and where to find them.", path: SITE_ROUTES.offerLetters },
  { icon: ShieldCheck, title: "Verification", desc: "Verify any certificate using its unique certificate ID.", path: SITE_ROUTES.verification },
  { icon: MessageSquare, title: "Support", desc: "Account, payment or document issues go to our team.", path: SITE_ROUTES.support },
];

function Index() {
  return (
    <div className="min-h-screen bg-background bg-gradient-page">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Vault<span className="text-brand">Of</span>Course
        </span>
        <a
          href={SITE_ROUTES.support}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-highlight hover:text-brand"
        >
          Contact
        </a>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-28">
        <section className="py-10 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            First-level support · powered by AI
          </span>
          <h1 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            VaultOfCourse Support Assistant
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Ask about courses, training programs, internships, workshops, certificates, offer
            letters and verification. The assistant answers only from our published knowledge base —
            and hands account-specific issues to the human team on WhatsApp.
          </p>
          <p className="mt-6 text-sm font-medium text-brand">
            Tap the chat button at the bottom-right to start →
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_TOPICS.map(({ icon: Icon, title, desc, path }) => (
            <a
              key={title}
              href={path}
              className="group rounded-2xl border border-border bg-card p-5 shadow-bubble transition hover:-translate-y-0.5 hover:border-highlight"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="font-display mt-4 text-base font-semibold text-foreground">{title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </a>
          ))}
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold text-foreground">Try these questions</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {TEST_QUERIES.map((t) => (
              <li key={t.query} className="text-sm text-muted-foreground">
                <span className="text-foreground">“{t.query}”</span>
                <span className="block text-xs opacity-70">{t.expect}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SupportChat />
    </div>
  );
}
