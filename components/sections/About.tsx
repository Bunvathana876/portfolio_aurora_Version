"use client";

import React from "react";
import {
  GraduationCap,
  MapPin,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal, ScrollRevealItem, SectionAccentStroke } from "@/components/ui/ScrollReveal";
import { AboutIdentityPass } from "@/components/sections/AboutIdentityPass";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* Backward-compatible legacy anchor */}
      <div id="about-me" aria-hidden="true" className="sr-only" />

      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-sky-500/[0.04] blur-[130px]"
      />

      <div className="container relative z-10">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal duration={0.5} yOffset={16} className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-mono font-medium text-sky-400">
            <span className="size-1.5 rounded-full bg-sky-400" />
            <span>01 / ABOUT</span>
          </div>

          <SectionAccentStroke />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            About
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed pt-1">
            I study Software Development at Norton University and build mobile and web applications. My work spans Flutter, React, Next.js, and FastAPI.
          </p>
        </ScrollReveal>

        {/* Two-Column Grid: Identity Card & 3D Lanyard (Left) + Bento Matrix (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Lightweight Developer Identity Pass & Interactive 3D Lanyard */}
          <ScrollReveal
            duration={0.55}
            delay={0.05}
            yOffset={20}
            className="lg:col-span-5 space-y-6"
          >
            <AboutIdentityPass />
          </ScrollReveal>

          {/* Right Column: 4-Card Bento Matrix with Staggered Cascading Reveals */}
          <ScrollReveal
            staggerChildren={0.08}
            delay={0.1}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {/* Card 1: Education */}
            <ScrollRevealItem yOffset={16}>
              <SpotlightCard
                enableTilt={true}
                spotlightColor="rgba(56, 189, 248, 0.1)"
                className="h-full p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 mb-4">
                    <GraduationCap size={18} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-1">
                    Education
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    {siteData.education.degree}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {siteData.education.institution} &middot; {siteData.education.period}
                  </p>
                </div>
              </SpotlightCard>
            </ScrollRevealItem>

            {/* Card 2: Development Focus */}
            <ScrollRevealItem yOffset={16}>
              <SpotlightCard
                enableTilt={true}
                spotlightColor="rgba(56, 189, 248, 0.1)"
                className="h-full p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 mb-4">
                    <Smartphone size={18} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-1">
                    Development Focus
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    Mobile &amp; Full-Stack Systems
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Flutter, React &middot; Next.js &middot; FastAPI
                  </p>
                </div>
              </SpotlightCard>
            </ScrollRevealItem>

            {/* Card 3: Engineering Approach */}
            <ScrollRevealItem yOffset={16}>
              <SpotlightCard
                enableTilt={true}
                spotlightColor="rgba(56, 189, 248, 0.1)"
                className="h-full p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 mb-4">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-1">
                    Engineering Approach
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    Clean &amp; Maintainable Code
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Strict Typing &middot; Docker &middot; Modularity
                  </p>
                </div>
              </SpotlightCard>
            </ScrollRevealItem>

            {/* Card 4: Location & Communication */}
            <ScrollRevealItem yOffset={16}>
              <SpotlightCard
                enableTilt={true}
                spotlightColor="rgba(56, 189, 248, 0.1)"
                className="h-full p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 mb-4">
                    <MapPin size={18} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-1">
                    Location &amp; Spoken Languages
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    Phnom Penh, Cambodia
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Khmer (Native) &bull; English (Intermediate)
                  </p>
                </div>
              </SpotlightCard>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default About;
