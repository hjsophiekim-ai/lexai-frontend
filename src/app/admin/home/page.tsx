import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultHomeContent: AdminContent = {
  heroTitle: "LEXAI",
  heroSubtitle:
    "구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 시스템",
  ctaPrimary: "데모 체험하기",
  ctaSecondary: "API 문서 보기",
  badgeText: "Beta 서비스 오픈: 2026.02",
  heroExtra: "AI 콘텐츠의 생성·편집 이력을 범위 기반으로 역추적하십시오.",
  sectionHeading: "핵심 기능",
  sectionSubheading:
    "오프셋 기반 인덱싱과 역방향 쿼리로 정확한 변경 이력을 추적합니다.",
  industryLabel: "적용 산업",
  industryItems: "LegalTech, 콘텐츠 플랫폼, 언론사, 교육 플랫폼",
  ctaSectionHeading: "지금 바로 체험해 보세요.",
  ctaSectionPrimary: "데모 체험하기",
  ctaSectionSecondary: "문의하기",
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

