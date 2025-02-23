import type { Book } from "../types/book";
import { BookImage } from "./book-image";

interface Props {
  data: Book;
}

export const BookItem = ({ data }: Props) => {
  return (
    <div className="space-y-4 w-36">
      <BookImage data={data} />
      <hgroup className="space-y-1">
        <h2 className="text-sm font-bold">{data.title}</h2>
        <p className="text-xs">{data.author}</p>
      </hgroup>
    </div>
  );
};
