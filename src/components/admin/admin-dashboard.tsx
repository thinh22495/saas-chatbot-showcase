"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type DemoRequest = {
  id: number;
  full_name: string;
  work_email: string;
  phone?: string | null;
  company: string;
  role?: string | null;
  use_case: string;
  message: string;
  created_at: string;
};

type ApiResponse = {
  ok: boolean;
  data: DemoRequest[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export default function AdminDashboard() {
  const router = useRouter();
  const [items, setItems] = React.useState<DemoRequest[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async (pageNumber: number) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `/api/admin/requests?page=${pageNumber}&pageSize=10`
    );

    if (!response.ok) {
      setLoading(false);
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setError("Không thể tải dữ liệu.");
      return;
    }

    const data = (await response.json()) as ApiResponse;
    setItems(data.data);
    setPage(data.pagination.page);
    setTotalPages(data.pagination.totalPages || 1);
    setLoading(false);
  }, [router]);

  React.useEffect(() => {
    void loadData(1);
  }, [loadData]);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa yêu cầu demo này?")) return;

    const response = await fetch(`/api/admin/requests?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Xóa thất bại.");
      return;
    }

    void loadData(page);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-serif">Yêu cầu demo</h1>
            <p className="text-sm text-muted-foreground">
              Quản lý và theo dõi các yêu cầu demo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/api/admin/export")}
            >
              Xuất Excel (CSV)
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>

        <Card className="border-border/60 bg-card/90 shadow-lg">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 text-sm text-muted-foreground">
                Đang tải dữ liệu...
              </div>
            ) : error ? (
              <div className="p-6 text-sm text-destructive">{error}</div>
            ) : items.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">
                Chưa có yêu cầu demo.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">Tên</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Số ĐT</th>
                      <th className="px-4 py-3">Công ty</th>
                      <th className="px-4 py-3">Use case</th>
                      <th className="px-4 py-3">Ngày</th>
                      <th className="px-4 py-3">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {items.map((item) => (
                      <tr key={item.id} className="align-top">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">
                            {item.full_name}
                          </div>
                          {item.role ? (
                            <div className="text-xs text-muted-foreground">
                              {item.role}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">{item.work_email}</td>
                        <td className="px-4 py-3">{item.phone || "-"}</td>
                        <td className="px-4 py-3">{item.company}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">
                            {item.use_case}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.message}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={() => handleDelete(item.id)}
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Trang {page} / {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => loadData(page - 1)}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => loadData(page + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
