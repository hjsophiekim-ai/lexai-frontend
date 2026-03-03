"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 더미 로그인: 아무 값이나 입력해도 /dashboard로 이동
    await new Promise((r) => setTimeout(r, 500));
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("lexai-demo-login", "1");
    }
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="container mx-auto flex max-w-md flex-col justify-center px-4 py-16">
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            데모용 로그인입니다. 이메일/비밀번호는 임의로 입력해도 대시보드로 이동합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
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
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-xl">
              {loading ? "로그인 중…" : "로그인"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-foreground">홈으로</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
