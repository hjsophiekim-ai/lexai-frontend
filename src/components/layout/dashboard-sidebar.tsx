"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  History,
  BarChart3,
  Zap,
  Download,
  LayoutDashboard,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "문서 관리", icon: FileText },
  { href: "/dashboard/versions", label: "버전 히스토리", icon: History },
  { href: "/dashboard/stats", label: "변경 통계", icon: BarChart3 },
  { href: "/dashboard/usage", label: "API 사용량", icon: Zap },
  { href: "/dashboard/export", label: "Export (JSON)", icon: Download },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo href="/dashboard" />
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {SIDEBAR_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <span
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
