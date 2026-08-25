import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Internship Offer Letters — VaultOfCourse";
const DESCRIPTION = "Offer letters are issued after your internship application is selected, and delivered to your dashboard and email.";

export const Route = createFileRoute("/offer-letter")({
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
  component: OfferLetterPage,
});

function OfferLetterPage() {
  const items = KNOWLEDGE_BASE.offerLetters.map((body, i) => ({
    title: `Good to know ${i + 1}`,
    body,
  }));

  return (
    <PageShell eyebrow="Offer Letters" title="Internship Offer Letters" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
