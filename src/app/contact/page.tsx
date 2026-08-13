Exit code: 0
Wall time: 1.1 seconds
Output:
"use client";
import { BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
export default function ContactPage(){const {lang}=useLanguage();return <main className="inner shell contact-page"><p className="eyebrow"><span />{lang==="vi"?"Liên hệ":"Contact"}</p><h1 className="page-title">{lang==="vi"?"Cùng làm một thứ hay ho.":"Let’s build something useful."}</h1><p className="page-lead">{lang==="vi"?"Email và LinkedIn sẽ được cập nhật trước khi launch. Hiện bạn có thể xem các dự án và mã nguồn trên GitHub.":"Email and LinkedIn will be added before launch. For now, explore the projects and source code on GitHub."}</p><div className="contact-links"><span><Mail/> {lang==="vi"?"Email — sẽ cập nhật":"Email — coming soon"}</span><span><BriefcaseBusiness/> LinkedIn — {lang==="vi"?"sẽ cập nhật":"coming soon"}</span><a href="https://github.com/quantran159" target="_blank" rel="noreferrer"><Code2/> GitHub — quantran159</a></div></main>}

