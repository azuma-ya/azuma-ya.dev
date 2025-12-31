import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { OgpImage } from "@/components/base/ogp-image";
import { getAllWorks } from "@/features/work/lib/get-all-works";
import { getWork } from "@/features/work/lib/get-work";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => {
  const works = getAllWorks();

  if (works.length === 0) {
    return notFound();
  }

  return works.map((work) => ({
    slug: work.slug,
  }));
};

export default async function Image({ params }: Props) {
  const { slug } = await params;

  const work = getWork(slug);

  if (!work) {
    return notFound();
  }

  const logoData = await readFile(
    join(process.cwd(), "public/asset/ogp/template.png"),
  );
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    <OgpImage src={logoSrc} size={size} title={work.title} />,
    {
      ...size,
    },
  );
}
