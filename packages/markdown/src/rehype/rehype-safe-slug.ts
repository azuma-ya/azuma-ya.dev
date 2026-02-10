import { visit } from "unist-util-visit";

import type { Root } from "hast";
import type { Plugin } from "unified";

/**
 * Ensures heading IDs are valid CSS selectors by prefixing
 * IDs that start with a digit with "h-".
 * CSS identifiers cannot start with a digit, so querySelector('#3-foo')
 * throws a SyntaxError even though the HTML id is valid.
 */
export const rehypeSafeSlug: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
      const id = node.properties.id;
      if (typeof id === "string" && /^\d/.test(id)) {
        node.properties.id = `h-${id}`;
      }
    }
  });
};
