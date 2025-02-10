"use client";

import { cn } from "@repo/ui/lib/utils";
import { type HTMLAttributes, useEffect } from "react";

import * as tocbot from "tocbot";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Toc = ({ className, ...props }: Props) => {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".markdown",
      headingSelector: "h2, h3, h4",
      headingsOffset: 64,
      scrollSmoothOffset: -64,
      tocScrollOffset: 72,
      headingLabelCallback: (label: string) => label.replace(/^#+ /, ""),
    });

    return () => {
      tocbot.destroy();
    };
  }, []);

  return <nav className={cn("toc", className)} {...props} />;
};
