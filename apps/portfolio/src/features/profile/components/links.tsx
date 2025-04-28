import { AtSign, Rss } from "lucide-react";

import { Github } from "@repo/ui/components/icon/github";
import { X } from "@repo/ui/components/icon/x";
import { Button } from "@repo/ui/components/input/button";

import type { Info } from "../types/info";

interface Props {
  data: Info;
}

export const Links = ({ data }: Props) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Button variant="ghost" size="icon" className="rounded-full size-10">
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/feed.xml`}
          target="_blank"
          tabIndex={-1}
          rel="noopener noreferrer"
        >
          <Rss className="size-6! " />
        </a>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full size-10">
        <a
          href={data.socials.github}
          target="_blank"
          tabIndex={-1}
          rel="noopener noreferrer"
        >
          <Github className="size-6!" />
        </a>
      </Button>
      {data.socials.x && (
        <Button variant="ghost" size="icon" className="rounded-full size-10">
          <a
            href={data.socials.x}
            target="_blank"
            tabIndex={-1}
            rel="noopener noreferrer"
          >
            <X className="size-6!" />
          </a>
        </Button>
      )}
      {data.socials.email && (
        <Button variant="ghost" size="icon" className="rounded-full size-10">
          <a
            href={`mailto:${data.socials.email}`}
            target="_blank"
            tabIndex={-1}
            rel="noopener noreferrer"
          >
            <AtSign className="size-6!" />
          </a>
        </Button>
      )}
    </div>
  );
};
