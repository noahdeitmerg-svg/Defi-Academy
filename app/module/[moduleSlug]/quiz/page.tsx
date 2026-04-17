import { notFound } from "next/navigation";
import { getAllModules, getQuiz } from "@/lib/content";
import { QuizBlock } from "@/components/QuizBlock";

export async function generateStaticParams() {
  const modules = await getAllModules();
  return modules.map((m) => ({ moduleSlug: m.slug }));
}

type Props = { params: Promise<{ moduleSlug: string }> };

export default async function QuizPage({ params }: Props) {
  const { moduleSlug } = await params;
  const quiz = await getQuiz(moduleSlug);
  if (!quiz) notFound();

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Abschluss
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)]">
          {quiz.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Multiple Choice mit direktem Feedback und Ergebnis am Ende.
        </p>
      </header>
      <QuizBlock
        quiz={quiz}
        scoreStorageKey={moduleSlug}
        completeModuleOnPass
        completionModuleSlug={moduleSlug}
      />
    </div>
  );
}
