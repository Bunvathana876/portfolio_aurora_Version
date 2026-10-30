import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/site";
import ProjectDetails from "./_components/ProjectDetails";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
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
    title: `${project.title} - ${project.techStack.slice(0, 3).join(", ")}`,
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
    return notFound();
  }

  const project = siteData.projects[projectIndex];

  return <ProjectDetails project={project} projectIndex={projectIndex} />;
}
