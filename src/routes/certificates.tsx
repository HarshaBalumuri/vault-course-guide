import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Certificates & Completion Documents — VaultOfCourse";
const DESCRIPTION = "Course, training, internship and workshop certificates — downloadable as PDF from your student dashboard.";

export const Route = createFileRoute("/certificates")({
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
  component: CertificatesPage,
});

function CertificatesPage() {
  const items = KNOWLEDGE_BASE.certificates;

  return (
    <PageShell eyebrow="Certificates" title="Certificates & Completion Documents" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
