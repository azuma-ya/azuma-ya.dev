import { allWorks } from "contentlayer/generated";

import { type Work, workSchema } from "../types/work";

export const getAllWorks = (): Work[] => {
  const parsedWorks = allWorks.map((work) =>
    workSchema.parse({ ...work, content: work.body.raw }),
  );

  return parsedWorks as Work[];
};
