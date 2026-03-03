import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultAboutContent: AdminContent = {
  heroTitle: "회사 소개",
  heroSubtitle:
    "LexAI는 구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 기술을 개발합니다.",
  sections: [
    {
      title: "개요",
      description:
        "회사명: LexAI · 설립: 2025년(더미) · AI 보조 작성의 증가에 따라 생성·편집 이력을 투명하게 관리하기 위해 시작되었습니다.",
    },
    {
      title: "기술 개발 배경",
      description:
        '\"어디까지가 AI이고 어디부터가 사람인지\"를 증명할 수 있는 수단이 필요해, 오프셋 기반 역방향 쿼리 기술을 연구·제품화했습니다.',
    },
    {
      title: "특허·지식재산",
      description:
        "구조적 위치 기반 선제적 인덱싱 및 역방향 쿼리 기술에 대해 특허 출원을 진행 중입니다. (더미)",
    },
  ],
};

export default function AdminAboutPage() {
  return (
    <AdminContentEditor
      pageId="about"
      title="About 페이지 문구"
      description="회사 소개(/about)의 타이틀과 섹션을 수정합니다."
      defaultContent={defaultAboutContent}
    />
  );
}

