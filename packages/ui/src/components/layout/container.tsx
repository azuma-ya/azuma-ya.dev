import { forwardRef } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";

const containerVariants = cva("mx-auto w-full px-4", {
  variants: {
    maxWidth: {
      container: "container",
      sm: "max-w-3xl",
      md: "max-w-4xl",
      lg: "max-w-5xl",
      xl: "max-w-6xl",
      "2xl": "max-w-7xl",
    },
  },
  defaultVariants: {
    maxWidth: "container",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ maxWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export { Container };
