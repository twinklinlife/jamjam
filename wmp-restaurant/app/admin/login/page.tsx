import LoginForm from "@/components/admin/LoginForm";

// See app/page.tsx — avoids the same long edge-cache staleness issue.
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return <LoginForm />;
}
