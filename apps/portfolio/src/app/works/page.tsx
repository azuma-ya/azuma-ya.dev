import { BaseLayout } from "@/components/layout/base-layout";
import { YearSection } from "@/features/blog/components/year-section";
import { getInfo } from "@/features/profile/lib/get-info";
import { WorkItem } from "@/features/work/components/work-item";
import { getAllWorks } from "@/features/work/lib/get-all-works";
import { getWorkThumbnailSrc } from "@/features/work/lib/thumbnail";
import { getKey, toGroupSortByYear } from "@/features/work/lib/utils";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `Works | ${info.portfolio.title}`,
    description: `${info.portfolio.title}の制作物一覧ページです。`,
    openGraph: {
      title: `Works | ${info.portfolio.title}`,
      description: `${info.portfolio.title}の制作物一覧ページです。`,
    },
  };
};

const WorkListPage = () => {
  const works = getAllWorks();

  const pinnedWorks = works.filter((work) => work.isPinned);
  const unpinnedWorks = works.filter((work) => !work.isPinned);
  const sortedGroupedWorks = toGroupSortByYear(unpinnedWorks);

  return (
    <BaseLayout title="Works">
      <p className="text-muted-foreground mb-8">things I've built</p>
      <div className="hidden last:flex items-center justify-center h-[calc(100vh-16rem)]">
        No works yet..
      </div>
      {pinnedWorks.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-blue-500">Pinned</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {pinnedWorks.map((work) => (
              <li key={getKey(work)}>
                <WorkItem
                  data={work}
                  thumbnailSrc={getWorkThumbnailSrc(work.slug, work.url)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      {sortedGroupedWorks.map(([year, works], index) => (
        <YearSection key={year} index={index} year={year}>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {works.map((work) => (
              <li key={getKey(work)}>
                <WorkItem
                  data={work}
                  thumbnailSrc={getWorkThumbnailSrc(work.slug, work.url)}
                />
              </li>
            ))}
          </ul>
        </YearSection>
      ))}
    </BaseLayout>
  );
};

export default WorkListPage;
