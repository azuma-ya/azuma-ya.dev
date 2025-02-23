import type { ReactNode } from "react";

import { Container } from "@repo/ui/components/layout/container";
import { cn } from "@repo/ui/lib/utils";

interface Props {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const BaseLayout = ({ title, children, action, className }: Props) => {
  return (
    <Container maxWidth="md" className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {action}
      </div>
      {children}
    </Container>
  );
};
