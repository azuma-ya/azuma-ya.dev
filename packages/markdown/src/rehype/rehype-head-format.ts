import { visit } from "unist-util-visit";

import type { Root } from "hast";
import type { Plugin } from "unified";

export const rehypeHeadFormat: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
      const level = Number.parseInt(node.tagName[1] || "6");
      const prefix = "#".repeat(level);

      // 先頭に#を追加
      node.children.unshift({
        type: "text",
        value: `${prefix} `,
      });
    }
  });
};
