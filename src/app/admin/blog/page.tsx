import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultBlogContent: AdminContent = {
  heroTitle: "업데이트 로그",
  heroSubtitle: "서비스 업데이트 및 릴리즈 소식을 전합니다.",
  sections: [
    {
      title: "v0.2 Reverse Query 고도화",
      description: "2026.02.27 · Reverse Query 품질 및 응답 속도 개선.",
    },
    {
      title: "v0.1 MVP 릴리즈",
      description: "2026.02.15 · Reverse Query MVP 버전 공개.",
    },
    {
      title: "Beta 서비스 오픈 안내",
      description: "2026.02.01 · LexAI Beta 서비스 오픈.",
    },
  ],
};

export default function AdminBlogPage() {
  return (
    <AdminContentEditor
      pageId="blog"
      title="블로그 / 업데이트 로그"
      description="업데이트 로그(/blog)의 타이틀과 항목을 수정합니다."
      defaultContent={defaultBlogContent}
    />
  );
}

