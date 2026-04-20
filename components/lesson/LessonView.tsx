"use client";

import { useMemo, useState } from "react";
import type { LessonAssets } from "@/data/types";
import { ALL_MODULES } from "@/data/courseStructure";
import { useProgress } from "@/lib/progress/useProgress";
import { VideoPlayer } from "./VideoPlayer";
import { SlidesViewer } from "./SlidesViewer";
import { SlideNavigator } from "./SlideNavigator";
import { SlideThumbnailStrip } from "./SlideThumbnailStrip";
import { LearningObjectives } from "./LearningObjectives";
import { KeyConcepts } from "./KeyConcepts";
import { ExerciseBlock } from "./ExerciseBlock";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { UxTitleGoldBars } from "@/components/brand/UxLogo";

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

  const lektionLabel = useMemo(() => {
    const mod = ALL_MODULES.find((m) => m.id === lesson.moduleId);
    const n = mod?.number ?? 0;
    const idx = mod?.lessons.indexOf(lesson.id) ?? 0;
    return `${n}.${idx + 1}`;
  }, [lesson.id, lesson.moduleId]);

  return (
    <article>
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ux-text-muted">
        Lektion {lektionLabel}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-ux-text-primary md:text-3xl">
        {lesson.title}
      </h1>
      <UxTitleGoldBars />

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
          Thumbnails und Navigation — MVP ohne Timestamp-Sync zum Video.
        </p>
        <div className="mt-4">
          <SlideThumbnailStrip slides={slides} index={slideIndex} onSelect={setSlideIndex} />
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
