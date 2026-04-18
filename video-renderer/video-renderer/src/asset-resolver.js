/**
 * asset-resolver.js
 *
 * Bereitet alle Assets fuer eine Lektion so auf, dass Remotion sie ueber
 * staticFile() konsumieren kann.
 *
 * Eingang: Pfad zum Lektions-Output-Ordner des Lesson Asset Generators
 *   <generator_output>/moduleXX-lessonYY/
 *     ├── slides_prompt.txt    (nur Referenz — wird nicht gerendert)
 *     ├── voice_script.txt     (nur Referenz — wird nicht gerendert)
 *     ├── visual_plan.json
 *     └── video_config.json
 *
 * Zusaetzlich benoetigte externe Assets (vom Nutzer / den anderen AI-Tools):
 *   <assets_input>/moduleXX-lessonYY/
 *     ├── voice.mp3                       (ElevenLabs)
 *     ├── slide-plan.json                 (optional: vom Generator gespiegelt;
 *                                          sonst hier geliefert)
 *     └── visuals/
 *         ├── v01.png                     (pro Visual ein Asset)
 *         ├── v02.png
 *         └── ...
 *
 * Ausgang: Remotion public/-Verzeichnis
 *   <renderer>/public/
 *     └── assets/moduleXX-lessonYY/
 *         ├── voice.mp3
 *         └── visuals/v01.png, ...
 *
 * Plus: ein `render-input.json` das alle Props zusammenfasst, die der
 * Renderer als inputProps an die Komposition uebergibt.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseLesson } = require('./external/lesson-parser');
const { mapLessonToSections } = require('./external/section-mapper');

/**
 * Asset resolution for a single lesson.
 *
 * @param {object} opts
 * @param {string} opts.generatorOutputDir  - Path containing moduleXX-lessonYY folders from the Lesson Asset Generator
 * @param {string} opts.lessonId            - "moduleXX-lessonYY"
 * @param {string} [opts.assetsInputDir]    - Optional external assets (voice.mp3, visuals/*)
 * @param {string} [opts.lessonMarkdownPath] - If provided, slide plan is rebuilt from markdown (authoritative)
 * @param {string} opts.publicDir           - Remotion public dir (usually <renderer>/public)
 * @param {object} [opts.nextLesson]        - { module, lesson, title, isLastLessonInModule, isLastLessonOverall }
 * @returns {object} resolvedRenderInput
 */
