"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  FileDown,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Smartphone,
} from "lucide-react";
import { siteData } from "@/data/site";
import { useToast } from "@/components/ui/Toast";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroGradientWaves } from "@/components/sections/HeroGradientWaves";
import { TechText } from "@/components/ui/TechText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  // Pointer-responsive subtle depth on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Layered depth transforms
  const portraitDepthX = useTransform(smoothMouseX, (v) => v * 0.7);
  const portraitDepthY = useTransform(smoothMouseY, (v) => v * 0.7);
  const badgeDepthX = useTransform(smoothMouseX, (v) => v * 1.6);
  const badgeDepthY = useTransform(smoothMouseY, (v) => v * 1.6);
  const orbitalDepthX = useTransform(smoothMouseX, (v) => v * -0.5);
  const orbitalDepthY = useTransform(smoothMouseY, (v) => v * -0.5);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(relX * 10);
    mouseY.set(relY * 10);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Performance Safeguard: Pause decorative continuous animations when hero is offscreen or page is hidden
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsHeroVisible(false);
      } else if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setIsHeroVisible(rect.bottom > 0 && rect.top < window.innerHeight);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteData.socials.email);
      setCopiedEmail(true);
      toast({
        title: "Email copied to clipboard",
        description: siteData.socials.email,
        type: "success",
      });
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      toast({
        title: "Email address",
        description: siteData.socials.email,
        type: "info",
      });
    }
  };

  const floatingStyle: React.CSSProperties = {
    animationPlayState: isHeroVisible && !shouldReduceMotion ? "running" : "paused",
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[calc(100svh-4rem)] pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 flex items-center overflow-hidden"
    >
      {/* Legacy anchor compatibility */}
      <div id="banner" aria-hidden="true" className="sr-only" />

      {/* Animated Gradient Waves Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <HeroGradientWaves isPaused={!isHeroVisible} />
      </div>

      {/* Subtle Ambient Spatial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-[440px] w-[440px] rounded-full bg-sky-500/[0.06] blur-[140px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full bg-blue-600/[0.05] blur-[130px] z-0"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Role Headline, Bio, CTAs & Channels (Cinematic Motion) */}
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start max-w-2xl"
          >
            {/* Status & Location Pill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827]/80 backdrop-blur-md border border-white/[0.08] text-xs text-slate-300 shadow-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="font-medium text-slate-200">
                  Available for Opportunities
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400">
                <MapPin size={12} className="text-sky-400" />
                <span>Phnom Penh, Cambodia</span>
              </span>
            </motion.div>

            {/* Tasteful Precision Accent Line */}
            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-[2px] w-24 bg-gradient-to-r from-sky-400 via-sky-300 to-transparent rounded-full animate-laser mb-4"
            />

            {/* Primary Value-Focused Headline with Interactive TechText */}
            <motion.h1
              variants={itemVariants}
              className="w-full text-slate-100"
            >
              <span className="sr-only">Software Developer</span>
              <div className="w-full h-[72px] sm:h-[95px] lg:h-[115px] relative -ml-1 sm:-ml-2">
                <TechText
                  text="Software Developer"
                  align="left"
                  fontWeight={700}
                  fontSize={72}
                  color="#f8fafc"
                  accentColor="#38bdf8"
                  dashLength={4}
                  dashGap={2}
                  strokeWidth={1.5}
                  specks={15}
                  reveal="letter"
                  clickKick={true}
                  draggable={true}
                  bounce={0.4}
                  sweep={true}
                  speed={0.8}
                  guides={false}
                />
              </div>
            </motion.h1>

            {/* Concise Professional Bio */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed"
            >
              Hi, I&apos;m{" "}
              <span className="font-semibold text-slate-200">
                {siteData.name}
              </span>
              . A Software Developer and senior student pursuing a{" "}
              <span className="text-slate-200 font-medium">
                B.S. in Software Development
              </span>{" "}
              at{" "}
              <span className="text-slate-200 font-medium">
                Norton University (2023–2026)
              </span>
              . I specialize in cross-platform mobile engineering with{" "}
              <span className="text-sky-400 font-medium">Flutter &amp; Dart</span>{" "}
              and robust full-stack web systems with{" "}
              <span className="text-sky-300 font-medium">
                React, Next.js, and FastAPI
              </span>
              .
            </motion.p>

            {/* Primary Actions with Magnetic CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3.5">
              <MagneticButton strength={0.2}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-semibold text-sm tracking-wide shadow-[0_0_24px_rgba(56,189,248,0.25)] hover:shadow-[0_0_32px_rgba(56,189,248,0.4)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all duration-200 group cursor-pointer"
                >
                  <span>View Projects</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.14}>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.1] bg-[#111827]/60 hover:bg-[#111827] hover:border-sky-400/40 text-slate-200 font-medium text-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all duration-200 shadow-sm"
                >
                  <FileDown size={15} className="text-sky-400" />
                  <span>Download CV (PDF)</span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Quick Contact Pill & Verified Socials */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-white/[0.08] w-full flex flex-wrap items-center justify-between gap-4"
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-sky-400/40 text-xs font-mono text-slate-400 hover:text-sky-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400 font-sans font-medium">
                      Copied to clipboard
                    </span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-sky-400" />
                    <span>{siteData.socials.email}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {siteData.socials.github && (
                  <a
                    href={siteData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-sky-400/40 text-slate-400 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all"
                  >
                    <Github size={15} />
                  </a>
                )}

                {siteData.socials.linkedin && (
                  <a
                    href={siteData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-sky-400/40 text-slate-400 hover:text-white active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all"
                  >
                    <Linkedin size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Clean Portrait Presentation with Multi-Plane Depth & Dual Orbital Calibration Rings */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative preserve-3d"
          >
            {/* 3D Isometric Coordinate Accent with Dual Concentric Calibration Rings */}
            <motion.div
              aria-hidden="true"
              style={{
                ...floatingStyle,
                x: orbitalDepthX,
                y: orbitalDepthY,
              }}
              className="pointer-events-none absolute -top-10 -left-10 sm:-top-12 sm:-left-12 z-20 w-32 h-32 sm:w-36 sm:h-36 opacity-80 animate-float-slow"
            >
              <svg
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_18px_rgba(56,189,248,0.28)]"
              >
                <defs>
                  <linearGradient id="cube-grad-top" x1="70" y1="28" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" stopOpacity="0.32" />
                    <stop stopColor="#38BDF8" stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id="cube-grad-left" x1="34" y1="50" x2="70" y2="112" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" stopOpacity="0.25" />
                    <stop stopColor="#2563EB" stopOpacity="0.04" />
                  </linearGradient>
                  <linearGradient id="cube-grad-right" x1="106" y1="50" x2="70" y2="112" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" stopOpacity="0.20" />
                    <stop stopColor="#2563EB" stopOpacity="0.06" />
                  </linearGradient>
                </defs>

                {/* Outer Rotating Calibration Ring (Clockwise) */}
                <circle
                  cx="70"
                  cy="70"
                  r="56"
                  stroke="#38BDF8"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  style={floatingStyle}
                  className="animate-rotate-slow origin-center"
                />

                {/* Inner Counter-Rotating Reticle Ring (Counter-Clockwise) */}
                <circle
                  cx="70"
                  cy="70"
                  r="44"
                  stroke="#2563EB"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  style={floatingStyle}
                  className="animate-rotate-reverse-slow origin-center"
                />

                {/* Angle Reticle Ticks */}
                <line x1="70" y1="10" x2="70" y2="18" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" />
                <line x1="70" y1="122" x2="70" y2="130" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" />
                <line x1="10" y1="70" x2="18" y2="70" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" />
                <line x1="122" y1="70" x2="130" y2="70" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" />

                {/* Isometric Cube Faces */}
                {/* Top Face */}
                <polygon
                  points="70,32 104,51 70,70 36,51"
                  fill="url(#cube-grad-top)"
                  stroke="#38BDF8"
                  strokeOpacity="0.65"
                  strokeWidth="1.2"
                />
                {/* Left Face */}
                <polygon
                  points="36,51 70,70 70,108 36,89"
                  fill="url(#cube-grad-left)"
                  stroke="#38BDF8"
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                />
                {/* Right Face */}
                <polygon
                  points="70,70 104,51 104,89 70,108"
                  fill="url(#cube-grad-right)"
                  stroke="#2563EB"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                />

                {/* Internal Wireframe Axis Lines */}
                <line x1="70" y1="70" x2="70" y2="32" stroke="#38BDF8" strokeOpacity="0.8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="70" y1="70" x2="36" y2="89" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="70" y1="70" x2="104" y2="89" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 2" />

                {/* Center Coordinate Vertex */}
                <circle cx="70" cy="70" r="2.5" fill="#38BDF8" />
                <circle cx="70" cy="70" r="6" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1" />

                {/* Outer Vertex Nodes */}
                <circle cx="70" cy="32" r="2" fill="#38BDF8" fillOpacity="0.95" />
                <circle cx="104" cy="51" r="2" fill="#38BDF8" fillOpacity="0.95" />
                <circle cx="36" cy="51" r="2" fill="#38BDF8" fillOpacity="0.95" />
                <circle cx="70" cy="108" r="2" fill="#38BDF8" fillOpacity="0.95" />
              </svg>
            </motion.div>

            {/* Portrait Container with Pointer-Responsive Depth */}
            <motion.div
              style={{
                x: portraitDepthX,
                y: portraitDepthY,
              }}
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#111827]/80 via-[#0e1424]/80 to-[#090D16]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-end justify-center select-none group"
            >
              {/* Subtle Blue Rim Atmosphere */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-sky-500/[0.12] blur-[80px]"
              />

              {/* Spatial Blueprint Grid Pattern */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"
              />

              {/* Floating Discipline Badge (Top Right) with Multi-Plane Depth */}
              <motion.div
                style={{
                  ...floatingStyle,
                  x: badgeDepthX,
                  y: badgeDepthY,
                }}
                className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D16]/90 backdrop-blur-md border border-white/[0.08] shadow-lg pointer-events-none animate-float"
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-sky-500/15 border border-sky-400/30 text-sky-400">
                  <Smartphone size={12} />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-semibold text-slate-200 leading-tight">
                    Flutter &middot; Dart
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 leading-tight">
                    Cross-Platform Mobile
                  </p>
                </div>
              </motion.div>

              {/* Floating Academic Credential Badge (Bottom Left) with Multi-Plane Depth */}
              <motion.div
                style={{
                  ...floatingStyle,
                  x: badgeDepthX,
                  y: badgeDepthY,
                }}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D16]/90 backdrop-blur-md border border-white/[0.08] shadow-lg pointer-events-none animate-float-delayed"
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-400">
                  <GraduationCap size={12} />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-semibold text-slate-200 leading-tight">
                    Norton University
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 leading-tight">
                    B.S. Software Dev &middot; 2026
                  </p>
                </div>
              </motion.div>

              {/* Optimized Portrait Silhouette with Soft Edge Fade Mask */}
              <div
                className="relative w-full h-[90%] flex items-end justify-center"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 86%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 86%, transparent 100%)",
                }}
              >
                <Image
                  src="/images/hero-cutout.webp"
                  alt={siteData.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 460px"
                  className="object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
