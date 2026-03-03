import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const USAGE = [
  { endpoint: "POST /reverse-query", count: 120 },
  { endpoint: "POST /index", count: 45 },
  { endpoint: "GET /versions", count: 200 },
];

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">API 사용량</h1>
        <p className="text-muted-foreground">엔드포인트별 호출 수 (더미)</p>
      </div>
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>호출 통계</CardTitle>
          <CardDescription>최근 30일 기준</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>엔드포인트</TableHead>
                <TableHead>호출 수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USAGE.map((u) => (
                <TableRow key={u.endpoint}>
                  <TableCell className="font-mono text-sm">{u.endpoint}</TableCell>
                  <TableCell>{u.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
