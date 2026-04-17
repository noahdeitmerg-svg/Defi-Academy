import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { escapeMdxLessThanBeforeDigit } from "@/lib/mdxSafe";
import { mdxComponents } from "./mdxComponents";

type Props = {
  source: string;
};

/** Rendert Lektions-Quiz als Markdown (offene Fragen / Details), wenn kein MC-Parser greift. */
export async function LessonQuizMarkdown({ source }: Props) {
  const safe = escapeMdxLessThanBeforeDigit(source);
  if (!safe.trim()) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">Kein Quiz-Markdown vorhanden.</p>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="mb-4 text-xs text-[var(--color-text-muted)]">
        Selbsttest — bei offenen Fragen die Antworten in den ausklappbaren Bereichen vergleichen.
      </p>
      <div className="max-w-none text-sm">
        <MDXRemote
          source={safe}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </div>
  );
}
