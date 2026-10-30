"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
        },
      });

      tl.to(".name-text span", {
        y: 0,
        stagger: 0.05,
        duration: 0.2,
      });

      tl.to(".preloader-item", {
        delay: 0.9,
        y: "100%",
        duration: 0.5,
        stagger: 0.08,
      })
        .to(".name-text span", { autoAlpha: 0 }, "<0.4")
        .to(
          preloaderRef.current,
          {
            autoAlpha: 0,
            pointerEvents: "none",
          },
          "<0.8"
        );
    },
    { scope: preloaderRef }
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex pointer-events-none"
      ref={preloaderRef}
      aria-hidden="true"
    >
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>
      <div className="preloader-item h-full w-[10%] bg-black"></div>

      <p className="name-text flex text-[18vw] lg:text-[200px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.4)]">
        <span className="inline-block translate-y-full">V</span>
        <span className="inline-block translate-y-full">A</span>
        <span className="inline-block translate-y-full">T</span>
        <span className="inline-block translate-y-full">H</span>
        <span className="inline-block translate-y-full">A</span>
        <span className="inline-block translate-y-full">N</span>
        <span className="inline-block translate-y-full">A</span>
      </p>
    </div>
  );
};

export default Preloader;
