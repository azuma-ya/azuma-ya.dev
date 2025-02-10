"use client";

import { useRouter } from "next/navigation";

import { Button, type buttonVariants } from "@repo/ui/components/input/button";
import type { VariantProps } from "class-variance-authority";
import { ArrowLeft } from "lucide-react";
import { forwardRef } from "react";

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const router = useRouter();

    return (
      <Button
        ref={ref}
        onClick={() => router.back()}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>
    );
  },
);
