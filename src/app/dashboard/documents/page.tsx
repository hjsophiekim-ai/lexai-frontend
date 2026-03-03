import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DOCS = [
  { id: 1, name: "report_v2.md", versions: 3, updated: "2026-02-27" },
  { id: 2, name: "draft_final.md", versions: 5, updated: "2026-02-26" },
  { id: 3, name: "contract_01.md", versions: 2, updated: "2026-02-25" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">문서 관리</h1>
        <p className="text-muted-foreground">인덱싱된 문서 목록 (더미)</p>
      </div>
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>문서 목록</CardTitle>
          <CardDescription>문서 ID, 이름, 버전 수, 최종 수정일</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>버전 수</TableHead>
                <TableHead>최종 수정</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DOCS.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.versions}</TableCell>
                  <TableCell>{d.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
