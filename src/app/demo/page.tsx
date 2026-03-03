"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  healthCheck,
  reverseQuery,
  type ReverseQueryRequest,
  type ReverseQueryResponse,
  getApiBase,
} from "@/lib/api";

type ApiStatus = "CHECKING" | "OK" | "DOWN";

export default function DemoPage() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("CHECKING");
  const [documentId, setDocumentId] = useState(1);
  const [versionId, setVersionId] = useState(1);
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(500);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReverseQueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    healthCheck().then(({ ok }) => setApiStatus(ok ? "OK" : "DOWN"));
  }, []);

  const run = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const body: ReverseQueryRequest = {
      document_id: documentId,
      version_id: versionId,
      start_offset: startOffset,
      end_offset: endOffset,
    };
    const { ok, data, error: err } = await reverseQuery(body);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    if (data) setResult(data);
  };

  const changes = result?.changes ?? result?.blocks ?? [];
  const summary = result?.summary ?? "";
  const evidence = result?.evidence ?? [];

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">Reverse Query 데모</h1>
        <p className="mt-1 text-muted-foreground">
          문서·버전·오프셋을 입력하고 역방향 쿼리를 실행하세요.
        </p>
      </div>

      {/* API Status */}
      <Card className="rounded-2xl border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">API 상태</CardTitle>
          <CardDescription>
            백엔드: {getApiBase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {apiStatus === "CHECKING" && (
              <span className="text-muted-foreground">확인 중…</span>
            )}
            {apiStatus === "OK" && (
              <Badge className="bg-green-600 hover:bg-green-600">Operational</Badge>
            )}
            {apiStatus === "DOWN" && (
              <Badge variant="destructive">Down</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Input form */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>입력</CardTitle>
          <CardDescription>
            document_id, version_id, start_offset, end_offset (백엔드에 해당 리소스가 있어야 합니다)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            문서·Version1·Version2는 파일 업로드 또는 백엔드에 등록된 document_id/version_id로 지정합니다. 현재 실행은 document_id/version_id + offset을 사용합니다.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="docId">document_id</Label>
              <Input
                id="docId"
                type="number"
                value={documentId}
                onChange={(e) => setDocumentId(Number(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verId">version_id</Label>
              <Input
                id="verId"
                type="number"
                value={versionId}
                onChange={(e) => setVersionId(Number(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">start_offset</Label>
              <Input
                id="start"
                type="number"
                value={startOffset}
                onChange={(e) => setStartOffset(Number(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">end_offset</Label>
              <Input
                id="end"
                type="number"
                value={endOffset}
                onChange={(e) => setEndOffset(Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <Button onClick={run} disabled={loading} size="lg" className="rounded-xl">
            {loading ? "실행 중…" : "Reverse Query 실행"}
          </Button>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="rounded-2xl border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">오류</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap break-all text-sm">{error}</pre>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {(result !== null && !error) && (
        <div className="space-y-6">
          {summary && (
            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">{summary}</p>
              </CardContent>
            </Card>
          )}

          {changes.length > 0 && (
            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle>변경 구간</CardTitle>
                <CardDescription>Added / Deleted / Modified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {changes.map((block, i) => {
                  const type = (block.type ?? "modified") as string;
                  const variant =
                    type === "added"
                      ? "default"
                      : type === "deleted"
                        ? "destructive"
                        : "secondary";
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <Badge variant={variant} className="mb-2">
                        {type}
                      </Badge>
                      {block.text != null && (
                        <pre className="whitespace-pre-wrap break-words text-sm">
                          {block.text}
                        </pre>
                      )}
                      {block.summary != null && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {block.summary}
                        </p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {evidence.length > 0 && (
            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle>Evidence snippet</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {evidence.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {!summary && changes.length === 0 && evidence.length === 0 && (
            <Card className="rounded-2xl border-2">
              <CardContent className="py-8">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
