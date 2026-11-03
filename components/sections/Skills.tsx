"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Database,
  Layers,
  Layout,
  LucideIcon,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal, ScrollRevealItem, SectionAccentStroke } from "@/components/ui/ScrollReveal";

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  tagline: string;
  icon: LucideIcon;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Mobile Development",
    tagline: "Cross-platform mobile applications with offline persistence",
    icon: Smartphone,
    skills: [
      { name: "Flutter", icon: "/logo/flutter.svg" },
      { name: "Dart", icon: "/logo/dart.svg" },
      { name: "SQLite (Offline)", icon: "/logo/sqlite.svg" },
    ],
  },
  {
    title: "Frontend Development",
    tagline: "Modern, responsive web applications and dashboards",
    icon: Layout,
    skills: [
      { name: "React", icon: "/logo/react.png" },
      { name: "Next.js", icon: "/logo/next.png" },
      { name: "TypeScript", icon: "/logo/ts.png" },
      { name: "Tailwind CSS", icon: "/logo/tailwind.png" },
      { name: "JavaScript", icon: "/logo/js.png" },
    ],
  },
  {
    title: "Backend & APIs",
    tagline: "Fast asynchronous APIs and structured microservices",
    icon: Server,
    skills: [
      { name: "Python", icon: "/logo/python.svg" },
      { name: "FastAPI", icon: "/logo/fastapi.svg" },
      { name: "Node.js", icon: "/logo/node.png" },
      { name: "Express.js", icon: "/logo/express.png" },
    ],
  },
  {
    title: "Databases & DevOps",
    tagline: "Relational schemas, local databases, and containerization",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: "/logo/postgreSQL.png" },
      { name: "MySQL", icon: "/logo/mysql.svg" },
      { name: "SQLite", icon: "/logo/sqlite.svg" },
      { name: "Docker", icon: "/logo/docker.svg" },
      { name: "Git", icon: "/logo/git.png" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      {/* Backward-compatible legacy anchor */}
      <div id="my-stack" aria-hidden="true" className="sr-only" />

      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 w-96 h-96 rounded-full bg-blue-500/[0.03] blur-[140px]"
      />

      <div className="container relative z-10">
        {/* Header with ScrollReveal */}
        <ScrollReveal duration={0.5} yOffset={16} className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-mono font-medium text-sky-400">
            <span className="size-1.5 rounded-full bg-sky-400" />
            <span>02 // TECHNICAL COMPETENCIES</span>
          </div>

          <SectionAccentStroke />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            Technologies &amp; Architecture
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed pt-1">
            Verified technologies, frameworks, and tools applied across production applications, academic engineering, and personal projects.
          </p>
        </ScrollReveal>

        {/* 4 Category Cards Grid with Staggered Cascades */}
        <ScrollReveal
          staggerChildren={0.08}
          delay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;

            return (
              <ScrollRevealItem key={cat.title} yOffset={16}>
                <SpotlightCard
                  enableTilt={true}
                  spotlightColor="rgba(56, 189, 248, 0.12)"
                  className="h-full p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl hover:border-sky-500/35 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Category Header with Tactile Reticle Illumination */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative flex size-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-400/25 text-sky-400 group-hover:border-sky-400/50 group-hover:bg-sky-500/15 transition-all">
                        {/* Precision Reticle Ring (Tasteful static alignment with soft hover illumination) */}
                        <svg
                          viewBox="0 0 44 44"
                          fill="none"
                          aria-hidden="true"
                          className="absolute inset-0 size-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <circle
                            cx="22"
                            cy="22"
                            r="19"
                            stroke="#38BDF8"
                            strokeWidth="1"
                            strokeDasharray="3 5"
                            className="origin-center transition-all duration-300 group-hover:stroke-sky-300"
                          />
                        </svg>
                        <Icon size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100 tracking-tight">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      {cat.tagline}
                    </p>

                    {/* Skills Grid with Tactile Micro-Interactions (Max 3px lift, 200ms transition) */}
                    <div className="flex flex-wrap gap-2.5" role="list">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          tabIndex={0}
                          role="listitem"
                          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-400/40 hover:bg-sky-500/[0.08] hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(56,189,248,0.12)] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all duration-200 group/pill cursor-default select-none"
                        >
                          <div className="relative size-5 shrink-0 flex items-center justify-center">
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              width={20}
                              height={20}
                              className="max-h-5 w-5 object-contain transition-transform duration-200 group-hover/pill:scale-105"
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-200 group-hover/pill:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>

        {/* Engineering Strengths Tag Cloud */}
        <ScrollReveal
          duration={0.5}
          delay={0.15}
          yOffset={16}
          className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#111827]/40 backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 mb-1">
                Engineering Strengths &amp; Principles
              </p>
              <p className="text-xs text-slate-400">
                Core behavioral competencies, code standards, and teamwork approaches.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {siteData.coreSkills.map((trait) => (
                <span
                  key={trait}
                  tabIndex={0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 hover:border-sky-400/40 hover:bg-sky-500/[0.08] hover:text-sky-300 hover:-translate-y-[2px] hover:shadow-[0_2px_12px_rgba(56,189,248,0.1)] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all duration-200 cursor-default select-none"
                >
                  <CheckCircle2 size={12} className="text-sky-400 shrink-0" />
                  <span>{trait}</span>
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Skills;
