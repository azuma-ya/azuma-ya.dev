import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import nextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  transpilePackages: ["@repo/ui", "@repo/markdown"],
  output: "export",
});

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
