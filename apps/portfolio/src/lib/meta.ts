import { getMetaData, getUrlList, type Meta } from "@repo/markdown/utils/meta";
import { shouldFetchRemoteMeta } from "./remote-meta";

const hasMeta = (meta: Meta) =>
  meta.title.length > 0 || meta.description.length > 0 || meta.image.length > 0;

export const getMetas = async (content: string) => {
  if (!shouldFetchRemoteMeta()) {
    return [];
  }

  const urls = Array.from(new Set(getUrlList(content)));
  const metas = await Promise.all(
    urls.map(async (url) => await getMetaData(url)),
  );
  const filteredMetas = metas.filter(hasMeta);

  return filteredMetas;
};
