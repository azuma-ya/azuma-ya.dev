import type { HTMLAttributes } from "react";
import type { ClassAttributes } from "react";

import type { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps as {
    className: string;
    children: string;
  };
  const language = className?.replace("language-", "");

  return (
    <SyntaxHighlighter style={a11yDark} language={language}>
      {String(code).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

export default Pre;
