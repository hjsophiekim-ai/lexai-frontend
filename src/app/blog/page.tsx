import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminContent, fetchAdminContent } from "@/lib/api";

export const dynamic = "force-dynamic";

const DEFAULT_POSTS = [
  { date: "2026.02.27", title: "v0.2 Reverse Query 고도화", tag: "Release" },
  { date: "2026.02.15", title: "v0.1 MVP 릴리즈", tag: "Release" },
  { date: "2026.02.01", title: "Beta 서비스 오픈 안내", tag: "News" },
];

const defaultBlogContent: AdminContent = {
  heroTitle: "업데이트 로그",
  heroSubtitle: "서비스 업데이트 및 릴리즈 소식을 전합니다.",
  sections: DEFAULT_POSTS.map((p) => ({
    title: p.title,
    description: `${p.date} · ${p.tag}`,
  })),
};

async function getBlogContent() {
  const remote = await fetchAdminContent("blog");
  if (!remote) return defaultBlogContent;
  return {
    ...defaultBlogContent,
    ...remote,
    sections:
      remote.sections && remote.sections.length > 0
        ? remote.sections
        : defaultBlogContent.sections,
  };
}

export default async function BlogPage() {
  const content = await getBlogContent();
  const sections = content.sections ?? defaultBlogContent.sections!;

  return (
    <div className="container mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">
          {content.heroTitle ?? "업데이트 로그"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {content.heroSubtitle ??
            "서비스 업데이트 및 릴리즈 소식을 전합니다."}
        </p>
      </div>

      <div className="relative border-l-2 border-border pl-6">
        {sections.map((section, idx) => (
          <div key={idx} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary" />
            <Card className="rounded-2xl border-2">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Update</Badge>
                  <span className="text-sm text-muted-foreground">
                    {/* description 앞부분에 날짜를 적어둘 수 있음 */}
                    {section.description}
                  </span>
                </div>
                <CardDescription className="text-base font-medium text-foreground">
                  {section.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {/* 필요 시 추후 별도 본문 필드를 추가할 수 있음 */}
                  더미 본문: 해당 업데이트에 대한 상세 내용은 추후 공지됩니다.
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
