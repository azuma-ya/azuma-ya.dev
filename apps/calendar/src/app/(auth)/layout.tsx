import { Container } from "@repo/ui/components/layout/container";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default AuthLayout;
