import { getMetaData } from "@repo/markdown/utils/meta";
import { getMarkdownContents } from "@/lib/content/markdown";
import { type Book, bookSchema } from "../types/book";

export const getAllBooks = async (): Promise<Book[]> => {
  const books = getMarkdownContents("book");
  const parsedBooks = books.map((book) => bookSchema.parse(book));

  const booksWithImages = await Promise.all(
    parsedBooks.map(async (book) => {
      const image = (await getMetaData(book.url)).image;

      return { ...book, image };
    }),
  );

  return booksWithImages;
};
