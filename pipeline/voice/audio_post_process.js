"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function tryFfmpegBin() {
  try {
    return require(path.join(__dirname, "..", "..", "pipeline-test", "src", "lib", "ffmpeg-path.js")).ffmpegBin();
  } catch (_) {
    return "ffmpeg";
  }
}

/**
 * Optional: leichte EQ/High-Pass-Kette für konsistentere Sprache.
 * VOICE_ENHANCE=0 deaktiviert (nur Kopie). Bei fehlendem ffmpeg: Kopie.
 *
 * @returns {{ ok: boolean, usedFfmpeg: boolean }}
 */
function enhanceVoiceMp3(inputPath, outputPath) {
  if (process.env.VOICE_ENHANCE === "0") {
    fs.copyFileSync(inputPath, outputPath);
    return { ok: true, usedFfmpeg: false };
  }

  const ffmpeg = tryFfmpegBin();
  const af =
    "highpass=f=80,equalizer=f=2500:width_type=o:width=2:g=0.5,compand=attacks=0.02:decays=0.2:points=-80/-80|-45/-45|-27/-25|0/-7:gain=2";

  const r = spawnSync(
    ffmpeg,
    ["-y", "-hide_banner", "-loglevel", "error", "-i", inputPath, "-af", af, "-c:a", "libmp3lame", "-b:a", "192k", outputPath],
    { encoding: "utf8", windowsHide: true }
  );

  if (r.status !== 0) {
    fs.copyFileSync(inputPath, outputPath);
    return { ok: true, usedFfmpeg: false };
  }
  return { ok: true, usedFfmpeg: true };
}

module.exports = { enhanceVoiceMp3 };
