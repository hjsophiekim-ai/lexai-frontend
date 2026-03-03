"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SIZE = { width: 120, height: 36 };

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("flex items-center shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="LexAI"
        width={LOGO_SIZE.width}
        height={LOGO_SIZE.height}
        className="h-8 w-auto object-contain"
        priority
      />
    </Link>
  );
}
