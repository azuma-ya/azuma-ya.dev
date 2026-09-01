import { getMarkdownContents } from "@/lib/content/markdown";
import { type Blog, blogSchema } from "../types/blog";

export const getAllBlogPages = (): Blog[] => {
  const markdowns = getMarkdownContents("blog");
  const blogs = [
    ...markdowns.filter(
      (blog) => blog.type === "InternalBlog" || blog.type === "ExternalBlog",
    ),
    ...markdowns
      .filter((blog) => blog.slugParts.length > 1)
      .map((blog) => ({
        content: blog.content,
        slugParts: blog.slugParts,
        type: "BlogSubPage",
      })),
  ];

  const parsedBlogs = blogs.map((blog) => blogSchema.parse(blog));

  return parsedBlogs;
};
