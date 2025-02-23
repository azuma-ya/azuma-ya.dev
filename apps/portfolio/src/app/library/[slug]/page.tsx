import { notFound } from "next/navigation";

import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/data-display/separator";
import { BackButton } from "@repo/ui/components/input/back-button";
import { Container } from "@repo/ui/components/layout/container";

import { BadgeList } from "@/components/data-display/badge-list";
import { Toc } from "@/components/data-display/toc";
import { BookHeader } from "@/features/book/components/book-header";
import { FooterNav } from "@/features/book/components/footer-nav";
import { getAllBooks } from "@/features/book/lib/get-all-books";
import { getBook } from "@/features/book/lib/get-book";
import { getInfo } from "@/features/profile/lib/get-info";
import { getMetas } from "@/lib/meta";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const book = await getBook(slug);

  if (!book) {
    return notFound();
  }

  const info = getInfo();

  return {
    title: `${book.title} | ${info.portfolio.title}`,
    description: book.description,
    openGraph: {
      title: `${book.title} | ${info.portfolio.title}`,
      description: book.description,
    },
  };
};

export const generateStaticParams = async () => {
  const books = await getAllBooks();

  if (books.length === 0) {
    return notFound();
  }

  return books.map((book) => ({
    slug: book.slug,
  }));
};

const BookDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const book = await getBook(slug);

  if (!book) {
    return notFound();
  }

  const metas = await getMetas(book.content);
  const books = await getAllBooks();

  const sortedBooks = books.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const index = sortedBooks.findIndex((book) => book.slug === slug);
  const prev = sortedBooks[index + 1];
  const next = sortedBooks[index - 1];

  return (
    <Container maxWidth="xl" className="space-y-2 md:my-16 my-4">
      <div className="flex items-start gap-5">
        <aside className="basis-1/5 shrink-0 sticky top-(--header-height) hidden md:block space-y-4">
          <BackButton variant="ghost" />
          <Toc className="overflow-y-auto max-h-[calc(100vh-16rem)] hidden-scrollbar" />
        </aside>
        <article className="space-y-4 min-w-0 w-full">
          <BookHeader data={book} />
          <BadgeList tags={book.tags} />
          <Markdown metas={metas}>{book.content}</Markdown>
          <Separator />
          <FooterNav prev={prev} next={next} />
        </article>
      </div>
    </Container>
  );
};

export default BookDetailPage;
