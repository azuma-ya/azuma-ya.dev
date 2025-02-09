import { cn } from "@repo/ui/lib/utils";
import type { HTMLAttributes } from "react";

interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {}

export const FlexBox = ({ className, ...props }: FlexBoxProps) => {
  return (
    <div
      className={cn("flex gap-2 justify-between items-center", className)}
      {...props}
    />
  );
};
