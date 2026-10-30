"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Sparkles } from "lucide-react";
import { siteData } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".slide-up",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section className="py-24 md:py-32 relative" id="my-stack" ref={containerRef}>
      <div id="skills" className="sr-only" aria-hidden="true" />
      <div className="container">
        {/* Header */}
        <div className="mb-14 sm:mb-20 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>04 / Technical Stack</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-anton uppercase tracking-tight text-foreground">
            Technologies &amp; Architecture
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Technologies, libraries, and tools I use to design, build, and deploy production-ready applications.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20">
          {Object.entries(siteData.myStack).map(([key, value]) => (
            <div className="grid sm:grid-cols-12 gap-6 sm:gap-10 items-start" key={key}>
              <div className="sm:col-span-4">
                <p className="slide-up text-3xl sm:text-4xl font-anton leading-none text-cyan-400 tracking-wide uppercase">
                  {key}
                </p>
              </div>

              <div className="sm:col-span-8 flex gap-4 sm:gap-6 flex-wrap">
                {value.map((item: { name: string; icon: string }) => (
                  <div
                    className="slide-up flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0c1020]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:bg-[#101730] transition-all shadow-md group"
                    key={item.name}
                  >
                    <div className="size-8 relative shrink-0 flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="max-h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-base font-semibold text-foreground tracking-wide">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Core Strengths & Traits Row */}
          <div className="grid sm:grid-cols-12 gap-6 sm:gap-10 items-start pt-10 border-t border-white/10">
            <div className="sm:col-span-4">
              <p className="slide-up text-3xl sm:text-4xl font-anton leading-none text-indigo-400 tracking-wide uppercase">
                STRENGTHS
              </p>
            </div>

            <div className="sm:col-span-8 flex gap-3 flex-wrap">
              {siteData.coreSkills.map((skill) => (
                <div
                  key={skill}
                  className="slide-up flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0c1020]/80 backdrop-blur-xl border border-white/10 text-sm font-mono text-foreground hover:border-cyan-400/40 hover:text-cyan-400 transition-all shadow-sm"
                >
                  <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
