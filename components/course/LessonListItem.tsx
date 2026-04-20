import Link from "next/link";
import type { Module } from "@/data/types";
import { cn } from "@/lib/utils/cn";

export function LessonListItem({
  module,
  lessonId,
  title,
  done,
  active,
}: {
  module: Module;
  lessonId: string;
  title: string;
  done: boolean;
  active?: boolean;
}) {
  const href = `/kurs/${module.id}/${lessonId}`;
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border border-ux-border px-4 py-3 text-sm transition-colors hover:border-ux-accent-gold/50 hover:bg-ux-surface-elevated",
          active && "border-ux-accent-gold/40 bg-ux-surface-elevated"
        )}
      >
        <span className="font-ux-mono text-xs text-ux-text-muted">{lessonId}</span>
        <span className="flex-1 text-ux-text-primary">{title}</span>
        {done ? (
          <span className="text-xs text-ux-success">erledigt</span>
        ) : (
          <span className="text-xs text-ux-text-muted">offen</span>
        )}
      </Link>
    </li>
  );
}
