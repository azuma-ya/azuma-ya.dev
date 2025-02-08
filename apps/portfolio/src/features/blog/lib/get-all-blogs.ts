import { allExternalBlogs, allInternalBlogs } from "contentlayer/generated";

import { type Blog, blogSchema } from "../types/blog";

export const getAllBlogs = (): Blog[] => {
  const blogs = [...allInternalBlogs, ...allExternalBlogs];

  const parsedBlogs = blogs.map((blog) =>
    blogSchema.parse({ ...blog, content: blog.body.raw }),
  );

  return parsedBlogs;
};
