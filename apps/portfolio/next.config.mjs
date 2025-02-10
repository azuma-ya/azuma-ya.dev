import nextBundleAnalyzer from "@next/bundle-analyzer";
import { withContentlayer } from "next-contentlayer";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer(
  withContentlayer({
    transpilePackages: ["@repo/ui"],
    output: "export",
  }),
);

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
