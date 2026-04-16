import matter from "gray-matter";
import { splitLessonBody, type LessonBodySections } from "./lessonSectionParser";
import type {
  ExerciseData,
  LessonFrontmatter,
  ParsedLesson,
  Slide,
  VisualSuggestion,
} from "./types";
import { parseMcQuizMarkdown } from "./parseMcQuiz";

function parseSlides(section: string | undefined): Slide[] {
  if (!section) return [];
  const slides: Slide[] = [];
  const blocks = section.split(/^###\s+/m).filter(Boolean);

  for (const block of blocks) {
    const [firstLine, ...rest] = block.split("\n");
    const title = firstLine.trim();
    const bullets: string[] = [];
    for (const line of rest) {
      const t = line.trim();
      const bullet = /^[-*•]\s+(.+)$/.exec(t);
      if (bullet) bullets.push(bullet[1].trim());
    }
    if (title) {
      if (bullets.length === 0) {
        const body = rest.join("\n").trim();
        if (body) {
          const chunks = body
            .split(/\n{2,}/)
            .map((s) => s.trim())
            .filter(Boolean);
          slides.push({ title, bullets: chunks.length ? chunks : [body] });
        } else {
          slides.push({ title, bullets: [] });
        }
      } else {
        slides.push({ title, bullets });
      }
    }
  }

  if (slides.length === 0) {
    const fallbackBullets = (section ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^[-*•]\s+/.test(l))
      .map((l) => l.replace(/^[-*•]\s+/, "").trim());
    if (fallbackBullets.length) {
      slides.push({ title: "Überblick", bullets: fallbackBullets });
    }
  }

  return slides;
}

function parseVisuals(section: string | undefined): VisualSuggestion[] {
  if (!section) return [];
  const items: VisualSuggestion[] = [];
  const lines = section.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    let timestamp = "";
    let instruction = line;

    const bracket = /^\[([^\]]+)\]\s*(.*)$/.exec(line);
    const bold = /^\*\*([^*]+)\*\*\s*[—:-]?\s*(.*)$/.exec(line);
    const dash = /^[-*•]\s*\[([^\]]+)\]\s*(.*)$/.exec(line);
    const boldDash = /^[-*•]\s*\*\*([^*]+)\*\*\s*[—:-]?\s*(.*)$/.exec(line);

    if (dash) {
      timestamp = dash[1].trim();
      instruction = dash[2].trim();
    } else if (boldDash) {
      timestamp = boldDash[1].trim();
      instruction = boldDash[2].trim();
    } else if (bracket) {
      timestamp = bracket[1].trim();
      instruction = bracket[2].trim();
    } else if (bold) {
      timestamp = bold[1].trim();
      instruction = bold[2].trim();
    } else {
      const loose = /^[-*•]\s*(.+)$/.exec(line);
      if (loose) instruction = loose[1].trim();
    }

    if (instruction) items.push({ timestamp: timestamp || "—", instruction });
  }

  return items;
}

function parseExercise(section: string | undefined): ExerciseData | null {
  if (!section) return null;

  const goalMatch = /###\s*Goal\s*\n+([\s\S]*?)(?=###|\Z)/i.exec(section);
  const stepsMatch = /###\s*Steps\s*\n+([\s\S]*?)(?=###|\Z)/i.exec(section);
  const delMatch = /###\s*Deliverable\s*\n+([\s\S]*?)(?=###|\Z)/i.exec(section);

  let goal = goalMatch?.[1]?.trim() ?? "";
  let deliverable = delMatch?.[1]?.trim() ?? "";
  let stepsBlock = stepsMatch?.[1] ?? "";

  if (!goal && !stepsBlock && !deliverable) {
    const gBold = /\*\*Goal:\*\*\s*([\s\S]*?)(?=\*\*Steps:\*\*|\*\*Deliverable:\*\*|##|\Z)/i.exec(
      section,
    );
    const sBold = /\*\*Steps:\*\*\s*([\s\S]*?)(?=\*\*Deliverable:\*\*|\*\*Goal:\*\*|##|\Z)/i.exec(
      section,
    );
    const dBold = /\*\*Deliverable:\*\*\s*([\s\S]*?)(?=\*\*Goal:\*\*|\*\*Steps:\*\*|##|\Z)/i.exec(
      section,
    );
    goal = gBold?.[1]?.trim() ?? "";
    stepsBlock = sBold?.[1]?.trim() ?? "";
    deliverable = dBold?.[1]?.trim() ?? "";
  }

  const steps = stepsBlock
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^\d+\.\s+/.test(l))
    .map((l) => l.replace(/^\d+\.\s+/, "").trim())
    .filter(Boolean);

  if (!goal && steps.length === 0 && !deliverable) return null;
  return { goal, steps, deliverable };
}

function normalizeFrontmatter(data: Record<string, unknown>): LessonFrontmatter {
  const ln = data.lessonNumber;
  const lessonNumber =
    typeof ln === "number"
      ? ln
      : typeof ln === "string" && /^\d+$/.test(ln)
        ? Number(ln)
        : typeof ln === "string"
          ? ln
          : 1;

  return {
    title: (data.title as string) ?? "Lektion",
    duration: (data.duration as string) ?? "—",
    moduleNumber: Number(data.moduleNumber ?? 1),
    lessonNumber,
  };
}

function buildExplanationMdx(sections: LessonBodySections): string {
  const parts: string[] = [];
  if (sections.learningObjectives.trim()) {
    parts.push("## Learning Objectives\n\n" + sections.learningObjectives.trim());
  }
  if (sections.explanation.trim()) {
    parts.push(sections.explanation.trim());
  }
  return parts.join("\n\n---\n\n");
}

export function parseLessonContent(content: string, fm: LessonFrontmatter): ParsedLesson {
  const sections = splitLessonBody(content.trim());
  const explanationMdx = buildExplanationMdx(sections);
  const quizSection = sections.quiz.trim();
  const lessonInteractive = quizSection
    ? parseMcQuizMarkdown(quizSection, "Lektionsquiz")
    : null;
  const lessonQuiz =
    lessonInteractive && lessonInteractive.questions.length > 0 ? lessonInteractive : null;
  const lessonQuizMarkdownFallback =
    quizSection && (!lessonQuiz || lessonQuiz.questions.length === 0) ? quizSection : null;

  return {
    frontmatter: fm,
    explanationMdx,
    slides: parseSlides(sections.slideSummary),
    narration: sections.voiceNarration,
    visuals: parseVisuals(sections.visualSuggestions),
    exercise: parseExercise(sections.practicalExercise),
    lessonQuiz,
    lessonQuizMarkdownFallback,
    rawBySection: {
      "Learning Objectives": sections.learningObjectives,
      Explanation: sections.explanation,
      "Slide Summary": sections.slideSummary,
      "Voice Narration Script": sections.voiceNarration,
      "Visual Suggestions": sections.visualSuggestions,
      "Practical Exercise": sections.practicalExercise,
      Quiz: sections.quiz,
    },
  };
}

export function parseLessonMarkdown(raw: string): ParsedLesson {
  const { data, content } = matter(raw);
  const fm = normalizeFrontmatter(data as Record<string, unknown>);
  return parseLessonContent(content, fm);
}

export { extractLessonUiSections, splitLessonBody } from "./lessonSectionParser";
