"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

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

        gsap
          .timeline({
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
          .to(".entrance-statement", { opacity: 1, duration: 0.12 }, 0.71)
          .to(".entrance-statement", { opacity: 0, yPercent: -8, scale: 1.035, duration: 0.12 }, 0.83)
          .to(".scene-entrance .architecture", { opacity: 0.22, duration: 0.13 }, 0.84)
          .to(".entrance-threshold", { opacity: 1, duration: 0.08 }, 0.82);

        gsap.set(".presence-kicker, .scene-presence .chrome", { opacity: 0 });
        gsap.set(".presence-word", { opacity: 0, scale: 0.62, yPercent: 14 });
        gsap.set(".presence-meta, .presence-subline, .presence-rule", { opacity: 0 });
        gsap.set(".scene-presence .architecture", { opacity: 0 });

        gsap
          .timeline({
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
          .to(".scene-presence .architecture", { opacity: 0.16, duration: 0.15 }, 0.12)
          .to(".scene-presence .portal", { scale: 1.7, duration: 0.24 }, 0.12)
          .to(".scene-presence .chrome", { opacity: 1, duration: 0.12 }, 0.17)
          .to(".presence-kicker", { opacity: 1, yPercent: 0, duration: 0.12 }, 0.2)
          .fromTo(".presence-kicker", { yPercent: 45 }, { yPercent: 0 }, 0.2)
          .to(".presence-word", { opacity: 1, scale: 1, yPercent: 0, duration: 0.22 }, 0.26)
          .to(".presence-word", { scale: 1.08, duration: 0.18 }, 0.48)
          .to(".presence-rule", { opacity: 1, scaleX: 1, duration: 0.12 }, 0.54)
          .to(".presence-meta", { opacity: 1, yPercent: 0, duration: 0.15 }, 0.61)
          .fromTo(".presence-meta", { yPercent: 38 }, { yPercent: 0 }, 0.61)
          .to(".presence-subline", { opacity: 1, yPercent: 0, duration: 0.13 }, 0.72)
          .fromTo(".presence-subline", { yPercent: 45 }, { yPercent: 0 }, 0.72)
          .to(".scene-presence .architecture", { opacity: 0.05, duration: 0.15 }, 0.76)
          .to(".presence-continuation", { opacity: 1, duration: 0.1 }, 0.86);

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

      <section className="cinematic-scene scene-entrance" aria-label="Scene 01 — Entrance">
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
          </div>
          <div className="threshold entrance-threshold">Threshold / 01</div>
        </div>
      </section>

      <section className="cinematic-scene scene-presence" aria-label="Scene 02 — Presence">
        <div className="scene-viewport">
          <ArchitecturalSpace className="architecture--presence" />
          <ChapterChrome chapter="02" label="Presence" />

          <div className="presence-composition">
            <p className="presence-kicker">We create</p>
            <h2 className="presence-word">Presence.</h2>
            <div className="presence-rule" aria-hidden="true" />
            <p className="presence-meta">Athens — Mykonos — Northern Greece</p>
            <p className="presence-subline">One studio. Three distinct worlds.</p>
          </div>

          <div className="threshold presence-continuation">The worlds / Next</div>
        </div>
      </section>

      <div className="continuation-space" aria-hidden="true" />
    </main>
  );
}
