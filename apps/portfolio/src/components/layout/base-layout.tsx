import { Container } from "@repo/ui/components/layout/container";
import type { ReactNode } from "react";
import { HeaderSpacing } from "../base/header";

interface Props {
  title: string;
  children: ReactNode;
}

export const BaseLayout = ({ title, children }: Props) => {
  return (
    <Container maxWidth="sm" className="space-y-2">
      <HeaderSpacing />
      <h1 className="text-sm font-bold">{title}</h1>
      {children}
    </Container>
  );
};
