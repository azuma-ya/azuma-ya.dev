import { getMarkdownContents } from "@/lib/content/markdown";
import { type Work, workSchema } from "../types/work";

export const getAllWorks = (): Work[] => {
  const parsedWorks = getMarkdownContents("work").map((work) =>
    workSchema.parse(work),
  );

  return parsedWorks as Work[];
};
