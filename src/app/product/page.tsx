import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminContent, fetchAdminContent } from "@/lib/api";

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

async function getProductContent() {
  const remote = await fetchAdminContent("product");
  if (!remote) return defaultProductContent;
  return {
    ...defaultProductContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultProductContent.sections,
  };
}

export default async function ProductPage() {
  const content = await getProductContent();
  const sections = content.sections ?? defaultProductContent.sections!;

  return (
    <div className="container mx-auto max-w-4xl space-y-12 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          {content.heroTitle ?? "서비스 기능"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {content.heroSubtitle ??
            "AI 콘텐츠의 생성·편집 이력을 범위 기반으로 역추적하고 기여도를 분석합니다."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((f) => (
          <Card key={f.title} className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="text-lg">{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

