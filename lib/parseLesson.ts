import matter from "gray-matter";
import { escapeMdxLessThanBeforeDigit } from "./mdxSafe";
import { splitLessonBody, type LessonBodySections } from "./lessonSectionParser";
import type {
  ExerciseData,
  LessonFrontmatter,
  ParsedLesson,
  Slide,
  VisualSuggestion,
} from "./types";
import { parseMcQuizMarkdown } from "./parseMcQuiz";

/** Folien aus `**[Slide n] — Titel**`-Blöcken (deutsche Akademie-Quellen). */
function parseSlidesFromBracketBlocks(section: string): Slide[] {
  const slides: Slide[] = [];
  const re = /^\*\*\[Slide\s*\d+\](?:\s*[—-]\s*([^*\n]+))?\*\*\s*$/gm;
  const matches = [...section.matchAll(re)];
  if (matches.length === 0) return [];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const slideTitle = (m[1] ?? "").trim() || `Folie ${i + 1}`;
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? section.length) : section.length;
    const body = section.slice(start, end).trim();
    const bullets: string[] = [];
    for (const line of body.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      const bullet = /^[-*•]\s+(.+)$/.exec(t);
      const numbered = /^\d+\.\s+(.+)$/.exec(t);
      if (bullet) bullets.push(bullet[1].trim());
      else if (numbered) bullets.push(numbered[1].trim());
    }
    if (bullets.length === 0 && body) {
      const paras = body
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);
      slides.push({ title: slideTitle, bullets: paras.length ? paras : [body] });
    } else {
      slides.push({ title: slideTitle, bullets });
    }
  }
  return slides;
}

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
    const bracketSlides = parseSlidesFromBracketBlocks(section);
    if (bracketSlides.length) return bracketSlides;
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

    const boldBracket = /^\*\*\[([^\]]+)\]\*\*\s*(.+)$/.exec(line);
    const bracket = /^\[([^\]]+)\]\s*(.*)$/.exec(line);
    const bold = /^\*\*([^*]+)\*\*\s*[—:-]?\s*(.*)$/.exec(line);
    const dash = /^[-*•]\s*\[([^\]]+)\]\s*(.*)$/.exec(line);
    const boldDash = /^[-*•]\s*\*\*([^*]+)\*\*\s*[—:-]?\s*(.*)$/.exec(line);

    if (boldBracket) {
      timestamp = boldBracket[1].trim();
      instruction = boldBracket[2].trim();
    } else if (dash) {
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

  const goalMatch =
    /###\s*(?:Goal|Ziel)\s*\n+([\s\S]*?)(?=###|\Z)/i.exec(section);
  const stepsMatch =
    /###\s*(?:Steps|Schritte)\s*\n+([\s\S]*?)(?=###|\Z)/i.exec(section);
  const delMatch =
    /###\s*(?:Deliverable|Ergebnis|Abgabe)\s*\n+([\s\S]*?)(?=###|\Z)/i.exec(section);

  let goal = goalMatch?.[1]?.trim() ?? "";
  let deliverable = delMatch?.[1]?.trim() ?? "";
  let stepsBlock = stepsMatch?.[1] ?? "";

  if (!goal && !stepsBlock && !deliverable) {
    const gBold =
      /\*\*(?:Goal|Ziel):\*\*\s*([\s\S]*?)(?=\*\*(?:Steps|Schritte):\*\*|\*\*(?:Deliverable|Ergebnis):\*\*|#{2,3}\s|\Z)/i.exec(
        section,
      );
    const sBold =
      /\*\*(?:Steps|Schritte):\*\*\s*([\s\S]*?)(?=\*\*(?:Deliverable|Ergebnis|Goal|Ziel):\*\*|#{2,3}\s|\Z)/i.exec(
        section,
      );
    const dBold =
      /\*\*(?:Deliverable|Ergebnis):\*\*\s*([\s\S]*?)(?=\*\*(?:Goal|Ziel|Steps|Schritte):\*\*|#{2,3}\s|\Z)/i.exec(
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

  if (!goal && steps.length === 0 && !deliverable) {
    const delLine = /\*\*(?:Deliverable|Ergebnis|Abgabe):\*\*\s*(.+)$/im.exec(section);
    if (delLine?.[1]) deliverable = delLine[1].trim();
    const lines = section.split("\n").map((l) => l.trim()).filter(Boolean);
    const numbered = lines.filter((l) => /^\d+\.\s+/.test(l)).map((l) => l.replace(/^\d+\.\s+/, "").trim());
    if (numbered.length) {
      return {
        goal: goal || lines.slice(0, 3).join(" ") || "Übung",
        steps: numbered,
        deliverable,
      };
    }
    const trimmed = section.trim();
    if (trimmed.length > 20) {
      return { goal: trimmed, steps: [], deliverable: deliverable || "" };
    }
    return null;
  }
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
  return escapeMdxLessThanBeforeDigit(parts.join("\n\n---\n\n"));
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
