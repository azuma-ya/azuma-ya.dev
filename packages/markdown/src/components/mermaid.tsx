"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  children: string;
}

export const Mermaid = ({ children }: MermaidProps) => {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.classList.contains("dark");

        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "neutral",
          securityLevel: "loose",
        });

        const elementId = `mermaid-${id.replace(/:/g, "")}`;
        const { svg: renderedSvg } = await mermaid.render(
          elementId,
          children.trim(),
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
        }
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [children, id, theme]);

  if (error) {
    return (
      <pre className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-4 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid SVG output
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
