import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";

interface Props {
  children: ReactNode;
}

const WorksLayout = ({ children }: Props) => {
  return <BaseLayout title="Works">{children}</BaseLayout>;
};

export default WorksLayout;
