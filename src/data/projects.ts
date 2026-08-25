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
    slug: "approvehub",
    title: "ApproveHub",
    titleEn: "ApproveHub",
    type: "Nền tảng ký số & quản trị tài liệu",
    typeEn: "Digital signing & document management",
    year: "07/2026",
    description:
      "Nền tảng giúp doanh nghiệp số hóa quy trình phê duyệt, bảo mật dữ liệu và tăng tốc ra quyết định.",
    descriptionEn: "A platform that helps businesses digitize approval workflows, protect data and make decisions faster.",
    accent: "slate",
    featured: true,
    stack: ["Digital signing", "Approval workflow", "Document management"],
  },
];