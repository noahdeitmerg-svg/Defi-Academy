"use client";

import type { Module } from "@/data/types";
import { LessonListItem } from "@/components/course/LessonListItem";
import { useProgress } from "@/lib/progress/useProgress";

export function ModulLessonsList({
  module,
  lessons,
}: {
  module: Module;
  lessons: { id: string; title: string }[];
}) {
  const { isLessonCompleted } = useProgress();
  return (
    <ul className="mt-4 space-y-2">
      {lessons.map((l) => (
        <LessonListItem
          key={l.id}
          module={module}
          lessonId={l.id}
          title={l.title}
          done={isLessonCompleted(module.id, l.id)}
        />
      ))}
    </ul>
  );
}
