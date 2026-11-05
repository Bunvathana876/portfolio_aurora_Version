"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers,
  Lightbulb,
  Monitor,
  Server,
  ShieldCheck,
  Smartphone,
  UserCheck,
} from "lucide-react";
import { Project, siteData } from "@/data/site";
import { isValidLiveUrl } from "@/lib/utils";
import { ProjectCoverVisual } from "@/components/ui/ProjectCoverVisual";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Props {
  project: Project;
  projectIndex: number;
}

export function ProjectDetails({ project, projectIndex }: Props) {
  const hasLiveDemo = isValidLiveUrl(project.liveUrl);
  const isMobile = project.platformType === "mobile";
  const isDual = project.platformType === "dual";
  const isDailyFlow = project.slug === "daily-flow";

  const prevIndex =
    (projectIndex - 1 + siteData.projects.length) % siteData.projects.length;
  const nextIndex = (projectIndex + 1) % siteData.projects.length;
  const prevProject = siteData.projects[prevIndex];
  const nextProject = siteData.projects[nextIndex];

  return (
    <article className="min-h-screen pt-24 sm:pt-28 pb-20 relative">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/[0.04] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-10 w-[400px] h-[400px] rounded-full bg-blue-600/[0.03] blur-[140px]"
      />

      <div className="container max-w-5xl relative z-10">
        {/* Navigation Breadcrumb */}
        <ScrollReveal duration={0.4} yOffset={10} className="mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all group px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-sky-400/30"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Featured Projects</span>
          </Link>
        </ScrollReveal>

        {/* 1. Project Overview Header */}
        <header className="mb-12 space-y-5">
          <ScrollReveal duration={0.45} yOffset={14} className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-mono text-sky-400 font-medium">
              {project.category}
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Calendar size={12} className="text-slate-400" />
              <span>{project.year}</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <UserCheck size={12} className="text-sky-400" />
              <span>{project.role}</span>
            </span>

            {isMobile ? (
              <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Smartphone size={12} className="text-sky-400" />
                <span>Mobile App</span>
              </span>
            ) : isDual ? (
              <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Layers size={12} className="text-indigo-400" />
                <span>Dual-Client Ecosystem</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Monitor size={12} className="text-slate-300" />
                <span>Web Application</span>
              </span>
            )}
          </ScrollReveal>

          <ScrollReveal duration={0.5} delay={0.08} yOffset={16}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="text-lg sm:text-xl font-medium text-sky-400/90 tracking-tight mt-2">
                {project.subtitle}
              </p>
            )}

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl pt-3">
              {project.overview}
            </p>
          </ScrollReveal>

          {/* Action Links */}
          <ScrollReveal duration={0.45} delay={0.12} yOffset={12} className="pt-2 flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-sky-500/10 hover:border-sky-400/40 text-xs font-mono text-slate-200 hover:text-sky-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all shadow-sm"
              >
                <Github size={15} className="text-sky-400" />
                <span>Source Repository</span>
              </a>
            )}

            {hasLiveDemo && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-semibold text-xs tracking-wide shadow-md hover:from-sky-300 hover:to-blue-400 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all"
              >
                <ExternalLink size={14} />
                <span>Live Application</span>
              </a>
            )}
          </ScrollReveal>
        </header>

        {/* 2. Primary Visual Showcase (Realistic Device Framing) */}
        <ScrollReveal duration={0.55} yOffset={20} className="mb-16">
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#111827]/90 to-[#090D16]/95 backdrop-blur-xl p-4 sm:p-8 shadow-2xl overflow-hidden">
            {isMobile ? (
              <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                {/* Smartphone Chassis Frame */}
                <div className="relative w-[240px] sm:w-[280px] aspect-[9/16] rounded-[2.2rem] border-[4px] border-slate-700/80 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-2">
                  <div className="h-4 w-full bg-slate-950 flex items-center justify-center shrink-0 mb-1">
                    <span className="w-16 h-2.5 rounded-full bg-slate-800" />
                  </div>

                  {/* Screen Content: Authentic Daily Flow UI Mockup */}
                  {isDailyFlow ? (
                    <div className="relative grow w-full rounded-[1.5rem] overflow-hidden bg-[#0A0F1D] flex flex-col p-3 select-none text-slate-100">
                      {/* Mobile Status Bar */}
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                        <span>09:41</span>
                        <div className="flex items-center gap-1.5">
                          <span>5G</span>
                          <span className="size-2 rounded-full bg-emerald-400" />
                        </div>
                      </div>

                      {/* Daily Flow App Header */}
                      <div className="pt-2.5 pb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs tracking-tight text-slate-100">
                            Daily Flow
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-[9px] font-mono text-amber-300 font-semibold">
                            🔥 14-Day Streak
                          </span>
                        </div>
                        <p className="text-[9px] font-mono text-sky-400 mt-0.5">
                          SQLite Offline-First Architecture
                        </p>
                      </div>

                      {/* Habit Routine Cards */}
                      <div className="space-y-1.5 my-auto">
                        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                          <div className="min-w-0 pr-1">
                            <p className="text-[10px] font-medium text-slate-200 truncate">
                              Morning Algorithm Study
                            </p>
                            <p className="text-[8px] font-mono text-slate-400">
                              07:30 AM &middot; Completed
                            </p>
                          </div>
                          <span className="size-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-[9px] font-bold shrink-0">
                            ✓
                          </span>
                        </div>

                        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                          <div className="min-w-0 pr-1">
                            <p className="text-[10px] font-medium text-slate-200 truncate">
                              Flutter UI &amp; State Check
                            </p>
                            <p className="text-[8px] font-mono text-slate-400">
                              10:15 AM &middot; Completed
                            </p>
                          </div>
                          <span className="size-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-[9px] font-bold shrink-0">
                            ✓
                          </span>
                        </div>

                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between opacity-75">
                          <div className="min-w-0 pr-1">
                            <p className="text-[10px] font-medium text-slate-300 truncate">
                              Database Optimization
                            </p>
                            <p className="text-[8px] font-mono text-slate-400">
                              08:00 PM &middot; Scheduled
                            </p>
                          </div>
                          <span className="size-4 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-[8px] shrink-0">
                            &bull;
                          </span>
                        </div>
                      </div>

                      {/* SQLite Local Metrics */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[8px] font-mono text-slate-400">
                        <span>SQLite Local DB</span>
                        <span className="text-emerald-400">Zero Latency</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative grow w-full rounded-[1.5rem] overflow-hidden bg-slate-900">
                      <Image
                        src={project.image}
                        alt={`Concept illustration for ${project.title}`}
                        fill
                        priority
                        sizes="(max-width: 640px) 240px, 280px"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                </div>

                {isDailyFlow ? (
                  <div className="mt-4 px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/20 text-xs font-mono text-amber-300 flex items-center gap-2">
                    <AlertCircle size={13} className="shrink-0" />
                    <span>
                      Screenshot Pending: Add <code>daily-flow.jpg</code> to{" "}
                      <code>public/images/projects/</code>
                    </span>
                  </div>
                ) : (
                  <p className="mt-4 text-xs font-mono text-slate-400">
                    Mobile Application UI &middot; Flutter Client
                  </p>
                )}
              </div>
            ) : isDual ? (
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-slate-950 shadow-2xl">
                {/* Desktop Admin Titlebar */}
                <div className="h-9 bg-[#0b101e] border-b border-white/[0.08] px-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-500/70" />
                    <span className="size-2.5 rounded-full bg-amber-500/70" />
                    <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Mobile app + admin dashboard
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-400">
                    <Layers size={13} />
                    <span>Dual Client System</span>
                  </span>
                </div>

                {/* Screenshot Frame with Flutter Mobile Client Overlay */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Concept illustration for ${project.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-40" />

                  {/* Floating Flutter Mobile Phone Client Badge */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#090D16]/95 backdrop-blur-md border border-white/[0.12] shadow-2xl">
                    <div className="size-8 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
                      <Smartphone size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-slate-200 leading-tight">
                        Flutter Mobile Shopping App
                      </p>
                      <p className="text-[10px] font-mono text-sky-400 leading-tight">
                        Client Cart &middot; Order Fulfillment Sync
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-slate-950 shadow-2xl">
                {/* Desktop Browser Shell */}
                <div className="h-9 bg-[#0b101e] border-b border-white/[0.08] px-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-500/70" />
                    <span className="size-2.5 rounded-full bg-amber-500/70" />
                    <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Monitor size={13} />
                    <span>Web Interface</span>
                  </span>
                </div>
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Concept illustration for ${project.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-40" />
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* 3. Problem & Motivation */}
        {project.motivation && (
          <ScrollReveal duration={0.5} yOffset={16} className="mb-14">
            <SpotlightCard
              enableTilt={true}
              spotlightColor="rgba(56, 189, 248, 0.08)"
              className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2.5 mb-3 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Lightbulb size={16} />
                <span>Problem &amp; Motivation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-3">
                Why This System Was Built
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.motivation}
              </p>
            </SpotlightCard>
          </ScrollReveal>
        )}

        {/* 4. My Role & Key Contributions */}
        <ScrollReveal duration={0.5} yOffset={16} className="mb-14 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <UserCheck size={16} />
            <span>My Role &amp; Contributions</span>
          </div>

          <SpotlightCard
            enableTilt={true}
            spotlightColor="rgba(56, 189, 248, 0.08)"
            className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl space-y-4"
          >
            <div>
              <p className="text-xs font-mono text-slate-400">Official Capacity</p>
              <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                {project.role}
              </h3>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-3 border-t border-white/[0.06]">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Technical Contributions
                </p>
                <ul className="space-y-2.5">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-sky-400 shrink-0 mt-1"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </SpotlightCard>
        </ScrollReveal>

        {/* 5. Technology Stack */}
        <ScrollReveal duration={0.5} yOffset={16} className="mb-14 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Code2 size={16} />
            <span>Technology Stack</span>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#111827]/50 backdrop-blur-xl">
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <ScrollReveal duration={0.5} yOffset={16} className="mb-14 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <ShieldCheck size={16} />
              <span>Key Features</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-white/[0.08] bg-[#111827]/60 backdrop-blur-xl flex items-start gap-3"
                >
                  <span className="flex size-6 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* 7. Architecture & Technical Decisions */}
        {project.technicalDecisions && project.technicalDecisions.length > 0 && (
          <ScrollReveal duration={0.5} yOffset={16} className="mb-14 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Cpu size={16} />
              <span>Architecture &amp; Technical Decisions</span>
            </div>

            <SpotlightCard
              enableTilt={true}
              spotlightColor="rgba(56, 189, 248, 0.08)"
              className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl space-y-4"
            >
              <ul className="space-y-3">
                {project.technicalDecisions.map((decision, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed"
                  >
                    <span className="size-1.5 rounded-full bg-sky-400 shrink-0 mt-2.5" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </ScrollReveal>
        )}

        {/* 8. Engineering Challenges & Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <ScrollReveal duration={0.5} yOffset={16} className="mb-14 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <AlertCircle size={16} />
              <span>Engineering Challenges &amp; Solutions</span>
            </div>

            <div className="space-y-4">
              {project.challenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/60 backdrop-blur-xl space-y-3"
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                      Challenge #{idx + 1}
                    </span>
                    <p className="text-sm font-medium text-slate-200">
                      {item.challenge}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.05]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                      Engineered Solution
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* 9. Architectural Schematic Blueprint */}
        <ScrollReveal duration={0.5} yOffset={16} className="mb-16 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Layers size={16} />
            <span>Architectural Dataflow Blueprint</span>
          </div>

          <ProjectCoverVisual
            project={project}
            index={projectIndex}
            showSchematic={true}
          />
        </ScrollReveal>

        {/* Previous & Next Case Study Navigation Footer */}
        <footer className="pt-10 border-t border-white/[0.08] grid sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/60 hover:border-sky-500/40 hover:bg-[#111827]/90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all duration-200 shadow-lg"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>Previous Project</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors truncate">
              {prevProject.title}
            </h4>
            <p className="text-xs font-mono text-sky-400 mt-1 truncate">
              {prevProject.category} &middot; {prevProject.year}
            </p>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/60 hover:border-sky-500/40 hover:bg-[#111827]/90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all duration-200 text-right shadow-lg"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-slate-400 mb-2">
              <span>Next Project</span>
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors truncate">
              {nextProject.title}
            </h4>
            <p className="text-xs font-mono text-sky-400 mt-1 truncate">
              {nextProject.category} &middot; {nextProject.year}
            </p>
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default ProjectDetails;
