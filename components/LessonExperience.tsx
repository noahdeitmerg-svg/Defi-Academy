"use client";

import type { ExerciseData, Slide, VisualSuggestion } from "@/lib/types";
import { ExerciseBlock } from "./ExerciseBlock";
import { LessonSectionBlock } from "./LessonSectionBlock";
import { SlideViewer } from "./SlideViewer";
import { VideoPlayer } from "./VideoPlayer";
import { VisualChecklist } from "./VisualChecklist";

type Props = {
  /** Erklärung (Markdown/MDX) — typischerweise `<MdxExplanation />` von der Server-Seite */
  children: React.ReactNode;
  title: string;
  duration: string;
  moduleNumber: number;
  lessonNumber: number | string;
  slides: Slide[];
  narration: string;
  visuals: VisualSuggestion[];
  exercise: ExerciseData | null;
  exerciseStorageKey: string;
  quizPanel?: React.ReactNode | null;
};

export function LessonExperience({
  children,
  title,
  duration,
  moduleNumber,
  lessonNumber,
  slides,
  narration,
  visuals,
  exercise,
  exerciseStorageKey,
  quizPanel,
}: Props) {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Modul {moduleNumber} · Lektion {String(lessonNumber)}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)]">{title}</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">Dauer: {duration}</p>
      </header>

      <LessonSectionBlock title="Erklärung" sourceHeading="Explanation">
        {children}
      </LessonSectionBlock>

      <LessonSectionBlock title="Folien" sourceHeading="Slide Summary">
        <SlideViewer slides={slides} />
      </LessonSectionBlock>

      <LessonSectionBlock title="Voice-over & Video" sourceHeading="Voice Narration Script">
        <VideoPlayer narration={narration} lessonTitle={title} />
      </LessonSectionBlock>

      <LessonSectionBlock title="Visuals" sourceHeading="Visual Suggestions">
        {visuals.length > 0 ? (
          <VisualChecklist items={visuals} />
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">
            Keine Visual-Vorschläge in dieser Lektion.
          </p>
        )}
      </LessonSectionBlock>

      <LessonSectionBlock title="Übung" sourceHeading="Exercise">
        {exercise ? (
          <ExerciseBlock exercise={exercise} storageKey={exerciseStorageKey} />
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">
            Keine strukturierte Übung für diese Lektion hinterlegt.
          </p>
        )}
      </LessonSectionBlock>

      {quizPanel ? (
        <LessonSectionBlock title="Quiz" sourceHeading="Quiz">
          {quizPanel}
        </LessonSectionBlock>
      ) : null}
    </div>
  );
}
