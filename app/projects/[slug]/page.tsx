import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/site";
import { isValidLiveUrl } from "@/lib/utils";
import { ProjectCoverVisual } from "@/components/ui/ProjectCoverVisual";
import { Footer } from "@/components/sections/Footer";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return siteData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = siteData.projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.overview || project.description,
    openGraph: {
      title: `${project.title} | ${siteData.name}`,
      description: project.overview || project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = siteData.projects.findIndex(
    (item) => item.slug === slug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = siteData.projects[projectIndex];
  const formattedIndex = String(projectIndex + 1).padStart(2, "0");
  const hasLiveDemo = isValidLiveUrl(project.liveUrl);

  const nextProject =
    siteData.projects[(projectIndex + 1) % siteData.projects.length];

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-[1320px] px-6 pt-12 pb-24 sm:px-10 sm:pt-16 sm:pb-32 lg:px-16">
        {/* Top "← Back to Index" Navigation Link */}
        <div className="mb-10 sm:mb-14 pb-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-x-1"
            />
            <span>← Back to Index</span>
          </Link>

          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Index No. {formattedIndex} / {String(siteData.projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Editorial Header Block */}
        <header className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted mb-4">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.year}</span>
            {project.metrics && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-accent">{project.metrics}</span>
              </>
            )}
          </div>

          <h1 className="font-serif project-title-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-[1.04] tracking-[-0.025em] text-foreground break-words">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="mt-4 font-serif italic text-xl sm:text-2xl text-muted">
              {project.subtitle}
            </p>
          )}
        </header>

        {/* Full-Width 16:9 Hero Image Container */}
        <figure className="mb-16 sm:mb-20">
          <div className="aspect-[16/9] w-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-surface">
            <ProjectCoverVisual project={project} index={projectIndex} />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
            <span className="font-mono uppercase tracking-widest">
              Fig. {formattedIndex} — {project.title}
            </span>
            <span>{project.subtitle || project.category}</span>
          </figcaption>
        </figure>

        {/* Two-Column Editorial Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 pt-10 border-t border-neutral-200 dark:border-neutral-800">
          {/* Sidebar / Meta Column (4 cols) */}
          <aside
            aria-label="Project metadata and links"
            className="lg:col-span-4 space-y-8 lg:pr-6 lg:border-r border-neutral-200 dark:border-neutral-800"
          >
            <dl className="divide-y divide-neutral-200 dark:divide-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
              <div className="py-4 first:pt-0">
                <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                  Role
                </dt>
                <dd className="text-sm sm:text-base font-medium text-foreground">
                  {project.role}
                </dd>
              </div>

              <div className="py-4">
                <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                  Year
                </dt>
                <dd className="font-mono text-sm sm:text-base text-foreground">
                  {project.year}
                </dd>
              </div>

              <div className="py-4">
                <dt className="text-xs uppercase tracking-widest text-muted mb-1">
                  Category
                </dt>
                <dd className="text-sm sm:text-base text-foreground">
                  {project.category}
                </dd>
              </div>
            </dl>

            {/* Tech Stack Pills / List */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted mb-3.5">
                Tech Stack
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="border border-neutral-200 dark:border-neutral-800 bg-surface/60 px-3 py-1 text-xs font-mono text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-muted mb-1">
                Project Links
              </span>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between border border-neutral-200 dark:border-neutral-800 bg-background px-4 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-foreground hover:bg-surface"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>

              {hasLiveDemo && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between border border-foreground bg-foreground px-4 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </aside>

          {/* Main Column: Editorial Article Content (8 cols) */}
          <div className="lg:col-span-8 lg:pl-4 space-y-12">
            {/* Overview Section */}
            <section>
              <h2 className="text-xs uppercase tracking-widest text-muted mb-4">
                01 / Overview
              </h2>
              <p className="font-serif project-title-serif text-2xl sm:text-3xl leading-[1.35] text-foreground mb-6">
                {project.description}
              </p>
              <p className="editorial-prose text-base sm:text-lg leading-relaxed text-foreground/90">
                {project.overview}
              </p>
            </section>

            {/* Key Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-xs uppercase tracking-widest text-muted mb-6">
                  02 / Key Engineering Highlights
                </h2>
                <ol className="divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                    >
                      <span className="sm:col-span-2 font-mono text-xs text-accent uppercase tracking-widest">
                        02.{idx + 1}
                      </span>
                      <p className="sm:col-span-10 editorial-prose text-foreground">
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* System Architecture & Specifications Summary */}
            <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xs uppercase tracking-widest text-muted mb-4">
                03 / System Scope & Specification
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-neutral-200 dark:border-neutral-800 bg-surface/40 p-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1.5">
                    Primary Focus
                  </p>
                  <p className="font-serif text-xl text-foreground">
                    {project.metrics || project.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1.5">
                    Core Capabilities
                  </p>
                  <p className="text-sm text-foreground">
                    {project.tags.join(" · ")}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Next Project Editorial Footer Link */}
        {nextProject && nextProject.slug !== project.slug && (
          <div className="mt-20 sm:mt-28 pt-10 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted block mb-2">
                Next in Index
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex items-baseline gap-4"
              >
                <span className="font-serif project-title-serif text-3xl sm:text-4xl text-foreground group-hover:text-accent transition-colors">
                  {nextProject.title}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 text-muted transition-transform duration-300 ease-editorial group-hover:rotate-45 group-hover:text-accent shrink-0"
                />
              </Link>
            </div>

            <Link
              href="/#projects"
              className="editorial-link-persistent self-start sm:self-end text-xs uppercase tracking-widest"
            >
              <span>View Full Index</span>
            </Link>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
