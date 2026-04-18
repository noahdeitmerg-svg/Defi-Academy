import React from 'react';
import { registerRoot, Composition, getInputProps } from 'remotion';
import { Lesson } from './components/Lesson';

/**
 * Default props used by the Remotion Studio preview when no inputProps
 * are passed. For actual rendering, inputProps are always provided by
 * the render-lesson.js script.
 */
const DEFAULT_PROPS = {
  videoConfig: null,
  slidePlan: null,
  visualPlan: null,
  audioPath: null,
  nextLesson: null,
};

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
// Fallback duration for Studio preview when no videoConfig is loaded.
// The real duration is computed per-lesson via calculateMetadata.
const FALLBACK_DURATION_SECONDS = 480;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Lesson"
        component={Lesson}
        durationInFrames={FALLBACK_DURATION_SECONDS * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={DEFAULT_PROPS}
        calculateMetadata={({ props }) => {
          const duration = props.videoConfig?.duration_seconds
            ? Math.round(props.videoConfig.duration_seconds * FPS)
            : FALLBACK_DURATION_SECONDS * FPS;
          return {
            durationInFrames: duration,
            fps: FPS,
            width: WIDTH,
            height: HEIGHT,
          };
        }}
      />

      {/* Poster composition — renders a single still frame at t=1s of the
          lesson_title section. Used by render-poster.js */}
      <Composition
        id="LessonPoster"
        component={Lesson}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={DEFAULT_PROPS}
      />
    </>
  );
};

registerRoot(RemotionRoot);
