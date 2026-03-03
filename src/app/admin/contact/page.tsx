import { AdminContent } from "@/lib/api";
import { AdminContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";

const defaultContactContent: AdminContent = {
  heroTitle: "문의",
  heroSubtitle: "요금제·기술 문의는 아래 폼으로 보내주세요.",
  sections: [],
};

export default function AdminContactPage() {
  return (
    <AdminContentEditor
      pageId="contact"
      title="Contact 페이지 문구"
      description="문의 페이지(/contact)의 상단 타이틀과 설명 문구를 수정합니다."
      defaultContent={defaultContactContent}
    />
  );
}

