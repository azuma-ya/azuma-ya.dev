import ReactMarkdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import type { Meta } from "../utils/meta";

import { rehypeHeadFormat } from "../rehype/rehype-head-format";
import { rehypeHeadLinker } from "../rehype/rehype-head-linker";
import { remarkCallout } from "../remark/remark-callout";
import { remarkLinkCard } from "../remark/remark-link-card";
import { remarkSection } from "../remark/remark-section";
import { LinkCard, type LinkCardProps } from "./link-card";

import { Callout, CalloutTitle } from "./callout";
import { CodeHighlight } from "./code-highlight";
import { FlexBox } from "./flex-box";
import { HeadLink } from "./head-link";
import { Section } from "./section";

import "@repo/markdown/globals.css";
import "katex/dist/katex.min.css";

interface MarkdownProps {
  children: string;
  metas?: Meta[];
}

export const Markdown = ({ children, metas = [] }: MarkdownProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkMath,
        remarkBreaks,
        remarkDirective,
        remarkSection,
        remarkCallout,
        remarkLinkCard,
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
          ...remarkLinkCard.handlers,
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
          "link-card": (props: LinkCardProps) => (
            <LinkCard {...props} metas={metas} />
          ),
        } as Components
      }
    >
      {children}
    </ReactMarkdown>
  );
};
