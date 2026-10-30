"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP((context, contextSafe) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const handleMouseMove = contextSafe?.((e: MouseEvent) => {
      if (!cursorRef.current) return;

      const { clientX, clientY } = e;

      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        ease: "power2.out",
        duration: 0.2,
        opacity: 1,
      });
    }) as EventListener;

    window.addEventListener("mousemove", handlePointerMove);
    function handlePointerMove(e: MouseEvent) {
      if (handleMouseMove) handleMouseMove(e);
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
    };
  });

  return (
    <div
      ref={cursorRef}
      className="hidden md:flex fixed top-0 left-0 opacity-0 z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity"
      aria-hidden="true"
    >
      {/* Outer Cyan Ring */}
      <div className="size-6 rounded-full border border-cyan-400/60 animate-ping absolute opacity-40" />
      {/* Middle Glowing Disc */}
      <div className="size-4 rounded-full bg-cyan-400/20 border border-cyan-400/80 shadow-[0_0_12px_#00f2fe]" />
      {/* Inner Pin-Dot */}
      <div className="size-1.5 rounded-full bg-white absolute shadow-[0_0_6px_#ffffff]" />
    </div>
  );
};

export default CustomCursor;
