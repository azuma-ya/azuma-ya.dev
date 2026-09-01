export type Meta = {
  url: string;
  title: string;
  description: string;
  image: string;
};

const metaCache = new Map<string, Promise<Meta>>();

const createEmptyMeta = (url: string): Meta => ({
  url,
  title: "",
  description: "",
  image: "",
});

const fetchWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const fetchMetaData = async (url: string): Promise<Meta> => {
  const metaData = {
    url,
    title: "",
    description: "",
    image: "",
  };
  try {
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      return metaData;
    }

    const text = await res.text();
    const { JSDOM } = await import("jsdom");
    const doms = JSDOM.fragment(text);
    const metas = doms.querySelectorAll("meta");

    for (const meta of metas) {
      const np = meta.getAttribute("name") || meta.getAttribute("property");
      if (typeof np !== "string") continue;
      if (np.match(/title/)) {
        metaData.title = meta.getAttribute("content") || "";
      }
      if (np.match(/description/)) {
        metaData.description =
          meta.getAttribute("content")?.slice(0, 100) || "";
      }
      if (np === "og:image") {
        metaData.image = meta.getAttribute("content") || "";
      }
    }
  } catch (_e) {
    console.error("Failed to get metadata");
  }
  return metaData;
};

export const getMetaData = async (url: string): Promise<Meta> => {
  const cachedMeta = metaCache.get(url);

  if (cachedMeta) {
    return cachedMeta;
  }

  const meta = fetchMetaData(url).catch(() => createEmptyMeta(url));
  metaCache.set(url, meta);

  return meta;
};

export const getUrlList = (content: string): Array<string> => {
  return content.match(/https?:\/\/[^\n\]]*/g) ?? [];
};
