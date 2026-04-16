import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mb-4 text-2xl font-semibold tracking-tight text-[var(--color-text)]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mb-3 mt-8 text-xl font-semibold text-[var(--color-text)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mb-2 mt-6 text-lg font-medium text-[var(--color-text)]" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-[var(--color-text-muted)]" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 text-[var(--color-text-muted)]" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[var(--color-surface-muted)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--color-text)]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-sm"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-2 border-[var(--color-accent)] pl-4 text-[var(--color-text-muted)]"
      {...props}
    />
  ),
  details: (props) => (
    <details
      className="mb-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-muted)]"
      {...props}
    />
  ),
  summary: (props) => (
    <summary
      className="cursor-pointer select-none text-sm font-medium text-[var(--color-text)]"
      {...props}
    />
  ),
};
