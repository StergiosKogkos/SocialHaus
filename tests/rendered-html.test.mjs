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
  assert.match(html, /SOCIAL.*HAUS/s);
  assert.match(html, /Enter the Haus/);
  assert.match(html, /We don&#x27;t create content\./);
  assert.match(html, /We create/);
  assert.match(html, /Presence\./);
  assert.match(html, /One studio\. Three distinct worlds\./);
  assert.match(html, /Descend into the worlds/);
  assert.match(html, /Scene 02 — Presence/);
  assert.match(html, /Selected moments \/ SocialHaus/);
  assert.match(html, /This is what/);
  assert.match(html, /presence looks like\./);
  assert.match(html, /Strategy\./);
  assert.match(html, /Identity\./);
  assert.match(html, /Content\./);
  assert.match(html, /Production\./);
  assert.match(html, /From idea/);
  assert.match(html, /to identity\./);
  assert.match(html, /A complete creative process, built inside the Haus\./);
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
  assert.match(scene, /scrub: 1\.15/);
  assert.match(scene, /id: "scene-presence"/);
  assert.match(scene, /scrub: 1\.25/);
  assert.match(scene, /workMedia\.map/);
  assert.match(scene, /gsap\.ticker\.add/);
  assert.match(scene, /lenis\.on\("scroll", updateScrollTrigger\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
});
