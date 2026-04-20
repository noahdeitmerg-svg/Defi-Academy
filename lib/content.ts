import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { resolveFlatCurriculumRoot } from "./curriculumConfig";
import { parseMcQuizMarkdown } from "./parseMcQuiz";
import { parseLessonMarkdown } from "./parseLesson";
import {
  extractDurationFromLessonBody,
  parseModuleNumberFromFilename,
  parseModuleTitleFromSource,
  splitCursorModuleFile,
} from "./splitCursorModule";
import { readModuleOverviewFromFinalMd } from "./moduleOverviewFromFinal";
import type { LessonMeta, ModuleMeta, ModuleQuizPayload, QuizFile } from "./types";

export { lessonHref, quizHref } from "./routes";

const LEGACY_CONTENT_ROOT = path.join(process.cwd(), "content", "modules");

async function listFlatModuleFiles(root: string): Promise<string[]> {
  const files = await fs.readdir(root);
  return files.filter((f) => /^module\d+\.md$/i.test(f)).sort((a, b) => {
    const na = parseModuleNumberFromFilename(a);
    const nb = parseModuleNumberFromFilename(b);
    return na - nb || a.localeCompare(b);
  });
}

async function readFlatModuleSource(root: string, slug: string): Promise<string | null> {
  const n = /^module(\d+)$/.exec(slug)?.[1];
  if (!n) return null;
  const file = path.join(root, `module${n}.md`);
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

function slugFromModuleFilename(file: string): string {
  const n = parseModuleNumberFromFilename(file);
  return `module${n}`;
}

export async function getAllModules(): Promise<ModuleMeta[]> {
  const flatRoot = resolveFlatCurriculumRoot();
  if (flatRoot) {
    const files = await listFlatModuleFiles(flatRoot);
    if (files.length > 0) {
      const modules: ModuleMeta[] = [];
      for (const file of files) {
        const slug = slugFromModuleFilename(file);
        const mod = await getModule(slug);
        if (mod) modules.push(mod);
      }
      return modules;
    }
  }

  try {
    const entries = await fs.readdir(LEGACY_CONTENT_ROOT, { withFileTypes: true });
    /** Nur `moduleN`-Ordner — UX-Build (`01-defi-grundlagen` + `module.json`) bleibt außen vor. */
    const dirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .filter((name) => /^module\d+$/i.test(name));
    const modules: ModuleMeta[] = [];
    for (const slug of dirs.sort()) {
      const mod = await getModule(slug);
      if (mod) modules.push(mod);
    }
    return modules;
  } catch {
    return [];
  }
}

export async function getModule(slug: string): Promise<ModuleMeta | null> {
  const flatRoot = resolveFlatCurriculumRoot();
  if (flatRoot) {
    const src = await readFlatModuleSource(flatRoot, slug);
    if (!src) return null;
    const title = parseModuleTitleFromSource(src) ?? slug;
    const { lessons: chunks } = splitCursorModuleFile(src);
    const moduleNumber = Number(/^module(\d+)$/.exec(slug)?.[1] ?? 1);
    const lessons: LessonMeta[] = chunks.map((c) => ({
      slug: c.slug,
      fileBase: c.slug,
      title: c.title,
      duration: extractDurationFromLessonBody(c.body),
      moduleNumber,
      lessonNumber: c.lessonId.includes(".") ? c.lessonId.split(".").slice(1).join(".") : c.lessonId,
    }));
    const description = readModuleOverviewFromFinalMd(moduleNumber) ?? undefined;
    return { slug, title, description, lessons };
  }

  const base = path.join(LEGACY_CONTENT_ROOT, slug);
  try {
    const files = await fs.readdir(base);
    const mdFiles = files
      .filter((f) => f.endsWith(".md") && /^\d+-\d+\.md$/i.test(f))
      .sort((a, b) => {
        const pa = a.replace(/\.md$/i, "").split("-").map(Number);
        const pb = b.replace(/\.md$/i, "").split("-").map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
          const da = pa[i] ?? 0;
          const db = pb[i] ?? 0;
          if (da !== db) return da - db;
        }
        return 0;
      });
    const lessons: LessonMeta[] = [];

    for (const file of mdFiles) {
      const full = path.join(base, file);
      const raw = await fs.readFile(full, "utf8");
      const { data } = matter(raw);
      const d = data as Record<string, unknown>;
      const fileBase = file.replace(/\.md$/i, "");
      lessons.push({
        slug: fileBase,
        fileBase,
        title: (d.title as string) ?? fileBase,
        duration: (d.duration as string) ?? "—",
        moduleNumber: Number(d.moduleNumber ?? 1),
        lessonNumber: (d.lessonNumber as number | string) ?? lessons.length + 1,
      });
    }

    let title = slug;
    let description: string | undefined;
    const moduleNumber = Number(/^module(\d+)$/.exec(slug)?.[1] ?? 1);
    const metaPath = path.join(base, "meta.json");
    try {
      const metaRaw = await fs.readFile(metaPath, "utf8");
      const meta = JSON.parse(metaRaw) as { title?: string; description?: string };
      if (meta.title) title = meta.title;
      if (meta.description) description = meta.description;
    } catch {
      /* optional */
    }

    if (!description || /^Importiert aus\b/i.test(description)) {
      const fromFinal = readModuleOverviewFromFinalMd(moduleNumber);
      if (fromFinal) description = fromFinal;
    }

    return { slug, title, description, lessons };
  } catch {
    return null;
  }
}

