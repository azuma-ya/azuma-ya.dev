import { MoreVertical, MoveUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/input/button";

import { BaseLayout } from "@/components/layout/base-layout";
import { BlogItem } from "@/features/blog/components/blog-item";
import { YearSection } from "@/features/blog/components/year-section";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";
import { toGroupSortByYear } from "@/features/blog/lib/utils";
import { getInfo } from "@/features/profile/lib/get-info";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/navigation/dropdown-menu";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `Blogs | ${info.portfolio.title}`,
    description: `${info.portfolio.title}のブログ一覧ページです。`,
    openGraph: {
      title: `Blogs | ${info.portfolio.title}`,
      description: `${info.portfolio.title}のブログ一覧ページです。`,
    },
  };
};

const BlogListPage = () => {
  const blogs = getAllBlogs();

  const sortedGroupedBlogs = toGroupSortByYear(blogs);

  const NavigateToCategory = () => (
    <Button variant="ghost" size="sm" asChild className="justify-start">
      <Link href="/categories">
        Categories
        <MoveUpRight />
      </Link>
    </Button>
  );

  const NavigateToTag = () => (
    <Button variant="ghost" size="sm" asChild className="justify-start">
      <Link href="/tags">
        Tags
        <MoveUpRight />
      </Link>
    </Button>
  );

  const Nav = () => (
    <>
      <nav className="gap-2 hidden md:flex">
        <NavigateToCategory />
        <NavigateToTag />
      </nav>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <MoreVertical />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <NavigateToCategory />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavigateToTag />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <BaseLayout title="Blogs" action={<Nav />}>
      <div className="hidden last:flex items-center justify-center h-[calc(100vh-16rem)]">
        No blogs yet..
      </div>
      {sortedGroupedBlogs.map(([year, blogs], index) => (
        <YearSection key={year} index={index} year={year}>
          <ul className="space-y-1">
            {blogs.map((blog) => (
              <li
                key={
                  (("slug" in blog && blog.slug) ||
                    ("url" in blog && blog.url)) as string
                }
              >
                <BlogItem data={blog} />
              </li>
            ))}
          </ul>
        </YearSection>
      ))}
    </BaseLayout>
  );
};

export default BlogListPage;
