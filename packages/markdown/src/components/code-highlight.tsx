"use client";

import type { JSX, ReactNode } from "react";
// @ts-ignore
import ShikiHighlighter, { isInlineCode, type Element } from "react-shiki";
import type { BundledLanguage } from "shiki";

import { Mermaid } from "./mermaid";

interface CodeHighlightProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  node?: Element | undefined;
}

export const CodeHighlight = ({
  className,
  children,
  node,
  ...props
}: CodeHighlightProps): JSX.Element => {
  const match = className?.match(/language-(\w+)/);
  // TODO: remove need for consumer use of BundledLanguage from shiki
  const language = match ? (match[1] as BundledLanguage) : undefined;

  const isInline: boolean | undefined = node ? isInlineCode(node) : undefined;

  if (!isInline && language === "mermaid") {
    return <Mermaid>{String(children)}</Mermaid>;
  }

  return !isInline ? (
    <ShikiHighlighter
      language={language as BundledLanguage}
      theme={"houston"}
      {...props}
    >
      {String(children)}
    </ShikiHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
