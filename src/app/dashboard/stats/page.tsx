"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STATS = [
  { type: "Added", count: 45 },
  { type: "Deleted", count: 22 },
  { type: "Modified", count: 38 },
];

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">변경 통계</h1>
        <p className="text-muted-foreground">변경 유형별 건수 (더미)</p>
      </div>
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>변경 유형별 통계</CardTitle>
          <CardDescription>Added / Deleted / Modified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] min-h-[200px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <BarChart data={STATS}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
