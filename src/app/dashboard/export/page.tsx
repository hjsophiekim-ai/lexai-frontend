"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ExportPage() {
  const [loading, setLoading] = useState(false);

  const exportJson = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    // 더미: 실제 Export API 호출 대신 샘플 JSON 다운로드
    const sample = { documents: [], versions: [], exported_at: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lexai-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export 완료. JSON 파일이 다운로드되었습니다.");
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Export (JSON)</h1>
        <p className="text-muted-foreground">문서·버전 데이터를 JSON으로 내보냅니다.</p>
      </div>
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>JSON 내보내기</CardTitle>
          <CardDescription>
            현재 계정의 문서·버전 메타데이터를 JSON 파일로 다운로드합니다. (데모: 샘플 JSON)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={exportJson} disabled={loading} className="rounded-xl">
            {loading ? "내보내는 중…" : "JSON 내보내기"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
