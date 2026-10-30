"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight, Check, Code2, Copy, FileDown, Layers, MapPin, Smartphone, Sparkles } from "lucide-react";
import { siteData } from "@/data/site";
import { ArrowAnimation } from "@/components/ui/ArrowAnimation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { sound } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 70%",
          end: "bottom 10%",
          scrub: 1,
        },
      });

      tl.fromTo(
        ".slide-up-and-fade",
        { y: 0 },
        { y: -120, opacity: 0, stagger: 0.02 }
      );
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleCopyEmail = async () => {
    try {
      sound.success();
      await navigator.clipboard.writeText(siteData.socials.email);
      setCopiedEmail(true);
      toast({
        title: "Email copied to clipboard",
        description: siteData.socials.email,
        type: "success",
      });
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      sound.tick();
      toast({
        title: "Email address",
        description: siteData.socials.email,
        type: "info",
      });
    }
  };

  return (
    <section className="relative overflow-hidden" id="banner">
      <div id="hero" className="sr-only" aria-hidden="true" />
      <ArrowAnimation />

      {/* Atmospheric Spatial Aurora Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-500/12 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-1/4 h-[480px] w-[480px] rounded-full bg-indigo-500/15 blur-[150px]"
      />

      <div
        className="container min-h-[100svh] pt-24 pb-16 md:py-20 flex justify-between items-center max-lg:flex-col gap-10"
        ref={containerRef}
      >
        {/* Left: Giant Aurora Typography + Bio + CTAs */}
        <div className="max-lg:grow flex flex-col justify-center items-start max-w-[580px] z-[1]">
          {/* Eyebrow Badge */}
          <div className="slide-up-and-fade flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1326]/80 backdrop-blur-xl border border-white/10 text-xs text-muted-foreground shadow-sm">
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]" />
              <span className="text-foreground font-medium">Available for Software Developer Roles</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <MapPin size={13} className="text-cyan-400" />
              <span>Phnom Penh, Cambodia</span>
            </span>
          </div>

          {/* Primary Aurora Headline */}
          <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[84px] font-anton uppercase tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.35)]">
              MOBILE &amp; WEB
            </span>
            <br />
            <span className="ml-2 sm:ml-4 text-foreground">DEVELOPER</span>
          </h1>

          {/* Bio */}
          <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground leading-relaxed">
            Hi! I&apos;m{" "}
            <span className="font-semibold text-foreground">{siteData.name}</span>
            . A Software Developer and senior student pursuing a{" "}
            <span className="font-medium text-foreground">
              B.S. in Software Development
            </span>{" "}
            at{" "}
            <span className="font-medium text-foreground">
              Norton University (2023–2026)
            </span>
            . I specialize in cross-platform mobile engineering with{" "}
            <span className="font-medium text-cyan-400">
              Flutter &amp; Dart
            </span>{" "}
            and robust full-stack web software with{" "}
            <span className="font-medium text-indigo-300">
              React, Next.js, and FastAPI
            </span>
            .
          </p>

          {/* Action Buttons */}
          <div className="slide-up-and-fade mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#selected-projects"
              onClick={() => sound.pop()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-anton text-base tracking-wider shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:shadow-[0_0_40px_rgba(0,242,254,0.55)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.pop()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 bg-[#0d1326]/70 backdrop-blur-xl hover:bg-[#121a35] hover:border-cyan-400/50 text-foreground font-anton text-base tracking-wider transition-all duration-300 shadow-sm"
            >
              <FileDown size={17} className="text-cyan-400" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Email Copy Pill */}
          <div className="slide-up-and-fade flex flex-wrap items-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1326]/60 backdrop-blur-md border border-white/10 text-xs font-mono text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-cyan-400" />
                  <span>{siteData.socials.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center/Right: Free-Standing Big Studio Portrait + 3D Tilt + Floating Liquid Glass Badges */}
        <div
          ref={portraitRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setMouseOffset({ x: 0, y: 0 });
          }}
          className="relative flex items-center justify-center z-[1] select-none"
        >
          {/* Ambient Cyan Halo Behind Silhouette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full bg-cyan-400/22 blur-[110px] transition-transform duration-700"
            style={{
              transform: isHovering
                ? `translate(calc(-50% + ${mouseOffset.x * 25}px), calc(-50% + ${mouseOffset.y * 25}px))`
                : "translate(-50%, -50%)",
            }}
          />

          {/* Ambient Indigo Rim Light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full bg-indigo-500/25 blur-[95px]"
          />

          {/* Floating Liquid Glass Badge Top-Right */}
          <div
            className="hidden sm:flex absolute -top-4 -right-4 z-[3] items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c1122]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-transform duration-500 pointer-events-none"
            style={{
              transform: isHovering
                ? `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px, 0)`
                : "translate3d(0, 0, 0)",
            }}
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-400/15 border border-cyan-400/30 text-cyan-400">
              <Smartphone size={14} />
            </div>
            <div>
              <p className="text-[11px] font-mono font-bold text-foreground">Flutter &middot; Dart</p>
              <p className="text-[10px] font-mono text-muted-foreground">Cross-Platform Mobile</p>
            </div>
          </div>

          {/* Floating Liquid Glass Badge Bottom-Left */}
          <div
            className="hidden sm:flex absolute bottom-8 -left-8 z-[3] items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0c1122]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-transform duration-500 pointer-events-none"
            style={{
              transform: isHovering
                ? `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -16}px, 0)`
                : "translate3d(0, 0, 0)",
            }}
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-400/15 border border-emerald-400/30 text-emerald-400">
              <Layers size={14} />
            </div>
            <div>
              <p className="text-[11px] font-mono font-bold text-foreground">Norton University</p>
              <p className="text-[10px] font-mono text-muted-foreground">B.S. Software Dev &middot; 2026</p>
            </div>
          </div>

          {/* Free-Standing Cutout Container with Edge Fade Mask */}
          <div
            className="slide-up-and-fade relative w-[320px] sm:w-[440px] lg:w-[500px] xl:w-[560px] h-[460px] sm:h-[560px] lg:h-[640px] xl:h-[700px] flex items-end justify-center select-none"
            style={{
              maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
            }}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 ease-out"
              style={{
                transform: isHovering
                  ? `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0) scale(1.02)`
                  : "translate3d(0, 0, 0) scale(1)",
              }}
            >
              <Image
                src="/images/hero-cutout.png"
                alt={siteData.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
