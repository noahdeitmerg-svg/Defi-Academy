import fs from "node:fs";
import path from "node:path";

/** Standard-Pfad zu den lokalen Akademie-Modulen (Windows, Cursor-Workspace). */
export const DEFAULT_CURSOR_MODULE_DIR = path.join(
  "C:",
  "Users",
  "noahd",
  "Documents",
  "Cursor DeFi Academy",
  "Module",
);

const LEGACY_MODULES_ROOT = path.join(process.cwd(), "content", "modules");

/** Liegen bereits Lektions-`.md`-Dateien unter `content/modules/<slug>/`? Dann Repo-Quelle nutzen. */
function legacyModulesHaveLessonsSync(): boolean {
  try {
    if (!fs.existsSync(LEGACY_MODULES_ROOT)) return false;
    for (const name of fs.readdirSync(LEGACY_MODULES_ROOT)) {
      const dir = path.join(LEGACY_MODULES_ROOT, name);
      if (!fs.statSync(dir).isDirectory()) continue;
      const files = fs.readdirSync(dir);
      if (files.some((f) => f.endsWith(".md"))) return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Verzeichnis mit `module1.md`, `module2.md`, … (flache Akademie-Quellen).
 * Priorität: `DEFI_CURRICULUM_PATH` → wenn **kein** Legacy unter `content/modules` → Standardpfad.
 * Sobald im Repo `content/modules/.../*.md` existiert, wird das flache Verzeichnis ignoriert (Deploy).
 *
 * Der Symbol-Name behält historisch das Wort "Curriculum" (stabile Code-API);
 * Nutzer-sichtbare Texte verwenden die Akademie-Terminologie aus
 * `docs/academy-structure.md`.
 */
export function resolveFlatCurriculumRoot(): string | null {
  if (legacyModulesHaveLessonsSync()) return null;

  const env = process.env.DEFI_CURRICULUM_PATH?.trim();
  const candidates = [
    env && path.isAbsolute(env) ? env : env ? path.join(process.cwd(), env) : null,
    DEFAULT_CURSOR_MODULE_DIR,
  ].filter(Boolean) as string[];

  for (const dir of candidates) {
    try {
      if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        const files = fs.readdirSync(dir);
        if (files.some((f) => /^module\d+\.md$/i.test(f))) return dir;
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}
