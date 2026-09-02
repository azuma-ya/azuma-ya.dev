import type { MetadataRoute } from "next";
import { getAllBlogPages } from "@/features/blog/lib/get-all-blog-pages";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import {
  filterBlogSubPages,
  filterInternalBlogs,
} from "@/features/blog/lib/utils";
import { getAllBooks } from "@/features/book/lib/get-all-books";
import { getTags } from "@/features/tag/lib/get-tags";
import { getAllWorks } from "@/features/work/lib/get-all-works";
import { getCanonicalUrl, getPathname } from "@/lib/seo";

const staticPathnames = [
  "/",
  "/blogs",
  "/categories",
  "/tags",
  "/works",
  "/timeline",
  "/library",
];

export const dynamic = "force-static";

const toSitemapDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = filterInternalBlogs(getAllBlogs());
  const blogSubPages = filterBlogSubPages(getAllBlogPages());
  const tags = getTags();
  const works = getAllWorks();
  const books = await getAllBooks();

  return [
    ...staticPathnames.map((pathname) => ({
      url: getCanonicalUrl(pathname),
    })),
    ...blogs.map((blog) => ({
      url: getCanonicalUrl(getPathname("blogs", blog.slug)),
      lastModified: toSitemapDate(blog.updatedAt ?? blog.createdAt),
    })),
    ...blogSubPages.map((blog) => ({
      url: getCanonicalUrl(getPathname("blogs", ...blog.slugParts)),
    })),
    ...tags.map((tag) => ({
      url: getCanonicalUrl(getPathname("tags", tag)),
    })),
    ...works.map((work) => ({
      url: getCanonicalUrl(getPathname("works", work.slug)),
      lastModified: toSitemapDate(work.updatedAt ?? work.createdAt),
    })),
    ...books.map((book) => ({
      url: getCanonicalUrl(getPathname("library", book.slug)),
      lastModified: toSitemapDate(book.updatedAt ?? book.createdAt),
    })),
  ];
}
