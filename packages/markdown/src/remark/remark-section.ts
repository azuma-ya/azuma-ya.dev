import { h } from "hastscript";
import type { BlockContent, DefinitionContent, Parent } from "mdast";
import { visit } from "unist-util-visit";

import {
  createRehypeHandlers,
  createRemarkPlugin,
  createRemarkRehypePlugin,
} from "../utils/helper";

export interface Section extends Parent {
  type: "section";
  id?: string;
  children: Array<BlockContent | DefinitionContent>;
}

declare module "mdast" {
  interface BlockContentMap {
    section: Section;
  }
  interface RootContentMap {
    section: Section;
  }
}

const plugin = createRemarkPlugin(() => {
  return (tree) => {
    let sectionId = 0;
    visit(tree, (node, index, parent) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "section") return;
      if (index === undefined) return;

      const section: Section = {
        type: "section",
        id: `${sectionId++}`,
        children: [],
      };

      for (const child of node.children) {
        section.children.push(child);
      }

      parent?.children?.splice(index, 1, section);
    });
  };
});

const handlers = createRehypeHandlers({
  section: (state, node: Section) => {
    const hastElement = h(
      "section",
      {
        id: node.id,
      },
      state.all(node),
    );
    return hastElement;
  },
});

export const remarkSection = createRemarkRehypePlugin(plugin, handlers);
