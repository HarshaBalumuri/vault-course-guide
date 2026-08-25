import { createFileRoute } from "@tanstack/react-router";
import { PageShell, InfoCards } from "@/components/PageShell";
import { KNOWLEDGE_BASE } from "@/lib/vaultofcourse-kb";

const TITLE = "Courses & Learning Paths — VaultOfCourse";
const DESCRIPTION = "Self-paced courses with recorded lessons, downloadable resources and a final project. Open a course page for its syllabus, duration and current fee.";

export const Route = createFileRoute("/courses")({
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
  component: CoursesPage,
});

function CoursesPage() {
  const items = KNOWLEDGE_BASE.courses.map((body) => {
    const [first] = body.split(/[.:]/);
    return { title: first.length > 60 ? `${first.slice(0, 57)}...` : first, body };
  });

  return (
    <PageShell eyebrow="Courses" title="Courses & Learning Paths" description={DESCRIPTION}>
      <InfoCards items={items} />
    </PageShell>
  );
}
