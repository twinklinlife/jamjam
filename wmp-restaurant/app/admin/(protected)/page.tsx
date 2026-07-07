import AdminTable from "@/components/admin/AdminTable";
import { readRestaurants } from "@/lib/store";

export default async function AdminPage() {
  const restaurants = await readRestaurants();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AdminTable initialRestaurants={restaurants} />
    </div>
  );
}
