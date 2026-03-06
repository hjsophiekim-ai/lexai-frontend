"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
import type { AdminContent } from "@/lib/api";
import { getApiBase } from "@/lib/api";

const FOOTER_LINKS = {
  서비스: [
    { href: "/product", label: "서비스 기능" },
    { href: "/pricing", label: "요금제" },
    { href: "/demo", label: "데모" },
    { href: "/docs", label: "API 문서" },
  ],
  회사: [
    { href: "/about", label: "회사 소개" },
    { href: "/customers", label: "적용 사례" },
    { href: "/blog", label: "블로그" },
    { href: "/contact", label: "문의" },
  ],
  약관: [
    { href: "/legal", label: "이용약관" },
    { href: "/legal#privacy", label: "개인정보처리방침" },
  ],
};

export function Footer() {
  const [footerContent, setFooterContent] = useState<AdminContent | null>(null);

  useEffect(() => {
    // 클라이언트에서만 수행되는 단순 fetch (no-store는 서버 헬퍼에서 사용 중)
    const apiBase = getApiBase();
    fetch(`${apiBase}/admin/content/footer`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as AdminContent;
      })
      .then((data) => {
        if (data) setFooterContent(data);
      })
      .catch(() => undefined);
  }, []);

  const tagline =
    footerContent?.heroSubtitle ??
    "구조적 위치 기반 AI 생성 콘텐츠 변경 추적 및 기여도 분석";
  const betaText =
    footerContent?.ctaSecondary ?? "Beta 서비스 오픈: 2026.02";

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              {tagline}
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} LexAI. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>{betaText}</span>
            <Link
              href="/admin"
              className="underline hover:text-foreground"
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
