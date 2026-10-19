"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
} from "lucide-react";
import { siteData, type SkillCategory } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "mobile":
      return <Smartphone className="h-5 w-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />;
    case "frontend":
      return <Layout className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110" />;
    case "backend":
      return <Server className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:scale-110" />;
    case "database & orm":
      return <Database className="h-5 w-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />;
    default:
      return <Wrench className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />;
  }
}

function getAccentClasses(accent: SkillCategory["accent"]) {
  switch (accent) {
    case "cyan":
      return "hover:border-cyan-400/40 from-cyan-500/15 via-transparent to-transparent";
    case "purple":
      return "hover:border-purple-400/40 from-purple-500/15 via-transparent to-transparent";
    case "blue":
      return "hover:border-blue-400/40 from-blue-500/15 via-transparent to-transparent";
    case "emerald":
      return "hover:border-emerald-400/40 from-emerald-500/15 via-transparent to-transparent";
    case "amber":
      return "hover:border-amber-400/40 from-amber-500/15 via-transparent to-transparent";
  }
}

export function Skills() {
  const allSkills = siteData.skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      name: skill,
      category: cat.category,
    }))
  );

  const marqueeItems = [...allSkills, ...allSkills];

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
          02 / Technical Arsenal
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Full-stack &amp; mobile{" "}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              capabilities.
            </span>
          </h2>
          <p className="text-sm text-slate-400 max-w-md">
            From Flutter mobile apps with offline catalog state to Python/Next.js backends and relational databases.
          </p>
        </div>
      </motion.div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative mb-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] py-4 backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent"
        />

        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group/chip flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-white/[0.08] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 group-hover/chip:rotate-12 group-hover/chip:scale-110" />
              <span>{item.name}</span>
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 group-hover/chip:text-cyan-200 transition-colors">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {siteData.skillCategories.map((group, idx) => {
          const spanClass = idx < 2 ? "md:col-span-3" : "md:col-span-2";

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={spanClass}
            >
              <SpotlightCard
                className={`h-full bg-gradient-to-br ${getAccentClasses(
                  group.accent
                )} p-6 sm:p-7`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors group-hover:border-white/25">
                      {getCategoryIcon(group.category)}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                      {group.category}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs text-slate-400 group-hover:border-cyan-400/30 group-hover:text-cyan-200 transition-colors">
                    {group.skills.length} tools
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0a0a0f]/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-100 transition-all duration-200 group-hover:border-white/20 hover:-translate-y-0.5 hover:!border-cyan-400/55 hover:bg-cyan-500/10 hover:text-cyan-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
