export type CategoryBlogItem = {
  name: string;
  ref: string;
};

export type CategoryTree = (CategoryBlogItem | CategoryTree)[];
