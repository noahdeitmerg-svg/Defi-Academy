import type { ProgressState } from "./types";

const KEY = "defi-academy-progress";

const empty: ProgressState = {
  version: 1,
  completedLessons: [],
  quizScores: {},
  moduleCompleted: {},
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed?.version !== 1) return { ...empty };
    return {
      version: 1,
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      quizScores:
        parsed.quizScores && typeof parsed.quizScores === "object"
          ? parsed.quizScores
          : {},
      moduleCompleted:
        parsed.moduleCompleted && typeof parsed.moduleCompleted === "object"
          ? parsed.moduleCompleted
          : {},
    };
  } catch {
    return { ...empty };
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function lessonKey(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}::${lessonSlug}`;
}

export function markLessonComplete(
  moduleSlug: string,
  lessonSlug: string,
): ProgressState {
  const prev = loadProgress();
  const key = lessonKey(moduleSlug, lessonSlug);
  const completedLessons = prev.completedLessons.includes(key)
    ? prev.completedLessons
    : [...prev.completedLessons, key];
  const next: ProgressState = { ...prev, completedLessons };
  saveProgress(next);
  return next;
}

/** Speichert Quiz-Ergebnis unter einem beliebigen Schlüssel (Modulslug oder `lessonQuizProgressKey`). */
export function setQuizScore(scoreStorageKey: string, scorePercent: number) {
  const prev = loadProgress();
  const next: ProgressState = {
    ...prev,
    quizScores: { ...prev.quizScores, [scoreStorageKey]: scorePercent },
  };
  saveProgress(next);
  return next;
}

export function lessonQuizProgressKey(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}::${lessonSlug}::lesson-quiz`;
}

export function setModuleCompleted(moduleSlug: string, done: boolean) {
  const prev = loadProgress();
  const next: ProgressState = {
    ...prev,
    moduleCompleted: { ...prev.moduleCompleted, [moduleSlug]: done },
  };
  saveProgress(next);
  return next;
}
