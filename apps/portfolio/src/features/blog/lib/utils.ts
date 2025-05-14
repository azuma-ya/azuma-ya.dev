import type {
  Blog,
  BlogSubPage,
  ExternalBlog,
  InternalBlog,
} from "../types/blog";

export const toGroupSortByYear = <T extends InternalBlog | ExternalBlog>(
  blogs: T[],
): [string, T[]][] => {
  const groupedBlogs = blogs.reduce(
    (acc, blog) => {
      const year = blog.createdAt.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, T[]>,
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

export const filterBlogSubPages = (blogs: Blog[]): BlogSubPage[] =>
  blogs.filter((blog): blog is BlogSubPage => blog.type === "BlogSubPage");

export const getKey = (blog: Blog) => {
  if ("slugParts" in blog) {
    return blog.slugParts.join("/");
  }

  if ("url" in blog) {
    return blog.url;
  }

  return blog.slug;
};
