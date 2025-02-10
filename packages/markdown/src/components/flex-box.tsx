import { cn } from "@repo/ui/lib/utils";
import type { HTMLAttributes } from "react";

interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {}

export const FlexBox = ({ className, ...props }: FlexBoxProps) => {
  return (
    <div
      className={cn(
        "md:flex block gap-4 justify-between items-center",
        className,
      )}
      {...props}
    />
  );
};