function stripLeadingHr(body: string): string {
  return body.replace(/^(\s*---\s*\n)+/, "").trim();
}

export async function getLessonRaw(
  moduleSlug: string,
  lessonSlug: string,
): Promise<string | null> {
  const flatRoot = resolveFlatCurriculumRoot();
  if (flatRoot) {
    const src = await readFlatModuleSource(flatRoot, moduleSlug);
    if (!src) return null;
    const { lessons } = splitCursorModuleFile(src);
    const chunk = lessons.find((l) => l.slug === lessonSlug);
    if (!chunk) return null;
    const moduleNumber = Number(/^module(\d+)$/.exec(moduleSlug)?.[1] ?? 1);
    const sub = chunk.lessonId.includes(".") ? chunk.lessonId.split(".").slice(1).join(".") : chunk.lessonId;
    const fm = {
      title: chunk.title,
      duration: extractDurationFromLessonBody(chunk.body),
      moduleNumber,
      lessonNumber: sub,
    };
    const body = stripLeadingHr(chunk.body);
    const yaml = `---
title: ${JSON.stringify(fm.title)}
duration: ${JSON.stringify(fm.duration)}
moduleNumber: ${fm.moduleNumber}
lessonNumber: ${JSON.stringify(sub)}
---
`;
    return `${yaml}\n${body}`;
  }

  const file = path.join(LEGACY_CONTENT_ROOT, moduleSlug, `${lessonSlug}.md`);
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function getParsedLesson(moduleSlug: string, lessonSlug: string) {
  const raw = await getLessonRaw(moduleSlug, lessonSlug);
  if (!raw) return null;
  return parseLessonMarkdown(raw);
}

export async function getQuiz(moduleSlug: string): Promise<ModuleQuizPayload | null> {
  const flatRoot = resolveFlatCurriculumRoot();
  if (flatRoot) {
    const src = await readFlatModuleSource(flatRoot, moduleSlug);
    if (!src) return null;
    const { moduleQuizMarkdown } = splitCursorModuleFile(src);
    if (!moduleQuizMarkdown) return null;
    const title =
      moduleQuizMarkdown.match(/^#{1,2}\s+(.+)$/m)?.[1]?.trim() ?? "Modulquiz";
    const parsed = parseMcQuizMarkdown(moduleQuizMarkdown, title);
    if (parsed.questions.length > 0) {
      return { format: "multipleChoice", quiz: parsed };
    }
    return { format: "openMarkdown", title, markdown: moduleQuizMarkdown };
  }

  const base = path.join(LEGACY_CONTENT_ROOT, moduleSlug);
  try {
    const jsonPath = path.join(base, "quiz.json");
    try {
      const raw = await fs.readFile(jsonPath, "utf8");
      const quiz = JSON.parse(raw) as QuizFile;
      if (quiz.questions?.length > 0) {
        return { format: "multipleChoice", quiz };
      }
    } catch {
      /* kein quiz.json */
    }

    const openPath = path.join(base, "open-quiz.md");
    try {
      const markdown = await fs.readFile(openPath, "utf8");
      const title =
        markdown.match(/^#{1,2}\s+(.+)$/m)?.[1]?.trim() ?? "Modul-Abschluss";
      return { format: "openMarkdown", title, markdown };
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
