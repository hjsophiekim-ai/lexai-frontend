import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultPricingContent: AdminContent = {
  heroTitle: "요금제",
  heroSubtitle: "팀 규모에 맞는 플랜을 선택하세요.",
  sections: [
    {
      title: "Starter",
      description: "월 49,000원 / 월 100건(API) · 기본 문서 관리 · 이메일 지원",
    },
    {
      title: "Business",
      description:
        "월 299,000원 / 무제한 · 리포트 · 대시보드 · 우선 지원 · 전담 매니저",
    },
    {
      title: "Enterprise",
      description: "맞춤 요금 · 온프레미스 · SLA · 커스텀 통합",
    },
  ],
};

export default function AdminPricingPage() {
  return (
    <AdminContentEditor
      pageId="pricing"
      title="Pricing 페이지 문구"
      description="요금제 페이지(/pricing)의 상단 문구와 플랜 설명을 수정합니다."
      defaultContent={defaultPricingContent}
    />
  );
}

