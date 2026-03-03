import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VERSIONS = [
  { docId: 1, versionId: 1, created: "2026-02-27 10:00" },
  { docId: 1, versionId: 2, created: "2026-02-27 09:30" },
  { docId: 2, versionId: 1, created: "2026-02-26 15:20" },
];

export default function VersionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">버전 히스토리</h1>
        <p className="text-muted-foreground">문서별 버전 목록 (더미)</p>
      </div>
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>버전 목록</CardTitle>
          <CardDescription>document_id, version_id, 생성 시각</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>document_id</TableHead>
                <TableHead>version_id</TableHead>
                <TableHead>생성 시각</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VERSIONS.map((v) => (
                <TableRow key={`${v.docId}-${v.versionId}`}>
                  <TableCell>{v.docId}</TableCell>
                  <TableCell>{v.versionId}</TableCell>
                  <TableCell>{v.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
