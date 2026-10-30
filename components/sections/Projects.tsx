"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  ArrowUpRight,
  Code2,
  Github,
  LayoutGrid,
  List,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { sound } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  useGSAP(
    () => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [view] }
  );

  return (
    <section
      className="py-24 md:py-32 relative"
      id="selected-projects"
      ref={containerRef}
    >
      <div id="projects" className="sr-only" aria-hidden="true" />

      <div className="container">
        {/* Header with Title & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
              <Sparkles size={12} className="animate-pulse" />
              <span>02 / Selected Works</span>
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-anton uppercase tracking-tight text-foreground">
              Featured Engineering Works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              Production-grade mobile applications with Flutter, deterministic AI diagnostic engines, and containerized full-stack web platforms.
            </p>
          </div>

          {/* Minimal View Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0c1020] border border-white/10 self-start sm:self-end shadow-md">
            <button
              type="button"
              onClick={() => {
                sound.tick();
                setView("grid");
              }}
              aria-label="Grid layout"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                view === "grid"
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid size={13} />
              <span>Showcase</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.tick();
                setView("list");
              }}
              aria-label="List layout"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                view === "list"
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List size={13} />
              <span>Index</span>
            </button>
          </div>
        </div>

        {/* Showcase Grid Mode: Interactive Project Cards with Real Screenshots */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {siteData.projects.map((project, idx) => {
              const formattedIndex = String(idx + 1).padStart(2, "0");
              const isMobileFirst =
                project.slug === "daily-flow" ||
                project.slug === "dual-client-ecommerce";

              return (
                <SpotlightCard
                  key={project.slug}
                  spotlightColor="rgba(0, 242, 254, 0.12)"
                  className="project-card rounded-2xl border border-white/10 bg-[#0c1020]/90 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="font-anton text-base text-cyan-400">
                          _{formattedIndex}.
                        </span>
                        <span className="text-white/20">&middot;</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          {project.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-400/90 font-medium">
                          {project.year}
                        </span>
                        {isMobileFirst ? (
                          <Smartphone size={14} className="text-muted-foreground" />
                        ) : (
                          <Monitor size={14} className="text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Realistic Device Mockup Shell with Real Project Cover Screenshot */}
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => sound.tick()}
                      className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-[#060811] shadow-2xl group-hover:border-cyan-400/40 transition-all duration-500 mb-6 flex flex-col cursor-pointer"
                    >
                      {/* Browser Window Titlebar */}
                      <div className="h-7 bg-[#0b0f1e] border-b border-white/10 px-3 flex items-center justify-between shrink-0 select-none z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-[#ff5f56]" />
                          <span className="size-2 rounded-full bg-[#ffbd2e]" />
                          <span className="size-2 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground/80 truncate max-w-[220px]">
                          {project.slug}.dev &middot; {project.role}
                        </span>
                        <div className="size-3" />
                      </div>

                      {/* Real Project Cover Image with Hover Zoom */}
                      <div className="relative grow w-full overflow-hidden bg-[#070913]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c1020] via-transparent to-transparent opacity-60" />
                      </div>
                    </Link>

                    {/* Project Title */}
                    <h3 className="font-anton text-2xl sm:text-3xl text-foreground group-hover:text-cyan-400 transition-colors duration-200">
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={() => sound.tick()}
                      >
                        {project.title}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-muted-foreground group-hover:border-cyan-400/20 group-hover:text-foreground transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 text-[11px] font-mono text-muted-foreground/60">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400/80 truncate max-w-[200px]">
                      {project.metrics || "Production Ready"}
                    </span>

                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => sound.pop()}
                      className="inline-flex items-center gap-1.5 text-xs font-anton tracking-wider text-foreground hover:text-cyan-400 transition-colors group/btn cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-cyan-400"
                      />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        ) : (
          /* List Index Mode */
          <div className="border-t border-white/10 divide-y divide-white/10">
            {siteData.projects.map((project, idx) => {
              const formattedIndex = String(idx + 1).padStart(2, "0");

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onClick={() => sound.tick()}
                  className="group py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start md:items-center gap-4 sm:gap-6">
                    <span className="font-anton text-lg text-cyan-400 w-8 shrink-0">
                      _{formattedIndex}.
                    </span>
                    <div>
                      <h4 className="font-anton text-2xl sm:text-3xl text-foreground group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {project.category} &middot; {project.year} &middot; {project.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="hidden sm:flex gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="size-8 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
