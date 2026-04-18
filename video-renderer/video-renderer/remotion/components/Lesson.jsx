import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  useVideoConfig,
} from 'remotion';

// Video Style Engine scenes (copied into /remotion/style-engine at build time)
import { IntroScene } from '../style-engine/intro-scene';
import { OutroScene } from '../style-engine/outro-scene';
import { SlideTemplate } from '../style-engine/slide-template';

// Local visual renderer
import { VisualRenderer } from './VisualRenderer';

/**
 * Lesson
 *
 * Die Top-Level-Komposition einer Lektion.
 * Rendert die 9 Sektionen aus video_config.json als eine sequentielle
 * Timeline. Jede Sektion wird mit ihrem zugehoerigen Szenen-Typ gerendert
 * (intro-scene, slide-template, outro-scene).
 *
 * Props:
 *   - videoConfig: Inhalt von video_config.json
 *   - slidePlan:   Lesson slide plan
 *                  (mapping slide_id -> { title, bullets, section, visuals, ...})
 *   - visualPlan:  Inhalt von visual_plan.json
 *   - audioPath:   Pfad zur MP3 relativ zu public/
 *   - nextLesson:  Optional — Infos fuer die Outro-Szene
 */
export const Lesson = ({
  videoConfig,
  slidePlan,
  visualPlan,
  audioPath,
  nextLesson,
}) => {
  const { fps } = useVideoConfig();

  if (!videoConfig || !slidePlan || !visualPlan) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#0B0F14',
          color: '#F5F7FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        Missing render data: provide videoConfig, slidePlan and visualPlan.
      </AbsoluteFill>
    );
  }

  // Build slide lookup
  const slideById = {};
  for (const s of slidePlan.slides) slideById[s.id] = s;

  // Build visual lookup: slide_ref -> visual[]
  const visualsBySlide = {};
  for (const v of visualPlan.visuals) {
    if (!visualsBySlide[v.slide_ref]) visualsBySlide[v.slide_ref] = [];
    visualsBySlide[v.slide_ref].push(v);
  }

  const moduleNumber = videoConfig.module.number;
  const lessonNumber = videoConfig.lesson.number;
  const lessonTitle = videoConfig.title;

  // Count total content slides (for slide counter display)
  const contentSections = videoConfig.sections.filter(
    (s) => s.scene === 'slide-template'
  );
  const slideTotal = contentSections.length;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F14' }}>
      {/* Single audio track spanning the full duration */}
      {audioPath && (
        <Audio src={staticFile(audioPath)} volume={1} />
      )}

      {videoConfig.sections.map((section, idx) => {
        const from = Math.round(section.start_seconds * fps);
        const durationInFrames = Math.max(
          1,
          Math.round((section.end_seconds - section.start_seconds) * fps)
        );

        // Intro
        if (section.scene === 'intro-scene') {
          return (
            <Sequence
              key={`sec-${idx}`}
              from={from}
              durationInFrames={durationInFrames}
              layout="none"
            >
              <IntroScene
                moduleNumber={moduleNumber}
                lessonNumber={lessonNumber}
                lessonTitle={lessonTitle}
              />
            </Sequence>
          );
        }

        // Outro
        if (section.scene === 'outro-scene') {
          return (
            <Sequence
              key={`sec-${idx}`}
              from={from}
              durationInFrames={durationInFrames}
              layout="none"
            >
              <OutroScene
                nextLessonTitle={nextLesson?.title}
                nextModuleNumber={nextLesson?.module}
                nextLessonNumber={nextLesson?.lesson}
                isLastLessonInModule={nextLesson?.isLastLessonInModule}
                isLastLessonOverall={nextLesson?.isLastLessonOverall}
              />
            </Sequence>
          );
        }

        // Content slide
        if (section.scene === 'slide-template') {
          const slide = slideById[section.slide_ref];
          if (!slide) return null;

          // Find the content slide index (1-based) within the content stream.
          const slideIndex =
            contentSections.findIndex(
              (s) => s.slide_ref === section.slide_ref
            ) + 1;

          const visuals = visualsBySlide[section.slide_ref] || [];
          const primaryVisual = visuals[0]; // first visual is primary; others are layered

          const accentColor = section.accent_color_override || undefined;

          return (
            <Sequence
              key={`sec-${idx}`}
              from={from}
              durationInFrames={durationInFrames}
              layout="none"
            >
              <SlideTemplate
                moduleNumber={moduleNumber}
                lessonNumber={lessonNumber}
                slideIndex={slideIndex}
                slideTotal={slideTotal}
                sectionLabel={prettySectionLabel(section.name)}
                title={slide.title}
                bullets={slide.bullets}
                visual={
                  primaryVisual ? (
                    <VisualRenderer
                      visual={primaryVisual}
                      lessonId={videoConfig.lesson_id}
                    />
                  ) : null
                }
                accentColor={accentColor}
              />
            </Sequence>
          );
        }

        return null;
      })}
    </AbsoluteFill>
  );
};

function prettySectionLabel(name) {
  const map = {
    lesson_title: 'Einfuehrung',
    concept: 'Konzept',
    mechanism: 'Mechanismus',
    system_architecture: 'Architektur',
    risk_layer: 'Risiko',
    protocol_example: 'Beispiel',
    key_takeaways: 'Kernaussagen',
  };
  return map[name] || '';
}

export default Lesson;
