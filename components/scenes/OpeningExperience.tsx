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

function ArchitecturalSpace() {
  return (
    <div className="architecture" aria-hidden="true">
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
    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".location", { opacity: 1, duration: 0.9 }, 0.1)
          .fromTo(
            ".hero__brand",
            { opacity: 0, yPercent: 115, rotate: 1.5 },
            { opacity: 1, yPercent: 0, rotate: 0, duration: 1.25 },
            0.16,
          )
          .to(".entry", { opacity: 1, duration: 0.8 }, 0.75)
          .to(".scroll-cue", { opacity: 1, duration: 0.7 }, 1.05);

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".opening",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.25,
              invalidateOnRefresh: true,
            },
          })
          .to(".hero__brand", { scale: 1.45, yPercent: -95, opacity: 0, duration: 0.17 }, 0.02)
          .to(".location", { y: -80, opacity: 0, duration: 0.1 }, 0.03)
          .to(".entry, .scroll-cue", { y: 55, opacity: 0, duration: 0.1 }, 0.03)
          .to(".architecture", { opacity: 1, duration: 0.12 }, 0.08)
          .fromTo(".portal", { scale: 0.42 }, { scale: 1, duration: 0.24 }, 0.08)
          .fromTo(".plane--left", { xPercent: -18 }, { xPercent: 0, duration: 0.22 }, 0.08)
          .fromTo(".plane--right", { xPercent: 18 }, { xPercent: 0, duration: 0.22 }, 0.08)
          .fromTo(".plane--ceiling", { yPercent: -22 }, { yPercent: 0, duration: 0.22 }, 0.08)
          .fromTo(".plane--floor", { yPercent: 22 }, { yPercent: 0, duration: 0.22 }, 0.08)
          .fromTo(
            ".frame--one",
            { y: 60, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.13 },
            0.23,
          )
          .to(".frame--one", { opacity: 0, y: -45, scale: 1.05, duration: 0.1 }, 0.43)
          .to(".portal", { scale: 2.55, duration: 0.28 }, 0.43)
          .to(".portal__ring", { scale: 1.35, opacity: 0, duration: 0.24 }, 0.44)
          .to(".plane--left", { xPercent: -32, scaleX: 1.18, duration: 0.26 }, 0.44)
          .to(".plane--right", { xPercent: 32, scaleX: -1.18, duration: 0.26 }, 0.44)
          .to(".plane--ceiling", { yPercent: -34, scaleY: 1.25, duration: 0.26 }, 0.44)
          .to(".plane--floor", { yPercent: 34, scaleY: 1.25, duration: 0.26 }, 0.44)
          .fromTo(
            ".frame--two",
            { y: 80, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.14 },
            0.58,
          )
          .to(".threshold", { opacity: 1, duration: 0.09 }, 0.76)
          .to(".architecture", { filter: "brightness(0.55)", duration: 0.18 }, 0.79);

        if (window.matchMedia("(pointer: fine)").matches) {
          const portalX = gsap.quickTo(".portal", "x", { duration: 0.8, ease: "power3.out" });
          const portalY = gsap.quickTo(".portal", "y", { duration: 0.8, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            portalX((event.clientX / window.innerWidth - 0.5) * 10);
            portalY((event.clientY / window.innerHeight - 0.5) * 7);
          };
          window.addEventListener("pointermove", move, { passive: true });
          return () => window.removeEventListener("pointermove", move);
        }
      }, root);

      ScrollTrigger.refresh();
      return () => context.revert();
    });

    return () => {
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      media.revert();
    };
  }, [introComplete]);

  return (
    <main ref={root} className="experience">
      {showLoader && <Loader complete={introComplete} />}
      <div className="noise" aria-hidden="true" />

      <section className="opening" aria-label="Enter the SocialHaus opening experience">
        <div className="opening__viewport">
          <ArchitecturalSpace />
          <div className="chrome" aria-hidden="true">
            <div className="chapter">Chapter <span>01</span></div>
            <div className="chrome__mark" />
          </div>

          <div className="hero">
            <p className="location">Athens — Mykonos — Northern Greece</p>
            <div className="hero__brand-wrap">
              <h1 className="hero__brand">SOCIALHAUS</h1>
            </div>
            <div className="entry">
              <span className="entry__line" />
              <span className="entry__text">Enter the Haus</span>
              <span className="entry__line" />
            </div>
            <div className="scroll-cue" aria-hidden="true">Scroll to enter</div>
          </div>

          <div className="frame frame--one">
            <p className="frame__text">We don&apos;t create content.</p>
          </div>
          <div className="frame frame--two">
            <p className="frame__text">We create presence.</p>
          </div>
          <div className="threshold">Threshold / 01</div>
        </div>
      </section>
    </main>
  );
}
