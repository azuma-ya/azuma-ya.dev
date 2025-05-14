import { allExternalBlogs, allInternalBlogs } from "contentlayer/generated";

import {
  type ExternalBlog,
  type InternalBlog,
  blogSchema,
} from "../types/blog";

export const getAllBlogs = (): (InternalBlog | ExternalBlog)[] => {
  const blogs = [...allInternalBlogs, ...allExternalBlogs];

  const parsedBlogs = blogs.map((blog) =>
    blogSchema.parse({ ...blog, content: blog.body.raw }),
  );

  return parsedBlogs as (InternalBlog | ExternalBlog)[];
};
