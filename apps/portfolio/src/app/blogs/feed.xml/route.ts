import { generateFeed } from "@/lib/feed";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export const GET = async (): Promise<NextResponse> => {
  const feed = generateFeed();

  return new NextResponse(feed, {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      "Content-Type": "application/xml",
    },
  });
};
