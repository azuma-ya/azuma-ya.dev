import type { Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const rehypeHeadFormat: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
      const level = Number.parseInt(node.tagName[1] || "6", 10) - 1 || 1;
      const prefix = "#".repeat(level);

      // 先頭にspanタグで囲った#を追加
      node.children.unshift({
        type: "element",
        tagName: "span",
        properties: { class: "header-prefix" },
        children: [
          {
            type: "text",
            value: `${prefix} `,
          },
        ],
      });
    }
  });
};
