"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TOKEN_KEY = "lexai_admin_token";
const DEMO_ID = "admin";
const DEMO_PW = "lexai-admin";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const idInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmedId = id.trim();
    const trimmedPw = pw;
    if (!trimmedId || !trimmedPw) {
      setError("아이디와 비밀번호를 모두 입력해 주세요.");
      idInputRef.current?.focus();
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    if (trimmedId === DEMO_ID && trimmedPw === DEMO_PW) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(TOKEN_KEY, "demo-token");
      }
      router.replace("/admin/home");
      return;
    }
    setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    setLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl border-2">
        <CardHeader>
          <CardTitle>관리자 로그인</CardTitle>
          <CardDescription>
            아이디와 비밀번호를 입력한 후 로그인하면 홈·회사소개 등 콘텐츠를 수정할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-id">아이디</Label>
              <Input
                ref={idInputRef}
                id="admin-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디 입력"
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-pw">비밀번호</Label>
              <Input
                id="admin-pw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호 입력"
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? "로그인 중…" : "로그인"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-foreground">홈으로 돌아가기</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

