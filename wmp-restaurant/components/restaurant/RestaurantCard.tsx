import { CATEGORY_EMOJI, type Restaurant } from "@/lib/types";
import { displayAddress } from "@/lib/format";

export default function RestaurantCard({
  restaurant,
  distanceLabel,
  locationTag,
}: {
  restaurant: Restaurant;
  distanceLabel?: string | null;
  locationTag?: string | null;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
          <div className="flex shrink-0 flex-wrap justify-end gap-1">
            {locationTag && (
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                📍 {locationTag}
              </span>
            )}
            {restaurant.category && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {CATEGORY_EMOJI[restaurant.category]} {restaurant.category}
              </span>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{displayAddress(restaurant.address)}</p>
        {distanceLabel && (
          <p className="mt-1 text-sm text-gray-500">회사에서 {distanceLabel}</p>
        )}
        {restaurant.signatureMenu && (
          <p className="mt-2 text-sm text-gray-700">
            <span className="font-medium">대표메뉴</span> {restaurant.signatureMenu}
          </p>
        )}
      </div>
      <a
        href={restaurant.naverLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex w-fit items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
      >
        네이버 지도에서 보기 →
      </a>
    </div>
  );
}
