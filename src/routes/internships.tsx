import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Internship Programs — VaultOfCourse";
const DESCRIPTION = "Project-based, remote-friendly internships with phased tasks, mentor support and a completion certificate.";

export const Route = createFileRoute("/internships")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InternshipsPage,
});

function InternshipsPage() {
  const items = KNOWLEDGE_BASE.internships.map((body) => {
    const first = body.split(/[.:]/)[0] ?? body;
    const title = first.length > 60 ? `${first.slice(0, 57)}...` : first;
    return { title, body: body as string };
  });

  return (
    <PageShell eyebrow="Internships" title="Internship Programs" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
