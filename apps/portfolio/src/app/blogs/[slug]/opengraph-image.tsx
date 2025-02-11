import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { OgpImage } from "@/components/base/ogp-image";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { getBlog } from "@/features/blog/lib/get-blog";
import type { InternalBlog } from "@/features/blog/types/blog";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
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

export default async function Image({ params }: Props) {
  const { slug } = await params;

  const blog = getBlog<InternalBlog>(slug);

  if (!blog) {
    return notFound();
  }

  const logoData = await readFile(
    join(process.cwd(), "public/asset/ogp/template.png"),
  );
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    <OgpImage src={logoSrc} size={size} title={blog.title} />,
    {
      ...size,
    },
  );
}
