/**
 * pipeline.js
 *
 * Orchestrierung: nimmt eine Markdown-Lektion entgegen und erzeugt
 * alle vier Asset-Dateien im Output-Ordner.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseLesson } = require('./lesson-parser');
const { mapLessonToSections } = require('./section-mapper');
const { buildSlidesPrompt } = require('./generate-slides-prompt');
const { buildVoiceScript } = require('./generate-voice-script');
const { buildVisualPlan } = require('./generate-visual-plan');
const { buildVideoConfig } = require('./generate-video-config');

function loadVisualTimingSpec(stylePath) {
  const p = path.resolve(stylePath, 'visual-timing.json');
  if (!fs.existsSync(p)) {
    throw new Error(
      `visual-timing.json nicht gefunden unter: ${p}. ` +
        'Gib den Pfad zur Video Style Engine mit --style an.'
    );
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Run the full pipeline for one lesson.
 *
 * @param {object} opts
 * @param {string} opts.input       - Path to lesson markdown file
 * @param {string} opts.outputRoot  - Path to output root directory
 * @param {string} opts.stylePath   - Path to Video Style Engine folder
 * @param {number} [opts.module]    - Override module number
 * @param {number} [opts.lesson]    - Override lesson number
 * @param {string} [opts.voiceId]   - Override ElevenLabs voice ID
 * @returns {object} { lesson_id, files: [...] }
 */
function runPipelineForLesson(opts) {
  const { input, outputRoot, stylePath, module: mod, lesson: les, voiceId } = opts;

  const markdown = fs.readFileSync(input, 'utf8');
  const lesson = parseLesson(markdown, {
    sourcePath: input,
    module: mod,
    lesson: les,
  });

  const slidePlan = mapLessonToSections(lesson);

  const visualTimingSpec = loadVisualTimingSpec(stylePath);

  // Build section timings first (same logic as generate-video-config) so
  // we can hand them to visual-plan generation.
  const sectionTimings = computeSectionTimings(
    slidePlan,
    visualTimingSpec
  );

  const visualPlan = buildVisualPlan(lesson, slidePlan, sectionTimings);

  const audio = {
    file: `${lesson.meta.lesson_id}_voice.mp3`,
    voice_id: voiceId || 'de-male-educational-01',
  };

  const videoConfig = buildVideoConfig(
    lesson,
    slidePlan,
    visualPlan,
    visualTimingSpec,
    audio
  );

  const slidesPrompt = buildSlidesPrompt(lesson, slidePlan);
  const voice = buildVoiceScript(lesson, slidePlan, { voice_id: audio.voice_id });

  // Write output
  const lessonDir = path.join(outputRoot, lesson.meta.lesson_id);
  ensureDir(lessonDir);

  const files = [
    { name: 'slides_prompt.txt', content: slidesPrompt },
    { name: 'voice_script.txt', content: voice.text },
    { name: 'visual_plan.json', content: JSON.stringify(visualPlan, null, 2) },
    { name: 'video_config.json', content: JSON.stringify(videoConfig, null, 2) },
  ];

  const written = [];
  for (const f of files) {
    const fp = path.join(lessonDir, f.name);
    fs.writeFileSync(fp, f.content, 'utf8');
    written.push(fp);
  }

  return {
    lesson_id: lesson.meta.lesson_id,
    lesson_dir: lessonDir,
    files: written,
    slide_count: slidePlan.slide_count,
    duration_seconds: videoConfig.duration_seconds,
  };
}

function computeSectionTimings(slidePlan, visualTimingSpec) {
  const out = [];
  let cursor = 0;
  const structure = visualTimingSpec.structure;

  const slideBySection = {};
  slidePlan.slides.forEach((s) => {
    slideBySection[s.section] = s;
  });

  for (const sec of structure) {
    let duration = sec.target_seconds;
    if (sec.section === 'system_architecture' && !slidePlan.has_architecture_section) {
      duration = 0;
    } else if (sec.section === 'mechanism' && !slidePlan.has_architecture_section) {
      const arch = structure.find((x) => x.section === 'system_architecture');
      if (arch) duration += arch.target_seconds;
    }
    const mappedSlide = slideBySection[sec.section];
    out.push({
      section: sec.section,
      start_seconds: cursor,
      end_seconds: cursor + duration,
      slide_id: mappedSlide ? mappedSlide.id : null,
    });
    cursor += duration;
  }

  return out;
}

/**
 * Batch: run pipeline for every .md file in a folder tree.
 */
function runPipelineForFolder(opts) {
  const { inputDir, outputRoot, stylePath, voiceId } = opts;
  const results = [];

  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.endsWith('.md')) {
        try {
          const r = runPipelineForLesson({
            input: full,
            outputRoot,
            stylePath,
            voiceId,
          });
          results.push({ status: 'ok', input: full, ...r });
        } catch (err) {
          results.push({ status: 'error', input: full, error: err.message });
        }
      }
    }
  };

  walk(inputDir);
  return results;
}

module.exports = { runPipelineForLesson, runPipelineForFolder };
