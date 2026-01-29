import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const session = getSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
