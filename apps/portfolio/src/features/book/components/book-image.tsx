import { ArrowUpRight } from "lucide-react";

import { AspectRatio } from "@repo/ui/components/layout/aspect-ratio";

import type { Book } from "../types/book";

interface Props {
  data: Book;
}

export const BookImage = ({ data }: Props) => {
  return (
    <AspectRatio
      ratio={5 / 7}
      className="bg-muted rounded-sm flex items-center justify-center overflow-hidden shadow-[-6px_6px_10px_0px_rgba(0,_0,_0,_0.1)] relative after:content-[''] after:absolute after:inset-0 after:shadow-[inset_2px_-6px_10px_0px_rgba(0,_0,_0,_0.2)] dark:after:shadow-[inset_2px_-6px_10px_0px_rgba(0,_0,_0,_0.8)] after:pointer-events-none"
    >
      <img
        src={data.image}
        alt={data.title}
        className="object-cover size-full"
      />
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0 bg-black/60 z-10"
      >
        <ArrowUpRight className="text-white size-4 mx-2" />
      </a>
    </AspectRatio>
  );
};
