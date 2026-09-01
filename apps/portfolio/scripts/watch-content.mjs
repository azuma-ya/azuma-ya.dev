import { existsSync, readdirSync, statSync, utimesSync, watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const contentDirectory = path.join(appRoot, "public/content");
const invalidationTarget = path.join(appRoot, "src/lib/content/markdown.ts");
const watchers = new Map();

let invalidateTimer;
let rescanTimer;

const isMarkdownFile = (fileName) => fileName.endsWith(".md");

const readDirectories = (directory) => {
  if (!existsSync(directory)) {
    return [];
  }

  const directories = [directory];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      directories.push(...readDirectories(path.join(directory, entry.name)));
    }
  }

  return directories;
};

const invalidateContent = () => {
  clearTimeout(invalidateTimer);
  invalidateTimer = setTimeout(() => {
    const now = new Date();
    utimesSync(invalidationTarget, now, now);
    console.log("[content] markdown changed, refreshed Next dev server");
  }, 50);
};

const syncWatchers = () => {
  const directories = new Set(readDirectories(contentDirectory));

  for (const [directory, watcher] of watchers) {
    if (!directories.has(directory)) {
      watcher.close();
      watchers.delete(directory);
    }
  }

  for (const directory of directories) {
    if (watchers.has(directory)) {
      continue;
    }

    const watcher = watch(directory, (eventType, fileNameBuffer) => {
      const fileName = fileNameBuffer?.toString();

      if (eventType === "rename") {
        clearTimeout(rescanTimer);
        rescanTimer = setTimeout(syncWatchers, 100);
      }

      if (!fileName || isMarkdownFile(fileName)) {
        invalidateContent();
        return;
      }

      const changedPath = path.join(directory, fileName);

      if (existsSync(changedPath) && statSync(changedPath).isDirectory()) {
        invalidateContent();
      }
    });

    watchers.set(directory, watcher);
  }
};

syncWatchers();
console.log(`[content] watching ${path.relative(appRoot, contentDirectory)}`);
