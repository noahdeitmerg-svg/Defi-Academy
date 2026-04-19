import { notFound } from "next/navigation";
import { getAllModules, getParsedLesson } from "@/lib/content";
import { resolveLessonDurationLabel } from "@/lib/lessonDuration";
import { resolveLessonVideo } from "@/lib/lessonAssets";
import { lessonQuizProgressKey } from "@/lib/progress";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { LessonLayout } from "@/components/LessonLayout";
import { LessonQuizMarkdown } from "@/components/LessonQuizMarkdown";
import { LessonVideoHero } from "@/components/LessonVideoHero";
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

  const { frontmatter, explanationMdx, slides, narration, exercise, lessonQuiz, lessonQuizMarkdownFallback } =
    parsed;

  const videoAsset = await resolveLessonVideo(moduleSlug, lessonSlug);
  const videoHero = videoAsset ? (
    <LessonVideoHero asset={videoAsset} title={frontmatter.title} />
  ) : null;

  const durationLabel = resolveLessonDurationLabel(moduleSlug, lessonSlug, frontmatter.duration);

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
        duration={durationLabel}
        moduleNumber={frontmatter.moduleNumber}
        lessonNumber={frontmatter.lessonNumber}
        slides={slides}
        narration={narration}
        exercise={exercise}
        exerciseStorageKey={`defi-academy-exercise-${moduleSlug}-${lessonSlug}`}
        quizPanel={quizPanel}
        videoHero={videoHero}
      >
        <MdxExplanation source={explanationMdx} />
      </LessonLayout>
      <LessonCompleteButton moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
    </>
  );
}
