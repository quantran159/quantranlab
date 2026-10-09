import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Dịch vụ xác minh Google Business Profile",
  description: "Hỗ trợ rà soát hồ sơ, chuẩn bị thông tin và đồng hành cùng doanh nghiệp trong quy trình xác minh Google Business Profile.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Dịch vụ xác minh Google Business Profile | Quan Tran Lab",
    description: "Hỗ trợ doanh nghiệp chuẩn bị và thực hiện các bước xác minh Google Business Profile.",
    url: "/services",
  },
};

export default function ServicesRoute() {
  return <ServicePage />;
}
