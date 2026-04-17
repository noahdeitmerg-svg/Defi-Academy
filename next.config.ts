import type { NextConfig } from "next";

/** Statischer Export fuer GitHub Pages; basePath nur mit GITHUB_PAGES=true (CI). */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Defi-Academy";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  output: "export",
  ...(isGithubPages ? { basePath: repoBasePath, assetPrefix: repoBasePath } : {}),
};

export default nextConfig;
