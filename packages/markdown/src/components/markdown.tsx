import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { rehypeHeadFormat } from "../rehype/rehype-head-format";
import { rehypeHeadLinker } from "../rehype/rehype-head-linker";
import { remarkCallout } from "../remark/remark-callout";
import { remarkSection } from "../remark/remark-section";

import { Callout, CalloutTitle } from "./callout";
import { CodeHighlight } from "./code-highlight";
import { FlexBox } from "./flex-box";
import { HeadLink } from "./head-link";
import { Section } from "./section";

import "@repo/markdown/globals.css";
import "katex/dist/katex.min.css";
import remarkBreaks from "remark-breaks";

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkMath,
        remarkBreaks,
        remarkDirective,
        remarkSection,
        remarkCallout,
        remarkDirectiveRehype,
      ]}
      rehypePlugins={[
        rehypeKatex,
        rehypeSlug,
        rehypeHeadFormat,
        // rehypeHeadingLevel,
        rehypeHeadLinker,
      ]}
      remarkRehypeOptions={{
        handlers: {
          ...remarkSection.handlers,
          ...remarkCallout.handlers,
        },
      }}
      className="markdown min-w-0"
      components={
        {
          code: CodeHighlight,
          section: Section,
          flex: FlexBox,
          callout: Callout,
          "callout-title": CalloutTitle,
          "head-link": HeadLink,
        } as Components
      }
    >
      {children}
    </ReactMarkdown>
  );
};
