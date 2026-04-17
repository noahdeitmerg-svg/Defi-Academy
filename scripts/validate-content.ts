import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_ROOT = path.join(process.cwd(), "content", "modules");

type Severity = "error" | "warn";

type ValidationIssue = {
  file: string;
  message: string;
  severity: Severity;
};

const REQUIRED_SECTION_ALIASES: Array<{ canonical: string; aliases: string[] }> = [
  { canonical: "Explanation", aliases: ["Explanation"] },
  { canonical: "Slide Summary", aliases: ["Slide Summary"] },
  { canonical: "Voice Narration Script", aliases: ["Voice Narration Script"] },
  { canonical: "Visual Suggestions", aliases: ["Visual Suggestions"] },
  { canonical: "Exercise", aliases: ["Exercise", "Practical Exercise"] },
];

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n");
}

function findHeadings(markdown: string): Set<string> {
  const set = new Set<string>();
  const lines = normalizeText(markdown).split("\n");
  for (const line of lines) {
    const m = /^#{2,3}\s+(.+)$/.exec(line.trim());
    if (m) set.add(m[1].trim());
  }
  return set;
}

async function collectModuleDirs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && /^module\d+$/i.test(e.name))
      .map((e) => path.join(CONTENT_ROOT, e.name))
      .sort();
  } catch {
    return [];
  }
}

function rel(p: string): string {
  return path.relative(process.cwd(), p).replace(/\\/g, "/");
}

async function validateModule(moduleDir: string, issues: ValidationIssue[]) {
  const files = await fs.readdir(moduleDir);
  const lessonFiles = files
    .filter((f) => /\.md$/i.test(f) && f !== "open-quiz.md")
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (lessonFiles.length === 0) {
    issues.push({
      file: rel(moduleDir),
      message: "Keine Lektionsdateien (*.md) gefunden.",
      severity: "error",
    });
  }

  // meta.json und Quiz sind runtime-safe (Fallbacks im Frontend vorhanden)
  // → nur Warnung, damit Work-in-Progress-Module die CI nicht blockieren
  if (!files.includes("meta.json")) {
    issues.push({
      file: rel(moduleDir),
      message: "meta.json fehlt (Fallback: Slug als Titel).",
      severity: "warn",
    });
  }
  if (!files.includes("quiz.json") && !files.includes("open-quiz.md")) {
    issues.push({
      file: rel(moduleDir),
      message: "Weder quiz.json noch open-quiz.md vorhanden (Quiz-Tab wird ausgeblendet).",
      severity: "warn",
    });
  }

  for (const lessonFile of lessonFiles) {
    const full = path.join(moduleDir, lessonFile);
    const raw = await fs.readFile(full, "utf8");
    const headings = findHeadings(raw);

    for (const req of REQUIRED_SECTION_ALIASES) {
      const ok = req.aliases.some((alias) => headings.has(alias));
      if (!ok) {
        issues.push({
          file: rel(full),
          message: `Pflichtabschnitt fehlt: ${req.canonical} (erwartet: ${req.aliases.join(" | ")})`,
          severity: "error",
        });
      }
    }
  }
}

async function main() {
  const dirs = await collectModuleDirs();
  if (dirs.length === 0) {
    console.error("[validate:content] Keine Modulordner unter content/modules gefunden.");
    process.exit(1);
  }

  const issues: ValidationIssue[] = [];
  for (const dir of dirs) {
    await validateModule(dir, issues);
  }

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warn");

  if (warnings.length > 0) {
    console.warn(`[validate:content] ${warnings.length} Warnung(en):`);
    for (const issue of warnings) {
      console.warn(`- WARN  ${issue.file}: ${issue.message}`);
    }
  }

  if (errors.length > 0) {
    console.error(`[validate:content] Fehlgeschlagen mit ${errors.length} Fehler(n):`);
    for (const issue of errors) {
      console.error(`- ERROR ${issue.file}: ${issue.message}`);
    }
    process.exit(1);
  }

  console.log(
    `[validate:content] OK. ${dirs.length} Module validiert (${REQUIRED_SECTION_ALIASES.length} Pflichtabschnitte je Lektion)${
      warnings.length > 0 ? `, ${warnings.length} Warnung(en)` : ""
    }.`,
  );
}

main().catch((err) => {
  console.error("[validate:content] Unerwarteter Fehler:", err);
  process.exit(1);
});
