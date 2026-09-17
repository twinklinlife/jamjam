import AdminTable from "@/components/admin/AdminTable";
import FeedbackList from "@/components/admin/FeedbackList";
import { readFeedback, readRestaurants } from "@/lib/store";

export default async function AdminPage() {
  const [restaurants, feedback] = await Promise.all([readRestaurants(), readFeedback()]);
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <FeedbackList initialFeedback={[...feedback].reverse()} />
      <AdminTable initialRestaurants={restaurants} />
    </div>
  );
}
