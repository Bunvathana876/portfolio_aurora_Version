"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, CheckCircle2, GraduationCap, MapPin } from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 25%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
          04 / Journey &amp; Milestones
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Education &amp;{" "}
          <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            engineering timeline.
          </span>
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative pl-6 sm:pl-10">
        {/* Static faint track line */}
        <div
          aria-hidden="true"
          className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-[2px] bg-white/10"
        />
        {/* Animated drawing progress line */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-purple-500 via-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        />

        <div className="space-y-12">
          {siteData.timeline.map((item, idx) => (
            <motion.div
              key={`${item.role}-${idx}`}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Glowing Node */}
              <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/60 bg-[#0a0a0f] shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-transform duration-300 group-hover:scale-125 group-hover:border-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-125" />
              </div>

              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300 transition-colors group-hover:border-cyan-400/45 group-hover:bg-cyan-500/15">
                    {item.type === "education" ? (
                      <GraduationCap className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <Briefcase className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                    )}
                    {item.period}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-purple-400" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-purple-300">
                  {item.organization}
                </p>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="group/li flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 transition-transform duration-200 hover:translate-x-1"
                    >
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover/li:scale-110" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
