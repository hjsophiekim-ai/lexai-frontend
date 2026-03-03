"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { AdminContent } from "@/lib/api";
import { getApiBase } from "@/lib/api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [header, setHeader] = useState<AdminContent | null>(null);

  // 상단 타이틀/설명을 CMS에서 가져온다.
  React.useEffect(() => {
    const apiBase = getApiBase();
    fetch(`${apiBase}/admin/content/contact`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as AdminContent;
      })
      .then((data) => {
        if (data) setHeader(data);
      })
      .catch(() => undefined);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // 더미: 실제 POST는 하지 않고 성공 토스트만
    await new Promise((r) => setTimeout(r, 600));
    toast.success("문의가 접수되었습니다. 담당자가 연락드리겠습니다.");
    setName("");
    setEmail("");
    setMessage("");
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-xl space-y-8 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          {header?.heroTitle ?? "문의"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {header?.heroSubtitle ??
            "요금제·기술 문의는 아래 폼으로 보내주세요."}
        </p>
      </div>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>문의하기</CardTitle>
          <CardDescription>이름, 이메일, 문의 내용을 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">문의 내용</Label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="문의하실 내용을 입력해 주세요."
                required
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full rounded-xl">
              {submitting ? "전송 중…" : "제출"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
