"use client";

import { type JSX, lazy, type ReactNode, Suspense } from "react";

interface CodeHighlightProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  node?: unknown;
}

const LazyCodeHighlight = lazy(async () => {
  const { CodeHighlight } = await import("./code-highlight");

  return {
    default: CodeHighlight as (props: CodeHighlightProps) => JSX.Element,
  };
});

export const CodeHighlight = (props: CodeHighlightProps): JSX.Element => {
  return (
    <Suspense
      fallback={<code className={props.className}>{props.children}</code>}
    >
      <LazyCodeHighlight {...props} />
    </Suspense>
  );
};
