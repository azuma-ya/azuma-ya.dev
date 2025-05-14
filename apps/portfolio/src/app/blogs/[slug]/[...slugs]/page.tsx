import { notFound } from "next/navigation";

import { Toc } from "@/components/data-display/toc";
import { FooterNav } from "@/features/blog/components/footer-nav";
import { getAllBlogPages } from "@/features/blog/lib/get-all-blog-pages";
import { getBlog } from "@/features/blog/lib/get-blog";
import {
  filterBlogSubPages,
  filterInternalBlogs,
} from "@/features/blog/lib/utils";
import type { InternalBlog } from "@/features/blog/types/blog";
import { getInfo } from "@/features/profile/lib/get-info";
import { getMetas } from "@/lib/meta";
import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/data-display/separator";
import { BackButton } from "@repo/ui/components/input/back-button";
import { Container } from "@repo/ui/components/layout/container";

interface Props {
  params: Promise<{
    slug: string;
    slugs: string[];
  }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = getBlog<InternalBlog>(slug);

  if (!blog) {
    return notFound();
  }

  const info = getInfo();

  return {
    title: `${blog.title} | SubPage | ${info.portfolio.title}`,
    description: blog.description,
    openGraph: {
      title: `${blog.title} | SubPage | ${info.portfolio.title}`,
      description: blog.description,
    },
  };
};

export const generateStaticParams = async () => {
  const blogs = getAllBlogPages();
  const subPages = filterBlogSubPages(blogs);

  if (subPages.length === 0) {
    return notFound();
  }

  return subPages.map((blog) => ({
    slug: blog.slugParts[0],
    slugs: blog.slugParts.slice(1),
  }));
};

export default async function BlogSubPage({ params }: Props) {
  const { slug, slugs } = await params;

  const blogs = getAllBlogPages();
  const internalBlogs = filterInternalBlogs(blogs);
  const subPages = filterBlogSubPages(blogs);
  const blog = subPages.find(
    (blog) => blog.slugParts.join("/") === `${slug}/${slugs.join("/")}`,
  );

  if (!blog) {
    return notFound();
  }

  const metas = await getMetas(blog.content);

  const sortedBlogs = internalBlogs.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const index = sortedBlogs.findIndex((blog) => blog.slug === slug);
  const prev = sortedBlogs[index + 1];
  const next = sortedBlogs[index - 1];

  return (
    <Container maxWidth="xl" className="space-y-2 md:my-16 my-4">
      <div className="flex items-start gap-5">
        <aside className="basis-1/5 shrink-0 sticky top-(--header-height) hidden md:block space-y-4">
          <BackButton variant="ghost" />
          <Toc className="overflow-y-auto max-h-[calc(100vh-16rem)] hidden-scrollbar" />
        </aside>
        <article className="space-y-4 min-w-0 w-full">
          <Markdown metas={metas}>{blog.content}</Markdown>
          <Separator />
          <FooterNav prev={prev} next={next} />
        </article>
      </div>
    </Container>
  );
}
