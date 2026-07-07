import type { Restaurant } from "@/lib/types";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
        {restaurant.category && (
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            {restaurant.category}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">{restaurant.address}</p>
      {restaurant.signatureMenu && (
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium">대표메뉴</span> {restaurant.signatureMenu}
        </p>
      )}
      <a
        href={restaurant.naverLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-medium text-green-700 hover:underline"
      >
        네이버 지도에서 보기 →
      </a>
    </div>
  );
}
