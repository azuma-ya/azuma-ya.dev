import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getInfo } from "@/features/profile/lib/get-info";
import { Feed } from "feed";

export const generateFeed = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const info = getInfo();
  const blogs = getAllBlogs();

  const feed = new Feed({
    id: info.portfolio.url,
    title: info.portfolio.title,
    copyright: `All right reserved ${new Date().getFullYear()}, ${info.name}`,
    language: "ja",
    description: info.portfolio.description,
    link: url,
    favicon: new URL("/favicon.ico", url).toString(),
  });

  for (const blog of blogs) {
    const blogUrl =
      blog.type === "InternalBlog"
        ? new URL(`/blogs/${blog.slug}`, url).toString()
        : blog.url;
    feed.addItem({
      title: blog.title,
      id: blogUrl,
      link: blogUrl,
      ...(blog.type === "InternalBlog" && { description: blog.description }),
      date: blog.updatedAt ?? blog.createdAt,
      ...(blog.type === "InternalBlog" && {
        image: {
          url: new URL(`/blogs/${blog.slug}/opengraph-image`, url).toString(),
          type: "image/png",
        },
      }),
    });
  }

  return feed.rss2();
};
