import { h } from "hastscript";
import type { BlockContent, DefinitionContent, Paragraph, Parent } from "mdast";
import { visit } from "unist-util-visit";

import {
  createRehypeHandlers,
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from "../utils/helper";

export interface Callout extends Parent {
  type: "callout";
  children: Array<BlockContent | DefinitionContent>;
  title?: Paragraph;
  calloutType: "default" | "note" | "warning" | "error";
}

declare module "mdast" {
  interface BlockContentMap {
    callout: Callout;
  }
  interface RootContentMap {
    callout: Callout;
  }
}

const isParagraph = (
  node: BlockContent | DefinitionContent,
): node is Paragraph => node.type === "paragraph";

const plugin = createRemarkPlugin(() => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "callout") return;
      if (index === undefined) return;
      if (node.children.length === 0) return;
      if (!node.children[0]?.data) return;
      if (!isParagraph(node.children[0])) return;

      console.log(node);

      const callout: Callout = {
        type: "callout",
        title: node.children[0],
        calloutType:
          (node.attributes?.type as Callout["calloutType"]) || "default",
        children: [],
      };

      node.children.shift();

      for (const child of node.children) {
        callout.children.push(child);
      }

      parent?.children?.splice(index, 1, callout);
    });
  };
});

const handlers = createRehypeHandlers({
  callout: (state, node: Callout) => {
    const hastElement = h(
      "callout",
      {
        type: node.calloutType,
      },
      node.title && h("callout-title", state.all(node.title)),
      state.all(node),
    );
    return hastElement;
  },
});

export const remarkCallout = createRemarkRehypePlugin(plugin, handlers);
