import { allInternalBlogs } from "contentlayer/generated";

import { type Blog, blogSchema } from "../types/blog";

export const getBlog = <T = Blog>(slug: string): T | undefined => {
  const blog = allInternalBlogs.find((blog) => blog.slug === slug);

  if (!blog) return undefined;

  const parsedBlog = blogSchema.parse({ ...blog, content: blog.body.raw });

  return parsedBlog as T;
};
