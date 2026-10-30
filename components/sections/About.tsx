"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Calendar,
  FileDown,
  Globe,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { sound } from "@/lib/sound";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5">
      <div className="size-8 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin shadow-[0_0_15px_rgba(0,242,254,0.3)]" />
      <span className="text-[11px] font-mono text-cyan-400/70 tracking-widest animate-pulse">
        CALIBRATING 3D PASS...
      </span>
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".slide-up-and-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section className="pb-section pt-20" id="about-me">
      <div id="about" className="sr-only" aria-hidden="true" />
      <div className="container" ref={container}>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-thin mb-16 slide-up-and-fade leading-tight text-foreground">
          I believe in clean architecture, writing structured code, and crafting responsive mobile &amp; web experiences tailored to real-world impact.
        </h2>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Left Column: 3D Physics Lanyard Developer Pass Showcase */}
          <div className="md:col-span-5 space-y-6">
            <div className="slide-up-and-fade space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
                <Sparkles size={12} className="animate-pulse" />
                <span>Interactive Developer Pass</span>
              </span>
              <p className="text-4xl sm:text-5xl font-anton tracking-wide text-foreground">
                Hi, I&apos;m {siteData.name}.
              </p>
            </div>

            {/* 3D Physics Lanyard Card Stage */}
            <div className="slide-up-and-fade relative w-full max-w-[420px] h-[520px] rounded-3xl bg-gradient-to-b from-[#0c1124]/90 via-[#070a14]/90 to-[#04060c]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center">
              {/* Subtle Cyan Spotlight Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-cyan-400/15 blur-[80px]"
              />

              <div className="w-full h-full">
                <Lanyard
                  frontImage="/images/lanyard-front.png"
                  backImage="/images/lanyard-back.png"
                  strapImage="/images/lanyard-strap.png"
                  cardColor="#070a14"
                  strapColor="#090d1a"
                  finish="holographic"
                  metal="silver"
                  size={0.64}
                  strapLength={0.44}
                  gravity={1.0}
                  elasticity={0.55}
                  damping={0.45}
                  breeze={0.35}
                  interactive={true}
                  intro={true}
                />
              </div>

              {/* Bottom Interactive Hint Pill */}
              <div className="pointer-events-none absolute bottom-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#070a14]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-400 shadow-md">
                <Sparkles size={11} className="animate-pulse" />
                <span>Drag badge to swing &bull; Click to flip</span>
              </div>
            </div>

            <div className="slide-up-and-fade flex flex-wrap items-center gap-4 pt-1">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.pop()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all shadow-sm"
              >
                <FileDown size={16} />
                <span>Download Full CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Bio + Personal Info Grid */}
          <div className="md:col-span-7 space-y-6">
            <div className="text-base sm:text-lg text-muted-foreground max-w-[580px] space-y-4 leading-relaxed">
              <p className="slide-up-and-fade">{siteData.bio}</p>
              <p className="slide-up-and-fade">
                My work spans cross-platform{" "}
                <span className="text-cyan-400 font-semibold">
                  Flutter &amp; Dart
                </span>{" "}
                mobile applications with offline-first{" "}
                <span className="text-foreground font-semibold">SQLite</span>{" "}
                persistence, responsive{" "}
                <span className="text-indigo-300 font-semibold">
                  React &amp; Next.js
                </span>{" "}
                web dashboards, and structured{" "}
                <span className="text-foreground font-semibold">
                  FastAPI &amp; PostgreSQL
                </span>{" "}
                backends containerized with{" "}
                <span className="text-foreground font-semibold">
                  Docker Compose
                </span>
                .
              </p>
            </div>

            {/* Quick Facts Bento Cards */}
            <div className="slide-up-and-fade pt-2 grid sm:grid-cols-2 gap-4 text-sm">
              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.1)"
                className="p-4 rounded-xl bg-[#0c1020]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-anton tracking-wider uppercase mb-1.5">
                  <GraduationCap size={16} />
                  <span>Education</span>
                </div>
                <p className="text-foreground font-medium">
                  B.S. in Software Development
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Norton University (2023 — 2026)
                </p>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.1)"
                className="p-4 rounded-xl bg-[#0c1020]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-anton tracking-wider uppercase mb-1.5">
                  <Globe size={16} />
                  <span>Spoken Languages</span>
                </div>
                <p className="text-foreground font-medium">
                  Khmer (Native) &bull; English (Intermediate)
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Bilingual EN/KM software &amp; collaboration
                </p>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.1)"
                className="p-4 rounded-xl bg-[#0c1020]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-anton tracking-wider uppercase mb-1.5">
                  <Calendar size={16} />
                  <span>Date of Birth</span>
                </div>
                <p className="text-foreground font-medium">
                  {siteData.socials.dateOfBirth || "17 December 2005"}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Cambodian Nationality
                </p>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.1)"
                className="p-4 rounded-xl bg-[#0c1020]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-anton tracking-wider uppercase mb-1.5">
                  <MapPin size={16} />
                  <span>Location</span>
                </div>
                <p className="text-foreground font-medium">
                  Khan Tuol Kouk, Phnom Penh
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Sangkat Tuek L&apos;ak Ti Pir, Cambodia
                </p>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
