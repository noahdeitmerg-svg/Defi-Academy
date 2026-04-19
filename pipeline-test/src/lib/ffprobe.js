'use strict';

const { spawnSync } = require('child_process');
const { ffprobeBin } = require('./ffmpeg-path');

/**
 * Exakte Audio-/Video-Dauer in Sekunden (nur ffprobe, nie schätzen).
 */
function ffprobeDurationSeconds(mediaPath) {
  const bin = ffprobeBin();
  const r = spawnSync(
    bin,
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      mediaPath,
    ],
    { encoding: 'utf8' }
  );
  if (r.error) {
    throw new Error(
      `ffprobe nicht ausführbar (${bin}): ${r.error.message}. ` +
        'ffmpeg installieren (PATH) oder FFPROBE_PATH setzen.'
    );
  }
  if (r.status !== 0) {
    throw new Error(`ffprobe exit ${r.status}: ${(r.stderr || '').trim()}`);
  }
  const v = parseFloat(String(r.stdout || '').trim(), 10);
  if (!Number.isFinite(v) || v <= 0) {
    throw new Error(`ffprobe lieferte keine gültige Dauer für ${mediaPath}: "${r.stdout}"`);
  }
  return v;
}

module.exports = { ffprobeDurationSeconds };
