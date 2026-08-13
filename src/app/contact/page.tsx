"use client";
import { Mail, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
export default function ContactPage(){const {lang}=useLanguage();return <main className="inner shell contact-page"><p className="eyebrow"><span />{lang==="vi"?"Liên hệ":"Contact"}</p><h1 className="page-title">{lang==="vi"?"Cùng làm một thứ hay ho.":"Let’s build something useful."}</h1><p className="page-lead">{lang==="vi"?"Thông tin email và mạng xã hội thật sẽ được cập nhật trước khi launch.":"Real email and social links will be added before launch."}</p><div className="contact-links"><span><Mail/> Email — cần bổ sung</span><span><Linkedin/> LinkedIn — cần bổ sung</span><span><Github/> GitHub — quantran159</span></div></main>}
