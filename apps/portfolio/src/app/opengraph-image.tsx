import { ImageResponse } from "next/og";

import { OgpImage } from "@/components/base/ogp-image";
import { dataurl } from "public/asset/ogp/template";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const dynamic = "force-static";

export default async function Image() {
  return new ImageResponse(<OgpImage src={dataurl} size={size} />, {
    ...size,
  });
}
