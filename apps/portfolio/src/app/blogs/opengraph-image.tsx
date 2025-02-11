import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { OgpImage } from "@/components/base/ogp-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const dynamic = "force-static";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/asset/ogp/template.png"),
  );
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    <OgpImage
      src={logoSrc}
      size={size}
      title={"Blogs | Azuma-ya's Portfolio"}
    />,
    {
      ...size,
    },
  );
}
