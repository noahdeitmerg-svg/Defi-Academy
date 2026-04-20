import { ALL_MODULES } from "@/data/courseStructure";
import type { Module } from "@/data/types";

export type LessonNavTarget = { moduleId: string; lessonId: string };

/** Flache Reihenfolge aller Lektionen für Vor/Zurück-Navigation */
export function flattenLessons(): LessonNavTarget[] {
  const out: LessonNavTarget[] = [];
  for (const m of ALL_MODULES) {
    for (const lid of m.lessons) {
      out.push({ moduleId: m.id, lessonId: lid });
    }
  }
  return out;
}

export function prevNextLesson(
  moduleId: string,
  lessonId: string
): { prev: LessonNavTarget | null; next: LessonNavTarget | null } {
  const flat = flattenLessons();
  const i = flat.findIndex(
    (x) => x.moduleId === moduleId && x.lessonId === lessonId
  );
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? flat[i - 1]! : null,
    next: i < flat.length - 1 ? flat[i + 1]! : null,
  };
}

export function prevNextModule(
  modulId: string
): { prev: Module | null; next: Module | null } {
  const i = ALL_MODULES.findIndex((m) => m.id === modulId);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? ALL_MODULES[i - 1]! : null,
    next: i < ALL_MODULES.length - 1 ? ALL_MODULES[i + 1]! : null,
  };
}

export function moduleCategory(
  n: number
): "Grundlagen" | "Mechaniken" | "Strategien" | "Infrastruktur" {
  if (n <= 3) return "Grundlagen";
  if (n <= 8) return "Mechaniken";
  if (n <= 13) return "Strategien";
  return "Infrastruktur";
}
