import { Suspense } from "react";

import { CategoryList } from "@/features/category/components/category-list";
import { getCategoryTree } from "@/features/category/lib/get-category-tree";
import { getInfo } from "@/features/profile/lib/get-info";
import { getCanonicalUrl } from "@/lib/seo";

export const generateMetadata = () => {
  const info = getInfo();
  const canonicalUrl = getCanonicalUrl("/categories");

  return {
    title: `Categories | ${info.portfolio.title}`,
    description: `${info.portfolio.title}のカテゴリ一覧ページ。`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Categories | ${info.portfolio.title}`,
      description: `${info.portfolio.title}のカテゴリ一覧ページ。`,
      url: canonicalUrl,
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
