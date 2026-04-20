"use client";

import { ProgressBar } from "@/components/progress/ProgressBar";
import { useProgress } from "@/lib/progress/useProgress";

export function ModulProgressClient({ moduleId }: { moduleId: string }) {
  const { getModuleProgress } = useProgress();
  return <ProgressBar label="Modulfortschritt" value={getModuleProgress(moduleId)} />;
}
