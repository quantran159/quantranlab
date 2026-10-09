"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, FileSearch, MapPinCheck, Video } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const content = {
  vi: {
    eyebrow: "Dịch vụ",
    title: "Xác minh Google Business Profile",
    lead: "Hỗ trợ doanh nghiệp chuẩn bị hồ sơ và thực hiện các bước xác minh trên Google Search và Google Maps — rõ ràng, đúng thông tin và theo hướng dẫn Google cung cấp cho hồ sơ của bạn.",
    cta: "Trao đổi về hồ sơ của bạn",
    scopeLabel: "Bạn sẽ được hỗ trợ",
    scopeTitle: "Chuẩn bị kỹ trước khi gửi xác minh",
    scopeIntro: "Mỗi hồ sơ có thể được Google yêu cầu xác minh theo cách khác nhau. Tôi sẽ cùng bạn rà soát tình trạng thực tế và chuẩn bị theo phương thức Google đang hiển thị.",
    services: [
      [FileSearch, "Rà soát hồ sơ", "Kiểm tra thông tin doanh nghiệp, trạng thái hồ sơ và những điểm cần làm rõ trước khi tiếp tục."],
      [ClipboardCheck, "Chuẩn bị thông tin và bằng chứng", "Lập danh sách thông tin, giấy tờ hoặc tư liệu phù hợp với tình huống và yêu cầu Google hiển thị."],
      [Video, "Hướng dẫn xác minh video", "Hướng dẫn chuẩn bị địa điểm, biển hiệu, thiết bị và bằng chứng hoạt động nếu Google yêu cầu xác minh video."],
      [MapPinCheck, "Đồng hành khi có vướng mắc", "Cùng xem lại bước chưa hoàn tất và hướng dẫn cách phản hồi hoặc chuẩn bị lại theo thông báo từ Google."],
    ] as const,
    processLabel: "Quy trình",
    processTitle: "Bốn bước, bắt đầu từ tình trạng hồ sơ",
    steps: [
      ["01", "Tiếp nhận thông tin", "Bạn chia sẻ loại hình doanh nghiệp, khu vực hoạt động và tình trạng hồ sơ hiện tại."],
      ["02", "Rà soát & đề xuất", "Tôi xem các thông tin liên quan và thống nhất phạm vi hỗ trợ phù hợp với trường hợp của bạn."],
      ["03", "Chuẩn bị xác minh", "Bạn được hướng dẫn chuẩn bị thông tin, tài liệu hoặc buổi xác minh theo lựa chọn Google cung cấp."],
      ["04", "Theo dõi kết quả", "Tôi hỗ trợ bạn hiểu thông báo tiếp theo và xác định bước cần làm nếu Google yêu cầu bổ sung."],
    ],
    fitLabel: "Phù hợp với",
    fitTitle: "Dành cho doanh nghiệp cần một người hướng dẫn rõ ràng",
    fitItems: ["Doanh nghiệp đang tạo hồ sơ mới trên Google", "Hồ sơ hiện có đang chờ hoặc gặp khó khi xác minh", "Chủ doanh nghiệp muốn tự nắm quyền quản lý hồ sơ", "Đơn vị có nhiều địa điểm cần rà soát từng hồ sơ"],
    faqLabel: "Câu hỏi thường gặp",
    faqs: [
      ["Có thể đảm bảo Google sẽ xác minh thành công không?", "Không. Google tự quyết định phương thức, yêu cầu và kết quả xác minh cho từng hồ sơ. Dịch vụ hỗ trợ bạn chuẩn bị thông tin phù hợp và làm theo hướng dẫn Google, không thể thay thế quyết định của Google."],
      ["Tôi cần cung cấp những gì?", "Thông thường cần thông tin doanh nghiệp và tình trạng hồ sơ. Tùy trường hợp, Google có thể yêu cầu bạn cung cấp hoặc trình bày thêm bằng chứng về địa điểm, hoạt động và quyền quản lý doanh nghiệp."],
      ["Có phải hồ sơ nào cũng xác minh bằng video không?", "Không. Google tự chọn các phương thức khả dụng theo loại hình, khu vực và thông tin doanh nghiệp. Bạn chỉ có thể chọn trong những phương thức Google hiển thị cho hồ sơ của mình."],
      ["Dịch vụ có bao gồm tối ưu thứ hạng Google Maps không?", "Trang này tập trung vào hỗ trợ chuẩn bị và xác minh hồ sơ. Xác minh không đồng nghĩa với cam kết thứ hạng tìm kiếm hoặc lượng khách hàng."],
    ],
    note: "Google Business Profile (trước đây thường được gọi là Google My Business) là dịch vụ miễn phí của Google. Google kiểm soát phương thức, thời gian xét duyệt và quyết định xác minh. Không chia sẻ mã xác minh hoặc mật khẩu tài khoản Google với bên thứ ba.",
    finalTitle: "Bạn đang vướng ở bước nào?",
    finalText: "Gửi thông tin tình trạng hồ sơ để cùng xác định bước tiếp theo phù hợp.",
  },
  en: {
    eyebrow: "Services",
    title: "Google Business Profile Verification",
    lead: "Practical guidance to prepare your business information and follow the verification steps Google provides for your profile on Search and Maps.",
    cta: "Discuss your profile",
    scopeLabel: "How I can help",
    scopeTitle: "Prepare carefully before submitting",
    scopeIntro: "Google may ask different businesses to verify in different ways. We’ll review your situation and prepare for the method Google shows for your profile.",
    services: [
      [FileSearch, "Profile review", "Review your business information, profile status and details that may need clarification."],
      [ClipboardCheck, "Information and evidence preparation", "Build a practical checklist of information, documents or materials relevant to your case and Google’s request."],
      [Video, "Video verification guidance", "Prepare your location, signage, equipment and evidence of business activity if Google requests a video."],
      [MapPinCheck, "Help with verification issues", "Review an incomplete step and help you understand how to respond or prepare again based on Google’s notice."],
    ] as const,
    processLabel: "Process",
    processTitle: "Four steps, starting with your profile status",
    steps: [
      ["01", "Share the details", "Tell me about your business, service area and current profile status."],
      ["02", "Review and plan", "I review the relevant information and agree on a suitable scope of support with you."],
      ["03", "Prepare to verify", "Get guidance on the information, documents or verification session required by the method Google offers."],
      ["04", "Follow up", "I help you understand the next notice and identify what to do if Google asks for more information."],
    ],
    fitLabel: "Who it’s for",
    fitTitle: "For businesses that want clear, practical guidance",
    fitItems: ["Businesses setting up a new Google profile", "Existing profiles waiting for verification or facing issues", "Owners who want to retain control of their profile", "Businesses reviewing profiles across multiple locations"],
    faqLabel: "Frequently asked questions",
    faqs: [
      ["Can you guarantee Google will verify my business?", "No. Google decides the available method, requirements and outcome for each profile. This service helps you prepare relevant information and follow Google’s instructions; it cannot replace Google’s decision."],
      ["What information will I need to provide?", "Usually, your business information and current profile status. Depending on the case, Google may ask you to provide or show evidence of your location, business activity and authority to manage the business."],
      ["Does every profile need video verification?", "No. Google determines available methods based on business type, region and business information. You can choose only from the methods shown for your profile."],
      ["Does this include Google Maps ranking optimization?", "This service focuses on profile preparation and verification support. Verification does not guarantee search rankings or customer volume."],
    ],
    note: "Google Business Profile, formerly known as Google My Business, is a free Google service. Google controls verification methods, review timelines and approval decisions. Do not share your verification code or Google account password with a third party.",
    finalTitle: "Where are you stuck?",
    finalText: "Share your profile status and we can discuss a suitable next step.",
  },
} as const;

