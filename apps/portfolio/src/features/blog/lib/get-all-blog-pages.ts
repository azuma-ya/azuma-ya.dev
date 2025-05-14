import {
  allBlogSubPages,
  allExternalBlogs,
  allInternalBlogs,
} from "contentlayer/generated";

import { type Blog, blogSchema } from "../types/blog";

export const getAllBlogPages = (): Blog[] => {
  const blogs = [...allInternalBlogs, ...allExternalBlogs, ...allBlogSubPages];

  const parsedBlogs = blogs.map((blog) =>
    blogSchema.parse({ ...blog, content: blog.body.raw }),
  );

  return parsedBlogs;
};
