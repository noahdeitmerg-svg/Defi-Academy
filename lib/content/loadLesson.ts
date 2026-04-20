import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Lesson, LessonAssets, QuizQuestion, Slide } from "@/data/types";
import { ALL_MODULES } from "@/data/courseStructure";
import { markdownToHtml } from "./parseMarkdown";
import { resolveUxLessonVideoUrl } from "./resolveUxLessonVideoUrl";

const MODULES_ROOT = path.join(process.cwd(), "content", "modules");

function placeholderLesson(
  modulId: string,
  lektionId: string
): Lesson {
  const mod = ALL_MODULES.find((m) => m.id === modulId);
  const title =
    mod?.lessons.includes(lektionId) === true
      ? `Lektion ${lektionId}`
      : "Lektion";
  return {
    id: lektionId,
    number: 1,
    moduleId: modulId,
    title,
    estimatedMinutes: 15,
    learningObjectives: [
      "Inhalt folgt — Platzhalter bis zur Redaktionsfreigabe.",
    ],
    keyConcepts: ["DeFi", "Mechanik"],
    content: "<p>Diese Lektion ist noch in Vorbereitung.</p>",
  };
}

function extractExerciseMarkdown(body: string): string | null {
  const re = /^##\s+Exercise\s*$/im;
  const m = re.exec(body);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = body.slice(start);
  const next = /^##\s+/m.exec(rest);
  const block = next ? rest.slice(0, next.index).trim() : rest.trim();
  return block.length > 0 ? block : null;
}

function stripExerciseFromBody(body: string): string {
  const re = /^##\s+Exercise\s*$/im;
  const m = re.exec(body);
  if (!m) return body;
  return body.slice(0, m.index).trimEnd();
}

type QuizFile = {
  lessonId?: string;
  questions?: QuizQuestion[];
};

type SlidesFile = {
  lessonId?: string;
  slides?: Slide[];
};

export async function loadLesson(
  modulId: string,
  lektionId: string
): Promise<LessonAssets> {
  const base = path.join(MODULES_ROOT, modulId, lektionId);
  const lessonPath = path.join(base, "lesson.md");
  const slidesPath = path.join(base, "slides.json");
  const quizPath = path.join(base, "quiz.json");

  let lesson: Lesson = placeholderLesson(modulId, lektionId);
  let slides: Slide[] = [];
  let quiz: QuizQuestion[] = [];

  try {
    const rawMd = await fs.readFile(lessonPath, "utf8");
    const { data, content } = matter(rawMd);
    const d = data as Record<string, unknown>;
    const bodyForHtml = stripExerciseFromBody(content);
    const html = await markdownToHtml(bodyForHtml);

    lesson = {
      id: String(d.id ?? lektionId),
      number: Number(d.number ?? 1),
      moduleId: String(d.moduleId ?? modulId),
      title: String(d.title ?? lesson.title),
      estimatedMinutes: Number(d.estimatedMinutes ?? 15),
      learningObjectives: Array.isArray(d.learningObjectives)
        ? (d.learningObjectives as string[])
        : [],
      keyConcepts: Array.isArray(d.keyConcepts)
        ? (d.keyConcepts as string[])
        : [],
      content: html,
    };
  } catch {
    /* lesson.md fehlt */
  }

  try {
    const raw = await fs.readFile(slidesPath, "utf8");
    const j = JSON.parse(raw) as SlidesFile;
    slides = Array.isArray(j.slides) ? j.slides : [];
  } catch {
    /* slides.json fehlt */
  }

  try {
    const raw = await fs.readFile(quizPath, "utf8");
    const j = JSON.parse(raw) as QuizFile;
    quiz = Array.isArray(j.questions) ? j.questions : [];
  } catch {
    /* quiz.json fehlt */
  }

  const videoUrl = await resolveUxLessonVideoUrl(modulId, lektionId);

  return { lesson, videoUrl, slides, quiz };
}

export type LessonAssetsWithExercise = LessonAssets & {
  exerciseMarkdown: string | null;
};

export async function loadLessonWithExercise(
  modulId: string,
  lektionId: string
): Promise<LessonAssetsWithExercise> {
  const base = path.join(MODULES_ROOT, modulId, lektionId);
  const lessonPath = path.join(base, "lesson.md");
  let exerciseMd: string | null = null;
  try {
    const rawMd = await fs.readFile(lessonPath, "utf8");
    const { content } = matter(rawMd);
    exerciseMd = extractExerciseMarkdown(content);
  } catch {
    /* */
  }
  const assets = await loadLesson(modulId, lektionId);
  return { ...assets, exerciseMarkdown: exerciseMd };
}
