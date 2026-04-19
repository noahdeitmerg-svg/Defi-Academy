"use client";

import { useState } from "react";
import type { ExerciseData, Slide } from "@/lib/types";
import { ExerciseBlock } from "./ExerciseBlock";
import { LessonSectionBlock } from "./LessonSectionBlock";
import { SlideViewer } from "./SlideViewer";
import { VideoPlayer } from "./VideoPlayer";

type TabId = "explanation" | "slides" | "video" | "exercise" | "quiz";

type Props = {
  /** Erklärung (Markdown/MDX) — typischerweise `<MdxExplanation />` von der Server-Seite */
  children: React.ReactNode;
  title: string;
  duration: string;
  moduleNumber: number;
  lessonNumber: number | string;
  slides: Slide[];
  narration: string;
  exercise: ExerciseData | null;
  exerciseStorageKey: string;
  quizPanel?: React.ReactNode | null;
  /** Optionaler Hero-Video-Player (Server-gerendert, nur gesetzt wenn Asset existiert) */
  videoHero?: React.ReactNode | null;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "explanation", label: "Erklärung" },
  { id: "slides", label: "Folien" },
  { id: "video", label: "Video" },
  { id: "exercise", label: "Übung" },
];

export function LessonExperience({
  children,
  title,
  duration,
  moduleNumber,
  lessonNumber,
  slides,
  narration,
  exercise,
  exerciseStorageKey,
  quizPanel,
  videoHero,
}: Props) {
  const tabList: { id: TabId; label: string }[] = quizPanel
    ? [...tabs, { id: "quiz" as const, label: "Quiz" }]
    : tabs;
  const [tab, setTab] = useState<TabId>("explanation");

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Modul {moduleNumber} · Lektion {String(lessonNumber)}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)]">{title}</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">Dauer: {duration}</p>
      </header>

      <div
        role="tablist"
        aria-label="Lektionsbereiche"
        className="mb-6 flex flex-wrap gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-1"
      >
        {tabList.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-[12rem]">
        {tab === "explanation" ? (
          <LessonSectionBlock title="Erklärung">
            {children}
          </LessonSectionBlock>
        ) : null}

        {tab === "slides" ? (
          <LessonSectionBlock title="Folien">
            <SlideViewer slides={slides} />
          </LessonSectionBlock>
        ) : null}

        {tab === "video" ? (
          <LessonSectionBlock title="Video">
            <VideoPlayer narration={narration} lessonTitle={title} videoSlot={videoHero ?? undefined} />
          </LessonSectionBlock>
        ) : null}

        {tab === "exercise" ? (
          <LessonSectionBlock title="Übung">
            {exercise ? (
              <ExerciseBlock exercise={exercise} storageKey={exerciseStorageKey} />
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">
                Keine strukturierte Übung für diese Lektion hinterlegt.
              </p>
            )}
          </LessonSectionBlock>
        ) : null}

        {tab === "quiz" && quizPanel ? (
          <LessonSectionBlock title="Quiz">
            {quizPanel}
          </LessonSectionBlock>
        ) : null}
      </div>
    </div>
  );
}
