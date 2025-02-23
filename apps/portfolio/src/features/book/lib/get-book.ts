import { getAllBooks } from "./get-all-books";

export const getBook = async (slug: string) => {
  const books = await getAllBooks();
  const book = books.find((book) => book.slug === slug);

  return book;
};
