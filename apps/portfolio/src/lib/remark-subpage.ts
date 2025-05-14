import type { Link } from "mdast";
import { visit } from "unist-util-visit";

import {
  createRehypeHandlers,
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from "@repo/markdown/utils/helper";

const plugin = createRemarkPlugin(() => {
  return (tree) => {
    visit(tree, "link", (node: Link) => {
      if (node.url.match(/\..+\.md$/)) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
        const fullPath = node.url.replace(/\.md$/, "");
        node.url = `${baseUrl}/blogs/${fullPath.replace(/\./g, "/")}`;
      }
    });
  };
});

const handlers = createRehypeHandlers({});

export const remarkSubpage = createRemarkRehypePlugin(plugin, handlers);
