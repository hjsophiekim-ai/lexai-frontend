import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultCustomersContent: AdminContent = {
  heroTitle: "적용 사례",
  heroSubtitle: "다양한 산업에서 LexAI를 활용하고 있습니다.",
  sections: [
    {
      title: "LegalTech · 계약서 버전 추적",
      description:
        "AI가 생성한 조항과 변호사 수정 이력을 오프셋 단위로 추적하여 검토 시간을 단축했습니다.",
    },
    {
      title: "콘텐츠 플랫폼 · 기사 편집 이력",
      description:
        "기자·AI 협업 기사의 구간별 변경 이력을 역쿼리로 확인하고 기여도를 리포트합니다.",
    },
    {
      title: "언론사 · 뉴스 원고 관리",
      description:
        "다중 버전 원고에서 특정 문단의 변경 근거를 빠르게 조회합니다.",
    },
    {
      title: "교육 플랫폼 · 교재·강의 자료",
      description:
        "AI 초안과 교수자 수정 구간을 시각화하여 품질 관리를 지원합니다.",
    },
  ],
};

export default function AdminCustomersPage() {
  return (
    <AdminContentEditor
      pageId="customers"
      title="Customers 페이지 문구"
      description="적용 사례(/customers)의 타이틀과 카드 내용을 수정합니다."
      defaultContent={defaultCustomersContent}
    />
  );
}

