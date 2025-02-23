import Link from "next/link";

import { Badge } from "@repo/ui/components/data-display/badge";

interface Props {
  tags: string[];
  isLink?: boolean;
}

export const BadgeList = ({ tags, isLink = false }: Props) => {
  return (
    <ul className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <li key={tag}>
          {isLink ? (
            <Link href={`/tags/${tag}`}>
              <Badge size="sm">{tag}</Badge>
            </Link>
          ) : (
            <Badge size="sm">{tag}</Badge>
          )}
        </li>
      ))}
    </ul>
  );
};
