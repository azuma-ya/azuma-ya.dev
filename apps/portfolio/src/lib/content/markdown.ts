import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { hmr } from "./hmr";

export { hmr };

const contentRoot = path.join(process.cwd(), "public/content");

type ContentDirectory = "blog" | "book" | "work";

export type MarkdownContent = {
  content: string;
  sourceFilePath: string;
  sourceFileName: string;
  sourceFileDir: string;
  slug: string;
  categories: string[];
  slugParts: string[];
} & Record<string, unknown>;

const toPosixPath = (value: string) => value.split(path.sep).join("/");

const stripMarkdownExtension = (value: string) => value.replace(/\.md$/, "");

const toDateString = (date: Date) =>
  `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;

const normalizeFrontmatter = (value: unknown): unknown => {
  if (value instanceof Date) {
    return toDateString(value);
  }

  if (Array.isArray(value)) {
    return value.map(normalizeFrontmatter);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, childValue]) => [
        key,
        normalizeFrontmatter(childValue),
      ]),
    );
  }

  return value;
};

const readMarkdownFilePaths = (directory: string): string[] => {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return readMarkdownFilePaths(entryPath);
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      return [entryPath];
    }

    return [];
  });
};

const getSourceFileDir = (
  directory: ContentDirectory,
  relativePath: string,
) => {
  const relativeDirectory = toPosixPath(path.dirname(relativePath));

  if (relativeDirectory === ".") {
    return directory;
  }

  return `${directory}/${relativeDirectory}`;
};

const getCategories = (sourceFileDir: string) =>
  sourceFileDir
    .split("/")
    .slice(1)
    .filter((dir) => !dir.match(/^\(.*\)$/));

export const getMarkdownContents = (
  directory: ContentDirectory,
): MarkdownContent[] => {
  const directoryPath = path.join(contentRoot, directory);
  const filePaths = readMarkdownFilePaths(directoryPath).sort();

  return filePaths.map((filePath) => {
    const file = readFileSync(filePath, "utf8");
    const { content, data: rawData } = matter(file);
    const data = normalizeFrontmatter(rawData) as Record<string, unknown>;
    const relativePath = toPosixPath(path.relative(directoryPath, filePath));
    const sourceFileName = path.basename(filePath);
    const sourceFileDir = getSourceFileDir(directory, relativePath);
    const slug = stripMarkdownExtension(sourceFileName);

    return {
      ...data,
      content,
      sourceFilePath: `${directory}/${relativePath}`,
      sourceFileName,
      sourceFileDir,
      slug,
      categories: getCategories(sourceFileDir),
      slugParts: slug.split("."),
    };
  });
};

export const getMarkdownContent = (relativePath: string) => {
  const fullPath = path.join(contentRoot, relativePath);
  const file = readFileSync(fullPath, "utf8");

  return matter(file).content;
};
