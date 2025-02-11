import { getMetaData, getUrlList } from "@repo/markdown/utils/meta";

export const getMetas = async (content: string) => {
  const urls = getUrlList(content);
  const metas = await Promise.all(
    urls.map(async (url) => await getMetaData(url)),
  );
  const filteredMetas = metas.filter((m) => m !== undefined);

  return filteredMetas;
};
