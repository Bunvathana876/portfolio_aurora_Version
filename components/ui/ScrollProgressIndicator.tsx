"use client";

import React, { useEffect, useRef } from "react";

export const ScrollProgressIndicator = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 origin-left scale-x-0 transition-transform duration-75 ease-out"
      />
    </div>
  );
};

export default ScrollProgressIndicator;
