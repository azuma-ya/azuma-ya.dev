import Link from "next/link";
import { notFound } from "next/navigation";

import { Markdown } from "@repo/markdown/components/markdown";
import { BackButton } from "@repo/ui/components/input/back-button";
import { Button } from "@repo/ui/components/input/button";
import { Container } from "@repo/ui/components/layout/container";

import { BadgeList } from "@/components/data-display/badge-list";
import { Toc } from "@/components/data-display/toc";
import { getInfo } from "@/features/profile/lib/get-info";
import { getAllWorks } from "@/features/work/lib/get-all-works";
import { getWork } from "@/features/work/lib/get-work";
import { getWorkThumbnailSrc } from "@/features/work/lib/thumbnail";
import { getMetas } from "@/lib/meta";
import { ImageIcon, SquareArrowOutUpRight } from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    return notFound();
  }

  const info = getInfo();

  return {
    title: `${work.title} | ${info.portfolio.title}`,
    description: work.description,
    openGraph: {
      title: `${work.title} | ${info.portfolio.title}`,
      description: work.description,
    },
  };
};

export const generateStaticParams = async () => {
  const works = getAllWorks();

  if (works.length === 0) {
    return [{ slug: "notfound" }];
  }

  return works.map((work) => ({ slug: work.slug }));
};

const WorkDetailPage = async ({ params }: Props) => {
  const { slug } = await params;

  if (slug === "notfound") {
    return notFound();
  }

  const work = getWork(slug);

  if (!work) {
    return notFound();
  }

  const thumbnailSrc = getWorkThumbnailSrc(work.slug, work.url);
  const metas = await getMetas(work.content);

  return (
    <Container maxWidth="xl" className="space-y-2 md:my-16 my-4">
      <div className="flex items-start gap-5">
        <aside className="basis-1/5 shrink-0 sticky top-(--header-height) hidden md:block space-y-4">
          <BackButton variant="ghost" />
          <Toc className="overflow-y-auto max-h-[calc(100vh-16rem)] hidden-scrollbar" />
        </aside>
        <article className="space-y-4 min-w-0 w-full">
          <div className="flex items-center justify-between md:hidden">
            <BackButton variant="ghost" />
          </div>

          <a href={work.url} target="_blank" rel="noreferrer">
            <div className="overflow-hidden rounded-lg border bg-background">
              {thumbnailSrc ? (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img
                    src={thumbnailSrc}
                    alt={work.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[16/3] bg-muted flex items-center justify-center">
                  <ImageIcon className="text-muted-foreground" />
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h1 className="text-xl font-bold">{work.title}</h1>
                  <SquareArrowOutUpRight className="mt-0.5 shrink-0 size-5" />
                </div>
                <p className="text-muted-foreground">{work.description}</p>
                <BadgeList tags={work.tags} />
              </div>
            </div>
          </a>

          {work.content.trim().length > 0 && (
            <Markdown metas={metas}>{work.content}</Markdown>
          )}

          <div className="flex items-center justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/works">Back to Works</Link>
            </Button>
          </div>
        </article>
      </div>
    </Container>
  );
};

export default WorkDetailPage;
