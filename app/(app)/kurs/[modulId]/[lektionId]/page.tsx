import { notFound } from "next/navigation";
import { ALL_MODULES } from "@/data/courseStructure";
import { loadLessonWithExercise } from "@/lib/content/loadLesson";
import { markdownToHtml } from "@/lib/content/parseMarkdown";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { LessonLayout } from "@/components/layout/LessonLayout";
import { LessonSidebar } from "@/components/navigation/LessonSidebar";
import { LessonFooterNav } from "@/components/navigation/LessonFooterNav";
import { LessonView } from "@/components/lesson/LessonView";
import { TierGate } from "@/lib/tier/TierGate";
import { loadModules } from "@/lib/content/loadModules";

export function generateStaticParams() {
  return ALL_MODULES.flatMap((m) =>
    m.lessons.map((lektionId) => ({ modulId: m.id, lektionId }))
  );
}

export default async function LektionPage({
  params,
}: {
  params: Promise<{ modulId: string; lektionId: string }>;
}) {
  const { modulId, lektionId } = await params;
  const modules = await loadModules();
  const mod = modules.find((m) => m.id === modulId);
  if (!mod || !mod.lessons.includes(lektionId)) notFound();

  const assets = await loadLessonWithExercise(modulId, lektionId);
  const exerciseHtml = assets.exerciseMarkdown
    ? await markdownToHtml(assets.exerciseMarkdown)
    : null;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Kurs", href: "/kurs" },
          { label: mod.title, href: `/kurs/${mod.id}` },
          { label: assets.lesson.title },
        ]}
      />

      <TierGate moduleTier={mod.tier}>
        <LessonLayout
          sidebar={
            <LessonSidebar module={mod} currentLessonId={lektionId} />
          }
        >
          <>
            <LessonView assets={assets} exerciseHtml={exerciseHtml} />
            <LessonFooterNav moduleId={modulId} lessonId={lektionId} />
          </>
        </LessonLayout>
      </TierGate>
    </div>
  );
}
