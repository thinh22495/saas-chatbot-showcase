import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
