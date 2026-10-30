"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Project, siteData } from "@/data/site";
import { isValidLiveUrl } from "@/lib/utils";
import { ArrowAnimation } from "@/components/ui/ArrowAnimation";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ProjectCoverVisual } from "@/components/ui/ProjectCoverVisual";

interface Props {
  project: Project;
  projectIndex: number;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ProjectDetails = ({ project, projectIndex }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLiveDemo = isValidLiveUrl(project.liveUrl);
  const nextProject =
    siteData.projects[(projectIndex + 1) % siteData.projects.length];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set(".fade-in-later", {
        autoAlpha: 0,
        y: 30,
      });
      const tl = gsap.timeline({
        delay: 0.4,
      });

      tl.to(".fade-in-later", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  // Blur info div and make it smaller on scroll (portfolio-2.0 signature effect)
  useGSAP(
    () => {
      if (typeof window === "undefined" || window.innerWidth < 992) return;

      gsap.to("#info", {
        filter: "blur(3px)",
        autoAlpha: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: "#info",
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="pt-20 pb-14">
      <div className="container" ref={containerRef}>
        <TransitionLink
          back
          href="/#selected-projects"
          className="mb-14 inline-flex gap-2 items-center group h-12 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
          <span className="font-anton uppercase tracking-wider text-lg">
            Back to Projects
          </span>
        </TransitionLink>

        <div className="top-0 min-h-[calc(100svh-120px)] flex" id="info">
          <div className="relative w-full">
            <div className="flex items-start justify-between gap-6 mx-auto mb-10 max-w-[680px]">
              <div>
                <p className="fade-in-later opacity-0 text-sm uppercase tracking-widest text-primary font-anton mb-2">
                  {project.category} &middot; {project.metrics}
                </p>
                <h1 className="fade-in-later opacity-0 text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
                  <span className="inline-block">{project.title}</span>
                </h1>
              </div>

              <div className="fade-in-later opacity-0 flex gap-3 pt-2 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={30} />
                  </a>
                )}
                {hasLiveDemo && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={30} />
                  </a>
                )}
              </div>
            </div>

            <div className="max-w-[680px] space-y-7 pb-24 mx-auto">
              <div className="fade-in-later">
                <p className="text-muted-foreground font-anton tracking-wider uppercase mb-2">
                  Year
                </p>
                <div className="text-lg">{project.year}</div>
              </div>

              <div className="fade-in-later">
                <p className="text-muted-foreground font-anton tracking-wider uppercase mb-2">
                  Tech &amp; Technique
                </p>
                <div className="text-lg">{project.techStack.join(", ")}</div>
              </div>

              <div className="fade-in-later">
                <p className="text-muted-foreground font-anton tracking-wider uppercase mb-2">
                  Description
                </p>
                <div className="text-lg text-muted-foreground space-y-3 leading-relaxed">
                  <p className="text-foreground font-medium">
                    {project.description}
                  </p>
                  <p>{project.overview}</p>
                </div>
              </div>

              <div className="fade-in-later">
                <p className="text-muted-foreground font-anton tracking-wider uppercase mb-2">
                  My Role &amp; Key Contributions
                </p>
                <div className="text-lg space-y-2">
                  <p className="text-primary font-medium">{project.role}</p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="pl-5 list-disc space-y-2 text-base text-muted-foreground">
                      {project.highlights.map((item, idx) => (
                        <li key={idx} className="text-foreground/90">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <ArrowAnimation />
          </div>
        </div>

        {/* Visual Showcase Stack */}
        <div
          className="fade-in-later relative flex flex-col gap-6 max-w-[840px] mx-auto"
          id="images"
        >
          <div className="w-full aspect-[16/9] bg-background-light border border-border overflow-hidden">
            <ProjectCoverVisual project={project} index={projectIndex} />
          </div>

          {nextProject && nextProject.slug !== project.slug && (
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Next Project
                </p>
                <TransitionLink
                  href={`/projects/${nextProject.slug}`}
                  className="text-2xl sm:text-4xl font-anton hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <span>{nextProject.title}</span>
                  <ArrowUpRight className="text-primary" />
                </TransitionLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
