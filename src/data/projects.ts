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
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "restaurant-homestay",
    title: "App quản lý nhà hàng và homestay",
    titleEn: "Restaurant & Homestay Management",
    type: "Ứng dụng vận hành nhà hàng & lưu trú",
    typeEn: "Restaurant & lodging operations app",
    year: "10/2026",
    description:
      "Ứng dụng hỗ trợ quản lý hoạt động nhà hàng và homestay trên cùng một hệ thống, từ đơn hàng, phòng lưu trú đến kho hàng và thu chi.",
    descriptionEn:
      "An operations app for managing restaurant and homestay workflows in one place, from orders and stays to inventory and payments.",
    accent: "blue",
    featured: true,
    stack: ["TypeScript", "Cloudflare Workers", "Cloudflare D1", "Cloudflare R2", "PWA"],
    href: "https://quan-tran-homestay.quantranmanh159.workers.dev/",
    highlights: [
      "Quản lý bàn, đơn hàng và luồng gửi món đến hàng đợi bếp.",
      "Theo dõi đặt phòng, nhận/trả phòng và dịch vụ lưu trú.",
      "Quản lý nguyên liệu, nhập xuất kho, thanh toán và báo cáo hoạt động.",
      "Phân quyền tài khoản cho các vị trí làm việc trong hệ thống.",
    ],
  },
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
