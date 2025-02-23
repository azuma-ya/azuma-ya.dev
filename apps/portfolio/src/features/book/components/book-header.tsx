import { format } from "date-fns";

import { SquareArrowOutUpRight } from "lucide-react";
import type { Book } from "../types/book";
import { BookImage } from "./book-image";

interface Props {
  data: Book;
}

export const BookHeader = ({ data }: Props) => {
  return (
    <header className="flex justify-start items-center gap-4 w-full">
      <div className="w-36">
        <BookImage data={data} />
      </div>
      <hgroup className="space-y-2 flex-1">
        <h1 className="text-2xl font-bold mt-1">{data.title}</h1>
        <h2 className="text-lg">{data.subtitle}</h2>
        <p className="text-sm">{data.author}</p>
        <time className="text-foreground/50 block">
          {format(data.createdAt, "yyyy/MM/dd")}
        </time>
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1"
        >
          <SquareArrowOutUpRight className="size-4" />
          {new URL(data.url).hostname}...
        </a>
      </hgroup>
    </header>
  );
};
