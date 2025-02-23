import { Suspense } from "react";

import { CategoryList } from "@/features/category/components/category-list";
import { getCategoryTree } from "@/features/category/lib/get-category-tree";
import { getInfo } from "@/features/profile/lib/get-info";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `Categories | ${info.portfolio.title}`,
    description: `${info.portfolio.title}のカテゴリ一覧ページです。`,
    openGraph: {
      title: `Categories | ${info.portfolio.title}`,
      description: `${info.portfolio.title}のカテゴリ一覧ページです。`,
    },
  };
};

const CategoryListPage = () => {
  const categoryTree = getCategoryTree();

  return (
    <Suspense>
      <CategoryList categoryTree={categoryTree} />
    </Suspense>
  );
};

export default CategoryListPage;
