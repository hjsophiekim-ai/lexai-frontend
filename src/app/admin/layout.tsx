"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const TOKEN_KEY = "lexai_admin_token";

const NAV_ITEMS = [
  { href: "/admin/home", label: "Home" },
  { href: "/admin/product", label: "Product" },
  { href: "/admin/technology", label: "Technology" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/blog", label: "Blog / Updates" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/docs", label: "Docs" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/legal", label: "Legal" },
  { href: "/admin/footer", label: "Footer" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(TOKEN_KEY)
        : null;
    if (!token) {
      router.replace("/admin/login");
    }
  }, [isLogin, router]);

  if (isLogin) {
    // 로그인 화면은 별도 레이아웃(사이드바/탑바 없이)으로 노출
    return <>{children}</>;
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
    }
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-muted/20">
      <aside className="flex w-60 flex-col border-r border-border bg-card">
        <div className="px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            LexAI CMS
          </p>
          <p className="mt-1 text-sm font-medium">Admin</p>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 px-2 py-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-4 py-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </aside>
      <div className="flex min-h-full flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background/80 px-6 py-3">
          <div>
            <p className="text-sm font-semibold">콘텐츠 관리</p>
            <p className="text-xs text-muted-foreground">
              관리자에서 수정한 문구는 공개 페이지에 즉시 반영됩니다.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>임시 계정: admin / lexai-admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

