import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();return <main className="inner shell project-page"><Link href="/work" className="back-link"><ArrowLeft size={17}/>Tất cả dự án</Link><p className="eyebrow"><span />{p.type}</p><h1 className="page-title">{p.title}</h1><p className="page-lead">{p.description}</p><div className={`case-hero visual-${p.accent}`}><div className="visual-orbit" /></div><div className="case-grid"><section><h2>Tổng quan</h2><p>{p.description}</p></section><aside><div><span>Năm</span><strong>{p.year}</strong></div><div><span>Công nghệ</span><strong>{p.stack.join(" · ")}</strong></div>{p.href&&<a href={p.href}>Xem website<ArrowUpRight size={16}/></a>}</aside></div><section className="case-section"><h2>Case study đang được hoàn thiện</h2><p>Phần Problem → Process → Solution → Result sẽ được bổ sung khi Quân cung cấp nội dung và hình ảnh thực tế của dự án.</p></section></main>}
