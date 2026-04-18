#!/usr/bin/env node
/**
 * scripts/render-all-videos.js
 *
 * Schritt 4 der Academy-Build-Pipeline.
 *
 * Duenner Wrapper um `scripts/render-batch.js`, der die in der
 * Academy-Build-Pipeline vereinbarten Pfade konfiguriert:
 *
 *   generator-output : ./generated-assets
 *   assets-input     : ./assets-input
 *   videos-out       : ./videos
 *   posters-out      : ./posters
 *
 * Vor dem Rendern laeuft automatisch `check-assets` als Preflight
 * (ueberspringbar mit --skip-check).
 *
 * CLI
 *   node scripts/render-all-videos.js
 *   node scripts/render-all-videos.js --only module04-lesson02
 *   node scripts/render-all-videos.js --limit 5 --parallel 1
 *   node scripts/render-all-videos.js --skip-check
 *
 * Flags
 *   --parallel <n>       default: 2
 *   --limit <n>          nur die ersten N Lektionen
 *   --only <csv>         explizite Lesson-IDs
 *   --skip-check         Preflight-check-assets ueberspringen
 *   --dry-run            nichts rendern
 *   --help
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      out[key] = next;
      i++;
    } else {
      out[key] = true;
    }
  }
  return out;
}

function printHelp() {
  console.log(`
DeFi Akademie — render-all-videos

Rendert alle Lektionen aus generated-assets/ + assets-input/ nach videos/.
Duenner Wrapper um scripts/render-batch.js.

Flags:
  --parallel <n>    default: 2
  --limit <n>       nur erste N
  --only <csv>      explizite Lesson-IDs
  --skip-check      kein Preflight
  --dry-run
  --help
`);
}

function run(nodeScript, args, opts = {}) {
  const res = spawnSync(process.execPath, [nodeScript, ...args], {
    stdio: 'inherit',
    cwd: ROOT,
    ...opts,
  });
  return res.status || 0;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const parallel = args.parallel || '2';
  const passThrough = [];
  if (args.only) passThrough.push('--only', String(args.only));
  if (args.limit) passThrough.push('--limit', String(args.limit));
  if (args['dry-run']) passThrough.push('--dry-run');

  console.log('────────────────────────────────────────────────────────────');
  console.log(' DeFi Akademie · Render all videos');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Generator-Out : generated-assets/`);
  console.log(`Assets-Input  : assets-input/`);
  console.log(`Videos-Out    : videos/`);
  console.log(`Posters-Out   : posters/`);
  console.log(`Parallel      : ${parallel}`);
  if (args.only) console.log(`Only          : ${args.only}`);
  if (args.limit) console.log(`Limit         : ${args.limit}`);
  console.log('');

  fs.mkdirSync(path.join(ROOT, 'videos'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'posters'), { recursive: true });

  if (!args['skip-check']) {
    console.log('→ Preflight: check-assets');
    const checkArgs = [
      '--assets-input', 'assets-input',
      '--source', 'generated-assets',
    ];
    if (args.only) checkArgs.push('--only', String(args.only));
    const rc = run(path.join(__dirname, 'check-assets.js'), checkArgs);
    if (rc !== 0) {
      console.error('');
      console.error('✖ check-assets hat Fehler gemeldet. Rendering abgebrochen.');
      console.error('  (ueberspringen mit --skip-check, falls bewusst gewuenscht)');
      process.exit(rc);
    }
    console.log('');
  }

  console.log('→ Rendering: render-batch');
  const renderArgs = [
    '--generator-output', 'generated-assets',
    '--assets-input', 'assets-input',
    '--parallel', String(parallel),
    ...passThrough,
  ];
  const rc = run(path.join(__dirname, 'render-batch.js'), renderArgs);
  if (rc !== 0) {
    console.error('');
    console.error(`✖ render-batch exited with code ${rc}`);
    process.exit(rc);
  }

  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(' Fertig. Videos liegen in videos/moduleXX-lessonYY.mp4');
  console.log('────────────────────────────────────────────────────────────');
}

try {
  main();
} catch (err) {
  console.error('✖ render-all-videos failed:', err.message);
  process.exit(1);
}
