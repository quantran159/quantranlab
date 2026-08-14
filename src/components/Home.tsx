"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Code2, Monitor, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { useLanguage } from "./LanguageProvider";

const copy = {
  vi: {
    eyebrow: "Portfolio cá nhân của Trần Mạnh Quân",
    name: "Quan Tran",
    headline: "Business Solutions · Google Workspace · AI",
    intro: "Tôi tư vấn, triển khai và đồng hành cùng doanh nghiệp trong việc ứng dụng công nghệ — từ Google Workspace, Microsoft đến AI — để làm việc hiệu quả hơn.",
    work: "Xem công việc của tôi",
    about: "Về tôi",
    labels: ["Google Workspace", "Microsoft", "AI", "Business Solutions"],
    selected: "Dự án nổi bật",
    what: "Tôi làm gì",
    skills: [
      ["Business Solutions", "Tư vấn giải pháp công nghệ dựa trên nhu cầu vận hành thực tế của doanh nghiệp."],
      ["Google Workspace & Microsoft", "Tư vấn, triển khai và hỗ trợ doanh nghiệp sử dụng Google Workspace, Microsoft và các giải pháp phần mềm liên quan."],
      ["AI & Automation", "Nghiên cứu và ứng dụng AI, automation và mini app để giải quyết những công việc thực tế."],
    ],
    cta: "Có điều gì thú vị để cùng trao đổi?",
    ctaText: "Tôi luôn hứng thú với những câu chuyện về công nghệ, Google Workspace, AI và những ý tưởng có thể tạo ra giá trị thực tế.",
    contact: "Kết nối với tôi",
    aboutKicker: "Giới thiệu",
    aboutTitle: "Tôi kết nối business, công nghệ và AI.",
    aboutText: "Tôi là Trần Mạnh Quân, hiện là Business Solution Team Leader, tập trung vào các giải pháp công nghệ dành cho doanh nghiệp như Google Workspace và Microsoft.",
    aboutRole: "Công việc của tôi trải dài từ tư vấn solution, triển khai đến hỗ trợ khách hàng trong quá trình sử dụng. Tôi đang đồng hành với nhiều doanh nghiệp có quy mô từ vài chục đến khoảng 1.000 tài khoản người dùng. Ngoài công việc chính, tôi dành nhiều thời gian nghiên cứu AI, thử nghiệm các công cụ mới và xây những mini app giúp công việc trở nên hiệu quả hơn.",
    aboutLab: "Quan Tran Lab là nơi tôi ghi lại những gì mình đang học, thử nghiệm và xây dựng — từ Google Workspace, AI, automation đến các mini app phục vụ công việc thực tế.",
    aboutFocus: "Hiện tôi đặc biệt quan tâm đến AI ứng dụng, automation, coding agents và cách những công nghệ mới có thể cải thiện cách chúng ta làm việc.",
  },
  en: {
    eyebrow: "Personal portfolio of Tran Manh Quan",
    name: "Quan Tran",
    headline: "Business Solutions · Google Workspace · AI",
    intro: "I advise, implement and support businesses as they adopt technology — from Google Workspace and Microsoft to AI — so they can work more effectively.",
    work: "View my work",
    about: "About me",
    labels: ["Google Workspace", "Microsoft", "AI", "Business Solutions"],
    selected: "Selected work",
    what: "What I do",
    skills: [
      ["Business Solutions", "Technology solution consulting grounded in the real operating needs of businesses."],
      ["Google Workspace & Microsoft", "Advising, implementing and supporting businesses with Google Workspace, Microsoft and related software solutions."],
      ["AI & Automation", "Researching and applying AI, automation and mini apps to solve practical work problems."],
    ],
    cta: "Have something interesting to discuss?",
    ctaText: "I am always interested in conversations about technology, Google Workspace, AI and ideas that can create practical value.",
    contact: "Connect with me",
    aboutKicker: "About",
    aboutTitle: "I connect business, technology and AI.",
    aboutText: "I am Tran Manh Quan, currently a Business Solution Team Leader focused on technology solutions for businesses, including Google Workspace and Microsoft.",
    aboutRole: "My work spans solution consulting, implementation and customer support. I work alongside businesses ranging from dozens to around 1,000 user accounts. Alongside my main role, I spend time researching AI, testing new tools and building mini apps that make work more effective.",
    aboutLab: "Quan Tran Lab is where I document what I am learning, testing and building — from Google Workspace, AI and automation to mini apps for practical work needs.",
    aboutFocus: "I am especially interested in applied AI, automation, coding agents and how emerging technologies can improve the way we work.",
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
            <svg className="profile-shape" viewBox="0 0 560 510" role="img" aria-label="Ảnh cá nhân của Trần Mạnh Quân">
              <defs>
                <mask id="profile-shape-mask" maskUnits="userSpaceOnUse">
                  <rect width="560" height="510" fill="black" />
                  <g fill="white">
                    <ellipse cx="342" cy="110" rx="190" ry="75" transform="rotate(-8 342 110)" />
                    <ellipse cx="325" cy="240" rx="235" ry="95" transform="rotate(-8 325 240)" />
                    <ellipse cx="300" cy="382" rx="140" ry="52.5" transform="rotate(-8 300 382)" />
                  </g>
                </mask>
              </defs>
              <image href="/profile.jpg" x="0" y="0" width="560" height="510" preserveAspectRatio="xMidYMid slice" mask="url(#profile-shape-mask)" onError={() => setHasProfileImage(false)} />
            </svg>
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
          <div><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><p>{t.aboutRole}</p><p>{t.aboutLab}</p><p>{t.aboutFocus}</p></div>
        </div>
      </section>

      <section id="contact" className="cta shell anchor-section">
        <div><h2>{t.cta}</h2><p>{t.ctaText}</p></div>
        <Link className="button button-dark" href="/contact">{t.contact}<ArrowRight size={18} /></Link>
      </section>
    </main>
  );
}

