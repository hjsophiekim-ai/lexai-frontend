"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const LANDING_LINKS = [
  { href: "/technology", label: "기술" },
  { href: "/product", label: "서비스" },
  { href: "/demo", label: "데모" },
  { href: "/pricing", label: "요금제" },
  { href: "/customers", label: "적용 사례" },
  { href: "/about", label: "회사 소개" },
  { href: "/docs", label: "API 문서" },
  { href: "/blog", label: "블로그" },
  { href: "/contact", label: "문의" },
];

export function TopNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {LANDING_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  pathname === href ? "bg-accent text-accent-foreground" : ""
                )}
              >
                {label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="테마 전환"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm">로그인</Button>
          </Link>
          <Link href="/demo">
            <Button size="sm">데모 체험</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="메뉴"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <div className="container flex flex-col gap-1 py-2 px-4">
            {LANDING_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
