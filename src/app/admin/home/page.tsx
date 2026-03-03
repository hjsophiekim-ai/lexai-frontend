import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultHomeContent: AdminContent = {
  heroTitle: "LEXAI",
  heroSubtitle:
    "구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 시스템",
  ctaPrimary: "데모 체험하기",
  ctaSecondary: "API 문서 보기",
  sections: [
    {
      title: "Version Tracking",
      description: "문서 버전별 변경 이력을 구조적으로 저장하고 조회합니다.",
    },
    {
      title: "Range-based Reverse Query",
      description:
        "start_offset / end_offset 기반으로 해당 구간의 변경 블록을 역추적합니다.",
    },
    {
      title: "Human Contribution Visualization",
      description:
        "AI vs 사람 기여 비율과 변경 구간을 시각화합니다.",
    },
  ],
};

export default function AdminHomePage() {
  return (
    <AdminContentEditor
      pageId="home"
      title="홈 페이지 문구"
      description="랜딩 페이지(/)의 Hero 텍스트와 핵심 기능 카드 3개를 수정합니다."
      defaultContent={defaultHomeContent}
    />
  );
}

