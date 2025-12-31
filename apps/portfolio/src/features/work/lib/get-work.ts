import { allWorks } from "contentlayer/generated";

import { type Work, workSchema } from "../types/work";

export const getWork = (slug: string): Work | undefined => {
  const work = allWorks.find((work) => work.slug === slug);

  if (!work) return undefined;

  return workSchema.parse({ ...work, content: work.body.raw });
};
