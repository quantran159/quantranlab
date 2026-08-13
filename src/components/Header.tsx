Exit code: 0
Wall time: 1.2 seconds
Output:
"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export function Header() {
  const { lang, setLang } = useLanguage();
  const t = lang === "vi"
    ? { work: "Dự án", about: "Giới thiệu", contact: "Liên hệ" }
    : { work: "Work", about: "About", contact: "Contact" };

  return (
    <header className="site-header shell">
      <Link className="brand" href="/">QUAN TRAN LAB</Link>
      <nav aria-label="Primary navigation">
        <Link href="/work">{t.work}</Link>
        <Link href="/about">{t.about}</Link>
        <Link href="/contact">{t.contact}</Link>
        <button className="lang-toggle" onClick={() => setLang(lang === "vi" ? "en" : "vi")} aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}>
          {lang === "vi" ? "EN" : "VI"}
        </button>
      </nav>
    </header>
  );
}

