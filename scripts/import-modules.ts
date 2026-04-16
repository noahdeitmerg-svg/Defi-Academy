/**
 * Importiert flache `moduleN.md` aus dem Projektroot (oder optional `--from <dir>`)
 * nach `content/modules/moduleN/lesson-slug.md` + `quiz.json` + `meta.json`.
 *
 * Ausführung: `npm run import:modules` (im Ordner defi-academy)
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

async function importOneFile(sourcePath: string, destRoot: string) {
  const base = path.basename(sourcePath);
  const n = parseModuleNumberFromFilename(base);
  const slug = `module${n}`;
  const raw = await fs.readFile(sourcePath, "utf8");
  const { lessons, moduleQuizMarkdown } = splitCursorModuleFile(raw);
  if (lessons.length === 0) {
    console.warn(`[import] Keine # Lesson-Abschnitte in ${sourcePath} — übersprungen.`);
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
      moduleQuizMarkdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? `Modul ${n} — Quiz`;
    const quiz = parseMcQuizMarkdown(moduleQuizMarkdown, title);
    if (quiz.questions.length > 0) {
      const quizPath = path.join(modDir, "quiz.json");
      await fs.writeFile(quizPath, JSON.stringify(quiz, null, 2), "utf8");
      console.log(`[import] ${quizPath} (${quiz.questions.length} Fragen)`);
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
  const entries = await fs.readdir(scanDir, { withFileTypes: true });
  const moduleFiles = entries
    .filter((e) => e.isFile() && /^module\d+\.md$/i.test(e.name))
    .map((e) => path.join(scanDir, e.name))
    .sort();

  if (moduleFiles.length === 0) {
    console.log(
      `[import] Keine moduleN.md in ${scanDir}. Lege Dateien ins Projektroot oder nutze: npm run import:modules -- --from "C:\\Pfad\\zum\\Ordner"`,
    );
    process.exit(0);
  }

  for (const file of moduleFiles) {
    await importOneFile(file, destRoot);
  }
  console.log("[import] Fertig. `content/modules/` ist die Quelle für Vercel (Legacy-Modus).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
