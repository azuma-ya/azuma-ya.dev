import fs from "node:fs";
import nextBundleAnalyzer from "@next/bundle-analyzer";

// ダミーファイルが存在しない場合はビルドエラーを防ぐため自動生成する
if (!fs.existsSync("./src/lib/content/hmr.ts")) {
  fs.writeFileSync("./src/lib/content/hmr.ts", "export const hmr = 0;\n");
}

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  transpilePackages: ["@repo/ui", "@repo/markdown"],
  output: "export",
});

export default nextConfig;
