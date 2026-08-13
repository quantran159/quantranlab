"use client";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/components/LanguageProvider";
export default function WorkPage(){const {lang}=useLanguage();return <main className="inner shell"><p className="eyebrow"><span />{lang==="vi"?"Portfolio":"Portfolio"}</p><h1 className="page-title">{lang==="vi"?"Dự án":"Selected work"}</h1><p className="page-lead">{lang==="vi"?"Những website, thử nghiệm và sản phẩm số tôi đang xây dựng.":"Websites, experiments and digital products I am building."}</p><div className="projects-grid work-grid">{projects.map(p=><ProjectCard key={p.slug} project={p}/>)}</div></main>}
