"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  GraduationCap,
  MapPin,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
          01 / About Me
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Engineering across{" "}
          <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            mobile &amp; full-stack web.
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Glowing Portrait / Avatar Frame */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-sm">
            {/* Animated Aurora Glow Frame */}
            <div
              aria-hidden="true"
              className="-inset-1 absolute rounded-3xl bg-gradient-to-tr from-purple-600 via-cyan-400 to-blue-600 opacity-50 blur-xl transition duration-500 group-hover:opacity-80"
            />
            <SpotlightCard className="border-white/15 bg-[#0e101a]/90 p-6 shadow-2xl">
              {/* Futuristic Visual Portrait Placeholder */}
              <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#131629] via-[#0b0d17] to-[#191233] flex flex-col items-center justify-center p-6 text-center transition-colors duration-300 group-hover:border-cyan-400/30">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-grid-pattern opacity-40"
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/25 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />

                {/* Monogram Badge */}
                <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/30 bg-white/[0.04] shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400/55">
                  <span className="font-display text-4xl font-bold bg-gradient-to-br from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                    {siteData.initials}
                  </span>
                </div>

                <h3 className="relative font-display text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                  {siteData.name}
                </h3>
                <p className="relative mt-1 text-xs font-medium text-cyan-300">
                  {siteData.role}
                </p>

                <div className="relative mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-[11px] text-slate-300 transition-colors group-hover:border-cyan-400/30">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{siteData.socials.location}</span>
                </div>
              </div>

              {/* Terminal status bar */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  status: building
                </span>
                <span>Norton Univ. • Y4</span>
              </div>
            </SpotlightCard>
          </div>
        </motion.div>

        {/* Bio & Stats Grid */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 space-y-8"
        >
          <SpotlightCard className="p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 mb-4">
              <TerminalSquare className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:rotate-6" />
              <span>Biography &amp; Focus</span>
            </div>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {siteData.bio}
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="group/edu flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-all hover:border-white/10 hover:bg-white/[0.03]">
                <GraduationCap className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover/edu:scale-110" />
                <div>
                  <p className="font-semibold text-white">Education</p>
                  <p className="text-slate-400">
                    B.Sc. CS &amp; Software Engineering (Year 4), Norton University
                  </p>
                </div>
              </div>
              <div className="group/spec flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-all hover:border-white/10 hover:bg-white/[0.03]">
                <Code2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover/spec:scale-110" />
                <div>
                  <p className="font-semibold text-white">Core Specialties</p>
                  <p className="text-slate-400">
                    Flutter/Dart, Next.js, TypeScript, FastAPI/Flask &amp; PostgreSQL
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Fun / Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {siteData.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <SpotlightCard className="h-full rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400/60 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-cyan-300" />
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                    {stat.detail}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
