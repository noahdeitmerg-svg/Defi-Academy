#!/usr/bin/env node
/**
 * scripts/publish-videos.js
 *
 * Rename-Bruecke (Phase 5.4) zwischen Renderer-Output und Plattform-
 * Convention.
 *
 * Renderer produziert:
 *
 *   videos/moduleXX-lessonYY.mp4
 *   posters/moduleXX-lessonYY.jpg
 *
 * Plattform (lib/lessonAssets.ts) erwartet:
 *
 *   public/videos/<moduleSlug>-<lessonSlug>.mp4
 *   public/posters/<moduleSlug>-<lessonSlug>.jpg
 *
 * Mapping-Strategie:
 *
 *   1. Expliziter Override aus `config/video-slug-map.json`, z.B.
 *        {
 *          "module01-lesson01": "module1-1-1",
 *          "module13-lesson04": "module13-lesson-b-2"
 *        }
 *      Hat Vorrang vor allem Anderen.
 *
 *   2. Default-Mapping: `moduleNN-lessonMM` → `module<M>-<M>-<MM>`
 *      (z. B. module01-lesson01 → module1-1-1). Das entspricht
 *      lib/lessonAssets.buildLessonAssetBase(moduleSlug, lessonSlug)
 *      mit Content-Dateien `content/modules/moduleM/M-MM.md` (lessonSlug
 *      = "M-MM", z. B. 1-1).
 *
 *   Abweichende Dateinamen (z. B. lesson1.md → Slug "lesson1") ueber
 *   `config/video-slug-map.json` explizit mappen.
 *
 * CLI
 *   node scripts/publish-videos.js
 *   node scripts/publish-videos.js --move           (nicht kopieren, sondern verschieben)
 *   node scripts/publish-videos.js --dry-run
 *   node scripts/publish-videos.js --only module01-lesson01
 */

'use strict';

const fs = require('fs');
const path = require('path');

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
DeFi Akademie — publish-videos

Verschiebt/kopiert Renderer-Output nach public/videos/ + public/posters/
unter Plattform-Slugs.

Flags:
  --videos-dir <path>   default: ./videos
  --posters-dir <path>  default: ./posters
  --public-dir <path>   default: ./public
  --map <path>          default: ./config/video-slug-map.json
  --only <csv>          Renderer-IDs (moduleXX-lessonYY) filtern
  --move                verschieben statt kopieren
  --dry-run
  --force               ueberschreibe bestehende Zieldateien
  --help
`);
}

function loadMap(mapPath) {
  if (!fs.existsSync(mapPath)) return {};
  try {
    const raw = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    if (raw && typeof raw === 'object') return raw;
  } catch (err) {
    console.warn(`⚠ video-slug-map ignoriert (ungueltiges JSON): ${err.message}`);
  }
  return {};
}

function defaultSlug(rendererId) {
  const m = rendererId.match(/^module(\d+)-lesson(\d+)$/i);
  if (!m) return rendererId;
  const modN = parseInt(m[1], 10);
  const lesN = parseInt(m[2], 10);
  // Gleiche Basis wie lib/lessonAssets: `${moduleSlug}-${lessonSlug}`
  // bei Standard-Lektionsdateien moduleN/N-M.md → lessonSlug "N-M".
  return `module${modN}-${modN}-${lesN}`;
}

function collectArtifacts(videosDir, postersDir) {
  const videos = fs.existsSync(videosDir)
    ? fs.readdirSync(videosDir).filter((n) => /\.mp4$/i.test(n))
    : [];
  const posters = fs.existsSync(postersDir)
    ? fs.readdirSync(postersDir).filter((n) => /\.(jpg|jpeg|png)$/i.test(n))
    : [];
  return { videos, posters };
}

function transfer(src, dst, mode, dryRun) {
  if (dryRun) {
    console.log(`  [dry] ${mode} ${path.relative(ROOT, src)} → ${path.relative(ROOT, dst)}`);
    return;
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (mode === 'move') {
    fs.renameSync(src, dst);
  } else {
    fs.copyFileSync(src, dst);
  }
  console.log(`  ✔ ${mode} ${path.relative(ROOT, src)} → ${path.relative(ROOT, dst)}`);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  const videosDir = path.resolve(ROOT, args['videos-dir'] || 'videos');
  const postersDir = path.resolve(ROOT, args['posters-dir'] || 'posters');
  const publicDir = path.resolve(ROOT, args['public-dir'] || 'public');
  const mapPath = path.resolve(ROOT, args.map || 'config/video-slug-map.json');
  const onlyList = args.only
    ? String(args.only).split(',').map((s) => s.trim()).filter(Boolean)
    : null;
  const mode = args.move ? 'move' : 'copy';
  const dryRun = Boolean(args['dry-run']);
  const force = Boolean(args.force);

  const map = loadMap(mapPath);

  console.log('────────────────────────────────────────────────────────────');
  console.log(' DeFi Akademie · publish-videos');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`Videos-In : ${path.relative(ROOT, videosDir)}`);
  console.log(`Posters-In: ${path.relative(ROOT, postersDir)}`);
  console.log(`Public-Out: ${path.relative(ROOT, publicDir)}`);
  console.log(`Map-File  : ${path.relative(ROOT, mapPath)} (${Object.keys(map).length} Eintraege)`);
  console.log(`Mode      : ${mode}${dryRun ? ' (dry-run)' : ''}`);
  if (onlyList) console.log(`Only      : ${onlyList.join(', ')}`);
  console.log('');

  const { videos, posters } = collectArtifacts(videosDir, postersDir);
  if (videos.length === 0 && posters.length === 0) {
    console.log('Keine Renderer-Artefakte gefunden — nichts zu publizieren.');
    return;
  }

  const videoOutDir = path.join(publicDir, 'videos');
  const posterOutDir = path.join(publicDir, 'posters');

  let transferred = 0;
  let skipped = 0;

  const processFile = (name, inDir, outDir, ext) => {
    const rendererId = name.replace(/\.[^.]+$/, '');
    if (onlyList && !onlyList.includes(rendererId)) return;
    const slug = map[rendererId] || defaultSlug(rendererId);
    const src = path.join(inDir, name);
    const dst = path.join(outDir, `${slug}${ext}`);
    if (fs.existsSync(dst) && !force) {
      skipped++;
      console.log(`  ○ ${name} → ${slug}${ext} existiert — skip (--force zum Ueberschreiben)`);
      return;
    }
    transfer(src, dst, mode, dryRun);
    transferred++;
  };

  if (videos.length > 0) {
    console.log(`• Videos (${videos.length})`);
    for (const v of videos) processFile(v, videosDir, videoOutDir, '.mp4');
  }
  if (posters.length > 0) {
    console.log(`• Posters (${posters.length})`);
    for (const p of posters) {
      const ext = path.extname(p).toLowerCase();
      processFile(p, postersDir, posterOutDir, ext === '.jpg' || ext === '.jpeg' ? '.jpg' : ext);
    }
  }

  console.log('');
  console.log('────────────────────────────────────────────────────────────');
  console.log(` Transferred: ${transferred}`);
  console.log(` Skipped (existiert): ${skipped}`);
  console.log('────────────────────────────────────────────────────────────');
}

try {
  main();
} catch (err) {
  console.error('✖ publish-videos failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
