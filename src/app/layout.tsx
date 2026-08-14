Exit code: 0
Wall time: 1 seconds
Output:
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://quantranlab.com"),
  title: { default: "Quan Tran — Web Designer & Digital Product Builder", template: "%s | Quan Tran Lab" },
  description: "Portfolio của Trần Mạnh Quân — web design, digital products, AI experiments and modern web development.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "https://quantranlab.com", siteName: "Quan Tran Lab", title: "Quan Tran — Portfolio", description: "Web design, digital products and AI experiments by Tran Manh Quan." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={GeistSans.variable}><body><LanguageProvider><div className="page-frame"><Header />{children}<Footer /></div></LanguageProvider></body></html>;
}

