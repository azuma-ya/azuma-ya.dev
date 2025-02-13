import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { OgpImage } from "@/components/base/ogp-image";
import { getInfo } from "@/features/profile/lib/get-info";
import { getTags } from "@/features/tag/lib/get-tags";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ tag: string }>;
}

export const generateStaticParams = () => {
  const tags = getTags();

  if (tags.length === 0) {
    return notFound();
  }

  return tags.map((tag) => ({
    tag,
  }));
};

export default async function Image({ params }: Props) {
  const { tag } = await params;

  const info = getInfo();

  const logoData = await readFile(
    join(process.cwd(), "public/asset/ogp/template.png"),
  );
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    <OgpImage
      src={logoSrc}
      size={size}
      title={`${tag} | ${info.portfolio.title}`}
    />,
    {
      ...size,
    },
  );
}
