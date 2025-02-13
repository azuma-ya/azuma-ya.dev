import Link from "next/link";

import { Badge } from "@repo/ui/components/data-display/badge";

import { BaseLayout } from "@/components/layout/base-layout";
import { getInfo } from "@/features/profile/lib/get-info";
import { getTags } from "@/features/tag/lib/get-tags";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `Tags | ${info.portfolio.title}`,
    description: `${info.portfolio.title}のタグ一覧ページです。`,
    openGraph: {
      title: `Tags | ${info.portfolio.title}`,
      description: `${info.portfolio.title}のタグ一覧ページです。`,
    },
  };
};

const TagListPage = () => {
  const tags = getTags();

  return (
    <BaseLayout title="Tags">
      <ul className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>
              <Badge size="sm">{tag}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </BaseLayout>
  );
};

export default TagListPage;
