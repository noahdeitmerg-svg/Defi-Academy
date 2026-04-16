export type CursorLessonChunk = {
  /** z. B. "1-0", "1-2a" */
  slug: string;
  /** z. B. "1.0", "1.2a" */
  lessonId: string;
  title: string;
  body: string;
};

const LESSON_HEADING = /^#\s+Lesson\s+(\d+\.[\w]+)\s*[—-]\s*(.+)$/gm;
const MODULE_QUIZ_HEADING = /^#\s+Module\s+\d+\s*[—-]\s*Comprehensive Quiz\s*$/m;

export function splitCursorModuleFile(fullText: string): {
  lessons: CursorLessonChunk[];
  moduleQuizMarkdown: string | null;
} {
  const text = fullText.replace(/\r\n/g, "\n");
  const quizMatch = text.match(MODULE_QUIZ_HEADING);
  const quizIdx = quizMatch && quizMatch.index !== undefined ? quizMatch.index : -1;
  const lessonPart = quizIdx === -1 ? text : text.slice(0, quizIdx);
  const moduleQuizMarkdown = quizIdx === -1 ? null : text.slice(quizIdx).trim();

  const lessons: CursorLessonChunk[] = [];
  const matches = [...lessonPart.matchAll(LESSON_HEADING)];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const lessonId = m[1];
    const title = m[2].trim();
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? lessonPart.length) : lessonPart.length;
    const body = lessonPart.slice(start, end).trim();
    const slug = lessonId.replace(/\./g, "-");
    lessons.push({ slug, lessonId, title, body });
  }

  return { lessons, moduleQuizMarkdown };
}

export function parseModuleTitleFromSource(fullText: string): string | null {
  const line = fullText.split(/\r?\n/).find((l) => /^#\s+Module\s+\d+/.test(l.trim()));
  if (!line) return null;
  return line.replace(/^#\s+Module\s+\d+\s*[—-]\s*/i, "").trim() || null;
}

export function parseModuleNumberFromFilename(file: string): number {
  const m = /^module(\d+)\.md$/i.exec(file);
  return m ? Number(m[1]) : 1;
}

export function extractDurationFromLessonBody(body: string): string {
  const m = /^\*\*Duration:\*\*\s*(.+)$/im.exec(body);
  return m?.[1]?.trim() ?? "—";
}
