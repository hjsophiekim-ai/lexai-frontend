import Link from "next/link";
import { ArrowRight, GitBranch, Search, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
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

async function getHomeContent() {
  const remote = await fetchAdminContent("home");
  if (!remote) return defaultHomeContent;
  return {
    ...defaultHomeContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultHomeContent.sections,
  };
}

export default async function LandingPage() {
  const content = await getHomeContent();
  const sections = content.sections ?? defaultHomeContent.sections!;

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container relative mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Beta 서비스 오픈: 2026.02
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {content.heroSubtitle}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base text-foreground/90">
            AI 콘텐츠의 생성·편집 이력을 범위 기반으로 역추적하십시오.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/demo">
                {content.ctaPrimary || "데모 체험하기"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/docs">
                {content.ctaSecondary || "API 문서 보기"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3 Feature cards */}
      <section className="container px-4 py-16 md:py-24">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">
          핵심 기능
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
          오프셋 기반 인덱싱과 역방향 쿼리로 정확한 변경 이력을 추적합니다.
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          <Card className="rounded-2xl border-2 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <GitBranch className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">
                {sections[0]?.title ?? "Version Tracking"}
              </CardTitle>
              <CardDescription>
                {sections[0]?.description ??
                  "문서 버전별 변경 이력을 구조적으로 저장하고 조회합니다."}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border-2 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">
                {sections[1]?.title ?? "Range-based Reverse Query"}
              </CardTitle>
              <CardDescription>
                {sections[1]?.description ??
                  "start_offset / end_offset 기반으로 해당 구간의 변경 블록을 역추적합니다."}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border-2 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <PieChart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">
                {sections[2]?.title ?? "Human Contribution Visualization"}
              </CardTitle>
              <CardDescription>
                {sections[2]?.description ??
                  "AI vs 사람 기여 비율과 변경 구간을 시각화합니다."}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Industry badges */}
      <section className="border-y border-border/40 bg-muted/30 px-4 py-12">
        <div className="container">
          <p className="text-center text-sm font-medium text-muted-foreground">
            적용 산업
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {["LegalTech", "콘텐츠 플랫폼", "언론사", "교육 플랫폼"].map((name) => (
              <Badge key={name} variant="secondary" className="rounded-full px-4 py-2 text-sm">
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 py-16 text-center">
        <p className="text-muted-foreground">지금 바로 체험해 보세요.</p>
        <div className="mt-4 flex justify-center gap-4">
          <Button asChild>
            <Link href="/demo">데모 체험하기</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">문의하기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
