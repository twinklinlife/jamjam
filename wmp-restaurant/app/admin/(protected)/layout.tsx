import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAdminRequest())) {
    redirect("/admin/login");
  }
  return <>{children}</>;
}
