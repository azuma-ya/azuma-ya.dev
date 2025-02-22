import Link from "next/link";

import { Badge } from "@repo/ui/components/data-display/badge";

interface Props {
  tags: string[];
}

export const BadgeList = ({ tags }: Props) => {
  return (
    <ul className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/tags/${tag}`}>
            <Badge size="sm">{tag}</Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
};
