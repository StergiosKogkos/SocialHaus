import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the SocialHaus opening", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>SocialHaus — Enter the Haus<\/title>/i);
  assert.match(html, /SOCIALHAUS/);
  assert.match(html, /Enter the Haus/);
  assert.match(html, /We don&#x27;t create content\./);
  assert.match(html, /We create presence\./);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the motion foundation intentional and accessible", async () => {
  const [scene, css, packageJson] = await Promise.all([
    readFile(new URL("../components/scenes/OpeningExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(scene, /ScrollTrigger/);
  assert.match(scene, /new Lenis/);
  assert.match(scene, /gsap\.ticker\.add/);
  assert.match(scene, /lenis\.on\("scroll", ScrollTrigger\.update\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
});
