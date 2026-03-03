import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminContent, fetchAdminContent } from "@/lib/api";

export const dynamic = "force-dynamic";

const defaultTechContent: AdminContent = {
  heroTitle: "구조적 위치 기반 선제적 인덱싱 및 역방향 쿼리 기술",
  heroSubtitle:
    "기존 diff의 한계를 넘어, 오프셋 기반 인덱싱으로 정확한 변경 이력을 역추적합니다.",
  sections: [
    {
      title: "기존 diff 방식의 한계",
      description:
        '라인 단위 비교는 구조 이동 시 노이즈가 많고, 특정 범위(offset)에서 "무엇이 어떻게 바뀌었는지"를 직접 질의하기 어렵습니다.',
    },
    {
      title: "Offset 기반 선제적 인덱싱",
      description:
        "문서 버전 저장 시 start_offset / end_offset 단위로 변경 블록을 사전 인덱싱하고, 변경 블록 캐싱을 통해 역방향 쿼리에 빠르게 응답합니다.",
    },
    {
      title: "개념 다이어그램",
      description:
        "문서 버전 → 오프셋 구간별 변경 블록 인덱싱 → 역방향 쿼리 파이프라인으로 동작합니다.",
    },
  ],
};

async function getTechContent() {
  const remote = await fetchAdminContent("technology");
  if (!remote) return defaultTechContent;
  return {
    ...defaultTechContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultTechContent.sections,
  };
}

export default async function TechnologyPage() {
  const content = await getTechContent();
  const sections = content.sections ?? defaultTechContent.sections!;

  return (
    <div className="container mx-auto max-w-4xl space-y-16 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          {content.heroTitle}
        </h1>
        <p className="mt-4 text-muted-foreground">{content.heroSubtitle}</p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">문제 정의</h2>
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {sections[0]?.title ?? "기존 diff 방식의 한계"}
            </CardTitle>
            <CardDescription>
              {sections[0]?.description ??
                '라인 단위 비교는 구조 이동 시 노이즈가 많고, 특정 범위(offset)에서 "무엇이 어떻게 바뀌었는지"를 직접 질의하기 어렵습니다.'}
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">LexAI 방식</h2>
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {sections[1]?.title ?? "Offset 기반 선제적 인덱싱"}
            </CardTitle>
            <CardDescription>
              {sections[1]?.description ??
                "문서 버전 저장 시 start_offset / end_offset 단위로 변경 블록을 사전 인덱싱하고, 변경 블록 캐싱을 통해 역방향 쿼리에 빠르게 응답합니다."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["start_offset", "end_offset", "사전 인덱싱", "변경 블록 캐싱", "기여도 시각화"].map(
                (k) => (
                  <Badge key={k} variant="secondary">
                    {k}
                  </Badge>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">개념 다이어그램</h2>
        <Card className="rounded-2xl border-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center gap-4 bg-muted/30 p-8">
              <div className="flex items-end gap-2">
                <div className="h-8 w-12 rounded bg-primary/20" title="버전 A" />
                <div className="h-12 w-12 rounded bg-primary/40" title="버전 B" />
                <div className="h-16 w-12 rounded bg-primary/60" title="버전 C" />
              </div>
              <p className="text-sm text-muted-foreground">
                문서 버전 → 오프셋 구간별 변경 블록 인덱싱 → 역방향 쿼리
              </p>
              <div className="flex gap-4 text-xs">
                <span>start_offset</span>
                <span>end_offset</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
