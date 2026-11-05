"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Project, siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal, SectionAccentStroke } from "@/components/ui/ScrollReveal";
import { isValidLiveUrl } from "@/lib/utils";

function DeviceMockup({ project }: { project: Project }) {
  const isMobile = project.platformType === "mobile";
  const isDual = project.platformType === "dual";
  const isDailyFlow = project.slug === "daily-flow";

  if (isDailyFlow) {
    return (
      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0d1324] text-center">
        <Smartphone size={32} className="text-sky-400" aria-hidden="true" />
        <span className="text-lg font-semibold text-slate-100">Daily Flow</span>
        <span className="text-sm text-slate-400">App screenshot unavailable</span>
      </div>
    );
  }

  // 1. Mobile Flutter Application (Realistic Mobile Device Frame)
  if (isMobile) {
    return (
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#0e1424] to-[#070a14] rounded-2xl border border-white/[0.08] overflow-hidden flex items-center justify-center p-3 sm:p-5 group-hover:border-sky-500/40 transition-colors">
        {/* Subtle ambient light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-gradient from-sky-500/[0.08] to-transparent blur-xl"
        />

        {/* Smartphone Chassis */}
        <div className="relative w-[180px] sm:w-[210px] aspect-[9/16] max-h-full rounded-[1.8rem] border-[3px] border-slate-700/80 bg-slate-950 shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-1.5 transition-transform duration-500 group-hover:scale-[1.03]">
          {/* Speaker Notch */}
          <div className="h-3.5 w-full bg-slate-950 flex items-center justify-center shrink-0">
            <span className="w-12 h-2 rounded-full bg-slate-800" />
          </div>

          {/* Screen Content: Authentic Daily Flow UI Mockup */}
          {isDailyFlow ? (
            <div className="relative grow w-full rounded-[1.2rem] overflow-hidden bg-[#0A0F1D] flex flex-col p-2.5 select-none text-slate-100">
              {/* Status Bar */}
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pb-1.5 border-b border-white/[0.06]">
                <span>09:41</span>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* App Header */}
              <div className="pt-2 pb-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] tracking-tight text-slate-100">Daily Flow</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-[8px] font-mono text-amber-300 font-semibold">
                    🔥 14-Day Streak
                  </span>
                </div>
                <p className="text-[8px] font-mono text-sky-400">Offline SQLite DB</p>
              </div>

              {/* Habit Routine Cards */}
              <div className="space-y-1.5 my-auto">
                <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <p className="text-[9px] font-medium text-slate-200 truncate">Morning Algorithm Study</p>
                    <p className="text-[7.5px] font-mono text-slate-400">07:30 AM &middot; Completed</p>
                  </div>
                  <span className="size-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-[8px] font-bold shrink-0">✓</span>
                </div>

                <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <p className="text-[9px] font-medium text-slate-200 truncate">Flutter UI &amp; State Check</p>
                    <p className="text-[7.5px] font-mono text-slate-400">10:15 AM &middot; Completed</p>
                  </div>
                  <span className="size-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-[8px] font-bold shrink-0">✓</span>
                </div>

                <div className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between opacity-75">
                  <div className="min-w-0 pr-1">
                    <p className="text-[9px] font-medium text-slate-300 truncate">Database Profiling</p>
                    <p className="text-[7.5px] font-mono text-slate-400">08:00 PM &middot; Scheduled</p>
                  </div>
                  <span className="size-3.5 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-[7.5px] shrink-0">&bull;</span>
                </div>
              </div>

              {/* Notice */}
              <div className="pt-1.5 border-t border-white/[0.06] text-center">
                <span className="text-[7px] font-mono text-slate-400 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.06]">
                  UI Preview &middot; daily-flow.jpg pending
                </span>
              </div>
            </div>
          ) : (
            <div className="relative grow w-full rounded-[1.2rem] overflow-hidden bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 200px, 240px"
                className="object-cover object-top"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Dual-Client System (Desktop Browser Shell + Mobile Client Overlay)
  if (isDual) {
    return (
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#0e1424] to-[#070a14] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col shadow-xl group-hover:border-sky-500/40 transition-colors">
        {/* Desktop Browser Titlebar */}
        <div className="h-8 bg-[#0b101e] border-b border-white/[0.08] px-3.5 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </div>

          <div className="px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
            Mobile app + admin dashboard
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400">
            <Layers size={13} />
            <span className="text-[10px] hidden sm:inline">Dual System</span>
          </div>
        </div>

        {/* Desktop Admin Screenshot Viewport */}
        <div className="relative grow w-full overflow-hidden bg-slate-950">
          <Image
            src={project.image}
            alt={`Concept illustration for ${project.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-40" />

          {/* Synchronized Mobile Client Overlay Badge */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D16]/95 backdrop-blur-md border border-white/[0.12] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
            <div className="size-6 rounded-md bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Smartphone size={13} />
            </div>
            <div>
              <p className="text-[10px] font-mono font-semibold text-slate-200 leading-tight">
                Flutter Mobile Client
              </p>
              <p className="text-[9px] font-mono text-sky-400 leading-tight">
                Cart &middot; Real-Time Order Sync
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Desktop / Web Application Browser Shell (Clean Web Desktop Frame)
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#0e1424] to-[#070a14] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col shadow-xl group-hover:border-sky-500/40 transition-colors">
      {/* Browser Titlebar */}
      <div className="h-8 bg-[#0b101e] border-b border-white/[0.08] px-3.5 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-emerald-500/70" />
        </div>

        <div className="px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-slate-400 truncate max-w-[220px]">
          {project.title}
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <Monitor size={13} />
          <span className="text-[10px] font-mono hidden sm:inline">Web App</span>
        </div>
      </div>

      {/* Screenshot Frame with Hover Zoom */}
      <div className="relative grow w-full overflow-hidden bg-slate-950">
        <Image
          src={project.image}
          alt={`Concept illustration for ${project.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-40" />
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Backward-compatible anchor */}
      <div id="selected-projects" aria-hidden="true" className="sr-only" />

      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-sky-500/[0.04] blur-[150px]"
      />

      <div className="container relative z-10">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal duration={0.5} yOffset={16} className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-mono font-medium text-sky-400">
            <span className="size-1.5 rounded-full bg-sky-400" />
            <span>03 // SELECTED WORKS</span>
          </div>

          <SectionAccentStroke />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            Projects
          </h2>

        </ScrollReveal>

        {/* 2-Column Responsive Project Grid with Perspective Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {siteData.projects.map((project, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, "0");
            const hasLiveDemo = isValidLiveUrl(project.liveUrl);
            const isMobile = project.platformType === "mobile";
            const isDual = project.platformType === "dual";

            return (
              <ScrollReveal
                key={project.slug}
                duration={0.55}
                delay={idx * 0.08}
                yOffset={20}
                className="h-full"
              >
                <SpotlightCard
                  enableTilt={true}
                  spotlightColor="rgba(56, 189, 248, 0.1)"
                  className="h-full rounded-3xl border border-white/[0.08] bg-[#111827]/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between group hover:border-sky-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_24px_rgba(56,189,248,0.12)] transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Top Meta Bar with 3D Depth */}
                    <div className="flex items-center justify-between gap-3 mb-5 [transform:translateZ(10px)] transition-transform duration-300">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-sky-400">
                          _{formattedIndex}.
                        </span>
                        <span className="text-white/20">&middot;</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300 uppercase tracking-wider group-hover:border-sky-400/30 group-hover:text-sky-300 transition-colors">
                          {project.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span>{project.year}</span>
                        <span className="text-white/20">&middot;</span>
                        {isMobile ? (
                          <span className="inline-flex items-center gap-1 text-sky-400">
                            <Smartphone size={13} />
                            <span className="text-[11px]">Mobile</span>
                          </span>
                        ) : isDual ? (
                          <span className="inline-flex items-center gap-1 text-indigo-400">
                            <Layers size={13} />
                            <span className="text-[11px]">Dual-Client</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-300">
                            <Monitor size={13} />
                            <span className="text-[11px]">Web</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contextual Device Screenshot Frame with 3D Depth */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl [transform:translateZ(20px)] transition-transform duration-300"
                      aria-label={`View case study for ${project.title}`}
                    >
                      <DeviceMockup project={project} />
                    </Link>

                    {/* Title & Role with 3D Depth */}
                    <div className="space-y-1.5 [transform:translateZ(16px)] transition-transform duration-300">
                      <h3 className="text-2xl font-bold tracking-tight text-slate-100 group-hover:text-sky-300 transition-colors">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>
                      <p className="text-xs font-mono text-sky-400/90 font-medium">
                        Role: {project.role}
                      </p>
                    </div>

                    {/* Concise Technical Description / Motivation */}
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3 [transform:translateZ(12px)] transition-transform duration-300">
                      {project.description}
                    </p>

                    {/* Technology Badges with 3D Depth */}
                    <div className="mt-5 flex flex-wrap gap-1.5 [transform:translateZ(14px)] transition-transform duration-300">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-slate-300 group-hover:border-sky-400/20 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action Bar with 3D Depth */}
                  <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 [transform:translateZ(16px)] transition-transform duration-300">
                    <span className="text-xs text-slate-400">{project.role}</span>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub profile for ${project.title}`}
                          className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-sky-400/40 text-slate-400 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all"
                          title="GitHub Profile"
                        >
                          <Github size={15} />
                        </a>
                      )}

                      {hasLiveDemo && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.title}`}
                          className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-sky-400/40 text-slate-400 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all"
                          title="Live Demo"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-xs text-slate-100 bg-white/[0.04] border border-white/[0.1] hover:bg-sky-500/15 hover:border-sky-400/40 hover:text-sky-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all group/btn"
                      >
                        <span>Case Study</span>
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-200 group-hover/btn:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
