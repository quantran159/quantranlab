export type Project = {
  slug: string;
  title: string;
  titleEn: string;
  type: string;
  typeEn: string;
  year: string;
  description: string;
  descriptionEn: string;
  accent: "blue" | "pearl" | "slate";
  featured?: boolean;
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-riser-vietnam-2026",
    title: "AI Riser Vietnam 2026",
    titleEn: "AI Riser Vietnam 2026",
    type: "Web app / Sự kiện AI",
    typeEn: "Web app / AI event",
    year: "2026",
    description:
      "Dự án vibe coding tham gia sự kiện Google AI Riser Vietnam, tập trung vào trải nghiệm rõ ràng, hiện đại và dễ tiếp cận.",
    descriptionEn:
      "A vibe-coded project for Google AI Riser Vietnam, focused on a clear, modern and approachable experience.",
    accent: "blue",
    featured: true,
    stack: ["Next.js", "AI", "Vibe Coding"],
  },
  {
    slug: "quan-tran-portfolio",
    title: "Portfolio cá nhân",
    titleEn: "Personal Portfolio",
    type: "UI/UX / Website cá nhân",
    typeEn: "UI/UX / Personal website",
    year: "2026",
    description:
      "Portfolio của Trần Mạnh Quân — nơi tập hợp các dự án web, thử nghiệm AI và sản phẩm số.",
    descriptionEn:
      "Tran Manh Quan's portfolio — a home for web projects, AI experiments and digital products.",
    accent: "pearl",
    featured: true,
    stack: ["Next.js", "Sanity", "Vercel"],
  },
  {
    slug: "studio-website-concept",
    title: "Website doanh nghiệp",
    titleEn: "Studio Website Concept",
    type: "Website thương hiệu / Concept",
    typeEn: "Brand website / Concept",
    year: "2026",
    description:
      "Một concept website doanh nghiệp tối giản, ưu tiên hiệu năng, cấu trúc nội dung và khả năng chuyển đổi.",
    descriptionEn:
      "A minimal business website concept prioritizing performance, content structure and conversion.",
    accent: "slate",
    featured: true,
    stack: ["Web Design", "Next.js", "Responsive"],
  },
];
