import type { Root } from "hast";
import { visit } from "unist-util-visit";

export const rehypeHeadingLevel = () => {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName.match(/^h[1-6]$/)) {
        const currentLevel = Number.parseInt(node.tagName[1] || "6");
        const newLevel = Math.min(currentLevel + 1, 6);
        node.tagName = `h${newLevel}`;
      }
    });
  };
};
