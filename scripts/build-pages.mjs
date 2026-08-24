import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const cli = resolve(root, "node_modules/vinext/dist/cli.js");
const result = spawnSync(process.execPath, [cli, "build"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

const clientDir = resolve(root, "dist/client");
const indexPath = resolve(clientDir, "index.html");
const noJekyllPath = resolve(clientDir, ".nojekyll");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const assetPrefix = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

if (!siteUrl.startsWith("https://")) {
  console.error("NEXT_PUBLIC_SITE_URL must be an absolute HTTPS URL.");
  process.exit(1);
}

const indexHtml = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
const expectedAssetPath = `${assetPrefix}/_next/`;
const exportIsValid =
  indexHtml.includes(expectedAssetPath) &&
  indexHtml.includes(`${assetPrefix}/assets/brand/socialhaus-hero.mp4`) &&
  (indexHtml.includes(`href="${siteUrl}"`) ||
    indexHtml.includes(`href="${siteUrl}/"`)) &&
  indexHtml.includes('href="#contact"') &&
  existsSync(noJekyllPath);

if (!exportIsValid) {
  console.error("GitHub Pages export validation failed.");
  process.exit(result.status || 1);
}

writeFileSync(
  resolve(clientDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
writeFileSync(
  resolve(clientDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
);

if (result.status && process.platform !== "win32") {
  process.exit(result.status);
}

if (result.status && process.platform === "win32") {
  console.warn("Static export completed and passed validation after a Windows runtime cleanup warning.");
}

console.log("GitHub Pages export validated successfully.");
