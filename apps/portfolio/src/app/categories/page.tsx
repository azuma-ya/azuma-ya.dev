import { Suspense } from "react";

import { CategoryList } from "@/features/category/components/category-list";
import { getCategoryTree } from "@/features/category/lib/get-category-tree";

const CategoryListPage = () => {
  const categoryTree = getCategoryTree();

  return (
    <Suspense>
      <CategoryList categoryTree={categoryTree} />
    </Suspense>
  );
};

export default CategoryListPage;