export function ServicePage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main className="inner shell service-page">
      <section className="service-hero">
        <p className="eyebrow"><span />{t.eyebrow}</p>
        <div className="service-hero-grid">
          <div>
            <h1 className="page-title">{t.title}</h1>
            <p className="page-lead">{t.lead}</p>
            <Link className="button button-dark" href="/contact">{t.cta}<ArrowRight size={18} /></Link>
          </div>
          <div className="service-stamp" aria-hidden="true"><BadgeCheck size={44} strokeWidth={1.4} /><span>Google<br />Business<br />Profile</span></div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-heading"><div><p className="section-kicker"><span />{t.scopeLabel}</p><h2>{t.scopeTitle}</h2></div><p>{t.scopeIntro}</p></div>
        <div className="service-cards">{t.services.map(([Icon, title, text]) => <article className="service-card" key={title}><div className="service-card-icon"><Icon size={23} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="service-section process-section">
        <div className="service-section-heading"><div><p className="section-kicker"><span />{t.processLabel}</p><h2>{t.processTitle}</h2></div></div>
        <div className="service-steps">{t.steps.map(([number, title, text]) => <article className="service-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="service-fit">
        <div><p className="section-kicker"><span />{t.fitLabel}</p><h2>{t.fitTitle}</h2></div>
        <ul>{t.fitItems.map((item) => <li key={item}><BadgeCheck size={18} />{item}</li>)}</ul>
      </section>

      <section className="service-section faq-section">
        <p className="section-kicker"><span />{t.faqLabel}</p>
        <div className="service-faq-list">{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <p className="service-note">{t.note}</p>
      <section className="cta service-cta"><div><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div><Link className="button button-dark" href="/contact">{t.cta}<ArrowRight size={18} /></Link></section>
    </main>
  );
}
