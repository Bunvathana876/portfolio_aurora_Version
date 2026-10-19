"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Lock,
  Sparkles,
} from "lucide-react";
import { siteData, type Project } from "@/data/site";
import { isValidLiveUrl } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlight({ x, y, opacity: 1 });

    if (prefersReducedMotion) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;
    setTilt({ rotateX, rotateY, y: -5 });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0, y: 0 });
  };

  const hasLiveDemo = isValidLiveUrl(project.liveUrl);
  const isFlagship = index === 0 || Boolean(project.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          y: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`group relative h-full rounded-3xl p-[1.5px] overflow-hidden transition-shadow duration-500 ${
          index === 0
            ? "shadow-[0_0_40px_-10px_rgba(34,211,238,0.28)] hover:shadow-[0_0_55px_-8px_rgba(34,211,238,0.45)]"
            : "shadow-[0_12px_36px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_45px_-10px_rgba(168,85,247,0.35)]"
        }`}
      >
        {/* Rotating Conic Gradient Border Layer (GPU Composited transform: rotate) */}
        {isFlagship && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-[120%] animate-border-spin group-hover:animate-border-spin-fast transition-opacity duration-500 ${
              index === 0
                ? "opacity-95 group-hover:opacity-100"
                : "opacity-55 group-hover:opacity-100"
            }`}
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 32%, #a855f7 54%, #22d3ee 76%, #3b82f6 92%, transparent 100%)",
            }}
          />
        )}

        {/* Inner Card Surface */}
        <div className="featured-rotating-border relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-[22.5px] bg-[#0b0d16]/95 p-6 sm:p-8 backdrop-blur-2xl">
          {/* Cursor-following spotlight glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(480px circle at ${spotlight.x}px ${spotlight.y}px, rgba(34, 211, 238, 0.14), transparent 42%)`,
            }}
          />

          {/* Top Project Preview Header */}
          <div className="relative z-10">
            <div
              className={`relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.accentColor} p-5 transition-all duration-300 group-hover:border-white/20`}
            >
              {/* Subtle shimmer bar on card hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/45 px-2.5 py-1 text-cyan-300 border border-white/10 backdrop-blur-md">
                  <Layers className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                  {project.metrics ?? "Featured System"}
                </span>

                <div className="flex items-center gap-2">
                  {index === 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/35 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                      <Sparkles className="h-2.5 w-2.5 text-cyan-300" />
                      Flagship
                    </span>
                  )}
                  <span className="text-slate-400">0{index + 1}</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-300/90">
                  {project.subtitle}
                </p>
                <h3 className="mt-1 flex items-start justify-between gap-2 font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  <span>{project.title}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300 group-hover:opacity-100" />
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags & Links Footer */}
          <div className="relative z-10 mt-7 pt-5 border-t border-white/10 space-y-5">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-cyan-200/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-cyan-500/10 hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* GitHub Button */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen group/btn inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-white/[0.1] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Github className="h-4 w-4 text-cyan-400 transition-transform duration-200 group-hover/btn:scale-110" />
                <span>Source Code</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-cyan-300" />
              </a>

              {/* Gracefully handle '#' or empty liveUrl */}
              {hasLiveDemo ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen group/live inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] active:scale-95"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Live demo currently private or local deployment"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs font-medium text-slate-500 select-none cursor-not-allowed"
                >
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Live Demo Unavailable</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
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
          03 / Selected Work
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              engineering projects.
            </span>
          </h2>
          <p className="text-sm text-slate-400 max-w-md">
            Real-world cross-platform mobile commerce, IT service management, and bilingual agricultural expert systems.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {siteData.projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
