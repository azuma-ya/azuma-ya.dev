import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";

interface Props {
  children: ReactNode;
}

const LibraryLayout = ({ children }: Props) => {
  return <BaseLayout title="Library">{children}</BaseLayout>;
};

export default LibraryLayout;
