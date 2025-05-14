import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";

interface Props {
  children: ReactNode;
}

const CategoriesLayout = ({ children }: Props) => {
  return (
    <BaseLayout title="Categories">
      <p className="text-muted-foreground mb-8">
        these categories are hierarchy structure
      </p>
      {children}
    </BaseLayout>
  );
};

export default CategoriesLayout;
