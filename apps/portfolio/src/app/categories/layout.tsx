import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";

interface Props {
  children: ReactNode;
}

const CategoriesLayout = ({ children }: Props) => {
  return <BaseLayout title="Categories">{children}</BaseLayout>;
};

export default CategoriesLayout;
