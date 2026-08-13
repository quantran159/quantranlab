Exit code: 0
Wall time: 1 seconds
Output:
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "vi" | "en";
type Ctx = { lang: Lang; setLang: (lang: Lang) => void };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");
  useEffect(() => {
    const saved = window.localStorage.getItem("qtl-lang") as Lang | null;
    if (saved !== "vi" && saved !== "en") return;

    const frame = window.requestAnimationFrame(() => setLangState(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const setLang = (value: Lang) => {
    setLangState(value);
    window.localStorage.setItem("qtl-lang", value);
  };
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

