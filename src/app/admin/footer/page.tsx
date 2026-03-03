import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultFooterContent: AdminContent = {
  heroTitle: "Footer",
  heroSubtitle: "구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석",
  ctaSecondary: "Beta 서비스 오픈: 2026.02",
  sections: [],
};

export default function AdminFooterPage() {
  return (
    <AdminContentEditor
      pageId="footer"
      title="Footer 문구"
      description="푸터의 소개 문구와 배지 텍스트를 수정합니다."
      defaultContent={defaultFooterContent}
    />
  );
}

