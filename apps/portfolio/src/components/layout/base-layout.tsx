import type { ReactNode } from "react";

import { Container } from "@repo/ui/components/layout/container";

interface Props {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export const BaseLayout = ({ title, children, action }: Props) => {
  return (
    <Container maxWidth="md" className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {action}
      </div>
      {children}
    </Container>
  );
};
