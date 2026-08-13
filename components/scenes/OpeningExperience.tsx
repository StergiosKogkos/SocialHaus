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
    </div>
  );
}

function VideoWordmark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = document.querySelector<HTMLVideoElement>(".hero-video__media");
    const brand = document.querySelector<HTMLElement>(".hero__brand");
    if (!canvas || !video || !brand || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    const drawLetteredText = (text: string, x: number, baseline: number, letterSpacing: number) => {
      let cursor = x;
      for (const character of text) {
        context.fillText(character, cursor, baseline);
        cursor += context.measureText(character).width + letterSpacing;
      }
    };

    const draw = () => {
      const opacity = Number.parseFloat(canvas.style.opacity || "0");
      if (opacity > 0.001 && video.readyState >= 2 && video.videoWidth > 0) {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const targetWidth = Math.round(width * pixelRatio);
        const targetHeight = Math.round(height * pixelRatio);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);

        const coverScale = Math.max(width / video.videoWidth, height / video.videoHeight);
        const videoWidth = video.videoWidth * coverScale;
        const videoHeight = video.videoHeight * coverScale;
        context.drawImage(video, (width - videoWidth) / 2, (height - videoHeight) / 2, videoWidth, videoHeight);

        context.globalCompositeOperation = "destination-in";
        context.fillStyle = "#fff";
        context.textBaseline = "alphabetic";

        const brandStyle = window.getComputedStyle(brand);
        const transformScale = brand.offsetWidth > 0 ? brand.getBoundingClientRect().width / brand.offsetWidth : 1;
        const fontSize = Number.parseFloat(brandStyle.fontSize) * transformScale;
        const letterSpacing = Number.parseFloat(brandStyle.letterSpacing) * transformScale;
        context.font = `${brandStyle.fontStyle} ${brandStyle.fontWeight} ${fontSize}px ${brandStyle.fontFamily}`;

        brand.querySelectorAll<HTMLElement>("span").forEach((word) => {
          const rect = word.getBoundingClientRect();
          drawLetteredText(word.textContent ?? "", rect.left, rect.top + rect.height * 0.84, letterSpacing);
        });
        context.globalCompositeOperation = "source-over";
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="hero__video-type" aria-hidden="true" />;
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
const partnerLogos = [
  { name: "Στην Εντατική", src: "/assets/partners/01.png", href: "https://www.facebook.com/avantgardekomotini/", linkLabel: "Official" },
  { name: "Myconian", src: "/assets/partners/02.png", href: "https://www.instagram.com/myconiancollectionhotels/", linkLabel: "Instagram" },
  { name: "Nuera Mykonos", src: "/assets/partners/03.png", href: "https://www.instagram.com/nueramykonos/", linkLabel: "Instagram" },
  { name: "Maya Experience", src: "/assets/partners/04.png", href: "https://www.instagram.com/explore/search/keyword/?q=Maya%20Experience%20Greece", linkLabel: "Find" },
  { name: "Casa di Giorgio", src: "/assets/partners/05.png", href: "https://www.instagram.com/casadigiorgio.mykonos/", linkLabel: "Instagram" },
  { name: "Anema", src: "/assets/partners/06.png", href: "https://www.instagram.com/anemabbqmykonos/", linkLabel: "Instagram" },
  { name: "Tabu Mykonos", src: "/assets/partners/07.png", href: "https://www.instagram.com/tabu.myk/", linkLabel: "Instagram" },
  { name: "Εμπορικό Βιομηχανικό Επιμελητήριο Ροδόπης", src: "/assets/partners/08.png", href: "https://www.rodopichamber.gr/", linkLabel: "Official" },
  { name: "You Nails Hair", src: "/assets/partners/09.png", href: "https://www.instagram.com/younailsyouhair/", linkLabel: "Instagram" },
  { name: "Promenade Mykonos", src: "/assets/partners/10.png", href: "https://www.instagram.com/promenademykonos/", linkLabel: "Instagram" },
  { name: "BOHO Nature Seaside", src: "/assets/partners/11.png", href: "https://www.facebook.com/bohonatureseaside/", linkLabel: "Official" },
  { name: "Moana", src: "/assets/partners/12.png", href: "https://www.instagram.com/moana_beachhouse/", linkLabel: "Instagram" },
  { name: "La Corte", src: "/assets/partners/13.png", href: "https://www.instagram.com/la.corte.experience/", linkLabel: "Instagram" },
  { name: "Βιβλιοχαρτεμπορική", src: "/assets/partners/14.png", href: "https://www.instagram.com/explore/search/keyword/?q=%CE%92%CE%B9%CE%B2%CE%BB%CE%B9%CE%BF%CF%87%CE%B1%CF%81%CF%84%CE%B5%CE%BC%CF%80%CE%BF%CF%81%CE%B9%CE%BA%CE%AE", linkLabel: "Find" },
];

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
        <strong>Who we work with.</strong>
      </div>
      <div className="brand-carousel__track">
        {partnerLogos.map((logo, index) => (
          <a className="brand-slide" href={logo.href} target="_blank" rel="noreferrer" key={logo.src} aria-label={`Open ${logo.name} ${logo.linkLabel}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i className="brand-slide__link">{logo.linkLabel} ↗</i>
            {/* Local partner marks are supplied as transparent PNG assets. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.name} />
            <figcaption>{logo.name}</figcaption>
          </a>
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
        <div className="narrative-portal" aria-hidden="true" />
        <div className="narrative-owl" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/socialhaus-owl.png" alt="" />
        </div>
        <div className="narrative-blackout" aria-hidden="true" />
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
        gsap.set(".presence-beam", { opacity: 0, scaleX: 0.12, rotate: -14 });
        gsap.set(".presence-cinema-frame i", { scaleX: 0 });
        gsap.set(".brand-carousel", { opacity: 0, yPercent: 8 });
        gsap.set(".brand-slide", { opacity: 0, yPercent: 18, rotateY: -10 });
        gsap.set(".brand-invitation span", { yPercent: 110 });
        gsap.set(".brand-interlude", { opacity: 0, scale: 0.96 });
        gsap.set(".brand-interlude__owl", { rotate: -18, scale: 0.82 });
        gsap.set(".brand-interlude__wordmark", { scale: 0.94 });
        gsap.set(".brand-interlude__blackout", { opacity: 0 });
        gsap.set(".hero__video-type", { opacity: 0 });
        gsap.set(".narrative-panel", { opacity: 0 });
        gsap.set(".narrative-portal", { opacity: 1, scale: 1 });
        gsap.set(".narrative-owl", { opacity: 0, scale: 0.78, rotate: -12 });
        gsap.set(".narrative-blackout", { opacity: 0, scale: 1.08 });
        gsap.set(".narrative-about h2", { color: "#f2f2ef" });
        gsap.set(".narrative-about h2 span, .narrative-about h2 em", { yPercent: 0 });
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
          .to(".hero-video__media", { scale: 1.07, duration: 0.28 }, 0.02)
          .to(".hero-video", { opacity: 0, duration: 0.24, ease: "power2.inOut" }, 0.04)
          .to(".hero__video-type", { opacity: 1, duration: 0.12, ease: "power2.out" }, 0.06)
          .to(".hero__brand", { color: "rgba(255,255,255,0)", textShadow: "none", duration: 0.12 }, 0.06)
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
          .to(".hero__video-type", { opacity: 0, duration: 0.17, ease: "power2.in" }, 0.45)
          .to(".entrance-statement", { opacity: 1, yPercent: 0, scale: 1, duration: 0.15 }, 0.56)
          .to(".entrance-statement", { opacity: 1, duration: 0.12 }, 0.71)
          .to(".entrance-statement", { opacity: 0, yPercent: -8, scale: 1.035, duration: 0.12 }, 0.83)
          .to(".scene-entrance .architecture", { opacity: 0.22, duration: 0.13 }, 0.84)
          .to(".scene-entrance .architecture", { opacity: 0.06, duration: 0.15 }, 0.96)
          .fromTo(".presence-kicker", { yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 0.13 }, 1.1)
          .to(".presence-word", { opacity: 1, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", letterSpacing: "-0.095em", duration: 0.34, ease: "power2.inOut" }, 1.19)
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
          .to(".brand-carousel__track", { xPercent: -54, duration: 0.56 }, 2.13)
          .to(".brand-invitation span", { yPercent: 0, duration: 0.3, stagger: 0.08 }, 2.24)
          .to(".brand-carousel", { opacity: 0, yPercent: -4, duration: 0.2 }, 2.6)
          .to(".scene-entrance .architecture", { opacity: 0, duration: 0.2 }, 2.56)
          .to(".brand-interlude", { opacity: 1, scale: 1, duration: 0.26, ease: "power2.out" }, 2.64)
          .to(".brand-interlude__owl", { rotate: 0, scale: 1, duration: 0.34, ease: "power3.out" }, 2.64)
          .to(".brand-interlude__owl, .brand-interlude__rule", { opacity: 0, scale: 0.92, duration: 0.2, ease: "power2.in" }, 2.92)
          .to(".brand-interlude__wordmark", { scale: 10, duration: 0.56, ease: "sine.inOut" }, 2.92)
          .to(".brand-interlude__blackout", { opacity: 1, duration: 0.08, ease: "power2.inOut" }, 3.4);

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
          .to(".narrative-portal", { opacity: 0, scale: 1.03, duration: 0.06, ease: "power2.out" }, 0)
          .to(".narrative-about", { opacity: 1, duration: 0.1 }, 0)
          .to(".narrative-about h2", { color: "#171715", duration: 0.08, ease: "power1.out" }, 0)
          .to(".narrative-about .narrative-copy p", { opacity: 1, yPercent: 0, duration: 0.28, stagger: 0.1 }, 0.3)
          .to(".narrative-signoff", { opacity: 1, yPercent: 0, duration: 0.2 }, 0.58)
          .to(".narrative-about", { opacity: 1, duration: 0.18 }, 0.8)
          .to(".narrative-about", { opacity: 0, yPercent: -8, scale: 0.985, duration: 0.26 }, 0.98)
          .to(".narrative-services", { opacity: 1, duration: 0.18 }, 1.16)
          .to(".narrative-services header", { opacity: 1, yPercent: 0, duration: 0.24 }, 1.18)
          .to(".narrative-service", { opacity: 1, yPercent: 0, duration: 0.28, stagger: 0.025 }, 1.3)
          .to(".narrative-services", { opacity: 1, duration: 0.2 }, 1.62)
          .to(".narrative-services", { opacity: 0, yPercent: -2, scale: 0.99, duration: 0.24 }, 1.84)
          .to(".narrative-owl", { opacity: 1, scale: 1, rotate: 0, duration: 0.36, ease: "power3.out" }, 1.78)
          .to(".narrative-blackout", { opacity: 1, scale: 1, duration: 0.42, ease: "power2.inOut" }, 1.92)
          .to(".narrative-owl", { opacity: 0, scale: 1.16, duration: 0.28, ease: "power2.in" }, 2.16);

        if (window.matchMedia("(pointer: fine)").matches) {
          const cursorDotX = gsap.quickTo(".haus-cursor__dot", "x", { duration: .18, ease: "power3.out" });
          const cursorDotY = gsap.quickTo(".haus-cursor__dot", "y", { duration: .18, ease: "power3.out" });
          const cursorMove = (event: PointerEvent) => { cursorDotX(event.clientX); cursorDotY(event.clientY); };
          window.addEventListener("pointermove", cursorMove, { passive: true });
          cleanups.push(() => window.removeEventListener("pointermove", cursorMove));
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
      <div className="noise" aria-hidden="true" />
      <div className="haus-cursor" aria-hidden="true"><i className="haus-cursor__dot" /></div>
      <header className="site-nav">
        <nav aria-label="Primary navigation">
          <a className="instagram-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <span aria-hidden="true"><i /></span>
          </a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
        </nav>
      </header>
      <a className="owl-mark" href="#top" aria-label="Back to the SocialHaus entrance">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/socialhaus-owl.png" alt="" />
      </a>

      <section id="top" className="cinematic-scene scene-entrance" aria-label="SocialHaus entrance">
        <div className="scene-viewport">
          <div className="hero-video" aria-hidden="true">
            <video className="hero-video__media" autoPlay muted loop playsInline preload="auto" poster="/assets/brand/socialhaus-hero-poster.jpg">
              <source src="/assets/brand/socialhaus-hero.mp4" type="video/mp4" />
            </video>
            <div className="hero-video__veil" />
          </div>
          <ArchitecturalSpace />

          <div className="hero">
            <VideoWordmark />
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
            <h2 className="presence-word">Presence.</h2>
            <div className="presence-rule" aria-hidden="true" />
            <p className="presence-meta">Athens — Mykonos — Northern Greece</p>
            <p className="presence-subline">One studio. Three distinct worlds.</p>
          </div>

          <PartnerCarousel />

          <div className="brand-interlude" aria-hidden="true">
            <span className="brand-interlude__rule" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-interlude__owl" src="/assets/brand/socialhaus-owl.png" alt="" />
            <div className="brand-interlude__wordmark"><span>SOCIALHAUS</span></div>
            <span className="brand-interlude__rule" />
            <div className="brand-interlude__blackout" />
          </div>

        </div>
      </section>
      <NarrativeChapter />
      <footer id="contact" className="site-footer">
        <div className="site-footer__headline"><span>Let&apos;s create</span><strong>something felt.</strong></div>
        <a className="site-footer__email" href="mailto:aposskamnos@gmail.com">aposskamnos@gmail.com</a>
        <div className="site-footer__grid">
          <div><span>Call</span><a href="tel:+306980183236">+30 698 018 3236</a></div>
          <div><span>Find us</span><p>Νήλεως 32<br />Αθήνα</p></div>
          <div><span>Follow</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        </div>
        <div className="site-footer__base"><span>© 2026 SocialHaus</span><span>Creative studio / Greece</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
