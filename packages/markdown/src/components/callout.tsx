import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@repo/ui/lib/utils";

const calloutVariants = cva("my-6 flex gap-2.5 rounded-lg border p-4", {
  variants: {
    type: {
      default: "border-border bg-muted",
      note: "border-blue-200 bg-blue-50",
      warning: "border-yellow-200 bg-yellow-50",
      alert: "border-red-200 bg-red-50",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export interface CalloutProps extends VariantProps<typeof calloutVariants> {
  className?: string;
  children?: ReactNode;
  node: Element;
}

export const Callout = ({
  className,
  children,
  type,
  node,
  ...props
}: CalloutProps) => {
  return (
    <div className={cn(calloutVariants({ type, className }))} {...props}>
      <div className="flex-1">{children}</div>
    </div>
  );
};

interface CalloutTitleProps {
  children?: ReactNode;
}

export const CalloutTitle = ({ children }: CalloutTitleProps) => {
  return <p className="text-sm">{children}</p>;
};
