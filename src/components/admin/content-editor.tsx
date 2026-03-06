"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AdminContent,
  AdminPageId,
  AdminSection,
  fetchAdminContent,
  saveAdminContent,
} from "@/lib/api";
import { toast } from "sonner";

type Props = {
  pageId: AdminPageId;
  title: string;
  description?: string;
  defaultContent: AdminContent;
};

export function AdminContentEditor({
  pageId,
  title,
  description,
  defaultContent,
}: Props) {
  const [content, setContent] = useState<AdminContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const remote = await fetchAdminContent(pageId);
      if (!mounted) return;
      if (remote) {
        setContent({
          ...defaultContent,
          ...remote,
          sections: remote.sections?.length
            ? remote.sections
            : defaultContent.sections ?? [],
        });
      } else {
        setContent(defaultContent);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [pageId, defaultContent]);

  const updateField = (key: keyof AdminContent, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const updateSection = (index: number, patch: Partial<AdminSection>) => {
    setContent((prev) => {
      const sections = [...(prev.sections ?? [])];
      const current = sections[index] ?? { title: "", description: "" };
      sections[index] = { ...current, ...patch };
      return { ...prev, sections };
    });
  };

  const addSection = () => {
    setContent((prev) => ({
      ...prev,
      sections: [
        ...(prev.sections ?? []),
        { title: "", description: "" } as AdminSection,
      ],
    }));
  };

  const removeSection = (index: number) => {
    setContent((prev) => {
      const sections = [...(prev.sections ?? [])];
      sections.splice(index, 1);
      return { ...prev, sections };
    });
  };

  const onSave = async () => {
    setSaving(true);
    const { ok, error } = await saveAdminContent(pageId, content);
    setSaving(false);
    if (!ok) {
      toast.error(error ?? "저장 중 오류가 발생했습니다.");
      return;
    }
    toast.success("콘텐츠가 저장되었습니다. 공개 페이지를 새로고침하면 반영됩니다.");
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        불러오는 중…
      </div>
    );
  }

  const sections = content.sections ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hero">Hero / CTA</TabsTrigger>
          <TabsTrigger value="sections">섹션 리스트</TabsTrigger>
          {pageId === "home" && (
            <TabsTrigger value="homeExtra">홈 추가 문구</TabsTrigger>
          )}
          <TabsTrigger value="preview">실시간 프리뷰</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>Hero / 기본 문구</CardTitle>
              <CardDescription>
                홈페이지 상단의 타이틀, 서브카피, CTA 버튼 문구를 수정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">heroTitle</Label>
                <Input
                  id="heroTitle"
                  value={content.heroTitle ?? ""}
                  onChange={(e) => updateField("heroTitle", e.target.value)}
                  placeholder="예: LEXAI"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">heroSubtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={content.heroSubtitle ?? ""}
                  onChange={(e) =>
                    updateField("heroSubtitle", e.target.value)
                  }
                  rows={3}
                  placeholder="예: 구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석 시스템"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ctaPrimary">ctaPrimary</Label>
                  <Input
                    id="ctaPrimary"
                    value={content.ctaPrimary ?? ""}
                    onChange={(e) =>
                      updateField("ctaPrimary", e.target.value)
                    }
                    placeholder="예: 데모 체험하기"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaSecondary">ctaSecondary</Label>
                  <Input
                    id="ctaSecondary"
                    value={content.ctaSecondary ?? ""}
                    onChange={(e) =>
                      updateField("ctaSecondary", e.target.value)
                    }
                    placeholder="예: API 문서 보기"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>섹션 리스트</CardTitle>
              <CardDescription>
                기능 카드나 설명 블록을 섹션 단위로 관리합니다. 홈의 기능
                3카드, 기술 페이지 섹션 등으로 활용됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border p-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      섹션 {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs text-destructive"
                      onClick={() => removeSection(index)}
                    >
                      삭제
                    </Button>
                  </div>
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateSection(index, { title: e.target.value })
                    }
                    placeholder="title"
                  />
                  <Textarea
                    value={section.description}
                    onChange={(e) =>
                      updateSection(index, { description: e.target.value })
                    }
                    rows={3}
                    placeholder="description"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSection}
              >
                섹션 추가
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {pageId === "home" && (
          <TabsContent value="homeExtra" className="space-y-4">
            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle>홈 추가 문구</CardTitle>
                <CardDescription>
                  랜딩 페이지의 배지, 히어로 보조 문구, 핵심 기능 섹션 제목, 적용 산업, 하단 CTA 문구를 수정합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="badgeText">배지 문구 (badgeText)</Label>
                  <Input
                    id="badgeText"
                    value={content.badgeText ?? ""}
                    onChange={(e) => updateField("badgeText", e.target.value)}
                    placeholder="예: Beta 서비스 오픈: 2026.02"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroExtra">히어로 보조 문구 (heroExtra)</Label>
                  <Textarea
                    id="heroExtra"
                    value={content.heroExtra ?? ""}
                    onChange={(e) => updateField("heroExtra", e.target.value)}
                    rows={2}
                    placeholder="예: AI 콘텐츠의 생성·편집 이력을 범위 기반으로 역추적하십시오."
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="sectionHeading">핵심 기능 섹션 제목 (sectionHeading)</Label>
                  <Input
                    id="sectionHeading"
                    value={content.sectionHeading ?? ""}
                    onChange={(e) => updateField("sectionHeading", e.target.value)}
                    placeholder="예: 핵심 기능"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sectionSubheading">핵심 기능 섹션 부제 (sectionSubheading)</Label>
                  <Textarea
                    id="sectionSubheading"
                    value={content.sectionSubheading ?? ""}
                    onChange={(e) => updateField("sectionSubheading", e.target.value)}
                    rows={2}
                    placeholder="예: 오프셋 기반 인덱싱과 역방향 쿼리로 정확한 변경 이력을 추적합니다."
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="industryLabel">적용 산업 라벨 (industryLabel)</Label>
                  <Input
                    id="industryLabel"
                    value={content.industryLabel ?? ""}
                    onChange={(e) => updateField("industryLabel", e.target.value)}
                    placeholder="예: 적용 산업"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industryItems">적용 산업 목록 (industryItems, 쉼표 또는 줄바꿈 구분)</Label>
                  <Textarea
                    id="industryItems"
                    value={content.industryItems ?? ""}
                    onChange={(e) => updateField("industryItems", e.target.value)}
                    rows={3}
                    placeholder="예: LegalTech, 콘텐츠 플랫폼, 언론사, 교육 플랫폼"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="ctaSectionHeading">하단 CTA 섹션 제목 (ctaSectionHeading)</Label>
                  <Input
                    id="ctaSectionHeading"
                    value={content.ctaSectionHeading ?? ""}
                    onChange={(e) => updateField("ctaSectionHeading", e.target.value)}
                    placeholder="예: 지금 바로 체험해 보세요."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ctaSectionPrimary">하단 CTA 버튼 1 (ctaSectionPrimary)</Label>
                    <Input
                      id="ctaSectionPrimary"
                      value={content.ctaSectionPrimary ?? ""}
                      onChange={(e) => updateField("ctaSectionPrimary", e.target.value)}
                      placeholder="예: 데모 체험하기"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctaSectionSecondary">하단 CTA 버튼 2 (ctaSectionSecondary)</Label>
                    <Input
                      id="ctaSectionSecondary"
                      value={content.ctaSectionSecondary ?? ""}
                      onChange={(e) => updateField("ctaSectionSecondary", e.target.value)}
                      placeholder="예: 문의하기"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="preview">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>프리뷰</CardTitle>
              <CardDescription>
                실제 랜딩/페이지에 가까운 형태로 텍스트만 미리 확인합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-dashed border-border bg-background p-6 text-center">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Hero
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  {content.heroTitle || "제목 미지정"}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">
                  {content.heroSubtitle || "서브카피를 입력하세요."}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
                  {content.ctaPrimary && (
                    <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
                      {content.ctaPrimary}
                    </span>
                  )}
                  {content.ctaSecondary && (
                    <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
                      {content.ctaSecondary}
                    </span>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid gap-3 md:grid-cols-3">
                {sections.slice(0, 3).map((s, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-muted/40 p-4 text-left"
                  >
                    <p className="text-xs font-semibold text-muted-foreground">
                      Section {index + 1}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold">
                      {s.title || "제목"}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">
                      {s.description || "설명을 입력하세요."}
                    </p>
                  </div>
                ))}
                {sections.length === 0 && (
                  <p className="col-span-3 text-xs text-muted-foreground">
                    아직 섹션이 없습니다. &quot;섹션 추가&quot; 버튼으로
                    기능/블록을 추가하세요.
                  </p>
                )}
              </div>

              {pageId === "home" && (
                <>
                  <Separator />
                  <p className="text-xs font-semibold text-muted-foreground">
                    홈 추가 문구
                  </p>
                  <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-left text-xs">
                    <p><strong>배지:</strong> {content.badgeText || "(비어 있음)"}</p>
                    <p className="mt-1"><strong>히어로 보조:</strong> {content.heroExtra || "(비어 있음)"}</p>
                    <p className="mt-1"><strong>섹션 제목:</strong> {content.sectionHeading || "(비어 있음)"}</p>
                    <p className="mt-1"><strong>적용 산업:</strong> {content.industryLabel || "(비어 있음)"} — {content.industryItems || "(비어 있음)"}</p>
                    <p className="mt-1"><strong>하단 CTA:</strong> {content.ctaSectionHeading || "(비어 있음)"} / {content.ctaSectionPrimary || ""} / {content.ctaSectionSecondary || ""}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-xl"
        >
          {saving ? "저장 중…" : "저장"}
        </Button>
      </div>
    </div>
  );
}

