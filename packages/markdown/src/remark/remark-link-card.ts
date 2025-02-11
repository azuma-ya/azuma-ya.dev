import { h } from "hastscript";
import { visit } from "unist-util-visit";

import type { Link, LinkData, Node, Parent, PhrasingContent } from "mdast";
import {
  createRehypeHandlers,
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from "../utils/helper";

const isNode = (node: unknown): node is Node => {
  if (node === null || typeof node !== "object") {
    return false;
  }

  return "type" in node;
};

const isParent = (node: unknown): node is Parent => {
  return isNode(node) && Array.isArray((node as Parent).children);
};

export interface LinkCard extends Omit<Link, "type"> {
  type: "linkCard";
  children: PhrasingContent[];
  data?: LinkData | undefined;
}

declare module "mdast" {
  interface BlockContentMap {
    linkCard: LinkCard;
  }
  interface RootContentMap {
    linkCard: LinkCard;
  }
}

const plugin = createRemarkPlugin(() => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (index === undefined) return;
      if (!isNode(node) || !isParent(parent)) return;
      if (["footnoteDefinition", "listItem"].includes(parent.type)) return;
      if (node.type !== "paragraph") return;
      if (node.children.length !== 1) return;

      const child = node.children[0];

      if (child?.type !== "link") return;

      if (child.children[0]?.type !== "text") return;

      if (!child.children[0]?.value.match(/https?:\/\/\S+\.\S+/)) return;

      const newNode: LinkCard = {
        ...child,
        type: "linkCard",
      };

      parent.children.splice(index, 1, newNode);
    });
  };
});

const handlers = createRehypeHandlers({
  linkCard: (state, node: LinkCard) => {
    const hastElement = h(
      "link-card",
      {
        href: node.url,
      },
      state.all(node),
    );
    return hastElement;
  },
});

export const remarkLinkCard = createRemarkRehypePlugin(plugin, handlers);
