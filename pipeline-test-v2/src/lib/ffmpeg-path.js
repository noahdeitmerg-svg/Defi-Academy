'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function tryFfmpegStatic() {
  try {
    const p = require('ffmpeg-static');
    if (typeof p === 'string' && fs.existsSync(p)) return p;
  } catch (_) {
    /* optional */
  }
  return null;
}

function tryFfprobeStatic() {
  try {
    const m = require('ffprobe-static');
    const p = typeof m === 'string' ? m : m && m.path;
    if (p && fs.existsSync(p)) return p;
  } catch (_) {
    /* optional */
  }
  return null;
}

function tryRun(bin) {
  if (!bin) return null;
  const looksLikePath =
    path.isAbsolute(bin) ||
    bin.includes(path.sep) ||
    (process.platform === 'win32' && /\.exe$/i.test(bin));
  if (looksLikePath && !fs.existsSync(bin)) return null;

  const r = spawnSync(bin, ['-version'], { encoding: 'utf8', windowsHide: true });
  return r.status === 0 ? bin : null;
}

function resolveBinary(name, envVar, winExe) {
  const fromEnv = process.env[envVar];
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;

  const first = tryRun(name);
  if (first) return first;

  if (process.platform === 'win32' && winExe) {
    const roots = [
      process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Links'),
      process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'ffmpeg', 'bin'),
      process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'FFmpeg', 'bin'),
      'C:\\ffmpeg\\bin',
    ].filter(Boolean);
    for (const d of roots) {
      const p = path.join(d, winExe);
      const ok = tryRun(p);
      if (ok) return ok;
    }
  }
  return name;
}

let cachedFfmpeg = null;
let cachedFfprobe = null;

function ffmpegBin() {
  if (!cachedFfmpeg) {
    if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
      cachedFfmpeg = process.env.FFMPEG_PATH;
    } else {
      cachedFfmpeg = tryFfmpegStatic() || resolveBinary('ffmpeg', 'FFMPEG_PATH', 'ffmpeg.exe');
    }
  }
  return cachedFfmpeg;
}

function ffprobeBin() {
  if (!cachedFfprobe) {
    if (process.env.FFPROBE_PATH && fs.existsSync(process.env.FFPROBE_PATH)) {
      cachedFfprobe = process.env.FFPROBE_PATH;
    } else {
      cachedFfprobe = tryFfprobeStatic() || resolveBinary('ffprobe', 'FFPROBE_PATH', 'ffprobe.exe');
    }
  }
  return cachedFfprobe;
}

module.exports = { ffmpegBin, ffprobeBin };
