"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguage } from "./LanguageProvider";

export function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLanguage();
  return (
    <Link className="project-card" href={`/work/${project.slug}`}>
      <div className={`project-visual visual-${project.accent}`}>
        <div className="visual-chrome"><span /><span /><span /></div>
        <div className="visual-copy">
          <p>{project.type}</p>
          <h3>{lang === "vi" ? project.title : project.titleEn}</h3>
        </div>
        <div className="visual-orbit" aria-hidden="true" />
      </div>
      <div className="project-meta">
        <div>
          <strong>{lang === "vi" ? project.title : project.titleEn}</strong>
          <span>{lang === "vi" ? project.type : project.typeEn}</span>
        </div>
        <div className="project-year">{project.year}<ArrowUpRight size={17} /></div>
      </div>
    </Link>
  );
}
