import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

import Pre from "./pre";

import "katex/dist/katex.min.css";

function remarkCustomDirective() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "section") {
        node.data = {
          hName: "div",
          hProperties: { className: "py-4" },
        };
      }
    });
  };
}
interface Props {
  children: string;
}

const Markdown = ({ children }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkMath,
        remarkDirective,
        remarkCustomDirective,
      ]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      className="prose"
      components={{
        h1: ({ node, ...props }) => (
          <h2 {...props} id={node?.position?.start.line.toString()} />
        ),
        h2: ({ node, ...props }) => (
          <h3 {...props} id={node?.position?.start.line.toString()} />
        ),
        h3: ({ node, ...props }) => (
          <h4 {...props} id={node?.position?.start.line.toString()} />
        ),
        img: ({ node, ...props }) => (
          <img {...props} src={props.src} alt={props.alt} />
        ),
        pre: Pre,
        // div: ({ className, children }) => {
        //   if (className === "section") {
        //     return <section className="bg-gray-100">{children}</section>;
        //   }
        //   return <div>{children}</div>;
        // },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
