import type { ReactNode } from "react";

import { Container } from "@repo/ui/components/layout/container";

interface Props {
  title: string;
  children: ReactNode;
}

export const BaseLayout = ({ title, children }: Props) => {
  return (
    <Container maxWidth="md" className="space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </Container>
  );
};
