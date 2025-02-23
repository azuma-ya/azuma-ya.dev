import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { OgpImage } from "@/components/base/ogp-image";
import { getAllBooks } from "@/features/book/lib/get-all-books";
import { getBook } from "@/features/book/lib/get-book";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const books = await getAllBooks();

  if (books.length === 0) {
    return notFound();
  }

  return books.map((book) => ({
    slug: book.slug,
  }));
};

export default async function Image({ params }: Props) {
  const { slug } = await params;

  const book = await getBook(slug);

  if (!book) {
    return notFound();
  }

  const logoData = await readFile(
    join(process.cwd(), "public/asset/ogp/template.png"),
  );
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    <OgpImage src={logoSrc} size={size} title={book.title} />,
    {
      ...size,
    },
  );
}
