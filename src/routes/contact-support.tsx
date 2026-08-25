import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Contact Support — VaultOfCourse";
const DESCRIPTION = "Our team reviews account-specific issues: payments, access, document corrections, missing documents and disputes.";

export const Route = createFileRoute("/contact-support")({
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
  component: ContactSupportPage,
});

function ContactSupportPage() {
  const items = KNOWLEDGE_BASE.supportProcess;

  return (
    <PageShell eyebrow="Support" title="Contact Support" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
