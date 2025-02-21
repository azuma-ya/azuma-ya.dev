import { ChevronRight, File, Folder, Tag } from "lucide-react";

import { Button } from "@repo/ui/components/input/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/surface/collapsible";
import type { CategoryBlogItem, CategoryTree } from "../types/tree";

interface Props {
  item: CategoryBlogItem | CategoryTree;
  defaultOpenCategory?: string;
  depth?: number;
}

export const Tree = ({ item, defaultOpenCategory, depth = 0 }: Props) => {
  const [last, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-full h-fit py-1 justify-start text-base font-normal text-wrap whitespace-normal text-muted-foreground"
        asChild
      >
        <a href={`/blogs/${(last as CategoryBlogItem).ref}`}>
          <File className="size-4" />
          {(last as CategoryBlogItem).name}
        </a>
      </Button>
    );
  }

  return (
    <Collapsible
      className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      defaultOpen={
        defaultOpenCategory
          ? defaultOpenCategory
              .split("/")
              .slice(0, depth + 1)
              .join("/") === (last as CategoryBlogItem).ref
          : false
      }
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full h-fit py-1 justify-start text-base font-normal text-wrap whitespace-normal"
        >
          <ChevronRight className="transition-transform" />
          <Folder />
          {(last as CategoryBlogItem).name}
          <Tag className="ms-auto" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="pl-6 flex flex-col relative before:content-[''] before:absolute before:left-5 before:inset-y-1 before:border-l">
          {items.map((subItem, index) => (
            <li key={index}>
              <Tree
                item={subItem}
                defaultOpenCategory={defaultOpenCategory}
                depth={depth + 1}
              />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};
