import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

export const metadata: Metadata = {
  metadataBase: new URL("https://quantranlab.com"),
  title: { default: "Quan Tran — Business Solutions · Google Workspace · AI", template: "%s | Quan Tran Lab" },
  description: "Portfolio của Trần Mạnh Quân — Business Solutions, Google Workspace, Microsoft, AI và automation.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "https://quantranlab.com", siteName: "Quan Tran Lab", title: "Quan Tran — Business Solutions · Google Workspace · AI", description: "Business Solutions, Google Workspace, Microsoft, AI và automation của Trần Mạnh Quân." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={GeistSans.variable}><body><LanguageProvider><div className="page-frame"><CursorGlow /><Header />{children}<Footer /></div></LanguageProvider></body></html>;
}


