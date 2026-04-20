/**
 * Exportiert UX-Lektionen pro Modul als Markdown für den Content Agent (Key Takeaways).
 *
 * Ausführung: npx tsx scripts/export-takeaways-input.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { ALL_MODULES } from "../data/courseStructure";

const ROOT = process.cwd();
const MODULES = path.join(ROOT, "content", "modules");
const OUT_DIR = path.join(ROOT, "exports", "takeaways-input");

type ModuleJson = {
  description?: string;
  title?: string;
};

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean);
}

function bulletList(items: string[]): string {
  if (items.length === 0) return "_Keine Angaben._";
  return items.map((s) => `- ${s}`).join("\n");
}

function inlineConcepts(items: string[]): string {
  if (items.length === 0) return "_Keine Angaben._";
  return items.join(", ");
}

async function readModuleJsonDescription(
  modulId: string,
  fallback: string
): Promise<string> {
  const p = path.join(MODULES, modulId, "module.json");
  try {
    const raw = await fs.readFile(p, "utf8");
    const j = JSON.parse(raw) as ModuleJson;
    return asString(j.description) ?? fallback;
  } catch {
    return fallback;
  }
}

async function readQuizAppendix(
  modulId: string,
  lektionId: string
): Promise<string> {
  const p = path.join(MODULES, modulId, lektionId, "quiz.json");
  try {
    const raw = await fs.readFile(p, "utf8");
    JSON.parse(raw);
    return [
      "",
      "### Quiz (quiz.json)",
      "",
      "Vollständige Rohdaten (für didaktischen Kontext):",
      "",
      "```json",
      raw.trimEnd(),
      "```",
      "",
    ].join("\n");
  } catch {
    return "";
  }
}

async function buildLessonSection(
  modulId: string,
  lektionId: string,
  lessonIndex: number
): Promise<string> {
  const lessonPath = path.join(MODULES, modulId, lektionId, "lesson.md");
  let title = lektionId;
  let numberStr = String(lessonIndex + 1);
  let objectives: string[] = [];
  let concepts: string[] = [];
  let body = "";

  try {
    const raw = await fs.readFile(lessonPath, "utf8");
    const { data, content } = matter(raw);
    const d = data as Record<string, unknown>;
    title = asString(d.title) ?? title;
    numberStr = String(d.number ?? lessonIndex + 1);
    objectives = asStringArray(d.learningObjectives);
    concepts = asStringArray(d.keyConcepts);
    body = content.replace(/^\uFEFF/, "").trim();
  } catch {
    body =
      "_`lesson.md` ist unter diesem Pfad nicht vorhanden — Lektion im UX-Ordner noch nicht migriert oder Datei fehlt._";
  }

  const quizBlock = await readQuizAppendix(modulId, lektionId);

  return [
    "---",
    "",
    `## Lektion ${numberStr}: ${title}`,
    "",
    `Lektions-ID: ${lektionId}`,
    `Pfad-Schlüssel: ${modulId}/${lektionId}`,
    "Lernziele:",
    bulletList(objectives),
    "",
    `Kernkonzepte: ${inlineConcepts(concepts)}`,
    "",
    "### Inhalt",
    "",
    body,
    quizBlock,
  ].join("\n");
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const mod of ALL_MODULES) {
    const num = String(mod.number).padStart(2, "0");
    const outName = `modul-${num}.md`;
    const outPath = path.join(OUT_DIR, outName);

    const description = await readModuleJsonDescription(
      mod.id,
      mod.description
    );

    const parts: string[] = [
      `# Modul ${mod.number}: ${mod.title}`,
      "",
      `Modul-ID: ${mod.id}`,
      `Beschreibung: ${description}`,
      `Anzahl Lektionen: ${mod.lessons.length}`,
      "",
    ];

    for (let i = 0; i < mod.lessons.length; i++) {
      const lektionId = mod.lessons[i];
      parts.push(await buildLessonSection(mod.id, lektionId, i));
    }

    const text = parts.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
    await fs.writeFile(outPath, text, "utf8");
    console.log("Wrote", path.relative(ROOT, outPath));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
