#!/usr/bin/env node
/**
 * list-voices.js
 *
 * Listet alle verfügbaren ElevenLabs-Stimmen für das Konto.
 * Nützlich beim Onboarding zur Auswahl der passenden Voice-ID.
 *
 * Usage:
 *   export ELEVENLABS_API_KEY=sk_...
 *   node src/list-voices.js
 *
 * Filter (optional):
 *   --lang de         # nur deutsche Stimmen
 *   --gender male     # nur männliche
 *   --category cloned # nur geklonte Stimmen
 */

'use strict';

const { listElevenLabsVoices } = require('./tts-adapter');

async function main() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1];
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    console.error('   Run: export ELEVENLABS_API_KEY=sk_...');
    process.exit(1);
  }

  const voices = await listElevenLabsVoices();

  let filtered = voices;
  if (args.lang) {
    filtered = filtered.filter(
      (v) => v.labels && (v.labels.language || '').toLowerCase().startsWith(args.lang)
    );
  }
  if (args.gender) {
    filtered = filtered.filter(
      (v) => v.labels && (v.labels.gender || '').toLowerCase() === args.gender.toLowerCase()
    );
  }
  if (args.category) {
    filtered = filtered.filter((v) => v.category === args.category);
  }

  console.log(`Found ${filtered.length} voice(s):\n`);
  for (const v of filtered) {
    const labels = v.labels
      ? Object.entries(v.labels).map(([k, val]) => `${k}=${val}`).join(' · ')
      : '';
    console.log(`  ${v.name}`);
    console.log(`    voice_id: ${v.voice_id}`);
    console.log(`    category: ${v.category}`);
    if (labels) console.log(`    labels:   ${labels}`);
    if (v.preview_url) console.log(`    preview:  ${v.preview_url}`);
    console.log('');
  }

  console.log('Suggested for DeFi Academy (educational, calm German):');
  console.log('  Look for labels like: language=German, gender=male, accent=neutral');
  console.log('');
  console.log('To use:');
  console.log('  export ELEVENLABS_VOICE_ID=<voice_id>');
  console.log('  node src/run-full-pipeline-batch.js');
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
