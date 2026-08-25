import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Mentor-Led Training Programs — VaultOfCourse";
const DESCRIPTION = "Cohort-based programs with live sessions, assignments, doubt-clearing and a reviewed capstone project.";

export const Route = createFileRoute("/training-programs")({
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
  component: TrainingProgramsPage,
});

function TrainingProgramsPage() {
  const items = KNOWLEDGE_BASE.trainingPrograms.map((body) => {
    const first = body.split(/[.:]/)[0] ?? body;
    const title = first.length > 60 ? `${first.slice(0, 57)}...` : first;
    return { title, body: body as string };
  });

  return (
    <PageShell eyebrow="Training Programs" title="Mentor-Led Training Programs" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
