"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Đăng nhập thất bại. Kiểm tra email/mật khẩu.");
      return;
    }

    router.replace("/admin");
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12">
        <Card className="w-full border-border/60 bg-card/90 shadow-lg">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-serif">Admin Login</h1>
              <p className="text-sm text-muted-foreground">
                Đăng nhập để xem yêu cầu demo.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <Input name="password" type="password" required />
              </div>

              {error ? (
                <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="brand"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
