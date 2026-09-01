import { getMarkdownContents } from "@/lib/content/markdown";
import {
  blogSchema,
  type ExternalBlog,
  type InternalBlog,
} from "../types/blog";

export const getAllBlogs = (): (InternalBlog | ExternalBlog)[] => {
  const blogs = getMarkdownContents("blog").filter(
    (blog) => blog.type === "InternalBlog" || blog.type === "ExternalBlog",
  );

  const parsedBlogs = blogs.map((blog) => blogSchema.parse(blog));

  return parsedBlogs.filter((blog) => {
    // Only baseBlogSchema has hidden property. We check if hidden is true and filter them out.
    // To be safe, we can check if it exists or use property accessor.
    if ('hidden' in blog && blog.hidden) return false;
    return true;
  }) as (InternalBlog | ExternalBlog)[];
};
