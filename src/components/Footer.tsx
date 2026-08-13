Exit code: 0
Wall time: 0.9 seconds
Output:
"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { lang } = useLanguage();
  return <footer className="footer shell"><strong>QUAN TRAN LAB</strong><p>{lang === "vi" ? "Thiết kế. Xây dựng. Thử nghiệm." : "Design. Build. Experiment."}</p><div><Link href="/#work">{lang === "vi" ? "Dự án" : "Work"}</Link><Link href="/#about">{lang === "vi" ? "Giới thiệu" : "About"}</Link><Link href="/#contact">{lang === "vi" ? "Liên hệ" : "Contact"}</Link></div></footer>;
}

