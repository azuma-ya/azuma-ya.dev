import { BaseLayout } from "@/components/layout/base-layout";
import { BlogItem } from "@/features/blog/components/blog-item";
import { YearSection } from "@/features/blog/components/year-section";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { toGroupSortByYear } from "@/features/blog/lib/utils";
import { getInfo } from "@/features/profile/lib/get-info";
import { getTags } from "@/features/tag/lib/get-tags";

interface Props {
  params: Promise<{
    tag: string;
  }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { tag } = await params;

  const info = getInfo();

  return {
    title: `${tag} | ${info.portfolio.title}`,
    description: `${tag}でタグ付けられた記事一覧です。`,
    openGraph: {
      title: `${tag} | ${info.portfolio.title}`,
      description: `${tag}でタグ付けられた記事一覧です。`,
    },
  };
};

export const generateStaticParams = async () => {
  const tags = getTags();

  return tags.map((tag) => ({ tag }));
};

const TagDetailPage = async ({ params }: Props) => {
  const { tag } = await params;

  const blogs = getAllBlogs();

  const filteredBlogs = blogs.filter((blog) => blog.tags.includes(tag));

  const sortedGroupedBlogs = toGroupSortByYear(filteredBlogs);

  return (
    <BaseLayout title={`Tagged with ${tag}`}>
      <div className="hidden last:flex items-center justify-center h-[calc(100vh-16rem)]">
        No blogs yet..
      </div>
      {sortedGroupedBlogs.map(([year, blogs], index) => (
        <YearSection key={year} index={index} year={year}>
          <ul className="space-y-1">
            {blogs.map((blog) => (
              <li
                key={
                  (("slug" in blog && blog.slug) ||
                    ("url" in blog && blog.url)) as string
                }
              >
                <BlogItem data={blog} />
              </li>
            ))}
          </ul>
        </YearSection>
      ))}
    </BaseLayout>
  );
};

export default TagDetailPage;
