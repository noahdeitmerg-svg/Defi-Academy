/**
 * generate-video-config.js
 *
 * Erzeugt video_config.json — die Master-Konfiguration, die der
 * Remotion-Renderer konsumiert.
 *
 * Quellen:
 *   - visual-timing.json aus der Video Style Engine (Ziel-Dauern pro Sektion)
 *   - slide plan (Reihenfolge der Content-Slides)
 *   - visual plan (Visual-Timing)
 *   - voice script (Audio-Track-Referenz)
 *
 * Timing-Logik:
 *   Die Render-Pipeline beginnt mit den Ziel-Dauern aus visual-timing.json
 *   und passt sie danach feinjustiert an die tatsaechliche Tonspurlaenge an
 *   (erfolgt nach ElevenLabs-Rendering). Diese Config liefert die
 *   Ausgangswerte.
 */

'use strict';

// Mapping: section name in slide plan -> section name in visual-timing.json
const SLIDE_SECTION_TO_TIMING = {
  lesson_title: 'lesson_title',
  concept: 'concept',
  mechanism: 'mechanism',
  system_architecture: 'system_architecture',
  risk_layer: 'risk_layer',
  protocol_example: 'protocol_example',
  key_takeaways: 'key_takeaways',
};

/**
 * Timeline fuer module_direct: eine slide-template-Sektion pro Folie in
 * Dokumentenreihenfolge (kein slideBySection-Ueberschreiben bei gleicher section).
 * Zeitbudget = total_target_seconds minus Intro/Outro, verteilt gewichtet nach
 * Narrationslaenge.
 *
 * @returns {{ sections: object[], sectionTimings: object[], totalDuration: number }}
 */
function computeModuleDirectTimeline(slidePlan, visualTimingSpec) {
  const structure = visualTimingSpec.structure;
  const intro = structure.find((s) => s.section === 'intro');
  const outro = structure.find((s) => s.section === 'outro');
  const introDur = intro ? intro.target_seconds : 12;
  const outroDur = outro ? outro.target_seconds : 12;
  const totalTarget =
    visualTimingSpec.total_target_seconds ||
    structure.reduce((sum, s) => sum + (s.target_seconds || 0), 0);

  const slides = slidePlan.slides || [];
  const n = slides.length;
  const contentBudget = Math.max(
    n * 8,
    totalTarget - introDur - outroDur
  );

  const weights = slides.map((s) =>
    Math.max(1, String(s.narration || '').length)
  );
  const wSum = weights.reduce((a, b) => a + b, 0);

  const sections = [];
  const sectionTimings = [];
  let cursor = 0;
  let order = 1;

  sections.push({
    name: 'intro',
    order: order++,
    start_seconds: +cursor.toFixed(2),
    end_seconds: +(cursor + introDur).toFixed(2),
    scene: 'intro-scene',
    slide_ref: null,
  });
  sectionTimings.push({
    section: 'intro',
    start_seconds: +cursor.toFixed(2),
    end_seconds: +(cursor + introDur).toFixed(2),
    slide_id: null,
  });
  cursor += introDur;

  for (let i = 0; i < n; i++) {
    const dur =
      wSum > 0 ? (contentBudget * weights[i]) / wSum : contentBudget / Math.max(n, 1);
    const slide = slides[i];
    const start = cursor;
    const end = cursor + dur;
    sections.push({
      name: slide.section,
      order: order++,
      start_seconds: +start.toFixed(2),
      end_seconds: +end.toFixed(2),
      scene: 'slide-template',
      slide_ref: slide.id,
      accent_color_override: slide.accent_color_override || null,
    });
    sectionTimings.push({
      section: slide.section,
      start_seconds: +start.toFixed(2),
      end_seconds: +end.toFixed(2),
      slide_id: slide.id,
    });
    cursor = end;
  }

  sections.push({
    name: 'outro',
    order: order++,
    start_seconds: +cursor.toFixed(2),
    end_seconds: +(cursor + outroDur).toFixed(2),
    scene: 'outro-scene',
    slide_ref: null,
  });
  sectionTimings.push({
    section: 'outro',
    start_seconds: +cursor.toFixed(2),
    end_seconds: +(cursor + outroDur).toFixed(2),
    slide_id: null,
  });
  cursor += outroDur;

  const totalDuration = Math.round(cursor);

  return { sections, sectionTimings, totalDuration };
}

/**
 * Baut das video_config-Objekt.
 *
 * @param {object} lesson           - parsed lesson
 * @param {object} slidePlan        - from mapLessonToSections()
 * @param {object} visualPlan       - from buildVisualPlan()
 * @param {object} visualTimingSpec - Inhalt von visual-timing.json (Video Style Engine)
 * @param {object} audio            - { file, voice_id, language, engine }
 * @returns {object} video config
 */
