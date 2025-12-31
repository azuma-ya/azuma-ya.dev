import { ArrowRight, Image as ImageIcon, Pin } from "lucide-react";
import Link from "next/link";

import { AspectRatio } from "@repo/ui/components/layout/aspect-ratio";

import type { Work } from "../types/work";

interface Props {
  data: Work;
  thumbnailSrc: string | null;
}

export const WorkItem = ({ data, thumbnailSrc }: Props) => {
  return (
    <Link
      href={`/works/${data.slug}`}
      className="group block overflow-hidden rounded-lg border bg-background"
    >
      <AspectRatio ratio={16 / 9} className="bg-muted">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={data.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <ImageIcon className="text-muted-foreground" />
          </div>
        )}
      </AspectRatio>
      <div className="p-3 space-y-1">
        <div className="flex items-start gap-2">
          <p className="font-medium leading-snug flex-1">{data.title}</p>
          {data.isPinned && <Pin className="mt-0.5 shrink-0 size-4" />}
        </div>
        <p className="text-sm text-muted-foreground">{data.description}</p>
        <ArrowRight className="ml-auto shrink-0 size-4" />
      </div>
    </Link>
  );
};
