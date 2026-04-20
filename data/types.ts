export type Tier = "free" | "pro";

export type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
  tier: Tier;
  estimatedMinutes: number;
  lessons: string[];
};

export type Lesson = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  keyConcepts: string[];
  content: string;
};

export type Slide = {
  id: number;
  title: string;
  timestamp: number;
  content: string;
  imageUrl?: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LessonAssets = {
  lesson: Lesson;
  videoUrl: string;
  slides: Slide[];
  quiz: QuizQuestion[];
};

export type LessonProgress = {
  lessonId: string;
  moduleId: string;
  videoWatched: boolean;
  exerciseCompleted: boolean;
  quizPassed: boolean;
  quizScore: number | null;
  completedAt: string | null;
};

export type UserProgress = {
  userId: string;
  tier: Tier;
  lessons: Record<string, LessonProgress>;
  currentLessonId: string | null;
  updatedAt: string;
};
