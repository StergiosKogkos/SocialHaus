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

test("server-renders the SocialHaus narrative journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>SocialHaus \| Creative Studio/i);
  assert.match(html, /<html lang="el">/i);
  assert.match(html, /rel="canonical" href="https:\/\/socialhaus-enter-haus\.skogkos03\.chatgpt\.site"/i);
  assert.match(html, /property="og:image" content="https:\/\/socialhaus-enter-haus\.skogkos03\.chatgpt\.site\/og\.jpg"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /"@type":"Organization"/i);
  assert.match(html, /"@type":"WebSite"/i);
  assert.match(html, /"@type":"ProfessionalService"/i);
  assert.match(html, /SOCIAL.*HAUS/s);
  assert.match(html, /Enter the Haus/);
  assert.match(html, /We don&#x27;t create content\./);
  assert.match(html, /We create/);
  assert.match(html, /Presence\./);
  assert.doesNotMatch(html, /presence-particle/);
  assert.match(html, /One studio\. Three distinct worlds\./);
  assert.match(html, /Selected collaborations/);
  assert.doesNotMatch(html, /Selected collaborations \/ 01—14/);
  assert.match(html, /Who we work with\./);
  assert.match(html, /instagram\.com\/casadigiorgio\.mykonos/);
  assert.match(html, /instagram\.com\/promenademykonos/);
  assert.match(html, /Your brand/);
  assert.match(html, /belongs here\./);
  assert.match(html, /This is what/);
  assert.match(html, /presence looks like\./);
  assert.match(html, /About us \/ SocialHaus/);
  assert.match(html, /Our services \/ 01—08/);
  assert.match(html, /Content Creation/);
  assert.match(html, /Strategic Communications/);
  assert.match(html, /href="#about"/);
  assert.match(html, /href="#services"/);
  assert.match(html, /<a href="#contact">Contact<\/a>/);
  assert.doesNotMatch(html, /nav-contact/);
  assert.match(html, /Contact \/ SocialHaus/);
  assert.match(html, /aria-label="Instagram"/);
  assert.match(html, /socialhaus-hero\.mp4/);
  assert.match(html, /socialhaus-hero-poster\.jpg/);
  assert.match(html, /socialhaus-owl\.png/);
  assert.match(html, /loading="lazy" decoding="async"/);
  assert.match(html, /aposskamnos@gmail\.com/);
  assert.match(html, /\+30 698 018 3236/);
  assert.match(html, /Νήλεως 32/);
  assert.doesNotMatch(html, /Scene <span>|SH®|scroll-progress|Threshold \/ 01/);
  assert.doesNotMatch(html, /statement-image|premium-carousel|carousel-card|unsplash\.com/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps motion, responsiveness, and reduced-motion support intentional", async () => {
  const [scene, css, packageJson] = await Promise.all([
    readFile(new URL("../components/scenes/OpeningExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(scene, /ScrollTrigger/);
  assert.match(scene, /new Lenis/);
  assert.match(scene, /scrub: 1\.15/);
  assert.match(scene, /id: "scene-narrative"/);
  assert.match(scene, /scrub: 1\.2/);
  assert.match(scene, /partnerLogos\.map/);
  assert.doesNotMatch(scene, /narrative-services__list", \{ yPercent/);
  assert.match(scene, /narrative-blackout/);
  assert.match(scene, /hero-video__media/);
  assert.match(scene, /hero__video-type/);
  assert.match(scene, /hero__video-type", \{ opacity: 1, duration: 0\.14/);
  assert.match(scene, /hero__video-type", \{ opacity: 0, duration: 0\.14[\s\S]*\}, 0\.55\)/);
  assert.match(scene, /brand-interlude/);
  assert.match(scene, /brand-interlude__wordmark-type", \{ scale: 1\.04/);
  assert.doesNotMatch(scene, /brand-interlude__about-tease/);
  assert.doesNotMatch(scene, /brand-interlude__wordmark-art|brand-interlude__wordmark-far|brand-interlude__wordmark-near/);
  assert.doesNotMatch(scene, /haus-cursor__ring/);
  assert.doesNotMatch(scene, /narrative-portal/);
  assert.match(scene, /narrative-owl/);
  assert.doesNotMatch(scene, /className="axis"|className="horizon"/);
  assert.doesNotMatch(scene, /ChapterChrome|entrance-threshold/);
  assert.doesNotMatch(scene, /campaignImage|premium-carousel|statement-image/);
  assert.match(scene, /gsap\.ticker\.add/);
  assert.match(scene, /lenis\.on\("scroll", updateScrollTrigger\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /\.hero-video/);
  assert.match(css, /\.hero__brand \{ color: #fff; text-shadow: 0 1\.2rem 4rem rgba\(0,0,0,\.5\); \}/);
  assert.match(css, /\.owl-mark/);
  assert.match(css, /\.brand-interlude/);
  assert.match(css, /\.narrative-services__list[\s\S]*grid-template-columns: repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.plane--floor \{ border: 0 !important; \}/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
});
