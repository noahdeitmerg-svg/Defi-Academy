/**
 * Mini-Env-Loader (ohne zusaetzliche npm-Dependency).
 *
 * Liest `.env` (und optional `.env.local`) aus dem Projekt-Root und setzt
 * fehlende Schluessel in `process.env`. Bereits gesetzte Variablen werden
 * NICHT ueberschrieben, damit CI/Shell-Overrides weiter Prioritaet haben.
 *
 * Absichtlich minimal:
 *   - unterstuetzt KEY=VALUE mit optionalen Quotes ('..' / "..")
 *   - Kommentare (# ...) und Leerzeilen werden ignoriert
 *   - keine Variable-Expansion, keine Multiline-Werte
 *
 * Verwendung (ganz oben in Scripts):
 *
 *   require('./lib/env').loadProjectEnv();
 */

const fs = require('fs');
const path = require('path');

function parseLine(raw) {
  const line = raw.replace(/^\s+|\s+$/g, '');
  if (line === '' || line.startsWith('#')) return null;
  const eq = line.indexOf('=');
  if (eq <= 0) return null;
  const key = line.slice(0, eq).trim();
  let value = line.slice(eq + 1).trim();
  // Optional in Quotes; Inline-Kommentare nach un-quoted value entfernen.
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  } else {
    const hash = value.indexOf(' #');
    if (hash !== -1) value = value.slice(0, hash).trim();
  }
  return { key, value };
}

function loadEnvFile(filePath, { override = false } = {}) {
  if (!fs.existsSync(filePath)) return { loaded: 0, path: filePath, existed: false };
  let content = fs.readFileSync(filePath, 'utf8');
  // UTF-8 BOM (häufig nach „Speichern unter“) würde sonst den ersten Key unlesbar machen.
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  let loaded = 0;
  for (const raw of content.split(/\r?\n/)) {
    const entry = parseLine(raw);
    if (!entry) continue;
    if (!override && process.env[entry.key] !== undefined) continue;
    process.env[entry.key] = entry.value;
    loaded += 1;
  }
  return { loaded, path: filePath, existed: true };
}

/**
 * Laedt `.env` und `.env.local` (falls vorhanden) aus dem angegebenen Root
 * (default: `process.cwd()`). `.env.local` hat Vorrang vor `.env`.
 */
function loadProjectEnv({ cwd = process.cwd(), verbose = false } = {}) {
  const results = [];
  results.push(loadEnvFile(path.join(cwd, '.env')));
  results.push(loadEnvFile(path.join(cwd, '.env.local'), { override: true }));
  if (verbose) {
    for (const r of results) {
      if (r.existed) console.log(`[env] ${r.path} (${r.loaded} vars)`);
    }
  }
  return results;
}

module.exports = { loadProjectEnv, loadEnvFile };
