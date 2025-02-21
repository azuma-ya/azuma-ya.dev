import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import type { CategoryBlogItem, CategoryTree } from "../types/tree";

export const getCategoryTree = () => {
  const tree: CategoryTree = [];
  const blogs = getAllBlogs();
  const categoryMap = new Map<string, CategoryTree>();

  for (const blog of blogs) {
    const categories = blog.categories;
    const blogItem: CategoryBlogItem = {
      name: blog.title,
      ref: ((blog.type === "InternalBlog" && blog.slug) ||
        (blog.type === "ExternalBlog" && blog.url)) as string,
    };

    if (categories.length === 0) {
      // カテゴリーがない場合は、「カテゴリなし」カテゴリーに追加
      const uncategorizedName = "No Category";
      let uncategorizedNode = tree.find(
        (item): item is CategoryTree =>
          Array.isArray(item) &&
          !!item[0] &&
          (item[0] as CategoryBlogItem).name === uncategorizedName,
      );

      if (!uncategorizedNode) {
        uncategorizedNode = [{ name: uncategorizedName, ref: "" }];
        tree.push(uncategorizedNode);
        categoryMap.set(uncategorizedName, uncategorizedNode);
      }

      if (
        !uncategorizedNode.some(
          (item) => !Array.isArray(item) && item.name === blog.title,
        )
      ) {
        uncategorizedNode.push(blogItem);
      }
    } else {
      let currentLevel = tree;

      categories.forEach((category, index) => {
        // 現在のレベルで該当するカテゴリを探す
        let categoryNode = currentLevel.find(
          (item): item is CategoryTree =>
            Array.isArray(item) &&
            !!item[0] &&
            (item[0] as CategoryBlogItem).name === category,
        );

        if (!categoryNode) {
          categoryNode = [
            { name: category, ref: categories.slice(0, index + 1).join("/") },
          ];
          currentLevel.push(categoryNode);
          categoryMap.set(category, categoryNode);
        }

        if (index === categories.length - 1) {
          // 最後のカテゴリーの場合、ブログを追加
          if (
            !categoryNode.some(
              (item) => !Array.isArray(item) && item.name === blog.title,
            )
          ) {
            categoryNode.push(blogItem);
          }
        } else {
          currentLevel = categoryNode;
        }
      });
    }
  }

  return tree;
};
