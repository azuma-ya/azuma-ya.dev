import { format } from "date-fns";
import { notFound } from "next/navigation";

import { Markdown } from "@repo/markdown/components/markdown";
import { Badge } from "@repo/ui/components/data-display/badge";
import { BackButton } from "@repo/ui/components/input/back-button";
import { Container } from "@repo/ui/components/layout/container";

import { Toc } from "@/components/data-display/toc";
import { FooterNav } from "@/features/blog/components/footer-nav";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getBlog } from "@/features/blog/lib/get-blog";
import type { InternalBlog } from "@/features/blog/types/blog";
import { getInfo } from "@/features/profile/lib/get-info";
import { getMetas } from "@/lib/meta";
import { Separator } from "@repo/ui/components/data-display/separator";
import Link from "next/link";

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
    title: `${blog.title} | ${info.name}'s Portfolio`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
    },
  };
};

export const generateStaticParams = async () => {
  const blogs = getAllBlogs();

  const internalBlogs = blogs.filter(
    (blog): blog is InternalBlog => blog.type === "InternalBlog",
  );

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

  const internalBlogs = blogs.filter(
    (blog): blog is InternalBlog => blog.type === "InternalBlog",
  );

  const sortedBlogs = internalBlogs.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const index = sortedBlogs.findIndex((blog) => blog.slug === slug);

  const prev = sortedBlogs[index + 1];
  const next = sortedBlogs[index - 1];

  return (
    <Container maxWidth="xl" className="space-y-2 md:my-16 my-4">
      <div className="flex items-start gap-5">
        <div className="basis-1/5 shrink-0 sticky top-(--header-height) hidden md:block space-y-4">
          <BackButton variant="ghost" />
          <Toc className="overflow-y-auto max-h-[calc(100vh-16rem)] hidden-scrollbar" />
        </div>
        <article className="space-y-4 min-w-0 w-full">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <time className="text-foreground/50">
              {format(blog.createdAt, "yyyy/MM/dd")}
            </time>
          </div>
          <ul className="flex gap-2">
            {blog.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/tags/${tag}`}>
                  <Badge size="sm">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
          <Markdown metas={metas}>{blog.content}</Markdown>
          <Separator />
          <FooterNav prev={prev} next={next} />
        </article>
      </div>
    </Container>
  );
};

export default BlogDetailPage;
