"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { WorkMedia } from "../work/WorkMediaFrame";
import { workMedia } from "../work/workMedia";

gsap.registerPlugin(ScrollTrigger);

function Loader({ complete }: { complete: boolean }) {
  return (
    <div
      className={`loader${complete ? " loader--complete" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="SocialHaus is opening"
    >
      <div className="loader__inner">
        <p className="loader__index">SH / 00 — Athens</p>
        <p className="loader__brand" aria-hidden="true">SOCIALHAUS</p>
        <div className="loader__line" aria-hidden="true" />
        <p className="loader__status">Preparing the threshold</p>
      </div>
    </div>
  );
}

function ArchitecturalSpace({ className = "" }: { className?: string }) {
  return (
    <div className={`architecture ${className}`} aria-hidden="true">
      <div className="plane plane--left" />
      <div className="plane plane--right" />
      <div className="plane plane--ceiling" />
      <div className="plane plane--floor" />
      <div className="axis" />
      <div className="horizon" />
      <div className="portal">
        <div className="portal__ring" />
        <div className="portal__ring portal__ring--2" />
        <div className="portal__ring portal__ring--3" />
      </div>
    </div>
  );
}

function ChapterChrome({ chapter, label }: { chapter: string; label: string }) {
  return (
    <div className="chrome" aria-hidden="true">
      <div className="chapter">Scene <span>{chapter}</span> / {label}</div>
      <div className="chrome__mark" />
    </div>
  );
}

const interruptions = ["Strategy.", "Identity.", "Content.", "Production.", "Presence."];
const campaignImage = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=90";

function PresenceChapter() {
  return (
    <section className="cinematic-scene scene-presence" aria-label="Scene 02 — Presence">
      <div className="scene-viewport scene-viewport--presence">
        <div className="chrome chrome--presence" aria-hidden="true">
          <div className="chapter">Scene <span>02</span> / Presence</div>
          <div className="chrome__mark" />
        </div>

        <div className="showreel-intro">
          <p className="showreel-intro__label">Selected moments / SocialHaus</p>
          <h2>
            <span>This is what</span>
            <span>presence looks like.</span>
          </h2>
        </div>

        <div className="showreel-stage">
          {workMedia.map((item, index) => (
            <WorkMedia
              key={item.id}
              item={item}
              priority={index === 0}
              className={`media-frame media-frame--0${index + 1}`}
            />
          ))}
        </div>

        <div className="interruptions" aria-hidden="true">
          {interruptions.map((word, index) => (
            <p key={word} className={`interrupt interrupt--0${index + 1}`}>{word}</p>
          ))}
        </div>

        <div className="chapter-outro">
          <p className="chapter-outro__index">End frame / 02</p>
          <h2><span>From idea</span><span>to identity.</span></h2>
          <div className="chapter-outro__rule" aria-hidden="true" />
          <p>A complete creative process, built inside the Haus.</p>
        </div>
      </div>
    </section>
  );
}

export function OpeningExperience() {
  const root = useRef<HTMLElement>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-loading");

    const revealTimer = window.setTimeout(() => {
      setIntroComplete(true);
      document.body.classList.remove("is-loading");
    }, reducedMotion ? 80 : 2300);

    const removeTimer = window.setTimeout(
      () => setShowLoader(false),
      reducedMotion ? 120 : 3300,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("is-loading");
    };
  }, []);

  useEffect(() => {
    if (!introComplete || !root.current) return;

    const media = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.88,
      });

      const updateScrollTrigger = () => ScrollTrigger.update();
      const raf = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".scene-entrance .location", { opacity: 1, duration: 0.9 }, 0.1)
          .fromTo(
            ".hero__brand",
            { opacity: 0, yPercent: 110, rotate: 1.2 },
            { opacity: 1, yPercent: 0, rotate: 0, duration: 1.35 },
            0.16,
          )
          .to(".entry", { opacity: 1, duration: 0.85 }, 0.78)
          .to(".scroll-cue", { opacity: 1, duration: 0.7 }, 1.08);

        gsap.set(".scene-entrance .architecture", { opacity: 0 });
        gsap.set(".entrance-statement", { opacity: 0, yPercent: 12, scale: 0.97 });
        gsap.set(".presence-kicker, .presence-word, .presence-meta, .presence-subline, .presence-rule", { opacity: 0 });
        gsap.set(".presence-letter", { opacity: 0, scale: 0.05, filter: "blur(12px)" });
        gsap.set(".statement-image", { opacity: 0, scale: 1.14, clipPath: "inset(20% 20% 20% 20%)" });
        gsap.set(".premium-carousel", { opacity: 0, yPercent: 12 });
        gsap.set(".carousel-card", { opacity: 0, yPercent: 22, rotateY: -12 });
        gsap.set(".descent-gate, .descent-copy", { opacity: 0 });
        gsap.set(".descent-aperture", { scale: 0.12, yPercent: 38 });
        gsap.set(".descent-rail", { scaleY: 0 });
        gsap.set(".chrome--presence, .showreel-intro, .chapter-outro", { opacity: 0 });
        gsap.set(".showreel-intro__label", { yPercent: 70 });
        gsap.set(".showreel-intro h2 span", { yPercent: 115 });
        gsap.set(".media-frame", { opacity: 0, force3D: true });
        gsap.set(".media-frame--01", { opacity: 1, scale: 1.04 });
        gsap.set(".interrupt", { opacity: 0, yPercent: 20 });
        gsap.set(".chapter-outro h2 span", { yPercent: 115 });
        gsap.set(".chapter-outro__index, .chapter-outro > p:last-child", { opacity: 0, yPercent: 40 });
        gsap.set(".chapter-outro__rule", { scaleX: 0 });

        gsap.timeline({
            defaults: { ease: "none", force3D: true },
            scrollTrigger: {
              id: "scene-entrance",
              trigger: ".scene-entrance",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.15,
              invalidateOnRefresh: true,
              fastScrollEnd: false,
            },
          })
          .to(".hero__brand", { scale: 1.08, duration: 0.13 }, 0.04)
          .fromTo(
            ".scene-entrance .location",
            { yPercent: 0, opacity: 1 },
            { yPercent: -35, opacity: 0, duration: 0.13 },
            0.07,
          )
          .fromTo(
            ".entry, .scroll-cue",
            { yPercent: 0, opacity: 1 },
            { yPercent: 35, opacity: 0, duration: 0.12 },
            0.07,
          )
          .to(".scene-entrance .architecture", { opacity: 1, duration: 0.2 }, 0.12)
          .fromTo(".scene-entrance .portal", { scale: 0.48 }, { scale: 0.86, duration: 0.24 }, 0.12)
          .fromTo(".scene-entrance .plane--left", { xPercent: -16 }, { xPercent: 0, duration: 0.24 }, 0.12)
          .fromTo(".scene-entrance .plane--right", { xPercent: 16 }, { xPercent: 0, duration: 0.24 }, 0.12)
          .fromTo(".scene-entrance .plane--ceiling", { yPercent: -18 }, { yPercent: 0, duration: 0.24 }, 0.12)
          .fromTo(".scene-entrance .plane--floor", { yPercent: 18 }, { yPercent: 0, duration: 0.24 }, 0.12)
          .to(".hero__brand", { scale: 1.65, duration: 0.17 }, 0.17)
          .fromTo(
            ".hero__brand",
            { scale: 1.65, opacity: 1 },
            { scale: 3.15, opacity: 0.72, duration: 0.17, immediateRender: false },
            0.34,
          )
          .to(".hero__brand", { scale: 5.8, opacity: 0, duration: 0.16 }, 0.51)
          .to(".scene-entrance .portal", { scale: 1.18, duration: 0.25 }, 0.34)
          .to(".entrance-statement", { opacity: 1, yPercent: 0, scale: 1, duration: 0.15 }, 0.56)
          .to(".statement-image", { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.2 }, 0.58)
          .to(".entrance-statement", { opacity: 1, duration: 0.12 }, 0.71)
          .to(".entrance-statement", { opacity: 0, yPercent: -8, scale: 1.035, duration: 0.12 }, 0.83)
          .to(".scene-entrance .architecture", { opacity: 0.22, duration: 0.13 }, 0.84)
          .to(".entrance-threshold", { opacity: 1, duration: 0.08 }, 0.82)
          .to(".entrance-threshold", { opacity: 0, duration: 0.08 }, 0.96)
          .to(".scene-entrance .architecture", { opacity: 0.06, duration: 0.15 }, 0.96)
          .fromTo(".presence-kicker", { yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 0.13 }, 1.1)
          .to(".presence-word", { opacity: 1, duration: 0.08 }, 1.16)
          .fromTo(".presence-letter", {
            x: (index) => ((index % 2 ? 1 : -1) * (90 + index * 24)),
            y: (index) => ((index % 3) - 1) * 110,
            rotate: (index) => index % 2 ? 38 : -42,
          }, { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, stagger: 0.025 }, 1.18)
          .to(".presence-word", { scale: 1.08, duration: 0.2 }, 1.43)
          .to(".presence-rule", { opacity: 1, scaleX: 1, duration: 0.14 }, 1.48)
          .fromTo(".presence-meta", { yPercent: 38 }, { opacity: 1, yPercent: 0, duration: 0.16 }, 1.58)
          .fromTo(".presence-subline", { yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 0.15 }, 1.7)
          .to(".scene-entrance .portal", { scale: 1.7, duration: 0.28 }, 1.15)
          .to(".scene-entrance .architecture", { opacity: 0.04, duration: 0.2 }, 1.54)
          .to(".presence-composition", { yPercent: -14, scale: 1.04, opacity: 0.08, duration: 0.18 }, 1.9)
          .to(".premium-carousel", { opacity: 1, yPercent: 0, duration: 0.18 }, 1.96)
          .to(".carousel-card", { opacity: 1, yPercent: 0, rotateY: 0, duration: 0.3, stagger: 0.035 }, 2.0)
          .to(".carousel-track", { xPercent: -18, duration: 0.34 }, 2.08)
          .to(".premium-carousel", { opacity: 0, yPercent: -10, duration: 0.18 }, 2.33)
          .to(".chrome", { opacity: 0, yPercent: -20, duration: 0.16 }, 1.9)
          .to(".descent-gate", { opacity: 1, duration: 0.12 }, 2.42)
          .to(".descent-aperture", { scale: 1, yPercent: 0, duration: 0.3 }, 2.42)
          .to(".descent-rail", { scaleY: 1, duration: 0.24 }, 2.48)
          .to(".descent-copy", { opacity: 1, yPercent: 0, duration: 0.18 }, 2.56)
          .fromTo(".descent-copy", { yPercent: 35 }, { yPercent: 0 }, 2.56)
          .to(".descent-copy", { opacity: 0, yPercent: -20, duration: 0.12 }, 2.72)
          .to(".descent-aperture", { scale: 4.2, yPercent: -4, duration: 0.3 }, 2.68)
          .to(".descent-rail", { opacity: 0, duration: 0.14 }, 2.8)
          .to(".descent-gate", { backgroundColor: "#e8e3da", duration: 0.18 }, 2.84);

        const isMobile = window.matchMedia("(max-width: 720px)").matches;

        gsap.timeline({
            defaults: { ease: "none", force3D: true },
            scrollTrigger: {
              id: "scene-presence",
              trigger: ".scene-presence",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.25,
              invalidateOnRefresh: true,
              fastScrollEnd: false,
            },
          })
          .to(".chrome--presence", { opacity: 1, duration: 0.16 }, 0.08)
          .to(".showreel-intro", { opacity: 1, duration: 0.14 }, 0.12)
          .to(".showreel-intro__label", { yPercent: 0, duration: 0.16 }, 0.12)
          .to(".showreel-intro h2 span", { yPercent: 0, duration: 0.28, stagger: 0.07 }, 0.18)
          .to(".media-frame--01", { scale: 1, duration: 0.34 }, 0)
          .to(".showreel-intro", { opacity: 0, yPercent: -10, duration: 0.18 }, 0.68)
          .to(".media-frame--01", {
            scale: isMobile ? 0.58 : 0.38,
            xPercent: isMobile ? -24 : -68,
            yPercent: isMobile ? -18 : 8,
            duration: 0.44,
          }, 0.72)
          .fromTo(".media-frame--02", {
            opacity: 0,
            xPercent: isMobile ? 110 : 135,
            yPercent: isMobile ? 20 : 8,
            scale: 0.82,
          }, {
            opacity: 1,
            xPercent: isMobile ? 24 : 45,
            yPercent: isMobile ? 20 : 8,
            scale: 1,
            duration: 0.48,
          }, 0.84)
          .to(".interrupt--01", { opacity: 1, yPercent: 0, duration: 0.16 }, 1.02)
          .to(".interrupt--01", { opacity: 0, yPercent: -18, duration: 0.16 }, 1.36)
          .to(".media-frame--01", { yPercent: isMobile ? -42 : -22, opacity: 0.3, duration: 0.38 }, 1.2)
          .to(".media-frame--02", {
            xPercent: isMobile ? 0 : 4,
            yPercent: 0,
            scale: isMobile ? 1.82 : 2.35,
            duration: 0.54,
          }, 1.36)
          .to(".interrupt--02", { opacity: 1, yPercent: 0, duration: 0.18 }, 1.66)
          .fromTo(".media-frame--03", {
            opacity: 0,
            xPercent: isMobile ? -95 : -130,
            yPercent: 38,
            scale: 0.72,
          }, {
            opacity: 1,
            xPercent: isMobile ? -20 : -48,
            yPercent: isMobile ? 18 : 22,
            scale: 1,
            duration: 0.48,
          }, 1.72)
          .to(".media-frame--02", { xPercent: isMobile ? 32 : 55, scale: isMobile ? 0.78 : 0.72, duration: 0.48 }, 1.82)
          .to(".interrupt--02", { opacity: 0, yPercent: -18, duration: 0.16 }, 2.02)
          .fromTo(".media-frame--04", { opacity: 0, xPercent: 120 }, {
            opacity: 1,
            xPercent: isMobile ? 18 : 28,
            duration: 0.5,
          }, 2.12)
          .to(".media-frame--03", { yPercent: -18, duration: 0.55 }, 2.12)
          .to(".interrupt--03", { opacity: 1, yPercent: 0, duration: 0.18 }, 2.34)
          .to(".media-frame--04", { xPercent: isMobile ? -18 : -34, scale: 1.18, duration: 0.55 }, 2.52)
          .to(".interrupt--03", { opacity: 0, yPercent: -16, duration: 0.16 }, 2.76)
          .to(".media-frame--02, .media-frame--03", { opacity: 0, duration: 0.28 }, 2.74)
          .fromTo(".media-frame--05", {
            opacity: 0,
            xPercent: isMobile ? -75 : -105,
            yPercent: -28,
            scale: 0.68,
          }, {
            opacity: 1,
            xPercent: isMobile ? -20 : -48,
            yPercent: isMobile ? -14 : -20,
            scale: 1,
            duration: 0.46,
          }, 2.86)
          .fromTo(".media-frame--06", {
            opacity: 0,
            xPercent: isMobile ? 100 : 125,
            yPercent: 34,
            scale: 0.76,
          }, {
            opacity: 1,
            xPercent: isMobile ? 18 : 42,
            yPercent: isMobile ? 25 : 18,
            scale: 1,
            duration: 0.46,
          }, 2.96)
          .to(".interrupt--04", { opacity: 1, yPercent: 0, duration: 0.18 }, 3.15)
          .to(".media-frame--04", { yPercent: -34, scale: 0.82, duration: 0.58 }, 3.1)
          .to(".media-frame--05", { yPercent: isMobile ? 8 : 12, scale: 1.14, duration: 0.58 }, 3.18)
          .to(".media-frame--06", { yPercent: isMobile ? -12 : -18, scale: 1.18, duration: 0.58 }, 3.18)
          .to(".interrupt--04", { opacity: 0, yPercent: -16, duration: 0.16 }, 3.55)
          .to(".interrupt--05", { opacity: 1, yPercent: 0, scale: 1, duration: 0.22 }, 3.62)
          .to(".media-frame--05", { xPercent: isMobile ? -60 : -95, duration: 0.46 }, 3.64)
          .to(".media-frame--06", { xPercent: isMobile ? 52 : 74, duration: 0.46 }, 3.64)
          .to(".media-frame--04", { scale: 1.7, opacity: 0.18, duration: 0.48 }, 3.64)
          .to(".interrupt--05", { scale: isMobile ? 1.18 : 1.34, duration: 0.4 }, 3.72)
          .to(".media-frame, .interrupt--05", { opacity: 0, duration: 0.42 }, 4.12)
          .to(".chrome--presence", { opacity: 0, duration: 0.24 }, 4.12)
          .to(".chapter-outro", { opacity: 1, duration: 0.2 }, 4.44)
          .to(".chapter-outro__index", { opacity: 1, yPercent: 0, duration: 0.18 }, 4.48)
          .to(".chapter-outro h2 span", { yPercent: 0, duration: 0.32, stagger: 0.08 }, 4.52)
          .to(".chapter-outro__rule", { scaleX: 1, duration: 0.26 }, 4.78)
          .to(".chapter-outro > p:last-child", { opacity: 1, yPercent: 0, duration: 0.22 }, 4.9)
          .to(".chapter-outro", { opacity: 1, duration: 0.4 }, 5.08);

        if (window.matchMedia("(pointer: fine)").matches) {
          const portalX = gsap.quickTo(".portal", "x", { duration: 0.9, ease: "power3.out" });
          const portalY = gsap.quickTo(".portal", "y", { duration: 0.9, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            portalX((event.clientX / window.innerWidth - 0.5) * 8);
            portalY((event.clientY / window.innerHeight - 0.5) * 5);
          };
          window.addEventListener("pointermove", move, { passive: true });
          cleanups.push(() => window.removeEventListener("pointermove", move));
        }
      }, root);

      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanups.push(() => {
        window.cancelAnimationFrame(refreshFrame);
        context.revert();
        gsap.ticker.remove(raf);
        lenis.off("scroll", updateScrollTrigger);
        lenis.destroy();
      });
    });

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
      media.revert();
    };
  }, [introComplete]);

  return (
    <main ref={root} className="experience">
      {showLoader && <Loader complete={introComplete} />}
      <div className="noise" aria-hidden="true" />
      <header className="site-nav">
        <a href="#top" className="site-nav__logo">SH®</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="cinematic-scene scene-entrance" aria-label="Scene 01 — Entrance">
        <div className="scene-viewport">
          <ArchitecturalSpace />
          <ChapterChrome chapter="01" label="Entrance" />

          <div className="hero">
            <p className="location">Athens — Mykonos — Northern Greece</p>
            <div className="hero__brand-wrap">
              <h1 className="hero__brand"><span>SOCIAL</span><span>HAUS</span></h1>
            </div>
            <div className="entry">
              <span className="entry__line" />
              <span className="entry__text">Enter the Haus</span>
              <span className="entry__line" />
            </div>
            <div className="scroll-cue" aria-hidden="true">Scroll to enter</div>
          </div>

          <div className="entrance-statement">
            <p>We don&apos;t create content.</p>
            <div className="statement-image"><img src={campaignImage} alt="SocialHaus campaign atmosphere" /></div>
          </div>

          <div className="presence-composition">
            <p className="presence-kicker">We create</p>
            <h2 className="presence-word" aria-label="Presence.">{"Presence.".split("").map((letter, index) => <span className="presence-letter" key={`${letter}-${index}`}>{letter}</span>)}</h2>
            <div className="presence-rule" aria-hidden="true" />
            <p className="presence-meta">Athens — Mykonos — Northern Greece</p>
            <p className="presence-subline">One studio. Three distinct worlds.</p>
          </div>

          <div className="premium-carousel" aria-label="Selected campaign images">
            <div className="carousel-heading"><span>Selected atmospheres</span><strong>Inside the Haus</strong></div>
            <div className="carousel-track">
              {["01", "02", "03", "04", "05"].map((item, index) => (
                <figure className={`carousel-card carousel-card--${index + 1}`} key={item}>
                  <img src={campaignImage} alt="" />
                  <figcaption><span>SocialHaus / {item}</span><span>Presence study</span></figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="descent-gate" aria-hidden="true">
            <div className="descent-aperture">
              <div className="descent-aperture__frame descent-aperture__frame--one" />
              <div className="descent-aperture__frame descent-aperture__frame--two" />
              <div className="descent-aperture__void" />
            </div>
            <div className="descent-rail descent-rail--left" />
            <div className="descent-rail descent-rail--right" />
          </div>

          <div className="descent-copy">
            <span>Next passage</span>
            <strong>Descend into the worlds</strong>
          </div>

          <div className="threshold entrance-threshold">Threshold / 01</div>
        </div>
      </section>
      <div id="work"><PresenceChapter /></div>
      <footer id="contact" className="site-footer">
        <div id="about" className="site-footer__headline"><span>Let&apos;s create</span><strong>something felt.</strong></div>
        <a className="site-footer__email" href="mailto:hello@socialhaus.gr">hello@socialhaus.gr</a>
        <div className="site-footer__grid">
          <div><span>Call</span><a href="tel:+302310000000">+30 2310 000 000</a></div>
          <div><span>Find us</span><p>Athens · Mykonos<br />Northern Greece</p></div>
          <div><span>Follow</span><a href="#top">Instagram ↗</a><a href="#top">LinkedIn ↗</a></div>
          <div><span>Studio hours</span><p>Mon — Fri<br />10:00 — 18:00</p></div>
        </div>
        <div className="site-footer__base"><span>© 2026 SocialHaus</span><span>Creative studio / Greece</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
