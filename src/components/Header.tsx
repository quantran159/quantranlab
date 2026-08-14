"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

function AnimatedNavLink({ href, children, onClick }: { href: string; children: string; onClick?: () => void }) {
  return (
    <Link className="header-nav-link" href={href} onClick={onClick}>
      <span className="header-nav-link-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = lang === "vi"
    ? { work: "Dự án", skills: "Tôi làm gì", about: "Giới thiệu", contact: "Liên hệ" }
    : { work: "Work", skills: "What I do", about: "About", contact: "Contact" };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header shell">
      <Link className="brand" href="/#home">QUAN TRAN LAB</Link>
      <nav className="header-nav-desktop" aria-label="Primary navigation">
        <AnimatedNavLink href="/#work">{t.work}</AnimatedNavLink>
        <AnimatedNavLink href="/#skills">{t.skills}</AnimatedNavLink>
        <AnimatedNavLink href="/#about">{t.about}</AnimatedNavLink>
        <AnimatedNavLink href="/#contact">{t.contact}</AnimatedNavLink>
        <button className="lang-toggle" onClick={() => setLang(lang === "vi" ? "en" : "vi")} aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}>
          {lang === "vi" ? "EN" : "VI"}
        </button>
      </nav>
      <button
        className="header-menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>
      {menuOpen && (
        <nav id="mobile-navigation" className="header-mobile-menu" aria-label="Mobile navigation">
          <AnimatedNavLink href="/#work" onClick={closeMenu}>{t.work}</AnimatedNavLink>
          <AnimatedNavLink href="/#skills" onClick={closeMenu}>{t.skills}</AnimatedNavLink>
          <AnimatedNavLink href="/#about" onClick={closeMenu}>{t.about}</AnimatedNavLink>
          <AnimatedNavLink href="/#contact" onClick={closeMenu}>{t.contact}</AnimatedNavLink>
          <button className="lang-toggle" onClick={() => setLang(lang === "vi" ? "en" : "vi")} aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"} onMouseDown={closeMenu}>
            {lang === "vi" ? "EN" : "VI"}
          </button>
        </nav>
      )}
    </header>
  );
}

