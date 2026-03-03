import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { TopNav } from "@/components/layout/top-nav";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LexAI | 구조적 위치 기반 AI 콘텐츠 변경 추적",
  description:
    "AI 콘텐츠의 생성·편집 이력을 범위 기반으로 역추적하고 기여도 분석을 제공하는 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <TopNav />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
