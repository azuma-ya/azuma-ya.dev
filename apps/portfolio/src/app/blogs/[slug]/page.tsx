import { HeaderSpacing } from "@/components/base/header";
import Markdown from "@/components/data-display/markdown";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getBlog } from "@/features/blog/lib/get-blog";
import type { InternalBlog } from "@/features/blog/types/blog";
import { Container } from "@repo/ui/components/layout/container";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = () => {
  const posts = getAllBlogs();

  return posts
    .filter((post): post is InternalBlog => post.type === "InternalBlog")
    .map((post) => ({
      slug: post.slug,
    }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = getBlog<InternalBlog>(slug);

  if (!blog) {
    return notFound();
  }

  return {
    title: blog.title,
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
    <Container maxWidth="sm" className="space-y-2">
      <HeaderSpacing />
      <article className="">
        <h1>{post.title}</h1>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600">{post.description}</p>
        <time className="text-gray-500">
          {format(post.createdAt, "yyyy-MM-dd")}
        </time>
        <Markdown>{post.content}</Markdown>
      </article>
    </Container>
  );
};

export default BlogDetailPage;
