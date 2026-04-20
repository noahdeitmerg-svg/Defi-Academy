"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LessonProgress, Tier, UserProgress } from "@/data/types";
import { ALL_MODULES, TOTAL_LESSON_COUNT } from "@/data/courseStructure";
import { lessonProgressKey, progressStorage } from "./progressStorage";

export type ProgressContextValue = {
  progress: UserProgress;
  markVideoWatched: (moduleId: string, lessonId: string) => void;
  markExerciseCompleted: (moduleId: string, lessonId: string) => void;
  submitQuizResult: (
    moduleId: string,
    lessonId: string,
    scorePercent: number,
    passed: boolean
  ) => void;
  isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
  getModuleProgress: (moduleId: string) => number;
  getCourseProgress: () => number;
  getCurrentLesson: () => { moduleId: string; lessonId: string } | null;
  setTier: (tier: Tier) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

const initialProgress = (): UserProgress => ({
  userId: "local",
  tier: "free",
  lessons: {},
  currentLessonId: null,
  updatedAt: new Date().toISOString(),
});

function emptyLesson(moduleId: string, lessonId: string): LessonProgress {
  return {
    lessonId,
    moduleId,
    videoWatched: false,
    exerciseCompleted: false,
    quizPassed: false,
    quizScore: null,
    completedAt: null,
  };
}

function isDone(p: LessonProgress): boolean {
  return p.videoWatched && p.quizPassed;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);

  useEffect(() => {
    const stored = progressStorage.get();
    if (stored) setProgress(stored);
    else progressStorage.set(initialProgress());
  }, []);

  const patchLesson = useCallback(
    (
      moduleId: string,
      lessonId: string,
      fn: (prev: LessonProgress) => LessonProgress
    ) => {
      setProgress((prev) => {
        const key = lessonProgressKey(moduleId, lessonId);
        const prevL = prev.lessons[key] ?? emptyLesson(moduleId, lessonId);
        const nextL = fn(prevL);
        const completedAt =
          isDone(nextL) && !isDone(prevL)
            ? new Date().toISOString()
            : nextL.completedAt;
        const next: UserProgress = {
          ...prev,
          lessons: {
            ...prev.lessons,
            [key]: { ...nextL, completedAt },
          },
          currentLessonId: `${moduleId}/${lessonId}`,
          updatedAt: new Date().toISOString(),
        };
        progressStorage.set(next);
        return next;
      });
    },
    []
  );

  const markVideoWatched = useCallback(
    (moduleId: string, lessonId: string) => {
      patchLesson(moduleId, lessonId, (p) => ({ ...p, videoWatched: true }));
    },
    [patchLesson]
  );

  const markExerciseCompleted = useCallback(
    (moduleId: string, lessonId: string) => {
      patchLesson(moduleId, lessonId, (p) => ({
        ...p,
        exerciseCompleted: true,
      }));
    },
    [patchLesson]
  );

  const submitQuizResult = useCallback(
    (moduleId: string, lessonId: string, scorePercent: number, passed: boolean) => {
      patchLesson(moduleId, lessonId, (p) => ({
        ...p,
        quizPassed: passed,
        quizScore: scorePercent,
      }));
    },
    [patchLesson]
  );

  const isLessonCompleted = useCallback(
    (moduleId: string, lessonId: string) => {
      const p = progress.lessons[lessonProgressKey(moduleId, lessonId)];
      if (!p) return false;
      return isDone(p);
    },
    [progress.lessons]
  );

  const getModuleProgress = useCallback(
    (moduleId: string) => {
      const mod = ALL_MODULES.find((m) => m.id === moduleId);
      if (!mod || mod.lessons.length === 0) return 0;
      let done = 0;
      for (const lid of mod.lessons) {
        const p = progress.lessons[lessonProgressKey(moduleId, lid)];
        if (p && isDone(p)) done += 1;
      }
      return Math.round((done / mod.lessons.length) * 100);
    },
    [progress.lessons]
  );

  const getCourseProgress = useCallback(() => {
    let done = 0;
    for (const m of ALL_MODULES) {
      for (const lid of m.lessons) {
        const p = progress.lessons[lessonProgressKey(m.id, lid)];
        if (p && isDone(p)) done += 1;
      }
    }
    if (TOTAL_LESSON_COUNT === 0) return 0;
    return Math.round((done / TOTAL_LESSON_COUNT) * 100);
  }, [progress.lessons]);

  const getCurrentLesson = useCallback((): {
    moduleId: string;
    lessonId: string;
  } | null => {
    for (const m of ALL_MODULES) {
      for (const lid of m.lessons) {
        const p = progress.lessons[lessonProgressKey(m.id, lid)];
        if (!p || !isDone(p)) {
          return { moduleId: m.id, lessonId: lid };
        }
      }
    }
    return null;
  }, [progress.lessons]);

  const setTier = useCallback((tier: Tier) => {
    setProgress((prev) => {
      const next: UserProgress = {
        ...prev,
        tier,
        updatedAt: new Date().toISOString(),
      };
      progressStorage.set(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      progress,
      markVideoWatched,
      markExerciseCompleted,
      submitQuizResult,
      isLessonCompleted,
      getModuleProgress,
      getCourseProgress,
      getCurrentLesson,
      setTier,
    }),
    [
      progress,
      markVideoWatched,
      markExerciseCompleted,
      submitQuizResult,
      isLessonCompleted,
      getModuleProgress,
      getCourseProgress,
      getCurrentLesson,
      setTier,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress muss innerhalb von ProgressProvider verwendet werden.");
  }
  return ctx;
}
