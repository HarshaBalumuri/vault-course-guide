import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Verify a Certificate — VaultOfCourse";
const DESCRIPTION = "Students and recruiters can confirm any VaultOfCourse document using the certificate ID printed on it.";

export const Route = createFileRoute("/verify-certificate")({
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
  component: VerifyCertificatePage,
});

function VerifyCertificatePage() {
  const items = KNOWLEDGE_BASE.verification;

  return (
    <PageShell eyebrow="Verification" title="Verify a Certificate" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
