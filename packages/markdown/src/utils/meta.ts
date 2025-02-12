import { JSDOM } from "jsdom";

export type Meta = {
  url: string;
  title: string;
  description: string;
  image: string;
};

export const getMetaData = async (url: string): Promise<Meta> => {
  const metaData = {
    url,
    title: "",
    description: "",
    image: "",
  };
  try {
    const res = await fetch(url);
    const text = await res.text();
    const doms = new JSDOM(text);
    const metas = doms.window.document.getElementsByTagName("meta");

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

export const getUrlList = (content: string): Array<string> => {
  return content.match(/https?:\/\/[^\n\]]*/g) ?? [];
};
