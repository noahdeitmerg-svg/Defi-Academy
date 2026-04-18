#!/usr/bin/env node
/**
 * cli.js
 *
 * Kommandozeilen-Interface fuer den Lesson Asset Generator.
 *
 * Usage:
 *
 *   Einzelne Lektion:
 *     node cli.js --input lessons/module01-lesson01.md \
 *                 --out  ./output \
 *                 --style ../video-style-engine
 *
 *   Ganzes Verzeichnis (rekursiv):
 *     node cli.js --input-dir lessons/ \
 *                 --out ./output \
 *                 --style ../video-style-engine
 *
 * Optionale Flags:
 *   --module <n>   Modulnummer explizit setzen (wenn nicht aus Dateiname ableitbar)
 *   --lesson <n>   Lektionsnummer explizit setzen
 *   --voice <id>   ElevenLabs Voice ID (default: de-male-educational-01)
 */

'use strict';

const path = require('path');
const { runPipelineForLesson, runPipelineForModule, runPipelineForFolder } = require('./pipeline');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    args[key] = val;
  }
  return args;
}

function printUsage() {
  console.log(`
DeFi Academy Lesson Asset Generator

Usage:
  node cli.js --input <file.md>       --out <dir> --style <engine-dir>
  node cli.js --input <module.md> --all-lessons --out <dir> --style <engine-dir>
  node cli.js --input-dir <lessons/>  --out <dir> --style <engine-dir>

Options:
  --all-lessons  Process every lesson in a module file (new format)
  --module <n>   Override module number
  --lesson <n>   Pick a specific lesson from a module file (new format)
  --voice  <id>  ElevenLabs voice ID  (default: de-male-educational-01)
  --help         Show this help
  `);
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help || (!args.input && !args['input-dir'])) {
    printUsage();
    process.exit(args.help ? 0 : 1);
  }

  const outputRoot = path.resolve(args.out || './output');
  const stylePath = path.resolve(args.style || '../video-style-engine');
  const voiceId = args.voice || undefined;

  console.log('='.repeat(60));
  console.log('Lesson Asset Generator');
  console.log('='.repeat(60));
  console.log('Output:   ', outputRoot);
  console.log('Style:    ', stylePath);
  console.log('Voice ID: ', voiceId || 'de-male-educational-01 (default)');
  console.log('');

  if (args.input) {
    // Module mode: process all lessons in a new-format module file
    if (args['all-lessons']) {
      const res = runPipelineForModule({
        input: path.resolve(args.input),
        outputRoot,
        stylePath,
        voiceId,
      });
      reportModule(res);
      return;
    }

    const res = runPipelineForLesson({
      input: path.resolve(args.input),
      outputRoot,
      stylePath,
      module: args.module ? parseInt(args.module, 10) : undefined,
      lesson: args.lesson ? parseInt(args.lesson, 10) : undefined,
      voiceId,
    });
    reportSingle(res);
  } else {
    const results = runPipelineForFolder({
      inputDir: path.resolve(args['input-dir']),
      outputRoot,
      stylePath,
      voiceId,
    });
    reportBatch(results);
  }
}

function reportSingle(r) {
  console.log(`✔ ${r.lesson_id}`);
  console.log(`  slides: ${r.slide_count}`);
  console.log(`  duration: ${r.duration_seconds}s`);
  console.log(`  source format: ${r.source_format} (${r.mapping_strategy})`);
  console.log(`  files written:`);
  r.files.forEach((f) => console.log(`    - ${f}`));
}

function reportModule(res) {
  console.log(`Module ${res.module} (${res.format} format)`);
  console.log(`${res.ok}/${res.total_lessons} lessons processed successfully`);
  console.log('');
  for (const r of res.results) {
    if (r.status === 'ok') {
      console.log(`  ✔ ${r.lesson_id}  (${r.slide_count} slides, ${r.duration_seconds}s)`);
    } else {
      console.log(`  ✘ ${r.lesson_id || '?'}: ${r.error}`);
    }
  }
  console.log('');
  console.log('─'.repeat(60));
  console.log(`Summary: ${res.ok} ok, ${res.failed} failed`);
  console.log('─'.repeat(60));
  process.exit(res.failed > 0 ? 1 : 0);
}

function reportBatch(results) {
  const ok = results.filter((r) => r.status === 'ok');
  const err = results.filter((r) => r.status === 'error');

  ok.forEach((r) => {
    console.log(`✔ ${r.lesson_id}  (${r.slide_count} slides, ${r.duration_seconds}s)`);
  });
  err.forEach((r) => {
    console.log(`✘ FAILED: ${r.input}`);
    console.log(`    ${r.error}`);
  });

  console.log('');
  console.log('─'.repeat(60));
  console.log(`Summary: ${ok.length} ok, ${err.length} failed`);
  console.log('─'.repeat(60));

  process.exit(err.length > 0 ? 1 : 0);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
