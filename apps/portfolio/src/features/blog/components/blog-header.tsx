import { Fragment } from "react";

import { format } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/navigation/breadcrumb";

import type { InternalBlog } from "../types/blog";

interface Props {
  blog: InternalBlog;
}

export const BlogHeader = ({ blog }: Props) => {
  return (
    <header>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {blog.categories.map((category, index, categories) => (
            <Fragment key={category}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/categories?open=${categories
                    .slice(0, index + 1)
                    .join("/")}`}
                >
                  {category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold my-2">{blog.title}</h1>
      <time className="text-foreground/50">
        {format(blog.createdAt, "yyyy/MM/dd")}
      </time>
    </header>
  );
};
