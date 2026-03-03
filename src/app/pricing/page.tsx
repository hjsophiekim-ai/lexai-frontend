import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminContent, fetchAdminContent } from "@/lib/api";

export const dynamic = "force-dynamic";

type Plan = {
  name: string;
  price: string;
  unit: string;
  quota: string;
  features: string[];
  cta: string;
  href: string;
  recommended: boolean;
};

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Starter",
    price: "49,000",
    unit: "원/월",
    quota: "월 100건 (API)",
    features: ["API 호출 100건/월", "기본 문서 관리", "이메일 지원"],
    cta: "시작하기",
    href: "/demo",
    recommended: false,
  },
  {
    name: "Business",
    price: "299,000",
    unit: "원/월",
    quota: "무제한",
    features: ["API 무제한", "리포트·대시보드", "우선 지원", "전담 매니저"],
    cta: "문의하기",
    href: "/contact",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "문의",
    unit: "",
    quota: "맞춤",
    features: ["온프레미스 옵션", "SLA", "커스텀 통합"],
    cta: "문의하기",
    href: "/contact",
    recommended: false,
  },
];

const defaultPricingContent: AdminContent = {
  heroTitle: "요금제",
  heroSubtitle: "팀 규모에 맞는 플랜을 선택하세요.",
  sections: [
    {
      title: DEFAULT_PLANS[0].name,
      description:
        "월 49,000원 / 월 100건(API) · 기본 문서 관리 · 이메일 지원",
    },
    {
      title: DEFAULT_PLANS[1].name,
      description:
        "월 299,000원 / 무제한 · 리포트 · 대시보드 · 우선 지원 · 전담 매니저",
    },
    {
      title: DEFAULT_PLANS[2].name,
      description: "맞춤 요금 · 온프레미스 · SLA · 커스텀 통합",
    },
  ],
};

async function getPricingContent() {
  const remote = await fetchAdminContent("pricing");
  if (!remote) return defaultPricingContent;
  return {
    ...defaultPricingContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultPricingContent.sections,
  };
}

export default async function PricingPage() {
  const content = await getPricingContent();
  const sections = content.sections ?? defaultPricingContent.sections!;

  const plans: Plan[] = DEFAULT_PLANS.map((plan, index) => {
    const override = sections[index];
    if (!override) return plan;
    return {
      ...plan,
      name: override.title || plan.name,
      // 설명 문자열은 그대로 features로 쪼개기 어렵기 때문에 우선 제목만 CMS에서 제어
    };
  });

  return (
    <div className="container mx-auto max-w-5xl space-y-12 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          {content.heroTitle ?? "요금제"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {content.heroSubtitle ?? "팀 규모에 맞는 플랜을 선택하세요."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-2xl border-2 flex flex-col ${
              plan.recommended ? "border-primary shadow-lg ring-2 ring-primary/20" : ""
            }`}
          >
            <CardHeader>
              {plan.recommended && (
                <Badge className="w-fit">추천</Badge>
              )}
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                {plan.unit} · {plan.quota}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-xl" variant={plan.recommended ? "default" : "outline"}>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
