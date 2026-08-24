import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const pagesAssetPrefix = isGitHubPages
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")
  : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  assetPrefix: pagesAssetPrefix,
  trailingSlash: isGitHubPages,
};

export default nextConfig;
