import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultDocsContent: AdminContent = {
  heroTitle: "API 문서",
  heroSubtitle: "Swagger 스타일 레이아웃 · 엔드포인트 목록 및 curl 예시",
  sections: [],
};

export default function AdminDocsPage() {
  return (
    <AdminContentEditor
      pageId="docs"
      title="Docs 페이지 문구"
      description="API 문서(/docs)의 상단 타이틀 및 설명 문구를 수정합니다."
      defaultContent={defaultDocsContent}
    />
  );
}

