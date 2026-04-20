"use client";

import { ModuleCard } from "@/components/course/ModuleCard";
import { ContinueLearningCard } from "@/components/course/ContinueLearningCard";
import { ProgressBar } from "@/components/progress/ProgressBar";
import { useProgress } from "@/lib/progress/useProgress";
import { ALL_MODULES, TOTAL_LESSON_COUNT } from "@/data/courseStructure";

export default function DashboardPage() {
  const { progress, getCourseProgress, isLessonCompleted } = useProgress();

  let completed = 0;
  for (const m of ALL_MODULES) {
    for (const lid of m.lessons) {
      if (isLessonCompleted(m.id, lid)) completed += 1;
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ux-text-primary md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-ux-text-secondary">
          Hallo — lokal gespeicherter Fortschritt ({progress.userId}).
        </p>
      </div>

      <ProgressBar
        label={`Gesamtfortschritt (${completed} von ${TOTAL_LESSON_COUNT} Lektionen)`}
        value={getCourseProgress()}
      />

      <ContinueLearningCard />

      <section>
        <h2 className="text-lg font-semibold text-ux-text-primary">Alle Module</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_MODULES.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
