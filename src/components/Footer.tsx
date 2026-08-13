"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { lang } = useLanguage();
  return <footer className="footer shell"><strong>QUAN TRAN LAB</strong><p>{lang === "vi" ? "Thiết kế. Xây dựng. Thử nghiệm." : "Design. Build. Experiment."}</p><div><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div></footer>;
}
