Exit code: 0
Wall time: 1.2 seconds
Output:
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
    what: "Tôi làm gì",
    skills: [
      ["Thiết kế web", "Thiết kế UI/UX, hệ thống giao diện và trải nghiệm rõ ràng, hiện đại."],
      ["Phát triển web", "Xây dựng website nhanh, tối ưu và dễ mở rộng với công nghệ web hiện đại."],
      ["Thử nghiệm với AI", "Khám phá AI tools, automation và cách đưa AI vào sản phẩm số thực tế."],
    ],
    cta: "Bạn có dự án cần thực hiện?",
    ctaText: "Tôi sẵn sàng lắng nghe ý tưởng và cùng biến nó thành một sản phẩm web chỉn chu.",
    contact: "Liên hệ với tôi",
    aboutKicker: "Giới thiệu",
    aboutTitle: "Tôi thiết kế, xây dựng và thử nghiệm trên web.",
    aboutText: "Quan Tran Lab là nơi tôi lưu lại các dự án cá nhân, website, thử nghiệm AI và những sản phẩm số đang học cách xây dựng tốt hơn mỗi ngày.",
    aboutFocus: "Hiện tôi tập trung vào web design, Next.js, AI-assisted development và những công cụ giúp công việc số hiệu quả hơn.",
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
    what: "What I do",
    skills: [
      ["Web design", "UI/UX, interface systems and modern, clear user experiences."],
      ["Web development", "Fast, optimized and extensible websites built with modern web technology."],
      ["AI experiments", "Exploring AI tools, automation and practical AI-powered digital products."],
    ],
    cta: "Have a project in mind?",
    ctaText: "I am open to thoughtful collaborations and turning ideas into polished web products.",
    contact: "Contact me",
    aboutKicker: "About",
    aboutTitle: "I design, build and experiment on the web.",
    aboutText: "Quan Tran Lab is where I document personal projects, websites, AI experiments and digital products while learning to build better every day.",
    aboutFocus: "My current focus is web design, Next.js, AI-assisted development and tools that make digital work more effective.",
  },
} as const;

export function Home() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const icons = [Monitor, Code2, Sparkles];
  const [hasProfileImage, setHasProfileImage] = useState(true);
  return (
    <main>
      <section id="home" className="hero shell anchor-section">
        <div className="hero-copy">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1>{t.name}</h1>
          <h2>{t.headline}</h2>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <Link href="#work" className="button button-dark">{t.work}<ArrowRight size={18} /></Link>
            <Link href="#about" className="text-link">{t.about}<span>—</span></Link>
          </div>
          <div className="quick-facts" aria-label="Focus areas">
            {t.labels.map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
        <div className="hero-art" aria-label="Ảnh cá nhân của Trần Mạnh Quân">
          {hasProfileImage ? (
            <div className="profile-photo-mask">
              <Image
                src="/profile.jpg"
                alt="Ảnh cá nhân của Trần Mạnh Quân"
                fill
                priority
                sizes="(max-width: 900px) 92vw, 46vw"
                className="profile-photo"
                onError={() => setHasProfileImage(false)}
              />
            </div>
          ) : (
            <>
              <div className="blob blob-a" /><div className="blob blob-b" /><div className="blob blob-c" />
              <p className="profile-photo-hint">Thêm ảnh tại <code>public/profile.jpg</code></p>
            </>
          )}
        </div>
      </section>

      <section id="work" className="section shell anchor-section">
        <div className="section-heading"><p className="section-kicker"><span />{t.selected}</p></div>
        <div className="projects-grid">{projects.slice(0,3).map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
      </section>

      <section id="skills" className="section shell anchor-section">
        <div className="section-heading"><p className="section-kicker"><span />{t.what}</p></div>
        <div className="capabilities">
          {t.skills.map(([title, text], i) => {
            const Icon = icons[i];
            return <article className="capability" key={title}><div className="cap-icon"><Icon size={25} /></div><div><h3>{title}</h3><p>{text}</p></div><ArrowRight className="cap-arrow" size={20} /></article>;
          })}
        </div>
      </section>

      <section id="about" className="section shell anchor-section about-section">
        <p className="section-kicker"><span />{t.aboutKicker}</p>
        <div className="about-grid">
          <div className="portrait-placeholder"><span>Q</span></div>
          <div><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><p>{t.aboutFocus}</p></div>
        </div>
      </section>

      <section id="contact" className="cta shell anchor-section">
        <div><h2>{t.cta}</h2><p>{t.ctaText}</p></div>
        <Link className="button button-dark" href="/contact">{t.contact}<ArrowRight size={18} /></Link>
      </section>
    </main>
  );
}

