import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultProductContent: AdminContent = {
  heroTitle: "서비스 기능",
  heroSubtitle:
    "AI 콘텐츠의 생성·편집 이력을 범위 기반으로 역추적하고 기여도를 분석합니다.",
  sections: [
    {
      title: "버전 추적",
      description:
        "문서의 모든 버전을 저장하고, 각 버전 간 변경 사항을 구조적으로 관리합니다.",
    },
    {
      title: "역방향 쿼리",
      description:
        "특정 오프셋 구간에서 어떤 변경이 일어났는지 역으로 조회할 수 있습니다.",
    },
    {
      title: "기여도 분석",
      description:
        "AI 생성 vs 인간 편집 비율을 시각화하여 콘텐츠 기여도를 한눈에 파악합니다.",
    },
  ],
};

export default function AdminProductPage() {
  return (
    <AdminContentEditor
      pageId="product"
      title="Product 페이지 문구"
      description="서비스 기능(/product)에 노출되는 타이틀과 기능 카드를 수정합니다."
      defaultContent={defaultProductContent}
    />
  );
}

