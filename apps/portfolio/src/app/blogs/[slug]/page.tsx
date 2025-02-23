import { notFound } from "next/navigation";

import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/data-display/separator";
import { BackButton } from "@repo/ui/components/input/back-button";
import { Container } from "@repo/ui/components/layout/container";

import { BadgeList } from "@/components/data-display/badge-list";
import { Toc } from "@/components/data-display/toc";
import { BlogHeader } from "@/features/blog/components/blog-header";
import { FooterNav } from "@/features/blog/components/footer-nav";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getBlog } from "@/features/blog/lib/get-blog";
import { filterInternalBlogs } from "@/features/blog/lib/utils";
import type { InternalBlog } from "@/features/blog/types/blog";
import { getInfo } from "@/features/profile/lib/get-info";
import { getMetas } from "@/lib/meta";

interface Props {
  params: Promise<{
    slug: string;
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
    title: `${blog.title} | ${info.portfolio.title}`,
    description: blog.description,
    openGraph: {
      title: `${blog.title} | ${info.portfolio.title}`,
      description: blog.description,
    },
  };
};

export const generateStaticParams = async () => {
  const blogs = getAllBlogs();
  const internalBlogs = filterInternalBlogs(blogs);

  if (internalBlogs.length === 0) {
    return notFound();
  }

  return internalBlogs.map((blog) => ({
    slug: blog.slug,
  }));
};

const BlogDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = getBlog<InternalBlog>(slug);

  if (!blog) {
    return notFound();
  }

  const metas = await getMetas(blog.content);
  const blogs = getAllBlogs();
  const internalBlogs = filterInternalBlogs(blogs);

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
          <BlogHeader blog={blog} />
          <BadgeList tags={blog.tags} isLink />
          <Markdown metas={metas}>{blog.content}</Markdown>
          <Separator />
          <FooterNav prev={prev} next={next} />
        </article>
      </div>
    </Container>
  );
};

export default BlogDetailPage;
