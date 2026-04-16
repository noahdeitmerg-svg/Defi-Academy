import type { QuizFile, QuizQuestion } from "./types";

/**
 * Parst Multiple-Choice-Fragen aus dem Academy-Markdown
 * (`### Question n` in Lektionen, `## Question n` im Modul-Quiz).
 */
export function parseMcQuizMarkdown(markdown: string, title: string): QuizFile {
  const trimmed = markdown.split(/^##\s+Quiz Scoring\b/im)[0];
  const questions: QuizQuestion[] = [];

  const header = /^#{2,3}\s+Question\s+(\d+)\s*$/gm;
  const matches = [...trimmed.matchAll(header)];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? trimmed.length) : trimmed.length;
    const block = trimmed.slice(start, end).trim();

    const optRe = /^\s*\*\*([A-D])\)\*\*\s*(.+)$/gm;
    const options: string[] = [];
    let om: RegExpExecArray | null;
    const order: string[] = [];
    while ((om = optRe.exec(block)) !== null) {
      order.push(om[1]);
      options.push(om[2].trim());
    }

    const correctM =
      /\*\*Correct answer:\s*([A-D])\*\*/i.exec(block) ||
      /Correct answer:\s*([A-D])/i.exec(block);
    const letter = correctM?.[1]?.toUpperCase() ?? "";
    const correctIndex = letter ? order.indexOf(letter) : -1;

    const stem = block
      .split(/\*\*[A-D]\)\*\*/m)[0]
      .replace(/^[*_\s]+/gm, "")
      .trim();

    if (options.length >= 2 && correctIndex >= 0 && stem) {
      questions.push({
        id: `q-${m[1]}`,
        question: stem.replace(/\n{3,}/g, "\n\n"),
        options,
        correctIndex,
        explanation: extractExplanation(block),
      });
    }
  }

  return { title, questions };
}

function extractExplanation(block: string): string | undefined {
  const dm = /<details>[\s\S]*?<\/details>/i.exec(block);
  if (!dm) return undefined;
  const inner = dm[0]
    .replace(/<summary>[\s\S]*?<\/summary>/gi, "")
    .replace(/<\/?details>/gi, "")
    .replace(/<\/?[^>]+>/g, "")
    .trim();
  return inner || undefined;
}
