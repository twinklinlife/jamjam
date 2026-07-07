import RestaurantList from "@/components/restaurant/RestaurantList";

export default function Home() {
  return (
    <div className="flex-1 bg-gray-50">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">우리 회사 가맹 식당 찾기</h1>
        <p className="mt-1 text-sm text-gray-500">
          판교 지역 가맹 식당을 검색하고, 오늘 뭐 먹을지 추천받아보세요.
        </p>
        <div className="mt-6">
          <RestaurantList />
        </div>
      </main>
    </div>
  );
}
