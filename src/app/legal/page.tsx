import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminContent, fetchAdminContent } from "@/lib/api";

export const dynamic = "force-dynamic";

const defaultLegalContent: AdminContent = {
  heroTitle: "약관 및 정책",
  heroSubtitle: "",
  sections: [
    {
      title: "이용약관",
      description:
        "제1조 (목적) 본 약관은 LexAI(이하 \"서비스\")의 이용 조건 및 절차에 관한 사항을 규정합니다.\n제2조 (서비스 내용) LexAI는 구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 서비스를 제공합니다.\n제3조 (이용 계약) 이용자는 서비스 가입 시 본 약관에 동의한 것으로 간주됩니다.\n(본 약관은 더미 내용이며, 실제 서비스 운영 시 법적 검토가 필요합니다.)",
    },
    {
      title: "개인정보처리방침",
      description:
        "LexAI는 이용자의 개인정보를 수집·이용·보관할 때 관련 법령을 준수합니다.\n수집 항목: 이메일, 이름, 서비스 이용 로그 등 서비스 제공에 필요한 최소 범위.\n보관 기간: 이용 종료 또는 삭제 요청 시까지.\n(본 방침은 더미 내용입니다.)",
    },
    {
      title: "사업자 정보",
      description:
        "사업자 등록 진행 중입니다. 정식 오픈 시 사업자등록번호 및 주소를 공개합니다.",
    },
  ],
};

async function getLegalContent() {
  const remote = await fetchAdminContent("legal");
  if (!remote) return defaultLegalContent;
  return {
    ...defaultLegalContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultLegalContent.sections,
  };
}

export default async function LegalPage() {
  const content = await getLegalContent();
  const sections = content.sections ?? defaultLegalContent.sections!;

  return (
    <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12">
      <h1 className="text-3xl font-bold">
        {content.heroTitle ?? "약관 및 정책"}
      </h1>

      <Card id="terms" className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>{sections[0]?.title ?? "이용약관"}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
          <p>{sections[0]?.description ?? defaultLegalContent.sections![0].description}</p>
        </CardContent>
      </Card>

      <Card id="privacy" className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>{sections[1]?.title ?? "개인정보처리방침"}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
          <p>{sections[1]?.description ?? defaultLegalContent.sections![1].description}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>{sections[2]?.title ?? "사업자 정보"}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground whitespace-pre-wrap">
          <p>{sections[2]?.description ?? defaultLegalContent.sections![2].description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
