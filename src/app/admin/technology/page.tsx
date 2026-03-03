import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultTechContent: AdminContent = {
  heroTitle: "구조적 위치 기반 선제적 인덱싱 및 역방향 쿼리 기술",
  heroSubtitle:
    "기존 diff의 한계를 넘어, 오프셋 기반 인덱싱으로 정확한 변경 이력을 역추적합니다.",
  sections: [
    {
      title: "문제 정의",
      description:
        "라인 단위 비교는 구조 이동 시 노이즈가 많고, 특정 범위에서 무엇이 어떻게 바뀌었는지를 직접 질의하기 어렵습니다.",
    },
    {
      title: "LexAI 방식",
      description:
        "start_offset / end_offset 기반으로 변경 블록을 사전 인덱싱하고 캐싱하여 역방향 쿼리에 빠르게 응답합니다.",
    },
    {
      title: "개념 다이어그램",
      description:
        "문서 버전 → 오프셋 구간별 변경 블록 인덱싱 → 역방향 쿼리 파이프라인으로 구성됩니다.",
    },
  ],
};

export default function AdminTechnologyPage() {
  return (
    <AdminContentEditor
      pageId="technology"
      title="Technology 페이지 문구"
      description="기술 설명(/technology)의 제목 및 섹션 설명을 수정합니다."
      defaultContent={defaultTechContent}
    />
  );
}

