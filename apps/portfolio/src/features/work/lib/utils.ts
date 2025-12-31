import type { Work } from "../types/work";

export const toGroupSortByYear = <T extends Work>(
  works: T[],
): [string, T[]][] => {
  const groupedWorks = works.reduce(
    (acc, work) => {
      const year = work.createdAt.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(work);
      return acc;
    },
    {} as Record<string, T[]>,
  );

  return Object.entries(groupedWorks)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(
      ([year, works]) =>
        [
          year,
          works.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        ] as const,
    );
};

export const getKey = (work: Work) => work.url;
