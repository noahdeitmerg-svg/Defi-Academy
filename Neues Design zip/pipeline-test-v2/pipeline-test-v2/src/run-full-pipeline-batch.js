#!/usr/bin/env node
/**
 * run-full-pipeline-batch.js
 *
 * Laeuft die komplette Pipeline fuer ALLE Lektionen eines Moduls.
 * Jede Lektion bekommt ihren eigenen Ordner mit slides.json, voice.mp3,
 * voice_timing.json und final_test_video.mp4.
 *
 * Am Ende: module_report.json mit Metriken pro Lektion.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseModule } = require('./module-parser');
const { runLesson } = require('./run-full-pipeline-exports');

async function main() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1];
  }

  const inputPath = args.input || '/mnt/user-data/uploads/modul-01-defi-grundlagen-FINAL.md';
  const outputRoot = path.resolve(args.output || './output');
  const ttsEngine = args.engine; // 'elevenlabs' | 'espeak' | undefined (auto)
  const voiceId = args['voice-id'] || process.env.ELEVENLABS_VOICE_ID;

  console.log('═'.repeat(68));
  console.log('DeFi Academy — Full Pipeline Batch (entire module)');
  console.log('═'.repeat(68));
  console.log('Input:  ', inputPath);
  console.log('Output: ', outputRoot);
  if (ttsEngine) console.log('Engine: ', ttsEngine);
  if (voiceId) console.log('Voice:  ', voiceId);

  const md = fs.readFileSync(inputPath, 'utf8');
  const parsed = parseModule(md);
  console.log(`\nModule ${parsed.module} — ${parsed.lessons.length} lessons`);

  fs.mkdirSync(outputRoot, { recursive: true });

  const results = [];
  const t0 = Date.now();

  for (const lesson of parsed.lessons) {
    try {
      const r = await runLesson({ lesson, outputRoot, ttsEngine, voiceId });
      results.push({ status: 'ok', ...r });
    } catch (err) {
      console.error(`\n❌ ${lesson.meta.lesson_id} failed: ${err.message}`);
      results.push({
        status: 'error',
        lesson_id: lesson.meta.lesson_id,
        title: lesson.meta.title,
        error: err.message,
      });
    }
  }

  const totalMs = Date.now() - t0;

  const report = {
    module: parsed.module,
    input_markdown: inputPath,
    total_lessons: parsed.lessons.length,
    ok: results.filter((r) => r.status === 'ok').length,
    failed: results.filter((r) => r.status === 'error').length,
    total_runtime_seconds: Math.round(totalMs / 1000),
    ran_at: new Date().toISOString(),
    lessons: results,
  };
  const reportPath = path.join(outputRoot, 'module_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('');
  console.log('═'.repeat(68));
  console.log(`✅ Module batch complete — ${report.ok}/${report.total_lessons} ok, ${report.failed} failed`);
  console.log(`   Total runtime: ${Math.floor(report.total_runtime_seconds / 60)}m ${report.total_runtime_seconds % 60}s`);
  console.log('═'.repeat(68));
  console.log('');
  console.log('Per-lesson summary:');
  for (const r of results) {
    if (r.status === 'ok') {
      console.log(`  ✔ ${r.lesson_id}: ${r.slide_count} slides, ${Math.round(r.duration_seconds)}s audio, ${r.video_size_mb}MB MP4`);
    } else {
      console.log(`  ✘ ${r.lesson_id}: ${r.error}`);
    }
  }
  console.log('');
  console.log(`Report: ${reportPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Batch failed:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
}
