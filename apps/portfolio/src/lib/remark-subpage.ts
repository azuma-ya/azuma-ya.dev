import {
  createRehypeHandlers,
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from "@repo/markdown/utils/helper";
import type { Link } from "mdast";
import { visit } from "unist-util-visit";
import { getCanonicalUrl } from "@/lib/seo";

const plugin = createRemarkPlugin(() => {
  return (tree) => {
    visit(tree, "link", (node: Link) => {
      if (node.url.match(/\..+\.md$/)) {
        const fullPath = node.url.replace(/\.md$/, "");
        node.url = getCanonicalUrl(`/blogs/${fullPath.replace(/\./g, "/")}`);
      }
    });
  };
});

const handlers = createRehypeHandlers({});

export const remarkSubpage = createRemarkRehypePlugin(plugin, handlers);
