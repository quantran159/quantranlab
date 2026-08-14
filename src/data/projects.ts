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
    type: "AI · Vibe Coding",
    typeEn: "AI · Vibe Coding",
    year: "2026",
    description:
      "Đang cập nhật",
    descriptionEn: "Coming soon",
    accent: "blue",
    featured: true,
    stack: ["AI", "Vibe Coding"],
  },
  {
    slug: "ai-mini-apps",
    title: "AI Mini Apps",
    titleEn: "AI Mini Apps",
    type: "AI · Automation · Productivity",
    typeEn: "AI · Automation · Productivity",
    year: "Đang cập nhật",
    description: "Đang cập nhật",
    descriptionEn: "Coming soon",
    accent: "pearl",
    featured: true,
    stack: ["AI", "Automation", "Productivity"],
  },
  {
    slug: "business-solution-cases",
    title: "Business Solution Cases",
    titleEn: "Business Solution Cases",
    type: "Google Workspace · Microsoft · B2B",
    typeEn: "Google Workspace · Microsoft · B2B",
    year: "Đang cập nhật",
    description: "Đang cập nhật",
    descriptionEn: "Coming soon",
    accent: "slate",
    featured: true,
    stack: ["Google Workspace", "Microsoft", "B2B"],
  },
];

