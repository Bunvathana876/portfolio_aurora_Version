import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SectionTransitionWrapper } from "@/components/ui/SectionTransition";

export default function PortfolioPage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <SectionTransitionWrapper showDivider={false}>
        <About />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper>
        <Skills />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper>
        <Projects />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper>
        <Experience />
      </SectionTransitionWrapper>
      <SectionTransitionWrapper>
        <Contact />
      </SectionTransitionWrapper>
      <Footer />
    </main>
  );
}
