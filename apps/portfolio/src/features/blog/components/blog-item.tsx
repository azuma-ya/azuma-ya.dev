import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/input/button";

import type { Blog } from "../types/blog";

interface Props {
  data: Blog;
}

export const BlogItem = ({ data }: Props) => {
  return (
    <Button
      variant="ghost"
      className="w-full h-fit py-1 justify-start text-base font-normal text-wrap whitespace-normal group"
      asChild
    >
      {data.type === "InternalBlog" ? (
        <Link href={`/blogs/${data.slug}`}>{data.title}</Link>
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
