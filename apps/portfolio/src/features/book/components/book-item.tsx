import { Bookmark } from "lucide-react";
import type { Book } from "../types/book";
import { BookImage } from "./book-image";

interface Props {
  data: Book;
}

export const BookItem = ({ data }: Props) => {
  return (
    <div className="space-y-4 w-36 relative">
      <BookImage data={data} />
      <hgroup className="space-y-1">
        <h2 className="text-sm font-bold">{data.title}</h2>
        <p className="text-xs">{data.author}</p>
      </hgroup>
      {data.isPinned && (
        <Bookmark
          className="absolute -top-1 left-2"
          strokeWidth={0}
          fill="oklch(62.3% 0.214 259.815)"
        />
      )}
    </div>
  );
};
