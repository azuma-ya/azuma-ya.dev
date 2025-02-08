import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";

interface Props {
  children: ReactNode;
}

const TimelineLayout = ({ children }: Props) => {
  return <BaseLayout title="Timeline">{children}</BaseLayout>;
};

export default TimelineLayout;
