"use client";

import { useSearchParams } from "next/navigation";

import type { CategoryTree } from "../types/tree";
import { Tree } from "./tree";

interface Props {
  categoryTree: CategoryTree;
}

export const CategoryList = ({ categoryTree }: Props) => {
  const searchParams = useSearchParams();

  const open = searchParams.get("open") ?? undefined;

  return (
    <ul>
      {categoryTree.map((category, index) => (
        <li key={index}>
          <Tree item={category} defaultOpenCategory={open} />
        </li>
      ))}
    </ul>
  );
};
