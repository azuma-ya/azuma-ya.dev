import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "public/content/profile");

export const getProfile = () => {
  const fullPath = path.join(postsDirectory, "introduce.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  return content;
};
