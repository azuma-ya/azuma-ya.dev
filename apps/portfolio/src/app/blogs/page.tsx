import { BaseLayout } from "@/components/layout/base-layout";
import { BlogItem } from "@/features/blog/components/blog-item";
import { YearSection } from "@/features/blog/components/year-section";
import { getAllBlogs } from "@/features/blog/lib/get-all-blogs";

const BlogListPage = () => {
  const blogs = getAllBlogs();

  const groupedBlogs = blogs.reduce(
    (acc, blog) => {
      const year = blog.createdAt.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, typeof blogs>,
  );
  const sortedGroupedBlogs = Object.entries(groupedBlogs)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(
      ([year, blogs]) =>
        [
          year,
          blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        ] as const,
    );

  return (
    <BaseLayout title="Blogs">
      <div className="hidden last:flex items-center justify-center h-[calc(100vh-200px)] text-xs">
        No blogs yet..
      </div>
      {sortedGroupedBlogs.map(([year, blogs], index) => (
        <YearSection key={year} index={index} year={year}>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.title}>
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
