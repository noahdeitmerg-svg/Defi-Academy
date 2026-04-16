import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdxComponents";

type Props = {
  source: string;
};

/** Rendert Lektions-Quiz als Markdown (offene Fragen / Details), wenn kein MC-Parser greift. */
export async function LessonQuizMarkdown({ source }: Props) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="mb-4 text-xs text-[var(--color-text-muted)]">
        Selbsttest — bei offenen Fragen die Antworten in den ausklappbaren Bereichen vergleichen.
      </p>
      <div className="max-w-none text-sm">
        <MDXRemote
          source={source}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeRaw],
            },
          }}
        />
      </div>
    </div>
  );
}
