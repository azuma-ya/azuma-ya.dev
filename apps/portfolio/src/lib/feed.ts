import { Feed } from "feed";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getInfo } from "@/features/profile/lib/get-info";
import { getCanonicalUrl, getPathname } from "@/lib/seo";

export const generateFeed = () => {
  const url = getCanonicalUrl("/");
  const info = getInfo();
  const blogs = getAllBlogs();

  const feed = new Feed({
    id: info.portfolio.url,
    title: info.portfolio.title,
    copyright: `All right reserved ${new Date().getFullYear()}, ${info.name}`,
    language: "ja",
    description: info.portfolio.description,
    link: url,
    favicon: getCanonicalUrl("/favicon.ico"),
  });

  for (const blog of blogs) {
    const blogUrl =
      blog.type === "InternalBlog"
        ? getCanonicalUrl(getPathname("blogs", blog.slug))
        : blog.url;
    feed.addItem({
      title: blog.title,
      id: blogUrl,
      link: blogUrl,
      ...(blog.type === "InternalBlog" && { description: blog.description }),
      date: blog.updatedAt ?? blog.createdAt,
      ...(blog.type === "InternalBlog" && {
        image: {
          url: getCanonicalUrl(
            getPathname("blogs", blog.slug, "opengraph-image"),
          ),
          type: "image/png",
        },
      }),
    });
  }

  return feed.rss2();
};
