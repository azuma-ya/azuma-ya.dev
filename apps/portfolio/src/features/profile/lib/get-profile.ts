import { getMarkdownContent } from "@/lib/content/markdown";

export const getProfile = () => {
  return getMarkdownContent("profile/introduce.md");
};
