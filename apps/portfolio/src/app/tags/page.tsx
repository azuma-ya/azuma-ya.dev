import { BadgeList } from "@/components/data-display/badge-list";
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
      <BadgeList tags={tags} isLink />
    </BaseLayout>
  );
};

export default TagListPage;
