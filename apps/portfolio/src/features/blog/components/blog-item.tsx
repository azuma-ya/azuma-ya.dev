import { ArrowUpRight, Pin } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/input/button";

import type { ExternalBlog, InternalBlog } from "../types/blog";

interface Props {
  data: InternalBlog | ExternalBlog;
}

export const BlogItem = ({ data }: Props) => {
  return (
    <Button
      variant="ghost"
      className="w-full h-fit py-1 justify-start text-base font-normal text-wrap whitespace-normal group"
      asChild
    >
      {data.type === "InternalBlog" ? (
        <Link href={`/blogs/${data.slug}`}>
          {data.title}
          {data.slug}
          {data.isPinned && <Pin className="ml-auto" />}
        </Link>
      ) : (
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="relative"
        >
          {data.title}
          <ArrowUpRight className="size-3! ml-auto " />
        </a>
      )}
    </Button>
  );
};
