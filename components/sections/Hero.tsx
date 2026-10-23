"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/site";
import { FadeIn, navigateToSection } from "@/components/ui/SectionTransition";

const featuredTech = [
  "Flutter",
  "Dart",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "PostgreSQL",
];

export function Hero() {
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative mx-auto max-w-[1440px] xl:max-w-[1560px] px-6 pt-12 pb-12 sm:px-10 sm:pt-16 sm:pb-16 lg:px-14 lg:pt-16 lg:pb-20 overflow-hidden"
    >
      {/* Editorial Eyebrow Tag */}
      <FadeIn className="mb-6 sm:mb-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono uppercase tracking-[0.16em] text-foreground">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
          />
          <span>Available for work &middot; 2026</span>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono text-muted tracking-widest uppercase">
          Phnom Penh, Cambodia
        </span>
      </FadeIn>

      {/* Main Grid: Left Typography & Stats, Right Big Standalone Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-end">
        {/* Left Column: Headline, Bio, Tech Stack & Metrics */}
        <div className="lg:col-span-6 xl:col-span-6 z-10 flex flex-col justify-center pb-4 lg:pb-8">
          {/* Oversized Serif Headline */}
          <FadeIn delay={0.05}>
            <h1
              style={{ fontSize: "clamp(2.35rem, 4.6vw, 5.25rem)" }}
              className="font-serif project-title-serif font-normal leading-[1.0] sm:leading-[0.98] tracking-[-0.03em] text-foreground text-balance"
            >
              Crafting cross-platform{" "}
              <em className="italic font-normal">mobile</em> apps and full-stack
              web systems.
            </h1>
          </FadeIn>

          {/* Intro Paragraph */}
          <FadeIn delay={0.1} className="mt-8 max-w-xl">
            <p className="text-sm sm:text-base leading-relaxed text-muted">
              I’m{" "}
              <span className="text-foreground font-medium">{siteData.name}</span>
              , a motivated Software Developer and senior student pursuing a{" "}
              <span className="text-foreground/90">Bachelor of Science in Software Development</span>{" "}
              at Norton University in Phnom Penh—building cross-platform Flutter
              mobile applications and full-stack web systems with React, Next.js, and FastAPI.
            </p>
          </FadeIn>

          {/* Clean Tech Stack Pills */}
          <FadeIn delay={0.14} className="mt-6 flex flex-wrap items-center gap-2">
            {featuredTech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md border border-border/80 bg-surface/60 text-[11px] font-mono tracking-tight text-foreground/90 transition-colors hover:border-foreground/40"
              >
                {tech}
              </span>
            ))}
          </FadeIn>

          {/* Action Buttons */}
          <FadeIn delay={0.18} className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#projects"
              onClick={(e) => navigateToSection("#projects", "Work", e)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 hover:opacity-90 hover:gap-3.5 shadow-md"
            >
              <span>View Selected Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              onClick={(e) => navigateToSection("#contact", "Contact", e)}
              className="editorial-link inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-muted hover:text-foreground py-2"
            >
              <span>Get in touch</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </FadeIn>

          {/* Mini Metrics / Highlights Counter Row */}
          <FadeIn delay={0.22} className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/80 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-foreground font-normal">
                B.S.
              </p>
              <p className="text-[11px] font-mono text-muted uppercase tracking-wider mt-0.5">
                Software Dev
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-foreground font-normal">
                2026
              </p>
              <p className="text-[11px] font-mono text-muted uppercase tracking-wider mt-0.5">
                Norton Univ
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-foreground font-normal">
                UTC+7
              </p>
              <p className="text-[11px] font-mono text-muted uppercase tracking-wider mt-0.5">
                Phnom Penh, KH
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: BIG Free-Standing Silhouette Portrait (No Card!) */}
        <FadeIn
          delay={0.12}
          className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-end"
        >
          <div
            ref={portraitContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[660px] xl:max-w-[760px] 2xl:max-w-[840px] flex flex-col items-center justify-end"
          >
            {/* Ambient Spotlight Glow (Warm Studio Lighting) */}
            <div
              aria-hidden="true"
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[480px] sm:h-[480px] lg:w-[640px] lg:h-[640px] xl:w-[720px] xl:h-[720px] rounded-full bg-accent/15 dark:bg-accent/25 blur-3xl pointer-events-none transition-transform duration-700 ease-editorial"
              style={{
                transform: isHovering
                  ? `translate(calc(-50% + ${mouseOffset.x * 24}px), calc(-50% + ${mouseOffset.y * 24}px))`
                  : "translate(-50%, -50%)",
              }}
            />

            {/* Secondary Cyan Glow Behind Head for Dual-Tone Rim Lighting */}
            <div
              aria-hidden="true"
              className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] xl:w-[580px] xl:h-[580px] rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 blur-3xl pointer-events-none"
            />

            {/* Free-Standing Cutout Image Container with Smooth Bottom Fade Mask */}
            <div
              className="relative w-full h-[500px] sm:h-[620px] lg:h-[760px] xl:h-[860px] 2xl:h-[920px] flex items-end justify-center select-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-editorial"
                style={{
                  transform: isHovering
                    ? `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0) scale(1.02)`
                    : "translate3d(0, 0, 0) scale(1)",
                }}
              >
                <Image
                  src="/images/hero-cutout.png"
                  alt={siteData.name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 60vw, 840px"
                  className="object-contain object-bottom select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Horizontal Hairline Rule */}
      <FadeIn delay={0.25} className="mt-12 sm:mt-16">
        <hr className="border-0 border-t border-border" />
        <div className="mt-3 flex items-center justify-between">
          <span className="editorial-label">Scroll to explore</span>
          <span className="editorial-label" aria-hidden="true">
            &darr;
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