function resolveLessonAssets(opts) {
  const {
    generatorOutputDir,
    lessonId,
    assetsInputDir,
    lessonMarkdownPath,
    publicDir,
    nextLesson,
  } = opts;

  if (!lessonId || !/^module\d{2}-lesson\d{2}$/.test(lessonId)) {
    throw new Error(`resolveLessonAssets: invalid lessonId "${lessonId}"`);
  }

  // --- 1. Load generator outputs ---
  const lessonDir = path.join(generatorOutputDir, lessonId);
  if (!fs.existsSync(lessonDir)) {
    throw new Error(`Lesson dir not found: ${lessonDir}`);
  }

  const videoConfigPath = path.join(lessonDir, 'video_config.json');
  const visualPlanPath = path.join(lessonDir, 'visual_plan.json');
  if (!fs.existsSync(videoConfigPath)) {
    throw new Error(`Missing file: ${videoConfigPath}`);
  }
  if (!fs.existsSync(visualPlanPath)) {
    throw new Error(`Missing file: ${visualPlanPath}`);
  }

  const videoConfig = JSON.parse(fs.readFileSync(videoConfigPath, 'utf8'));
  const visualPlan = JSON.parse(fs.readFileSync(visualPlanPath, 'utf8'));

  if (videoConfig.lesson_id !== lessonId) {
    throw new Error(
      `video_config lesson_id (${videoConfig.lesson_id}) does not match lessonId (${lessonId})`
    );
  }

  // --- 2. Re-derive slide plan (needed for rendering bullets + titles) ---
  let slidePlan;
  if (lessonMarkdownPath && fs.existsSync(lessonMarkdownPath)) {
    const md = fs.readFileSync(lessonMarkdownPath, 'utf8');
    const lesson = parseLesson(md, { sourcePath: lessonMarkdownPath });
    slidePlan = mapLessonToSections(lesson);
  } else {
    // Fallback: reconstruct minimal slide plan from video_config + visual_plan
    slidePlan = reconstructSlidePlanFromConfig(videoConfig, visualPlan);
  }

  // --- 3. Copy audio + visuals into public/assets ---
  const targetAssetsDir = path.join(publicDir, 'assets', lessonId);
  const targetVisualsDir = path.join(targetAssetsDir, 'visuals');
  fs.mkdirSync(targetVisualsDir, { recursive: true });

  let audioRelPath = null;
  const audioStatus = { provided: false, path: null };

  if (assetsInputDir) {
    const srcLessonAssets = path.join(assetsInputDir, lessonId);
    if (fs.existsSync(srcLessonAssets)) {
      // Audio
      const srcAudio = path.join(srcLessonAssets, 'voice.mp3');
      if (fs.existsSync(srcAudio)) {
        const destAudio = path.join(targetAssetsDir, 'voice.mp3');
        fs.copyFileSync(srcAudio, destAudio);
        audioRelPath = `assets/${lessonId}/voice.mp3`;
        audioStatus.provided = true;
        audioStatus.path = audioRelPath;
      }
      // Visuals
      const srcVisualsDir = path.join(srcLessonAssets, 'visuals');
      if (fs.existsSync(srcVisualsDir)) {
        const entries = fs.readdirSync(srcVisualsDir);
        for (const e of entries) {
          const src = path.join(srcVisualsDir, e);
          const dest = path.join(targetVisualsDir, e);
          if (fs.statSync(src).isFile()) {
            fs.copyFileSync(src, dest);
          }
        }
      }
    }
  }

  // --- 4. Mark visuals as placeholder if no asset file was copied ---
  const visualsWithStatus = visualPlan.visuals.map((v) => {
    const found = findVisualAsset(targetVisualsDir, v.id);
    return {
      ...v,
      _placeholder: !found,
      _assetPath: found ? `assets/${lessonId}/visuals/${path.basename(found)}` : null,
    };
  });
  const resolvedVisualPlan = { ...visualPlan, visuals: visualsWithStatus };

  // --- 5. Write render-input.json (props for the renderer) ---
  const renderInput = {
    lesson_id: lessonId,
    videoConfig,
    slidePlan,
    visualPlan: resolvedVisualPlan,
    audioPath: audioRelPath,
    nextLesson: nextLesson || null,
    _meta: {
      audio_provided: audioStatus.provided,
      visuals_resolved: visualsWithStatus.filter((v) => !v._placeholder).length,
      visuals_total: visualsWithStatus.length,
      public_dir: publicDir,
      resolved_at: new Date().toISOString(),
    },
  };

  const renderInputPath = path.join(targetAssetsDir, 'render-input.json');
  fs.writeFileSync(renderInputPath, JSON.stringify(renderInput, null, 2), 'utf8');

  return {
    renderInput,
    renderInputPath,
    targetAssetsDir,
  };
}

function findVisualAsset(dir, visualId) {
  if (!fs.existsSync(dir)) return null;
  const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
  for (const ext of exts) {
    const p = path.join(dir, `${visualId}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Reconstructs a minimal slide plan from video_config + visual_plan when
 * no source markdown is available. The reconstruction cannot recover
 * bullet text — it only provides titles and placeholders.
 *
 * For proper bullet-level rendering, always provide lessonMarkdownPath
 * or ship the slide plan alongside the generator outputs.
 */
function reconstructSlidePlanFromConfig(videoConfig, visualPlan) {
  const contentSections = videoConfig.sections.filter(
    (s) => s.scene === 'slide-template'
  );

  const prettyTitles = {
    lesson_title: videoConfig.title,
    concept: 'Konzept',
    mechanism: 'Mechanismus',
    system_architecture: 'Systemarchitektur',
    risk_layer: 'Risikoebene',
    protocol_example: 'Protokollbeispiel',
    key_takeaways: 'Kernaussagen',
  };

  const slides = contentSections.map((s) => ({
    id: s.slide_ref,
    section: s.name,
    title: prettyTitles[s.name] || s.name,
    bullets: ['[Bullets fehlen — Markdown-Quelle an resolveLessonAssets() uebergeben]'],
    visuals: visualPlan.visuals
      .filter((v) => v.slide_ref === s.slide_ref)
      .map((v) => v.description),
    narration: '',
    accent_color_override: s.accent_color_override || undefined,
  }));

  return {
    slide_count: slides.length,
    has_architecture_section: slides.some(
      (s) => s.section === 'system_architecture'
    ),
    slides,
  };
}

module.exports = { resolveLessonAssets };