function buildVideoConfig(lesson, slidePlan, visualPlan, visualTimingSpec, audio) {
  const { meta, title } = lesson;
  const lessonId = meta.lesson_id;

  if (slidePlan.source_format === 'module_direct') {
    const { sections, totalDuration } = computeModuleDirectTimeline(
      slidePlan,
      visualTimingSpec
    );
    const slide_order = slidePlan.slides.map((s) => s.id);
    const sectionBySlideRef = {};
    sections.forEach((s) => {
      if (s.slide_ref) sectionBySlideRef[s.slide_ref] = s;
    });
    const visual_timing = visualPlan.visuals.map((v) => {
      const sec = sectionBySlideRef[v.slide_ref];
      const start = sec ? sec.start_seconds + 1 : 0;
      const end = sec ? sec.end_seconds - 0.5 : start + 5;
      return {
        visual_id: v.id,
        start_seconds: +start.toFixed(2),
        end_seconds: +end.toFixed(2),
        type: v.type,
        reference: v.source_url_hint || null,
      };
    });

    return {
      lesson_id: lessonId,
      module: {
        number: meta.module,
        title: null,
      },
      lesson: {
        number: meta.lesson,
        title: title,
      },
      title,
      duration_seconds: totalDuration,
      fps: visualTimingSpec.fps || 30,
      resolution: '1920x1080',
      aspect_ratio: '16:9',
      sections,
      slide_order,
      visual_timing,
      audio_track: {
        file: audio.file || `${lessonId}_voice.mp3`,
        voice_id: audio.voice_id || 'de-male-educational-01',
        language: 'de',
        engine: 'elevenlabs',
      },
      assets: {
        video_output: `videos/${lessonId}.mp4`,
        poster_output: `posters/${lessonId}.jpg`,
      },
      style_engine: {
        theme: 'theme.json',
        animation_rules: 'animation-rules.json',
        visual_timing: 'visual-timing.json',
        slide_template: 'slide-template.jsx',
        intro_scene: 'intro-scene.jsx',
        outro_scene: 'outro-scene.jsx',
      },
    };
  }

  // 1) Build sections array with cumulative timing.
  const structure = visualTimingSpec.structure; // 9 sections in order
  const sections = [];
  let cursor = 0;

  // Mapping from timing section → slide (for slide-template scenes)
  const slideBySection = {};
  slidePlan.slides.forEach((s) => {
    slideBySection[s.section] = s;
  });

  for (const sec of structure) {
    let duration = sec.target_seconds;

    // If the lesson merged architecture into mechanism, redistribute the
    // architecture budget into mechanism.
    if (
      sec.section === 'system_architecture' &&
      !slidePlan.has_architecture_section
    ) {
      duration = 0; // section skipped
    } else if (
      sec.section === 'mechanism' &&
      !slidePlan.has_architecture_section
    ) {
      const archSec = structure.find((s) => s.section === 'system_architecture');
      if (archSec) duration += archSec.target_seconds;
    }

    const start = cursor;
    const end = cursor + duration;

    const sceneName =
      sec.section === 'intro'
        ? 'intro-scene'
        : sec.section === 'outro'
        ? 'outro-scene'
        : 'slide-template';

    const mappedSlide = slideBySection[SLIDE_SECTION_TO_TIMING[sec.section]];
    const slideRef = mappedSlide ? mappedSlide.id : null;

    sections.push({
      name: sec.section,
      order: sec.order,
      start_seconds: +start.toFixed(2),
      end_seconds: +end.toFixed(2),
      scene: sceneName,
      slide_ref: slideRef,
      accent_color_override: sec.accent_color_override || null,
      skipped: duration === 0 ? true : undefined,
    });

    cursor = end;
  }

  const totalDuration = Math.round(cursor);

  // 2) slide_order (just the content slides, in document order)
  const slide_order = slidePlan.slides.map((s) => s.id);

  // 3) visual_timing (from visual plan, enriched with section start times)
  const sectionByName = Object.fromEntries(
    sections.map((s) => [s.name, s])
  );
  const sectionBySlideRef = {};
  sections.forEach((s) => {
    if (s.slide_ref) sectionBySlideRef[s.slide_ref] = s;
  });

  const visual_timing = visualPlan.visuals.map((v) => {
    const sec = sectionBySlideRef[v.slide_ref];
    const start = sec ? sec.start_seconds + 1 : 0;
    const end = sec ? sec.end_seconds - 0.5 : start + 5;
    return {
      visual_id: v.id,
      start_seconds: +start.toFixed(2),
      end_seconds: +end.toFixed(2),
      type: v.type,
      reference: v.source_url_hint || null,
    };
  });

  // 4) Assemble final config
  return {
    lesson_id: lessonId,
    module: {
      number: meta.module,
      title: null, // filled in by pipeline if module manifest available
    },
    lesson: {
      number: meta.lesson,
      title: title,
    },
    title,
    duration_seconds: totalDuration,
    fps: visualTimingSpec.fps || 30,
    resolution: '1920x1080',
    aspect_ratio: '16:9',
    sections: sections.filter((s) => !s.skipped),
    slide_order,
    visual_timing,
    audio_track: {
      file: audio.file || `${lessonId}_voice.mp3`,
      voice_id: audio.voice_id || 'de-male-educational-01',
      language: 'de',
      engine: 'elevenlabs',
    },
    assets: {
      video_output: `videos/${lessonId}.mp4`,
      poster_output: `posters/${lessonId}.jpg`,
    },
    style_engine: {
      theme: 'theme.json',
      animation_rules: 'animation-rules.json',
      visual_timing: 'visual-timing.json',
      slide_template: 'slide-template.jsx',
      intro_scene: 'intro-scene.jsx',
      outro_scene: 'outro-scene.jsx',
    },
  };
}

module.exports = { buildVideoConfig, computeModuleDirectTimeline };
