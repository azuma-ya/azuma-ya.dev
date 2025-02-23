import Link from "next/link";

import { BaseLayout } from "@/components/layout/base-layout";
import { BookItem } from "@/features/book/components/book-item";
import { getAllBooks } from "@/features/book/lib/get-all-books";
import { getInfo } from "@/features/profile/lib/get-info";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `Library | ${info.portfolio.title}`,
    description: `${info.portfolio.title}の本一覧ページです。`,
    openGraph: {
      title: `Library | ${info.portfolio.title}`,
      description: `${info.portfolio.title}の本一覧ページです。`,
    },
  };
};

const LibraryPage = async () => {
  const books = await getAllBooks();

  const sortedBooks = books.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  return (
    <BaseLayout title="Library">
      <ul className="grid grid-cols-2 gap-6 place-items-center items-start my-8 sm:grid-cols-3 md:grid-cols-4">
        {sortedBooks.map((book, index) => (
          <li
            key={book.slug}
            className="relative animate-fade-in opacity-0"
            style={{
              animationDelay: `${index * 0.05}s`,
              animationFillMode: "forwards",
            }}
          >
            <BookItem data={book} />
            <Link href={`/library/${book.slug}`} className="absolute inset-0" />
          </li>
        ))}
      </ul>
    </BaseLayout>
  );
};

export default LibraryPage;
