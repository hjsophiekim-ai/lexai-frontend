import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminContent, getApiBase, fetchAdminContent } from "@/lib/api";

export const dynamic = "force-dynamic";

const ENDPOINTS = [
  { method: "POST", path: "/index", desc: "문서 인덱싱" },
  { method: "POST", path: "/reverse-query", desc: "역방향 쿼리 (구간별 변경 이력 조회)" },
  { method: "GET", path: "/versions", desc: "버전 목록 조회" },
];

const CURL_EXAMPLE = `# Reverse Query 예시 (엔드포인트: POST /reverse-query)
curl -X POST "${getApiBase()}/reverse-query" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_id": 1,
    "version_id": 1,
    "start_offset": 0,
    "end_offset": 500
  }'`;

const defaultDocsContent: AdminContent = {
  heroTitle: "API 문서",
  heroSubtitle: "Swagger 스타일 레이아웃 · 엔드포인트 목록 및 curl 예시",
  sections: [],
};

async function getDocsContent() {
  const remote = await fetchAdminContent("docs");
  if (!remote) return defaultDocsContent;
  return {
    ...defaultDocsContent,
    ...remote,
  };
}

export default async function DocsPage() {
  const content = await getDocsContent();

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">
          {content.heroTitle ?? "API 문서"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {content.heroSubtitle ??
            "Swagger 스타일 레이아웃 · 엔드포인트 목록 및 curl 예시"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="text-base">Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ENDPOINTS.map((ep) => (
                <a
                  key={ep.path}
                  href={`#${ep.path.replace("/", "")}`}
                  className="block rounded-md border border-border p-3 text-sm hover:bg-accent/50"
                >
                  <Badge variant="outline" className="mr-2">
                    {ep.method}
                  </Badge>
                  {ep.path}
                </a>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          {ENDPOINTS.map((ep) => (
            <Card key={ep.path} id={ep.path.replace("/", "")} className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono text-lg">
                  <Badge>{ep.method}</Badge>
                  {ep.path}
                </CardTitle>
                <CardDescription>{ep.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}

          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="text-base">curl 예시</CardTitle>
              <CardDescription>Reverse Query 호출 예시 (워드 문서 문구 활용)</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs md:text-sm">
                <code>{CURL_EXAMPLE}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
