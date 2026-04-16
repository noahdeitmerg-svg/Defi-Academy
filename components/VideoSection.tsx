"use client";

import { useEffect, useState } from "react";

type Props = {
  narration: string;
  lessonTitle: string;
};

export function VideoSection({ narration, lessonTitle }: Props) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!narration.trim()) {
      setBlobUrl(null);
      return;
    }
    const blob = new Blob([narration], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [narration]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="aspect-video flex flex-col items-center justify-center gap-2 p-8 text-center">
          <div className="rounded-full border border-dashed border-[var(--color-border)] px-4 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            Platzhalter
          </div>
          <p className="max-w-md text-sm text-[var(--color-text-muted)]">
            Hier erscheint später das KI-generierte Video. Die Grundlage bildet das Skript unter
            „Transkript“ — exportierbar für TTS- und Videopipelines.
          </p>
          <span className="text-xs text-[var(--color-text-muted)]">{lessonTitle}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowTranscript((v) => !v)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-accent)]"
        >
          {showTranscript ? "Transkript ausblenden" : "Transkript anzeigen"}
        </button>
        {blobUrl ? (
          <a
            href={blobUrl}
            download={`${lessonTitle.replace(/\s+/g, "-").toLowerCase()}-skript.txt`}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-accent)]"
          >
            Transkript herunterladen
          </a>
        ) : null}
      </div>

      {showTranscript ? (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {narration.trim() || "Kein Voice-Skript in dieser Lektion."}
        </pre>
      ) : null}
    </div>
  );
}
