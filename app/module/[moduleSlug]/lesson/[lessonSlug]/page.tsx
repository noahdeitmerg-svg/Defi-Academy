import { notFound } from "next/navigation";
import { getAllModules, getParsedLesson } from "@/lib/content";
import { lessonQuizProgressKey } from "@/lib/progress";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { LessonLayout } from "@/components/LessonLayout";
import { LessonQuizMarkdown } from "@/components/LessonQuizMarkdown";
import { MdxExplanation } from "@/components/MdxExplanation";
import { QuizBlock } from "@/components/QuizBlock";

export async function generateStaticParams() {
  const modules = await getAllModules();
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ moduleSlug: m.slug, lessonSlug: l.slug })),
  );
}

type Props = {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
};

export default async function LessonPage({ params }: Props) {
  const { moduleSlug, lessonSlug } = await params;
  const parsed = await getParsedLesson(moduleSlug, lessonSlug);
  if (!parsed) notFound();

  const { frontmatter, explanationMdx, slides, narration, visuals, exercise, lessonQuiz, lessonQuizMarkdownFallback } =
    parsed;

  const quizPanel =
    lessonQuiz && lessonQuiz.questions.length > 0 ? (
      <QuizBlock
        quiz={lessonQuiz}
        scoreStorageKey={lessonQuizProgressKey(moduleSlug, lessonSlug)}
      />
    ) : lessonQuizMarkdownFallback ? (
      <LessonQuizMarkdown source={lessonQuizMarkdownFallback} />
    ) : null;

  return (
    <>
      <LessonLayout
        title={frontmatter.title}
        duration={frontmatter.duration}
        moduleNumber={frontmatter.moduleNumber}
        lessonNumber={frontmatter.lessonNumber}
        slides={slides}
        narration={narration}
        visuals={visuals}
        exercise={exercise}
        exerciseStorageKey={`defi-academy-exercise-${moduleSlug}-${lessonSlug}`}
        quizPanel={quizPanel}
      >
        <MdxExplanation source={explanationMdx} />
      </LessonLayout>
      <LessonCompleteButton moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
    </>
  );
}
