import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Live Workshops — VaultOfCourse";
const DESCRIPTION = "Short, focused live sessions with participation certificates issued after attendance is confirmed.";

export const Route = createFileRoute("/workshops")({
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
  component: WorkshopsPage,
});

function WorkshopsPage() {
  const items = KNOWLEDGE_BASE.workshops;

  return (
    <PageShell eyebrow="Workshops" title="Live Workshops" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
