import { cn } from "@repo/ui/lib/utils";
import ReactMarkdown, { type Components, type Options } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { rehypeHeadFormat } from "../rehype/rehype-head-format";
import { rehypeHeadLinker } from "../rehype/rehype-head-linker";
import { rehypeSafeSlug } from "../rehype/rehype-safe-slug";
import { remarkCallout } from "../remark/remark-callout";
import { remarkLinkCard } from "../remark/remark-link-card";
import { remarkSection } from "../remark/remark-section";
import type { Meta } from "../utils/meta";
import { Callout, CalloutTitle } from "./callout";
import { CodeHighlight } from "./code-highlight-lazy";
import { FlexBox } from "./flex-box";
import { HeadLink } from "./head-link";
import { LinkCard, type LinkCardProps } from "./link-card";
import { Section } from "./section";

import "@repo/markdown/globals.css";
import "katex/dist/katex.min.css";

interface MarkdownProps extends Options {
  children: string;
  metas?: Meta[];
}

export const Markdown = ({
  children,
  metas = [],
  ...options
}: MarkdownProps) => {
  return (
    <div className={cn("markdown min-w-0")}>
      <ReactMarkdown
        {...options}
        remarkPlugins={[
          remarkGfm,
          remarkMath,
          remarkBreaks,
          remarkDirective,
          remarkSection,
          remarkCallout,
          remarkLinkCard,
          remarkDirectiveRehype,
          ...(options.remarkPlugins ?? []),
        ]}
        rehypePlugins={[
          rehypeKatex,
          rehypeSlug,
          rehypeSafeSlug,
          rehypeHeadFormat,
          rehypeHeadLinker,
          ...(options.rehypePlugins ?? []),
        ]}
        remarkRehypeOptions={{
          handlers: {
            ...remarkSection.handlers,
            ...remarkCallout.handlers,
            ...remarkLinkCard.handlers,
            ...(options.remarkRehypeOptions?.handlers ?? {}),
          },
        }}
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
            ...(options.components ?? {}),
          } as Components
        }
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
