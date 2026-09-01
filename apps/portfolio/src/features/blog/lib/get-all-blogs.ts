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

  return parsedBlogs as (InternalBlog | ExternalBlog)[];
};
