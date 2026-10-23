"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Diamond,
  QrCode,
  Phone,
  Mail,
  MapPin,
  Globe,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { siteData } from "@/data/site";

export interface VirtualIdBadgeProps {
  /** Cardholder full name */
  name?: string;
  /** Role or position title */
  position?: string;
  /** Issuing organization or company */
  company?: string;
  /** Cardholder headshot URL */
  photoUrl?: string;
  /** Issue / join date string */
  joinDate?: string;
  /** Expiration date string */
  expireDate?: string;
  /** Unique badge identifier */
  idNumber?: string;
  /** Contact phone */
  phone?: string;
  /** Physical work location */
  location?: string;
  /** Contact email */
  email?: string;
  /** Portfolio / company website */
  website?: string;
  /** Additional wrapper CSS class */
  className?: string;
  /** Whether to render the external interactive flip button */
  showControls?: boolean;
}

export function VirtualIdBadge({
  name = siteData.name || "BUN VATHANA",
  position = siteData.role || "FULL-STACK & MOBILE DEVELOPER",
  company = "COMPANY",
  photoUrl = "/images/pic-pf-v2.jpeg",
  joinDate = "01-01-2026",
  expireDate = "31-12-2030",
  idNumber = "ID: #BV-9824-2026",
  phone = "+855 (0) 96 876 5432",
  location = siteData.socials?.location || "Phnom Penh, Cambodia",
  email = siteData.socials?.email || "bunvathanasrey@gmail.com",
  website = siteData.siteUrl?.replace(/^https?:\/\//, "") || "bunvathana.dev",
  className = "",
  showControls = true,
}: VirtualIdBadgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(photoUrl);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImgSrc(photoUrl);
  }, [photoUrl]);

  // Raw mouse coordinates relative to card center (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth organic physics springs
  const springPhysics = { damping: 20, stiffness: 220, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springPhysics);
  const mouseYSpring = useSpring(mouseY, springPhysics);

  // 3D Tilt angles (card tilts toward the cursor)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [14, -14]);
  const rotateYTilt = useTransform(mouseXSpring, [-0.5, 0.5], [-16, 16]);

  // Specular light reflection coordinates (0% to 100%)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [20, 80]);

  // Top-level transforms for specular glare background gradients
  const frontGlareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle 320px at ${x}% ${y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)`
  );

  const backGlareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle 320px at ${100 - Number(x)}% ${y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)`
  );

  // Handle pointer tracking
  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      mouseX.set(Math.max(-0.5, Math.min(0.5, x)));
      mouseY.set(Math.max(-0.5, Math.min(0.5, y)));
    },
    [mouseX, mouseY]
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onPointerEnter = () => {
    setIsHovered(true);
  };

  const onPointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* 3D Perspective Scene Container */}
      <div
        className="relative w-[300px] sm:w-[320px] pt-14 pb-2"
        style={{ perspective: 1200 }}
      >
        {/* LANYARD STRAP (Hanging down from above) */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-20 pointer-events-none z-30 flex flex-col items-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(30px)",
          }}
        >
          {/* Textured fabric ribbon */}
          <div
            className="w-7 h-14 shadow-md relative border-x border-black/40"
            style={{
              backgroundColor: "#0d1117",
              backgroundImage: `repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.06) 0px,
                rgba(255, 255, 255, 0.06) 2px,
                transparent 2px,
                transparent 5px
              )`,
            }}
          >
            {/* Center cyan woven pinstripe */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-cyan-500/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />
          </div>

          {/* Metal crimp sleeve / clamp */}
          <div className="w-8 h-3.5 bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-500 border border-zinc-500 rounded-[2px] shadow-sm flex items-center justify-around px-1 z-20">
            <span className="w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
            <span className="w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
          </div>

          {/* Metal split ring */}
          <div className="-mt-0.5 w-4 h-4 rounded-full border-2 border-zinc-300 bg-transparent shadow-xs z-10" />

          {/* Metallic swivel base & hook */}
          <div className="-mt-1 flex flex-col items-center z-30">
            <div className="w-3 h-3 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-400 rounded-[2px] border border-zinc-400 shadow-xs" />
            <div className="w-3.5 h-5 border-b-4 border-l-4 border-r-2 border-zinc-300 rounded-b-md shadow-md -mt-0.5 bg-gradient-to-b from-zinc-200 to-zinc-400" />
          </div>
        </div>

        {/* TILT WRAPPER (Reacts to cursor with smooth 3D tilt) */}
        <motion.div
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label={`3D Virtual ID Badge for ${name}. Click to flip between front details and back terms.`}
          onClick={toggleFlip}
          onKeyDown={handleKeyDown}
          onMouseMove={onMouseMove}
          onMouseEnter={onPointerEnter}
          onMouseLeave={onPointerLeave}
          onTouchStart={onPointerEnter}
          onTouchMove={onTouchMove}
          onTouchEnd={onPointerLeave}
          style={
            isMounted
              ? {
                  rotateX,
                  rotateY: rotateYTilt,
                  transformStyle: "preserve-3d",
                }
              : {
                  transformStyle: "preserve-3d",
                }
          }
          className="relative w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[22px]"
        >
          {/* FLIPPABLE CARD CONTAINER */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 24,
              mass: 0.8,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[490px] rounded-[22px]"
          >
            {/* ======================================================== */}
            {/* FRONT FACE (Details)                                     */}
            {/* ======================================================== */}
            <div
              style={{
                transformStyle: "preserve-3d",
              }}
              className={`absolute inset-0 w-full h-full rounded-[22px] transition-opacity duration-300 ${
                isFlipped
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
            >
              {/* CLEAR PLASTIC SLEEVE ENCASING (Outer Rim + Punch Hole) */}
              <div
                className="absolute inset-0 rounded-[22px] border-2 border-white/40 dark:border-white/20 bg-white/[0.04] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.12)] p-2 flex flex-col pointer-events-none"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                {/* Heat-sealed outer seam line */}
                <div className="absolute inset-1.5 rounded-[18px] border border-white/25 pointer-events-none" />

                {/* TOP HOLDER HEADER with Slot Punch-Out */}
                <div className="relative h-9 w-full flex items-center justify-center shrink-0">
                  <div className="absolute left-6 w-2.5 h-2.5 rounded-full border border-white/40 bg-black/60 shadow-inner" />
                  <div className="w-14 h-3.5 rounded-full border border-white/60 bg-black/70 shadow-inner flex items-center justify-center">
                    <span className="w-8 h-1 rounded-full bg-black/90" />
                  </div>
                  <div className="absolute right-6 w-2.5 h-2.5 rounded-full border border-white/40 bg-black/60 shadow-inner" />
                </div>

                {/* Specular glare shine */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[22px] z-30 transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.4 : 0.1,
                    background: frontGlareBg,
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* INSERT CARD (FRONT): Navy Blue with Vibrant Cyan Geometric Accents */}
              <div
                className="absolute inset-[8px] top-11 rounded-[16px] overflow-hidden shadow-xl flex flex-col justify-between p-4"
                style={{
                  backgroundColor: "#070E1E",
                  backgroundImage: `
                    radial-gradient(circle at 10% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 45%),
                    radial-gradient(circle at 90% 80%, rgba(14, 165, 233, 0.18) 0%, transparent 50%)
                  `,
                }}
              >
                {/* GEOMETRIC ANGULAR SHAPES */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 300 430"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="cyanAng1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
                    </linearGradient>
                    <pattern
                      id="circuitGrid"
                      width="18"
                      height="18"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 18 0 L 0 0 0 18"
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="0.5"
                        strokeOpacity="0.08"
                      />
                    </pattern>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#circuitGrid)" />

                  {/* Top Right Angular Cyan Wedge */}
                  <path
                    d="M 160 0 L 300 0 L 300 80 L 225 80 Z"
                    fill="url(#cyanAng1)"
                  />
                  <path
                    d="M 220 0 L 300 0 L 300 45 Z"
                    fill="#00F0FF"
                    fillOpacity="0.6"
                  />

                  {/* Diagonal accent slash */}
                  <polygon
                    points="0,100 32,100 12,150 0,150"
                    fill="#00F0FF"
                    fillOpacity="0.25"
                  />

                  {/* Bottom Left Angular Polygons */}
                  <path
                    d="M 0 330 L 130 430 L 0 430 Z"
                    fill="#0C1B3A"
                  />
                  <path
                    d="M 0 370 L 95 430 L 0 430 Z"
                    fill="url(#cyanAng1)"
                    fillOpacity="0.5"
                  />
                  <line
                    x1="0"
                    y1="330"
                    x2="130"
                    y2="430"
                    stroke="#00F0FF"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                  />
                </svg>

                {/* 1. HEADER: Diamond icon next to "COMPANY" */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                      <Diamond className="w-4 h-4 text-cyan-300 fill-cyan-400/40" />
                    </div>
                    <div>
                      <span className="block font-black text-sm tracking-[0.2em] text-white font-sans uppercase leading-none">
                        {company}
                      </span>
                      <span className="block text-[8px] font-mono tracking-widest text-cyan-400 uppercase mt-0.5">
                        SECURITY CREDENTIAL
                      </span>
                    </div>
                  </div>

                  {/* Hologram security foil sticker */}
                  <div className="h-5 px-2 rounded-[4px] bg-gradient-to-r from-amber-300/90 via-emerald-300/80 to-cyan-300/90 border border-white/60 shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-slate-900" />
                    <span className="text-[8px] font-mono font-bold text-slate-950 uppercase tracking-tighter">
                      SECURE
                    </span>
                  </div>
                </div>

                {/* 2. CARDHOLDER PHOTO (Square with vibrant cyan border highlight) */}
                <div className="relative z-10 flex flex-col items-center my-auto">
                  <div className="relative">
                    {/* Glowing square frame */}
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_22px_rgba(6,182,212,0.6)] bg-slate-950">
                      <Image
                        src={imgSrc}
                        alt={`${name} Profile Photo`}
                        fill
                        priority
                        unoptimized
                        sizes="128px"
                        onError={() => setImgSrc("/images/portrait.jpg")}
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Corner viewfinder brackets */}
                    <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-300" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-300" />
                    <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-300" />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-300" />
                  </div>

                  {/* 3. NAME SECTION (Large dark pill & smaller cyan pill) */}
                  <div className="mt-3.5 flex flex-col items-center gap-1.5 w-full">
                    {/* Large Dark Pill: YOUR NAME */}
                    <div className="px-5 py-1.5 rounded-full bg-slate-950/95 border border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.7)] flex items-center gap-2 max-w-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-bold text-xs sm:text-sm tracking-wider text-white uppercase truncate">
                        {name}
                      </span>
                    </div>

                    {/* Smaller Cyan Pill: JOB POSITION */}
                    <div className="px-3.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[9px] sm:text-[10px] tracking-widest uppercase shadow-[0_0_14px_rgba(6,182,212,0.7)] max-w-full truncate">
                      {position}
                    </div>
                  </div>
                </div>

                {/* 4. FOOTER: QR Code icon & metadata */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-cyan-500/25">
                  {/* QR Code icon box */}
                  <div className="w-11 h-11 rounded-md bg-white p-1 shadow-md flex items-center justify-center shrink-0">
                    <QrCode className="w-9 h-9 text-slate-950" />
                  </div>

                  {/* Metadata: Join & Expire dates */}
                  <div className="text-right font-mono text-[9px] text-slate-300 space-y-0.5">
                    <div className="text-[10px] font-bold text-cyan-400 tracking-wider">
                      {idNumber}
                    </div>
                    <div>
                      <span className="text-slate-400">Join: </span>
                      <span className="text-white font-medium">{joinDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Expire: </span>
                      <span className="text-white font-medium">{expireDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* BACK FACE (Terms & Conditions, Rules, Socials)            */}
            {/* ======================================================== */}
            <div
              style={{
                transform: "rotateY(180deg)",
                transformStyle: "preserve-3d",
              }}
              className={`absolute inset-0 w-full h-full rounded-[22px] transition-opacity duration-300 ${
                isFlipped
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {/* CLEAR PLASTIC SLEEVE ENCASING (Back) */}
              <div
                className="absolute inset-0 rounded-[22px] border-2 border-white/40 dark:border-white/20 bg-white/[0.04] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.12)] p-2 flex flex-col pointer-events-none"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                {/* Heat-sealed outer seam line */}
                <div className="absolute inset-1.5 rounded-[18px] border border-white/25 pointer-events-none" />

                {/* TOP HOLDER HEADER with Slot Punch-Out */}
                <div className="relative h-9 w-full flex items-center justify-center shrink-0">
                  <div className="absolute left-6 w-2.5 h-2.5 rounded-full border border-white/40 bg-black/60 shadow-inner" />
                  <div className="w-14 h-3.5 rounded-full border border-white/60 bg-black/70 shadow-inner flex items-center justify-center">
                    <span className="w-8 h-1 rounded-full bg-black/90" />
                  </div>
                  <div className="absolute right-6 w-2.5 h-2.5 rounded-full border border-white/40 bg-black/60 shadow-inner" />
                </div>

                {/* Dynamic Glare Overlay for back face */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[22px] z-30 transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.4 : 0.1,
                    background: backGlareBg,
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* INSERT CARD (BACK): Navy & Cyan geometric styling */}
              <div
                className="absolute inset-[8px] top-11 rounded-[16px] overflow-hidden shadow-xl flex flex-col justify-between p-4"
                style={{
                  backgroundColor: "#070E1E",
                  backgroundImage: `
                    radial-gradient(circle at 85% 15%, rgba(6, 182, 212, 0.18) 0%, transparent 45%),
                    radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.16) 0%, transparent 50%)
                  `,
                }}
              >
                {/* Top: Header with Diamond & COMPANY */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                      <Diamond className="w-3.5 h-3.5 text-cyan-300 fill-cyan-400/40" />
                    </div>
                    <span className="font-black text-xs tracking-[0.2em] text-white font-sans uppercase">
                      {company}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-cyan-400">
                    CARD #BV-876-AUTH
                  </span>
                </div>

                {/* TERMS & CONDITIONS BANNER */}
                <div className="relative z-10 my-1">
                  <div className="w-full py-1 px-3 rounded bg-cyan-400 text-slate-950 font-black text-[10px] tracking-widest uppercase flex items-center justify-between shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                    <span>TERMS &amp; CONDITIONS</span>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* NUMBERED LIST OF RULES */}
                <div className="relative z-10 space-y-1.5 text-[9.5px] leading-tight text-slate-200/90 font-sans">
                  <div className="flex items-start gap-1.5 bg-slate-950/60 p-1.5 rounded border border-white/5">
                    <span className="text-cyan-400 font-bold shrink-0">1.</span>
                    <p>
                      This credential remains the official property of the issuer
                      and must be surrendered upon request.
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5 bg-slate-950/60 p-1.5 rounded border border-white/5">
                    <span className="text-cyan-400 font-bold shrink-0">2.</span>
                    <p>
                      Must be visibly displayed while within project facilities,
                      domains, or workspaces.
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5 bg-slate-950/60 p-1.5 rounded border border-white/5">
                    <span className="text-cyan-400 font-bold shrink-0">3.</span>
                    <p>
                      Unauthorized duplication, cloning, or transfer to third
                      parties is strictly prohibited.
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5 bg-slate-950/60 p-1.5 rounded border border-white/5">
                    <span className="text-cyan-400 font-bold shrink-0">4.</span>
                    <p>
                      Report loss or damage immediately to developer operations.
                    </p>
                  </div>
                </div>

                {/* CONTACT DETAILS WITH LUCIDE ICONS */}
                <div className="relative z-10 pt-2 border-t border-cyan-500/25 grid grid-cols-1 gap-1 text-[9px] font-mono text-slate-300">
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{phone}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{location}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{email}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{website}</span>
                  </div>
                </div>

                {/* MAGNETIC STRIPE & BARCODE */}
                <div className="relative z-10 pt-1 flex flex-col gap-1 items-center">
                  <div className="w-full flex items-center justify-between px-2 py-0.5 bg-white rounded-xs">
                    <span className="font-mono text-[7px] text-slate-800 tracking-tighter">
                      ||| | ||||| | || ||||| || ||| |||| | ||
                    </span>
                    <span className="font-mono text-[7px] text-slate-900 font-bold">
                      *BV-2026-AUTH*
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* EXTERNAL INTERACTIVE CONTROLS */}
      {showControls && (
        <div className="mt-3 flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={toggleFlip}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-xs font-mono uppercase tracking-[0.14em] text-foreground hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Flip ID badge between front and back"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180 text-cyan-400" />
            <span>{isFlipped ? "View Front Face" : "Flip to Back (Terms)"}</span>
          </button>
          <p className="text-[11px] font-mono text-muted tracking-tight text-center">
            Hover to tilt in 3D &bull; Click to flip
          </p>
        </div>
      )}
    </div>
  );
}

export default VirtualIdBadge;
