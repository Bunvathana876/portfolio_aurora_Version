"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { siteData } from "@/data/site";
import { FadeIn } from "@/components/ui/SectionTransition";
import { ProjectCoverVisual } from "@/components/ui/ProjectCoverVisual";

type ViewMode = "list" | "grid";

export function Projects() {
  const [view, setView] = useState<ViewMode>("list");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Smooth cursor-tracking coordinates for desktop floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = listContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    // Position floating preview offset slightly from the cursor, clamped within container bounds
    const rawX = e.clientX - rect.left + 28;
    const rawY = e.clientY - rect.top - 90;
    const maxX = Math.max(0, rect.width - 320);
    mouseX.set(Math.min(Math.max(24, rawX), maxX));
    mouseY.set(rawY);
  };

  const activeProject =
    hoveredIndex !== null ? siteData.projects[hoveredIndex] : null;

  return (
    <section
      id="projects"
      className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      {/* Section Header + Minimal Segmented View Toggle */}
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <p className="editorial-label mb-3">03 / Selected Index</p>
          <h2 className="font-serif project-title-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.04] tracking-[-0.025em] text-foreground">
            Selected <em className="italic">engineering</em> works.
          </h2>
          <p className="editorial-prose text-muted mt-4">
            An editorial index of cross-platform Flutter mobile applications, bilingual agricultural expert diagnosis systems, offline-first routine tracking, and full-stack retail web platforms.
          </p>
        </div>

        {/* Minimal Segmented View Toggle */}
        <div className="flex items-center self-start md:self-end">
          <div
            role="group"
            aria-label="Project layout view"
            className="inline-flex items-center border border-neutral-200 dark:border-neutral-800 bg-background p-0.5"
          >
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none ${
                view === "list"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" aria-hidden="true" />
              <span>List</span>
            </button>

            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none ${
                view === "grid"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </FadeIn>

      {/* View Switcher with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div
            key="list-view"
            ref={listContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative border-t border-neutral-200 dark:border-neutral-800"
          >
            {/* Column Headers (Desktop Editorial Index Header) */}
            <div
              aria-hidden="true"
              className="hidden md:grid md:grid-cols-12 items-center py-3 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-mono uppercase tracking-widest text-muted"
            >
              <span className="col-span-1">No.</span>
              <span className="col-span-6">Project Title</span>
              <span className="col-span-3">Category</span>
              <span className="col-span-1 text-right">Year</span>
              <span className="col-span-1 text-right">Read</span>
            </div>

            {siteData.projects.map((project, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  className="group relative block border-b border-neutral-200 dark:border-neutral-800 py-7 sm:py-9 transition-colors duration-300 hover:bg-surface/40 focus-visible:outline-none focus-visible:bg-surface/40"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-baseline md:items-center gap-y-3 md:gap-x-6">
                    {/* Index Number */}
                    <div className="md:col-span-1 flex items-center justify-between md:block">
                      <span className="font-mono text-xs text-muted tabular-nums">
                        {formattedIndex}
                      </span>
                      <span className="md:hidden inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
                        <span>{project.category}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </span>
                    </div>

                    {/* Large Editorial Serif Title */}
                    <div className="md:col-span-6 pr-8 md:pr-4">
                      <h3 className="font-serif project-title-serif text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.1] text-foreground transition-transform duration-300 ease-editorial group-hover:translate-x-3 group-focus-visible:translate-x-3">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="mt-1.5 text-sm text-muted transition-transform duration-300 ease-editorial group-hover:translate-x-3 group-focus-visible:translate-x-3">
                          {project.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="hidden md:block md:col-span-3">
                      <span className="text-xs uppercase tracking-widest text-muted group-hover:text-foreground transition-colors duration-300">
                        {project.category}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="hidden md:block md:col-span-1 text-right">
                      <span className="text-xs uppercase tracking-widest text-muted tabular-nums">
                        {project.year}
                      </span>
                    </div>

                    {/* Far-Right Arrow Icon */}
                    <div className="
                      absolute right-0 top-7 sm:top-9
                      md:static md:col-span-1 flex justify-end items-center
                    ">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center text-foreground transition-transform duration-300 ease-editorial group-hover:rotate-45 group-hover:text-accent group-focus-visible:rotate-45 group-focus-visible:text-accent"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Desktop Floating Hover Preview Image (pointer-events-none, hidden on mobile/touch) */}
            <motion.div
              aria-hidden="true"
              style={{ x: smoothX, y: smoothY }}
              initial={false}
              animate={{
                opacity: activeProject ? 1 : 0,
                scale: activeProject ? 1 : 0.94,
              }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none hidden md:block absolute top-0 left-0 z-30 w-72 lg:w-80 aspect-[16/10] border border-neutral-200 dark:border-neutral-800 bg-background shadow-2xl overflow-hidden"
            >
              {activeProject && (
                <ProjectCoverVisual
                  project={activeProject}
                  index={hoveredIndex ?? 0}
                  compact
                />
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-neutral-200 dark:border-neutral-800"
          >
            {siteData.projects.map((project, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col border-b border-neutral-200 dark:border-neutral-800 pb-7 pt-6 focus-visible:outline-none"
                >
                  {/* Large 16:10 Image Container with Subtle Scale on Hover */}
                  <div className="aspect-[16/10] w-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-surface">
                    <ProjectCoverVisual
                      project={project}
                      index={index}
                      imageClassName="group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-500 ease-editorial"
                    />
                  </div>

                  {/* Compact Editorial Caption Row Underneath */}
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-3.5 min-w-0">
                      <span className="font-mono text-xs text-muted tabular-nums shrink-0">
                        {formattedIndex}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif project-title-serif text-2xl sm:text-3xl leading-[1.12] text-foreground group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs uppercase tracking-widest text-muted">
                          {project.category} <span aria-hidden="true">·</span>{" "}
                          {project.year}
                        </p>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center text-muted transition-all duration-300 ease-editorial group-hover:rotate-45 group-hover:text-accent"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
