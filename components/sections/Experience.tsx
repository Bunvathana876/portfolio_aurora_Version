"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { sound } from "@/lib/sound";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "education" | "engineering">("all");

  const filteredItems = siteData.timeline.filter((item) => {
    if (filter === "education") return item.type === "education";
    if (filter === "engineering") return item.type !== "education";
    return true;
  });

  useGSAP(
    () => {
      gsap.fromTo(
        ".experience-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [filter] }
  );

  return (
    <section className="py-24 md:py-32 relative" id="my-experience" ref={containerRef}>
      <div id="experience" className="sr-only" aria-hidden="true" />
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
              <Sparkles size={12} className="animate-pulse" />
              <span>03 / Career &amp; Academia</span>
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-anton uppercase tracking-tight text-foreground">
              Experience &amp; Education
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              My academic foundation in software development at Norton University alongside hands-on application engineering across mobile, web, and distributed systems.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0c1020] border border-white/10 self-start sm:self-end shadow-md">
            <button
              type="button"
              onClick={() => {
                sound.tick();
                setFilter("all");
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({siteData.timeline.length})
            </button>
            <button
              type="button"
              onClick={() => {
                sound.tick();
                setFilter("education");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === "education"
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap size={13} />
              <span>Education</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.tick();
                setFilter("engineering");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === "engineering"
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase size={13} />
              <span>Engineering</span>
            </button>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="relative pl-0 sm:pl-8 sm:border-l sm:border-white/10 space-y-8">
          {filteredItems.map((item, idx) => {
            const isEducation = item.type === "education";

            return (
              <div key={`${item.organization}-${idx}`} className="relative group">
                {/* Timeline Node Dot (visible on tablet/desktop) */}
                <div
                  aria-hidden="true"
                  className={`hidden sm:flex absolute -left-[41px] top-6 size-5 rounded-full items-center justify-center border transition-all duration-300 ${
                    isEducation
                      ? "border-emerald-400/60 bg-[#070a14] group-hover:border-emerald-400 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                      : "border-cyan-400/60 bg-[#070a14] group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,242,254,0.5)]"
                  }`}
                >
                  <div
                    className={`size-2 rounded-full ${
                      isEducation ? "bg-emerald-400" : "bg-cyan-400"
                    }`}
                  />
                </div>

                <SpotlightCard
                  spotlightColor={
                    isEducation
                      ? "rgba(52, 211, 153, 0.12)"
                      : "rgba(0, 242, 254, 0.12)"
                  }
                  className="experience-item p-6 sm:p-8 rounded-2xl bg-[#0c1020]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-7 rounded-lg flex items-center justify-center border ${
                          isEducation
                            ? "bg-emerald-400/10 border-emerald-400/25 text-emerald-400"
                            : "bg-cyan-400/10 border-cyan-400/25 text-cyan-400"
                        }`}
                      >
                        {isEducation ? (
                          <GraduationCap size={15} />
                        ) : (
                          <Briefcase size={15} />
                        )}
                      </div>
                      <span className="font-anton text-base sm:text-lg tracking-wide uppercase text-foreground">
                        {item.organization}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 font-medium">
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-2xl sm:text-3xl font-anton text-foreground leading-snug group-hover:text-cyan-400 transition-colors">
                    {item.role}
                  </h3>

                  {/* Location */}
                  <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 mt-2 mb-4">
                    <MapPin size={13} className="text-cyan-400" />
                    <span>{item.location}</span>
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights / Skills */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {item.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-xs font-mono text-foreground/90 group-hover:border-cyan-400/20 transition-all"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
