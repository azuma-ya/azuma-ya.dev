import fs from "node:fs";
import path from "node:path";

const THUMBNAIL_EXTENSIONS = ["webp", "png", "jpg"] as const;

type ThumbnailExtension = (typeof THUMBNAIL_EXTENSIONS)[number];

const getPublicAssetPath = (slug: string, extension: ThumbnailExtension) =>
  `/asset/work/${slug}/thumbnail.${extension}`;

const getFsAssetPath = (slug: string, extension: ThumbnailExtension) =>
  path.join(
    process.cwd(),
    "public",
    "asset",
    "work",
    slug,
    `thumbnail.${extension}`,
  );

export const getWorkThumbnailSrc = (
  slug: string,
  url: string,
): string | null => {
  for (const extension of THUMBNAIL_EXTENSIONS) {
    const fsPath = getFsAssetPath(slug, extension);
    if (fs.existsSync(fsPath)) {
      return getPublicAssetPath(slug, extension);
    }
  }

  void url;
  return null;
};
