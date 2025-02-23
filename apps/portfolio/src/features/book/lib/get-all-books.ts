import { allBooks } from "contentlayer/generated";

import { getMetaData } from "@repo/markdown/utils/meta";
import { type Book, bookSchema } from "../types/book";

export const getAllBooks = async (): Promise<Book[]> => {
  const books = allBooks;

  const parsedBooks = await Promise.all(
    books.map(async (book) => {
      const image = (await getMetaData(book.url)).image;

      return bookSchema.parseAsync({ ...book, content: book.body.raw, image });
    }),
  );

  return parsedBooks;
};
