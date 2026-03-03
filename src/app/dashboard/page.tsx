"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CHANGE_DATA = [
  { date: "02/21", count: 12 },
  { date: "02/22", count: 19 },
  { date: "02/23", count: 15 },
  { date: "02/24", count: 28 },
  { date: "02/25", count: 22 },
  { date: "02/26", count: 31 },
  { date: "02/27", count: 24 },
];

const ACTIVITY = [
  { time: "10:32", action: "문서 인덱싱", doc: "report_v2.md" },
  { time: "10:28", action: "Reverse Query", doc: "doc_1" },
  { time: "10:15", action: "버전 저장", doc: "draft_final.md" },
];

const UPDATES = [
  { ver: "v0.2", text: "Reverse Query 고도화 배포" },
  { ver: "v0.1", text: "MVP 릴리즈" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">문서·버전·변경 통계를 한눈에 확인하세요.</p>
      </div>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>변경 추이</CardTitle>
          <CardDescription>일별 변경 이벤트 수 (더미)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] min-h-[200px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <LineChart data={CHANGE_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>활동 로그</CardTitle>
            <CardDescription>최근 작업 (더미)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>시각</TableHead>
                  <TableHead>작업</TableHead>
                  <TableHead>대상</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ACTIVITY.map((row) => (
                  <TableRow key={row.time + row.doc}>
                    <TableCell className="text-muted-foreground">{row.time}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.doc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>최근 업데이트 / 배포 로그</CardTitle>
            <CardDescription>서비스 배포 이력 (더미)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {UPDATES.map((u) => (
              <div key={u.ver} className="rounded-lg border border-border p-3">
                <span className="font-mono text-sm font-medium">{u.ver}</span>
                <p className="mt-1 text-sm text-muted-foreground">{u.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
