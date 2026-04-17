/**
 * Importiert Kurrikulum-Markdown nach `content/modules/moduleN/`.
 *
 * Quellen (optional kombiniert):
 * - `moduleN.md` im Projektroot (oder `--from <dir>`)
 * - `Module/modul-NN-*.md` (deutsches Format: `## Lektion`, `## Modul-Abschluss-Quiz`)
 *
 * Ausführung: `npm run import:modules`
 */
import fs from "node:fs/promises";
import path from "node:path";
import { parseMcQuizMarkdown } from "../lib/parseMcQuiz";
import {
  extractDurationFromLessonBody,
  parseModuleNumberFromFilename,
  parseModuleTitleFromSource,
  splitCursorModuleFile,
} from "../lib/splitCursorModule";

function stripLeadingHr(body: string): string {
  return body.replace(/^(\s*---\s*\n)+/, "").trim();
}

function buildLessonMarkdown(
  moduleNumber: number,
  chunk: { slug: string; lessonId: string; title: string; body: string },
): string {
  const sub = chunk.lessonId.includes(".")
    ? chunk.lessonId.split(".").slice(1).join(".")
    : chunk.lessonId;
  const duration = extractDurationFromLessonBody(chunk.body);
  const body = stripLeadingHr(chunk.body);
  const yaml = `---
title: ${JSON.stringify(chunk.title)}
duration: ${JSON.stringify(duration)}
moduleNumber: ${moduleNumber}
lessonNumber: ${JSON.stringify(sub)}
---

`;
  return `${yaml}${body}\n`;
}

async function findModuleMarkdownFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (!e.isFile()) continue;
    const { name } = e;
    if (/^module\d+\.md$/i.test(name) || (/^modul-\d+/i.test(name) && name.endsWith(".md"))) {
      out.push(path.join(dir, name));
    }
  }
  return out;
}

/** Pro Modulnummer eine Datei — `Module/`-Pfad schlägt Root-Duplikate. */
function dedupeByModuleNumber(paths: string[]): string[] {
  const sorted = [...paths].sort((a, b) => {
    const na = parseModuleNumberFromFilename(path.basename(a));
    const nb = parseModuleNumberFromFilename(path.basename(b));
    if (na !== nb) return na - nb;
    const inModule = (p: string) => p.split(path.sep).includes("Module");
    return Number(inModule(a)) - Number(inModule(b));
  });
  const byNum = new Map<number, string>();
  for (const p of sorted) {
    byNum.set(parseModuleNumberFromFilename(path.basename(p)), p);
  }
  return [...byNum.values()].sort(
    (a, b) => parseModuleNumberFromFilename(path.basename(a)) - parseModuleNumberFromFilename(path.basename(b)),
  );
}

async function importOneFile(sourcePath: string, destRoot: string) {
  const base = path.basename(sourcePath);
  const n = parseModuleNumberFromFilename(base);
  const slug = `module${n}`;
  const raw = await fs.readFile(sourcePath, "utf8");
  const { lessons, moduleQuizMarkdown } = splitCursorModuleFile(raw);
  if (lessons.length === 0) {
    console.warn(`[import] Keine Lektions-Überschriften in ${sourcePath} — übersprungen.`);
    return;
  }

  const modDir = path.join(destRoot, slug);
  await fs.mkdir(modDir, { recursive: true });

  for (const chunk of lessons) {
    const out = path.join(modDir, `${chunk.slug}.md`);
    await fs.writeFile(out, buildLessonMarkdown(n, chunk), "utf8");
    console.log(`[import] ${out}`);
  }

  if (moduleQuizMarkdown) {
    const title =
      moduleQuizMarkdown.match(/^#{1,2}\s+(.+)$/m)?.[1]?.trim() ?? `Modul ${n} — Quiz`;
    const quiz = parseMcQuizMarkdown(moduleQuizMarkdown, title);
    const quizPath = path.join(modDir, "quiz.json");
    const openPath = path.join(modDir, "open-quiz.md");
    if (quiz.questions.length > 0) {
      await fs.writeFile(quizPath, JSON.stringify(quiz, null, 2), "utf8");
      console.log(`[import] ${quizPath} (${quiz.questions.length} Fragen)`);
      try {
        await fs.unlink(openPath);
      } catch {
        /* optional */
      }
    } else {
      await fs.writeFile(openPath, moduleQuizMarkdown, "utf8");
      console.log(`[import] ${openPath} (Freitext-Quiz, kein MC)`);
      try {
        await fs.unlink(quizPath);
      } catch {
        /* optional */
      }
    }
  }

  const meta = {
    title: parseModuleTitleFromSource(raw) ?? slug,
    description: `Importiert aus ${base}`,
  };
  await fs.writeFile(path.join(modDir, "meta.json"), JSON.stringify(meta, null, 2), "utf8");
  console.log(`[import] ${path.join(modDir, "meta.json")}`);
}

async function main() {
  const argv = process.argv.slice(2);
  let scanDir = process.cwd();
  const fromIdx = argv.indexOf("--from");
  if (fromIdx !== -1 && argv[fromIdx + 1]) {
    scanDir = path.resolve(argv[fromIdx + 1]);
  }

  const destRoot = path.join(process.cwd(), "content", "modules");
  const fromRoot = await findModuleMarkdownFiles(scanDir);
  const fromModuleDir = await findModuleMarkdownFiles(path.join(scanDir, "Module"));
  const moduleFiles = dedupeByModuleNumber([...fromRoot, ...fromModuleDir]);

  if (moduleFiles.length === 0) {
    console.log(
      `[import] Keine moduleN.md / Module/modul-*.md unter ${scanDir}. Nutze z. B. npm run import:modules -- --from "C:\\Pfad"`,
    );
    process.exit(0);
  }

  for (const file of moduleFiles) {
    await importOneFile(file, destRoot);
  }
  console.log("[import] Fertig. `content/modules/` ist die Quelle für die App.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
