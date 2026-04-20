"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useProgress } from "@/lib/progress/useProgress";
import { ALL_MODULES } from "@/data/courseStructure";
import { cn } from "@/lib/utils/cn";

const linkBtn =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ux-accent-gold";

export function ContinueLearningCard() {
  const { getCurrentLesson } = useProgress();
  const cur = getCurrentLesson();
  const mod = cur
    ? ALL_MODULES.find((m) => m.id === cur.moduleId)
    : null;

  if (!cur || !mod) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-ux-text-primary">Weiter lernen</h2>
        <p className="mt-2 text-sm text-ux-text-secondary">
          Alle sichtbaren Lektionen sind abgeschlossen — wähle ein Modul für Wiederholung.
        </p>
        <Link
          href="/kurs"
          className={cn(
            linkBtn,
            "mt-4 border border-ux-border bg-ux-surface text-ux-text-primary hover:bg-ux-surface-elevated"
          )}
        >
          Zur Kursübersicht
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-ux-text-primary">Weiter lernen</h2>
      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ux-text-muted">
        Modul {String(mod.number).padStart(2, "0")}
      </p>
      <p className="mt-2 font-medium text-ux-text-primary">{mod.title}</p>
      <p className="mt-1 font-ux-mono text-sm text-ux-text-secondary">{cur.lessonId}</p>
      <Link
        href={`/kurs/${cur.moduleId}/${cur.lessonId}`}
        className={cn(
          linkBtn,
          "mt-6 bg-ux-accent-gold text-ux-background hover:bg-ux-accent-gold-hover"
        )}
      >
        Lektion öffnen
      </Link>
    </Card>
  );
}
