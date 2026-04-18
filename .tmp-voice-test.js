#!/usr/bin/env node
require('./scripts/lib/env').loadProjectEnv({ cwd: __dirname });
const fs = require('fs');
const path = require('path');

const TEXT = 'Willkommen zu Modul 1. Bevor wir über Yield, Strategien oder Tools sprechen, müssen wir genau definieren, worüber wir reden. Der Begriff DeFi wird inflationär verwendet — wir brauchen eine saubere technische Definition.';
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'TUKJhQmz3RPYBNAgC5A1';
const API_KEY = process.env.ELEVENLABS_API_KEY;

const MODELS = [
  'eleven_turbo_v2',
  'eleven_multilingual_v2',
  'eleven_multilingual_v2_5',
  'eleven_v3',
];

const OUT = path.join(__dirname, '.tmp-voice-test');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  for (const model of MODELS) {
    process.stdout.write(`[${model}] `);
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'content-type': 'application/json',
          accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: TEXT,
          model_id: model,
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });
      if (!res.ok) {
        const errTxt = await res.text();
        console.log(`ERROR ${res.status} — ${errTxt.slice(0, 180)}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const out = path.join(OUT, `${model}.mp3`);
      fs.writeFileSync(out, buf);
      console.log(`OK  ${(buf.length / 1024).toFixed(1)} KB  → ${out}`);
    } catch (e) {
      console.log(`EXC ${e.message}`);
    }
  }
})();
