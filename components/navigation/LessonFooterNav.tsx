import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { prevNextLesson } from "@/lib/uxNav";

const btn =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-ux-border bg-ux-surface px-4 py-2 text-sm font-medium text-ux-text-primary transition-colors hover:bg-ux-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ux-accent-gold";

export function LessonFooterNav({
  moduleId,
  lessonId,
}: {
  moduleId: string;
  lessonId: string;
}) {
  const { prev, next } = prevNextLesson(moduleId, lessonId);
  return (
    <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ux-border pt-8">
      {prev ? (
        <Link href={`/kurs/${prev.moduleId}/${prev.lessonId}`} className={cn(btn)}>
          ← Vorherige Lektion
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/kurs/${next.moduleId}/${next.lessonId}`} className={cn(btn)}>
          Nächste Lektion →
        </Link>
      ) : (
        <span />
      )}
    </footer>
  );
}
