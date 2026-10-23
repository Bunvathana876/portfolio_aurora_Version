"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/site";
import { FadeIn } from "@/components/ui/SectionTransition";

export function About() {
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section
      id="about"
      className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <FadeIn className="mb-12 sm:mb-16">
        <p className="editorial-label">01 / About</p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">
        {/* Left Column: Large Pull-Quote in Italic Serif & Education Highlight */}
        <FadeIn className="md:col-span-6 lg:col-span-6 space-y-8">
          <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[2.65rem] leading-[1.2] tracking-[-0.02em] text-foreground">
            &ldquo;Passionate about writing clean, maintainable code, designing responsive interfaces, and collaborating effectively within engineering teams.&rdquo;
          </blockquote>

          {/* Education Box */}
          <div className="p-6 border border-neutral-200 dark:border-neutral-800 bg-surface/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-accent">
              <span>Education</span>
              <span>{siteData.education.period}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
              {siteData.education.degree}
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              {siteData.education.institution} &mdash; {siteData.education.location}
            </p>
          </div>
        </FadeIn>

        {/* Right Column: Small Body Text Bio + Portrait Plate */}
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 space-y-10">
          <FadeIn delay={0.08} className="space-y-4 text-sm leading-relaxed text-foreground/90">
            <p>{siteData.bio}</p>
            <p className="text-muted">
              Based in {siteData.socials.location}, I specialize in building cross-platform
              mobile applications with Flutter and full-stack web applications using React,
              Next.js, and FastAPI. {siteData.availability}.
            </p>
          </FadeIn>

          {/* Portrait with Thin 1px Border & Editorial Caption */}
          <FadeIn as="figure" delay={0.14} className="max-w-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-surface">
              {/* Minimalist Editorial Workspace & Portrait Illustration Fallback */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-foreground">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted">
                  <span>Phnom Penh</span>
                  <span>UTC+7</span>
                </div>

                <svg
                  viewBox="0 0 240 260"
                  className="w-4/5 h-auto mx-auto stroke-current text-foreground/75"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="120" cy="72" r="24" strokeWidth="1" />
                  <path
                    d="M76 168 C76 130, 164 130, 164 168"
                    strokeWidth="1"
                  />
                  <rect
                    x="82"
                    y="152"
                    width="76"
                    height="48"
                    stroke="var(--fg)"
                    strokeWidth="1"
                    fill="var(--bg)"
                  />
                  <circle cx="120" cy="176" r="2.5" fill="var(--accent)" />
                  <line
                    x1="32"
                    y1="200"
                    x2="208"
                    y2="200"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>

                <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2.5 text-[10px] font-mono uppercase tracking-widest text-muted">
                  <span>{siteData.name}</span>
                  <span>Portrait Plate</span>
                </div>
              </div>

              {!portraitFailed && (
                <Image
                  src={siteData.avatar || "/images/portrait.jpg"}
                  alt={siteData.name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 384px"
                  onLoad={() => setPortraitLoaded(true)}
                  onError={() => setPortraitFailed(true)}
                  className={`object-cover transition-opacity duration-500 ${
                    portraitLoaded
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                />
              )}
            </div>

            <figcaption className="mt-2.5 font-mono text-xs text-muted flex items-center justify-between">
              <span>Fig. 1: {siteData.name} &mdash; Studio Portrait.</span>
              <span>B.S. 2026</span>
            </figcaption>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
