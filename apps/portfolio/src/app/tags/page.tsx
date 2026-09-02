import { BadgeList } from "@/components/data-display/badge-list";
import { BaseLayout } from "@/components/layout/base-layout";
import { getInfo } from "@/features/profile/lib/get-info";
import { getTags } from "@/features/tag/lib/get-tags";
import { getCanonicalUrl } from "@/lib/seo";

export const generateMetadata = () => {
  const info = getInfo();
  const canonicalUrl = getCanonicalUrl("/tags");

  return {
    title: `Tags | ${info.portfolio.title}`,
    description: `${info.portfolio.title}のタグ一覧ページ。`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Tags | ${info.portfolio.title}`,
      description: `${info.portfolio.title}のタグ一覧ページ。`,
      url: canonicalUrl,
    },
  };
};

const TagListPage = () => {
  const tags = getTags();

  return (
    <BaseLayout title="Tags">
      <p className="text-muted-foreground mb-8">
        these tags are used in my blogs
      </p>
      <BadgeList tags={tags} isLink />
    </BaseLayout>
  );
};

export default TagListPage;
