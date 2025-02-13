import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";

export const getTags = (): string[] => {
  const blogs = getAllBlogs();

  const blogsTags = blogs.flatMap((blog) => blog.tags);

  const uniqueTags = new Set(blogsTags);

  return Array.from(uniqueTags);
};
