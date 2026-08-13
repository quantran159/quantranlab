"use client";

import Link from "next/link";
import { ArrowRight, Code2, Monitor, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { useLanguage } from "./LanguageProvider";

const copy = {
  vi: {
    eyebrow: "Portfolio cá nhân của Trần Mạnh Quân",
    name: "Quan Tran",
    headline: "Thiết kế web & xây dựng sản phẩm số",
    intro: "Tôi khám phá cách thiết kế, AI và công nghệ web kết hợp để tạo nên những trải nghiệm số rõ ràng, hữu ích và có cá tính.",
    work: "Xem dự án của tôi",
    about: "Về tôi",
    labels: ["Web Design", "Next.js", "AI Tools", "Vietnam"],
    selected: "Dự án nổi bật",
    all: "Xem tất cả dự án",
    what: "Tôi làm gì",
    skills: [
      ["Thiết kế web", "Thiết kế UI/UX, hệ thống giao diện và trải nghiệm rõ ràng, hiện đại."],
      ["Phát triển web", "Xây dựng website nhanh, tối ưu và dễ mở rộng với công nghệ web hiện đại."],
      ["Thử nghiệm với AI", "Khám phá AI tools, automation và cách đưa AI vào sản phẩm số thực tế."],
    ],
    cta: "Bạn có dự án cần thực hiện?",
    ctaText: "Tôi sẵn sàng lắng nghe ý tưởng và cùng biến nó thành một sản phẩm web chỉn chu.",
    contact: "Liên hệ với tôi",
  },
  en: {
    eyebrow: "Personal portfolio of Tran Manh Quan",
    name: "Quan Tran",
    headline: "Web designer & digital product builder",
    intro: "I explore how design, AI and web technology can come together to create clear, useful and distinctive digital experiences.",
    work: "View my work",
    about: "About me",
    labels: ["Web Design", "Next.js", "AI Tools", "Vietnam"],
    selected: "Selected work",
    all: "View all projects",
    what: "What I do",
    skills: [
      ["Web design", "UI/UX, interface systems and modern, clear user experiences."],
      ["Web development", "Fast, optimized and extensible websites built with modern web technology."],
      ["AI experiments", "Exploring AI tools, automation and practical AI-powered digital products."],
    ],
    cta: "Have a project in mind?",
    ctaText: "I am open to thoughtful collaborations and turning ideas into polished web products.",
    contact: "Contact me",
  },
} as const;

export function Home() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const icons = [Monitor, Code2, Sparkles];
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1>{t.name}</h1>
          <h2>{t.headline}</h2>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <Link href="/work" className="button button-dark">{t.work}<ArrowRight size={18} /></Link>
            <Link href="/about" className="text-link">{t.about}<span>—</span></Link>
          </div>
          <div className="quick-facts" aria-label="Focus areas">
            {t.labels.map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="blob blob-a" /><div className="blob blob-b" /><div className="blob blob-c" />
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><p className="section-kicker"><span />{t.selected}</p><Link href="/work">{t.all}<ArrowRight size={17} /></Link></div>
        <div className="projects-grid">{projects.slice(0,3).map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
      </section>

      <section className="section shell">
        <div className="section-heading"><p className="section-kicker"><span />{t.what}</p></div>
        <div className="capabilities">
          {t.skills.map(([title, text], i) => {
            const Icon = icons[i];
            return <article className="capability" key={title}><div className="cap-icon"><Icon size={25} /></div><div><h3>{title}</h3><p>{text}</p></div><ArrowRight className="cap-arrow" size={20} /></article>;
          })}
        </div>
      </section>

      <section className="cta shell">
        <div><h2>{t.cta}</h2><p>{t.ctaText}</p></div>
        <Link className="button button-dark" href="/contact">{t.contact}<ArrowRight size={18} /></Link>
      </section>
    </main>
  );
}
