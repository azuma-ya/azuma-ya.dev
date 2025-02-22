import type { Blog, InternalBlog } from "../types/blog";

export const toGroupSortByYear = (blogs: Blog[]): [string, Blog[]][] => {
  const groupedBlogs = blogs.reduce(
    (acc, blog) => {
      const year = blog.createdAt.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, Blog[]>,
  );

  return Object.entries(groupedBlogs)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(
      ([year, blogs]) =>
        [
          year,
          blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        ] as const,
    );
};

export const filterInternalBlogs = (blogs: Blog[]): InternalBlog[] =>
  blogs.filter((blog): blog is InternalBlog => blog.type === "InternalBlog");
