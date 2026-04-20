import type { UserProgress } from "@/data/types";

const STORAGE_KEY = "defi-akademie-progress-v1";

const defaultProgress = (): UserProgress => ({
  userId: "local",
  tier: "free",
  lessons: {},
  currentLessonId: null,
  updatedAt: new Date().toISOString(),
});

function readRaw(): UserProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProgress;
  } catch {
    return null;
  }
}

function writeRaw(data: UserProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const progressStorage = {
  get(): UserProgress | null {
    return readRaw();
  },

  set(data: UserProgress) {
    writeRaw({ ...data, updatedAt: new Date().toISOString() });
  },

  update(patch: Partial<UserProgress>) {
    const cur = readRaw() ?? defaultProgress();
    progressStorage.set({ ...cur, ...patch, updatedAt: new Date().toISOString() });
  },
};

export function lessonProgressKey(moduleId: string, lessonId: string): string {
  return `${moduleId}::${lessonId}`;
}
