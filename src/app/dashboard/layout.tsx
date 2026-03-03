import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-1">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto border-l border-border bg-muted/20 p-6">
        {children}
      </main>
    </div>
  );
}
