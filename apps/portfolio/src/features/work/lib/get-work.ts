import { getMarkdownContents } from "@/lib/content/markdown";
import { type Work, workSchema } from "../types/work";

export const getWork = (slug: string): Work | undefined => {
  const work = getMarkdownContents("work").find((work) => work.slug === slug);

  if (!work) return undefined;

  return workSchema.parse(work);
};
