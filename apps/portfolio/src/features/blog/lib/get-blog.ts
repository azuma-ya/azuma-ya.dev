import { getMarkdownContents } from "@/lib/content/markdown";
import { type Blog, blogSchema } from "../types/blog";

export const getBlog = <T = Blog>(slug: string): T | undefined => {
  const blog = getMarkdownContents("blog").find(
    (blog) => blog.type === "InternalBlog" && blog.slug === slug,
  );

  if (!blog) return undefined;

  const parsedBlog = blogSchema.parse(blog);

  return parsedBlog as T;
};
