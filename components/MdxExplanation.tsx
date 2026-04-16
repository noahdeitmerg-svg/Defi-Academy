import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdxComponents";

type Props = {
  source: string;
};

export async function MdxExplanation({ source }: Props) {
  if (!source.trim()) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        Für diese Lektion liegt noch kein Erklärungstext vor.
      </p>
    );
  }

  return (
    <div className="prose-defi max-w-none">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
