"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

function ArchitecturalSpace({ className = "" }: { className?: string }) {
  return (
    <div className={`architecture ${className}`} aria-hidden="true">
      <div className="plane plane--left" />
      <div className="plane plane--right" />
      <div className="plane plane--ceiling" />
      <div className="plane plane--floor" />
      <div className="axis" />
      <div className="horizon" />
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

const services = [
  ["01", "Content Creation", "Σχεδιάζουμε περιεχόμενο με αφηγηματική συνέπεια και αισθητική επιμέλεια, που αντικατοπτρίζει με ακρίβεια τον χαρακτήρα του brand."],
  ["02", "Social Media Management", "Αναλαμβάνουμε την ολιστική διαχείριση της παρουσίας σας στα social media, με προσεκτικό σχεδιασμό περιεχομένου, στρατηγική δημοσιεύσεων και συνεχή ανάλυση απόδοσης."],
  ["03", "Photography", "Παράγουμε φωτογραφικό υλικό υψηλής αισθητικής για προϊόντα, χώρους και εκδηλώσεις, με προσοχή στη λεπτομέρεια που διακρίνει τα premium brands."],
  ["04", "Drone & Aerial Shots", "Προσφέρουμε εναέριες λήψεις που αποτυπώνουν χώρους και τοποθεσίες με μια σπάνια, εντυπωσιακή προοπτική — ιδανικές για τουριστικές μονάδες, ακίνητα και events υψηλών προδιαγραφών."],
  ["05", "Graphic Design", "Δημιουργούμε οπτικό υλικό με καθαρές γραμμές και συνέπεια ύφους, χτίζοντας μια αισθητική γλώσσα που παραμένει αναγνωρίσιμη σε κάθε εφαρμογή."],
  ["06", "Flyer Design", "Σχεδιάζουμε προωθητικό υλικό που συνδυάζει λειτουργικότητα και κομψότητα, μεταφέροντας το μήνυμά σας με σαφήνεια και στιλ."],
  ["07", "Logo Creation & Branding", "Αποτυπώνουμε την ουσία του brand σας σε μια οπτική ταυτότητα διαχρονικής αξίας — λογότυπο, χρωματική παλέτα, τυπογραφία και brand guidelines που χτίζουν εμπιστοσύνη."],
  ["08", "Strategic Communications", "Σχεδιάζουμε στρατηγικές επικοινωνίας που ευθυγραμμίζουν όραμα, μήνυμα και κοινό-στόχο, με έμφαση στα μετρήσιμα, μακροπρόθεσμα αποτελέσματα."],
];
const partnerNames = ["Στην Αυλή", "Myconian", "Nuera Mykonos", "Maya Experience", "Casa di Giorgio", "Anema", "Tabu Mykonos", "Εμπορικό Βιομηχανικό Επιμελητήριο Ροδόπης", "You Nails Hair", "Promenade Mykonos", "BOHO Nature Seaside", "Moana", "La Corte", "Βιβλιοχαρτεμπορική"];
const partnerLogos = partnerNames.map((name, index) => ({ name, src: `/assets/partners/${String(index + 1).padStart(2, "0")}.png` }));

const aboutParagraphs = [
  "Η SocialHaus είναι ένα creative studio μάρκετινγκ που χτίζει brands με ταυτότητα, χαρακτήρα και διάρκεια. Με έδρα την Αθήνα και παρουσία στη Μύκονο και στη Βόρεια Ελλάδα, συνδυάζουμε τον παλμό της πρωτεύουσας, τη διεθνή αύρα του νησιού και τη δυναμική της βόρειας αγοράς σε μία ενιαία, εξειδικευμένη προσέγγιση.",
  "Πιστεύουμε ότι η πολυτέλεια δεν είναι απλώς αισθητική επιλογή, αλλά αποτέλεσμα λεπτομέρειας, συνέπειας και στρατηγικής σκέψης. Για αυτό, κάθε έργο που αναλαμβάνουμε ξεκινά από μια βαθιά κατανόηση του brand και καταλήγει σε μια ολοκληρωμένη, συνεκτική εμπειρία επικοινωνίας — από τη στρατηγική έως το τελικό visual.",
  "Η ομάδα μας λειτουργεί ως επέκταση της δικής σας επιχείρησης, φέρνοντας μαζί δημιουργικό όραμα και τεχνική αρτιότητα, ώστε κάθε brand που συνεργάζεται μαζί μας να αποκτά μια παρουσία διακριτή, αναγνωρίσιμη και διαχρονική.",
];

function PartnerCarousel() {
  return (
    <div className="brand-carousel" aria-label="Selected collaborations">
      <div className="brand-carousel__heading">
        <span>Selected collaborations</span>
        <strong>Inside the Haus</strong>
      </div>
      <div className="brand-carousel__track">
        {partnerLogos.map((logo, index) => (
          <figure className="brand-slide" key={logo.src}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {/* Local partner marks are supplied as transparent PNG assets. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.name} />
            <figcaption>{logo.name}</figcaption>
          </figure>
        ))}
        <a className="brand-slide brand-slide--invitation" href="#contact">
          <span>15 / Next</span>
          <strong>Your brand<br />belongs here.</strong>
          <i>Enter the Haus ↗</i>
        </a>
      </div>
      <div className="brand-invitation" aria-hidden="true">
        <span>Your brand</span><span>belongs here.</span>
      </div>
    </div>
  );
}

function NarrativeChapter() {
  return (
    <section className="cinematic-scene scene-narrative" aria-label="About SocialHaus and services">
      <span id="about" className="narrative-anchor narrative-anchor--about" />
      <span id="services" className="narrative-anchor narrative-anchor--services" />
      <div className="scene-viewport scene-viewport--narrative">
        <div className="chrome chrome--narrative" aria-hidden="true">
          <div className="chapter">Scene <span>03</span> / The studio</div>
          <div className="chrome__mark" />
        </div>

        <article className="narrative-panel narrative-about">
          <p className="narrative-eyebrow">About us / SocialHaus</p>
          <h2><span>This is what</span><em>presence looks like.</em></h2>
          <div className="narrative-copy">
            {aboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <strong className="narrative-signoff">SocialHaus — Enter the Haus</strong>
        </article>

        <article className="narrative-panel narrative-services">
          <header>
            <p className="narrative-eyebrow">Our services / 01—08</p>
            <h2>One Haus.<br /><em>A complete process.</em></h2>
          </header>
          <div className="narrative-services__list">
            {services.map(([number, title, description]) => (
              <section className="narrative-service" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export function OpeningExperience() {
  const root = useRef<HTMLElement>(null);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIntroComplete(true), 40);

    return () => {
      window.clearTimeout(revealTimer);
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
        gsap.set(".presence-word", { clipPath: "inset(0 100% 0 0)", filter: "blur(10px)", letterSpacing: "0.04em" });
        gsap.set(".presence-particle", { opacity: 0, scale: 0 });
        gsap.set(".presence-beam", { opacity: 0, scaleX: 0.12, rotate: -14 });
        gsap.set(".presence-cinema-frame i", { scaleX: 0 });
        gsap.set(".brand-carousel", { opacity: 0, yPercent: 8 });
        gsap.set(".brand-slide", { opacity: 0, yPercent: 18, rotateY: -10 });
        gsap.set(".brand-invitation span", { yPercent: 110 });
        gsap.set(".chrome--narrative, .narrative-panel", { opacity: 0 });
        gsap.set(".narrative-about h2 span, .narrative-about h2 em", { yPercent: 120 });
        gsap.set(".narrative-about .narrative-copy p, .narrative-signoff", { opacity: 0, yPercent: 24 });
        gsap.set(".narrative-services header, .narrative-service", { opacity: 0, yPercent: 16 });

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
          .to(".entrance-statement", { opacity: 1, yPercent: 0, scale: 1, duration: 0.15 }, 0.56)
          .to(".entrance-statement", { opacity: 1, duration: 0.12 }, 0.71)
          .to(".entrance-statement", { opacity: 0, yPercent: -8, scale: 1.035, duration: 0.12 }, 0.83)
          .to(".scene-entrance .architecture", { opacity: 0.22, duration: 0.13 }, 0.84)
          .to(".entrance-threshold", { opacity: 1, duration: 0.08 }, 0.82)
          .to(".entrance-threshold", { opacity: 0, duration: 0.08 }, 0.96)
          .to(".scene-entrance .architecture", { opacity: 0.06, duration: 0.15 }, 0.96)
          .fromTo(".presence-kicker", { yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 0.13 }, 1.1)
          .to(".presence-particle", { opacity: 1, scale: 1, duration: 0.08, stagger: 0.006 }, 1.14)
          .to(".presence-particle", { x: 0, y: 0, duration: 0.28, stagger: 0.004, ease: "power2.inOut" }, 1.16)
          .to(".presence-word", { opacity: 1, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", letterSpacing: "-0.095em", duration: 0.34, ease: "power2.inOut" }, 1.19)
          .to(".presence-particle", { opacity: 0, scale: 0.2, duration: 0.16, stagger: 0.002 }, 1.43)
          .to(".presence-word", { scale: 1.08, duration: 0.2 }, 1.43)
          .to(".presence-rule", { opacity: 1, scaleX: 1, duration: 0.14 }, 1.48)
          .fromTo(".presence-meta", { yPercent: 38 }, { opacity: 1, yPercent: 0, duration: 0.16 }, 1.58)
          .fromTo(".presence-subline", { yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 0.15 }, 1.7)
          .to(".scene-entrance .architecture", { opacity: 0.04, duration: 0.2 }, 1.54)
          .to(".presence-beam", { opacity: 0.72, scaleX: 1, rotate: 0, duration: 0.32 }, 1.16)
          .to(".presence-cinema-frame i", { scaleX: 1, duration: 0.28, stagger: 0.035 }, 1.22)
          .to(".presence-beam", { xPercent: 42, opacity: 0, duration: 0.32 }, 1.5)
          .to(".presence-composition", { yPercent: -8, scale: 1.09, opacity: 0, duration: 0.24 }, 1.9)
          .to(".brand-carousel", { opacity: 1, yPercent: 0, duration: 0.22 }, 1.98)
          .to(".brand-slide", { opacity: 1, yPercent: 0, rotateY: 0, duration: 0.34, stagger: 0.018 }, 2.02)
          .to(".brand-carousel__track", { xPercent: -54, duration: 0.72 }, 2.15)
          .to(".brand-invitation span", { yPercent: 0, duration: 0.3, stagger: 0.08 }, 2.24)
          .to(".brand-carousel", { opacity: 1, duration: 0.3 }, 2.48)
          .to(".brand-carousel", { opacity: 0, yPercent: -5, duration: 0.22 }, 2.78)
          .to(".chrome", { opacity: 0, yPercent: -20, duration: 0.16 }, 1.9)
          .to(".scene-entrance .architecture", { opacity: 0, duration: 0.22 }, 2.72);

        gsap.timeline({
            defaults: { ease: "none", force3D: true },
            scrollTrigger: {
              id: "scene-narrative",
              trigger: ".scene-narrative",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
              fastScrollEnd: false,
            },
          })
          .to(".chrome--narrative", { opacity: 1, duration: 0.15 }, 0.05)
          .to(".narrative-about", { opacity: 1, duration: 0.18 }, 0.08)
          .to(".narrative-about h2 span, .narrative-about h2 em", { yPercent: 0, duration: 0.34, stagger: 0.08 }, 0.12)
          .to(".narrative-about .narrative-copy p", { opacity: 1, yPercent: 0, duration: 0.28, stagger: 0.1 }, 0.35)
          .to(".narrative-signoff", { opacity: 1, yPercent: 0, duration: 0.2 }, 0.62)
          .to(".narrative-about", { opacity: 1, duration: 0.32 }, 0.8)
          .to(".narrative-about", { opacity: 0, yPercent: -10, scale: 0.98, duration: 0.3 }, 1.18)
          .to(".narrative-services", { opacity: 1, duration: 0.2 }, 1.38)
          .to(".narrative-services header", { opacity: 1, yPercent: 0, duration: 0.28 }, 1.42)
          .to(".narrative-service", { opacity: 1, yPercent: 0, duration: 0.38, stagger: 0.045 }, 1.58)
          .to(".narrative-services__list", { yPercent: -28, duration: 0.75 }, 1.78)
          .to(".narrative-services", { opacity: 1, duration: 0.32 }, 2.38)
          .to(".chrome--narrative", { opacity: 0, duration: 0.18 }, 2.55);

        if (window.matchMedia("(pointer: fine)").matches) {
          const cursorDotX = gsap.quickTo(".haus-cursor__dot", "x", { duration: .18, ease: "power3.out" });
          const cursorDotY = gsap.quickTo(".haus-cursor__dot", "y", { duration: .18, ease: "power3.out" });
          const cursorRingX = gsap.quickTo(".haus-cursor__ring", "x", { duration: .55, ease: "power3.out" });
          const cursorRingY = gsap.quickTo(".haus-cursor__ring", "y", { duration: .55, ease: "power3.out" });
          const cursorMove = (event: PointerEvent) => { cursorDotX(event.clientX); cursorDotY(event.clientY); cursorRingX(event.clientX); cursorRingY(event.clientY); };
          const cursorEnter = () => root.current?.classList.add("cursor-is-active");
          const cursorLeave = () => root.current?.classList.remove("cursor-is-active");
          const cursorTargets = root.current?.querySelectorAll("a, .brand-slide, .narrative-service") ?? [];
          cursorTargets.forEach((target) => { target.addEventListener("pointerenter", cursorEnter); target.addEventListener("pointerleave", cursorLeave); });
          window.addEventListener("pointermove", cursorMove, { passive: true });
          cleanups.push(() => { window.removeEventListener("pointermove", cursorMove); cursorTargets.forEach((target) => { target.removeEventListener("pointerenter", cursorEnter); target.removeEventListener("pointerleave", cursorLeave); }); });
        }

        gsap.to(".scroll-progress__fill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: .25 } });
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
      <div className="noise" aria-hidden="true" />
      <div className="haus-cursor" aria-hidden="true"><i className="haus-cursor__ring" /><i className="haus-cursor__dot" /></div>
      <div className="scroll-progress" aria-hidden="true"><span>SH</span><i><b className="scroll-progress__fill" /></i><span>06</span></div>
      <header className="site-nav">
        <a href="#top" className="site-nav__logo">SH®</a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a className="instagram-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <span aria-hidden="true"><i /></span>
          </a>
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
          </div>

          <div className="presence-composition">
            <div className="presence-beam" aria-hidden="true" />
            <div className="presence-cinema-frame" aria-hidden="true"><i /><i /><i /></div>
            <p className="presence-kicker">We create</p>
            <div className="presence-particles" aria-hidden="true">{Array.from({ length: 64 }, (_, index) => <i className="presence-particle" key={index} style={{ transform: `translate(${((index * 47) % 620) - 310}px, ${((index * 83) % 360) - 180}px)` }} />)}</div>
            <h2 className="presence-word">Presence.</h2>
            <div className="presence-rule" aria-hidden="true" />
            <p className="presence-meta">Athens — Mykonos — Northern Greece</p>
            <p className="presence-subline">One studio. Three distinct worlds.</p>
          </div>

          <PartnerCarousel />

          <div className="threshold entrance-threshold">Threshold / 01</div>
        </div>
      </section>
      <NarrativeChapter />
      <footer id="contact" className="site-footer">
        <div className="site-footer__headline"><span>Let&apos;s create</span><strong>something felt.</strong></div>
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
