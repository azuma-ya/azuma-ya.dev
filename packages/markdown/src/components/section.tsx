import { cn } from "@repo/ui/lib/utils";
import type { Element } from "hast";
import type { ReactNode } from "react";

interface SectionProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
  id?: string | undefined;
  node?: Element | undefined;
}

export const Section = ({ className, id, node, ...props }: SectionProps) => {
  return (
    <section
      className={cn("animate-fade-in opacity-0", className)}
      style={{
        animationDelay: `${Number.parseInt(id || "0") * 0.2}s`,
        animationFillMode: "forwards",
      }}
      id={id}
      {...props}
    />
  );
};
