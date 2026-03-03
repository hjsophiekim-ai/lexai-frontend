"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    if (id === DEMO_ID && pw === DEMO_PW) {
      window.localStorage.setItem(TOKEN_KEY, "demo-token");
      router.replace("/admin/home");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다. (ID: admin / PW: lexai-admin)");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl border-2">
        <CardHeader>
          <CardTitle>LexAI Admin 로그인</CardTitle>
          <CardDescription>
            임시 로컬 인증입니다. 로그인 후 /admin/* 화면에서 홈페이지 문구를 바로 수정할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">아이디</Label>
              <Input
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw">비밀번호</Label>
              <Input
                id="pw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="lexai-admin"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? "로그인 중…" : "로그인"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

