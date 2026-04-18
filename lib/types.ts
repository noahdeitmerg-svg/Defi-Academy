export type LessonFrontmatter = {
  title: string;
  duration: string;
  moduleNumber: number;
  /** z. B. 1, 2 oder "2a" in den Cursor-Akademie-Quellen */
  lessonNumber: number | string;
};

export type Slide = {
  title: string;
  bullets: string[];
};

export type VisualSuggestion = {
  timestamp: string;
  instruction: string;
};

export type ExerciseData = {
  goal: string;
  steps: string[];
  deliverable: string;
};

export type ParsedLesson = {
  frontmatter: LessonFrontmatter;
  explanationMdx: string;
  slides: Slide[];
  narration: string;
  visuals: VisualSuggestion[];
  exercise: ExerciseData | null;
  /** MC aus `## Quiz`, falls parsbar */
  lessonQuiz: QuizFile | null;
  /** Freitext-/offene Fragen als Markdown-Fallback */
  lessonQuizMarkdownFallback: string | null;
  rawBySection: Record<string, string>;
};

export type LessonMeta = {
  slug: string;
  fileBase: string;
  title: string;
  duration: string;
  moduleNumber: number;
  lessonNumber: number | string;
};

export type ModuleMeta = {
  slug: string;
  title: string;
  description?: string;
  lessons: LessonMeta[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type QuizFile = {
  title: string;
  questions: QuizQuestion[];
};

/** Modul-Ende: MC (`quiz.json`) oder Freitext (`open-quiz.md`). */
export type ModuleQuizPayload =
  | { format: "multipleChoice"; quiz: QuizFile }
  | { format: "openMarkdown"; title: string; markdown: string };

export type ProgressState = {
  version: 1;
  completedLessons: string[];
  quizScores: Record<string, number>;
  moduleCompleted: Record<string, boolean>;
};
