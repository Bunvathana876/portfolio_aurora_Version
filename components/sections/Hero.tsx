"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LiveStatusPill } from "@/components/ui/LiveStatusPill";

const HeroOrbCanvas = dynamic(() => import("@/components/ui/HeroOrbCanvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="relative flex h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px] items-center justify-center"
    >
      <div className="h-56 w-56 rounded-full bg-gradient-to-tr from-purple-500/40 via-cyan-400/40 to-blue-500/40 blur-2xl animate-pulse" />
    </div>
  ),
});

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState(siteData.role);
  const [isDeleting, setIsDeleting] = useState(false);

  // Normalized mouse coordinates [-0.5, 0.5] for subtle multi-depth hero parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 110, damping: 24, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Multi-plane parallax transforms (kept on compositor via translate)
  const bgX = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [26, -26]);

  const pillX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const pillY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const titleX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const titleY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const copyX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const copyY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const ctaX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const ctaY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const orbX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  const badgeFastX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const badgeFastY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedRole(siteData.role);
      return;
    }

    const currentFullRole = siteData.roles[roleIndex % siteData.roles.length];
    const typingSpeed = isDeleting ? 30 : 55;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedRole === currentFullRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedRole === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % siteData.roles.length);
      } else {
        setDisplayedRole(
          currentFullRole.substring(
            0,
            displayedRole.length + (isDeleting ? -1 : 1)
          )
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex, prefersReducedMotion]);

  return (
    <section
      id="hero"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Aurora Mesh Glows with Inverse Parallax */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-[130px] animate-aurora-slow" />
        <div className="absolute top-1/3 right-10 h-[460px] w-[460px] rounded-full bg-cyan-500/15 blur-[130px] animate-aurora-slow" />
        <div className="absolute -bottom-32 left-1/3 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[130px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs with Layered Mouse Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Live Status Pill (Available / Working On / Listening To) */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: pillX, y: pillY }}
          >
            <LiveStatusPill />
          </motion.div>

          {/* Confident Display Headline & Typing Role */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: titleX, y: titleY }}
            className="w-full"
          >
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-slate-400 mb-2">
              Hi, I&apos;m
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                {siteData.name}
              </span>
            </h1>

            {/* Animated Typing / Reveal Role */}
            <div className="mt-4 flex items-center gap-2.5 min-h-[2.5rem] sm:min-h-[3rem]">
              <Terminal className="h-5 w-5 text-cyan-400 shrink-0" />
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {displayedRole}
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-6 w-[2px] bg-cyan-400 align-middle animate-pulse"
                />
              </h2>
            </div>
          </motion.div>

          {/* Punchy Tagline & Metadata Badges */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: copyX, y: copyY }}
          >
            <p className="mt-5 max-w-2xl text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              {siteData.tagline}
            </p>

            {/* Location & University Badge */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
              <span className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/[0.06]">
                <MapPin className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:scale-110" />
                {siteData.socials.location}
              </span>
              <span className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400/35 hover:bg-white/[0.06]">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 transition-transform group-hover:rotate-12" />
                Norton University (CS &amp; SE)
              </span>
            </div>
          </motion.div>

          {/* Two CTA Buttons: View Work & Contact */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: ctaX, y: ctaY }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_45px_rgba(34,211,238,0.55)]"
            >
              <span>View Work</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="group rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white"
            >
              <Mail className="h-4 w-4 text-cyan-400 transition-transform duration-200 group-hover:scale-110" />
              <span>Contact</span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating 3D Orb + Parallax Telemetry Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          style={prefersReducedMotion ? undefined : { x: orbX, y: orbY }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          <HeroOrbCanvas />

          {/* Floating Parallax Depth Chips around the Orb */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { x: badgeFastX, y: badgeFastY }
            }
            className="pointer-events-none absolute inset-0 hidden sm:block"
          >
            <div className="pointer-events-auto group absolute top-6 left-2 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#0c0e18]/85 px-3.5 py-2 text-xs text-slate-200 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/45">
              <Layers className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:rotate-12" />
              <span className="font-mono text-[11px]">Flutter • 60fps UI</span>
            </div>

            <div className="pointer-events-auto group absolute bottom-8 right-2 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#0c0e18]/85 px-3.5 py-2 text-xs text-slate-200 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/45">
              <Cpu className="h-3.5 w-3.5 text-purple-400 transition-transform group-hover:scale-110" />
              <span className="font-mono text-[11px]">Next.js • FastAPI</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
