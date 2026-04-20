"use client";

import { useState } from "react";
import type { LessonAssets } from "@/data/types";
import { AccentBar } from "@/components/ui/AccentBar";
import { useProgress } from "@/lib/progress/useProgress";
import { VideoPlayer } from "./VideoPlayer";
import { SlidesViewer } from "./SlidesViewer";
import { SlideNavigator } from "./SlideNavigator";
import { LearningObjectives } from "./LearningObjectives";
import { KeyConcepts } from "./KeyConcepts";
import { ExerciseBlock } from "./ExerciseBlock";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export function LessonView({
  assets,
  exerciseHtml,
}: {
  assets: LessonAssets;
  exerciseHtml: string | null;
}) {
  const { lesson, videoUrl, slides, quiz } = assets;
  const [slideIndex, setSlideIndex] = useState(0);
  const { markVideoWatched } = useProgress();

  return (
    <article>
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ux-text-muted">
        Modul {lesson.moduleId}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-ux-text-primary md:text-3xl">
        {lesson.title}
      </h1>
      <AccentBar />

      <LearningObjectives items={lesson.learningObjectives} />

      {lesson.content ? (
        <div
          className="mb-8 text-sm leading-relaxed text-ux-text-secondary [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-ux-text-primary [&_p]:my-3"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      ) : null}

      <section className="mb-8" aria-labelledby="video-heading">
        <h2 id="video-heading" className="sr-only">
          Video
        </h2>
        <VideoPlayer
          src={videoUrl}
          onComplete={() => markVideoWatched(lesson.moduleId, lesson.id)}
        />
      </section>

      <section className="mb-8" aria-labelledby="folien-heading">
        <h2 id="folien-heading" className="text-base font-semibold text-ux-text-primary">
          Folien
        </h2>
        <p className="mt-1 text-xs text-ux-text-muted">
          MVP: Anzeige ohne Timestamp-Sync zum Video.
        </p>
        <div className="mt-4">
          <SlideNavigator
            index={slideIndex}
            total={slides.length}
            onChange={setSlideIndex}
          />
          <SlidesViewer slides={slides} index={slideIndex} />
        </div>
      </section>

      <KeyConcepts concepts={lesson.keyConcepts} />

      <ExerciseBlock html={exerciseHtml} />

      <section className="mb-8" aria-labelledby="quiz-heading">
        <h2 id="quiz-heading" className="text-base font-semibold text-ux-text-primary">
          Quiz
        </h2>
        <div className="mt-4">
          <QuizEngine
            questions={quiz}
            moduleId={lesson.moduleId}
            lessonId={lesson.id}
          />
        </div>
      </section>
    </article>
  );
}
