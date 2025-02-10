import { format } from "date-fns";
import { notFound } from "next/navigation";

import { Markdown } from "@repo/markdown/components/markdown";
import { Badge } from "@repo/ui/components/data-display/badge";
import { BackButton } from "@repo/ui/components/input/back-button";
import { Container } from "@repo/ui/components/layout/container";

import { Toc } from "@/components/data-display/toc";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getBlog } from "@/features/blog/lib/get-blog";
import type { InternalBlog } from "@/features/blog/types/blog";
import { getProfile } from "@/features/profile/lib/get-profile";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = () => {
  const posts = getAllBlogs();

  const internalPosts = posts.filter(
    (post): post is InternalBlog => post.type === "InternalBlog",
  );

  if (internalPosts.length === 0) {
    return notFound();
  }

  return internalPosts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = getBlog<InternalBlog>(slug);

  if (!blog) {
    return notFound();
  }

  const profile = getProfile();

  return {
    title: `${blog.title} | ${profile.name}'s Portfolio`,
    description: blog.description,
  };
};

const BlogDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const post = getBlog<InternalBlog>(slug);

  if (!post) {
    return notFound();
  }

  return (
    <Container maxWidth="xl" className="space-y-2 md:my-16 my-4">
      <div className="flex items-start gap-5">
        <div className="basis-1/5 shrink-0 sticky top-(--header-height) hidden md:block space-y-4">
          <BackButton variant="ghost" />
          <Toc className="overflow-y-auto max-h-[calc(100vh-16rem)] hidden-scrollbar" />
        </div>
        <article className="space-y-4 min-w-0">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <time className="text-foreground/50">
              {format(post.createdAt, "yyyy/MM/dd")}
            </time>
          </div>
          <ul className="flex gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge size="sm">{tag}</Badge>
              </li>
            ))}
          </ul>
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </Container>
  );
};

export default BlogDetailPage;
