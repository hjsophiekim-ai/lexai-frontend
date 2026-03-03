import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminContent, fetchAdminContent } from "@/lib/api";

export const dynamic = "force-dynamic";

const defaultAboutContent: AdminContent = {
  heroTitle: "회사 소개",
  heroSubtitle:
    "LexAI는 구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 기술을 개발합니다.",
  sections: [
    {
      title: "개요",
      description:
        "회사명: LexAI · 설립: 2025년 (설립일 더미) · AI 보조 작성의 증가에 따라 생성·편집 이력을 투명하게 관리하기 위해 시작되었습니다.",
    },
    {
      title: "기술 개발 배경",
      description:
        'AI 보조 작성이 늘어나면서 "어디까지가 AI이고 어디부터가 사람인지"를 추적·증명할 수 있는 수단이 필요해, 오프셋 기반 역방향 쿼리 기술을 연구·제품화했습니다.',
    },
    {
      title: "특허·지식재산",
      description:
        "구조적 위치 기반 선제적 인덱싱 및 역방향 쿼리 관련 기술에 대해 특허 출원을 진행 중입니다. (더미)",
    },
  ],
};

async function getAboutContent() {
  const remote = await fetchAdminContent("about");
  if (!remote) return defaultAboutContent;
  return {
    ...defaultAboutContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultAboutContent.sections,
  };
}

export default async function AboutPage() {
  const content = await getAboutContent();
  const sections = content.sections ?? defaultAboutContent.sections!;

  return (
    <div className="container mx-auto max-w-4xl space-y-12 px-4 py-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <Image
          src="/logo.png"
          alt="LexAI"
          width={160}
          height={48}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold md:text-4xl">
          {content.heroTitle ?? "회사 소개"}
        </h1>
        <p className="max-w-xl text-muted-foreground">
          {content.heroSubtitle ??
            "LexAI는 구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 기술을 개발합니다."}
        </p>
      </div>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>{sections[0]?.title ?? "개요"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground whitespace-pre-wrap">
          <p>{sections[0]?.description ?? defaultAboutContent.sections![0].description}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>{sections[2]?.title ?? "특허·지식재산"}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground whitespace-pre-wrap">
          <p>{sections[2]?.description ?? defaultAboutContent.sections![2].description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

