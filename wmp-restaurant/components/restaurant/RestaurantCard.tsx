import { CATEGORY_EMOJI, type Restaurant } from "@/lib/types";
import { displayAddress } from "@/lib/format";
import type { LandmarkName } from "@/lib/landmarks";

export default function RestaurantCard({
  restaurant,
  distanceLabel,
  locationTag,
  onLocationTagClick,
  onCategoryClick,
}: {
  restaurant: Restaurant;
  distanceLabel?: string | null;
  locationTag?: LandmarkName | null;
  onLocationTagClick?: (tag: LandmarkName) => void;
  onCategoryClick?: (category: NonNullable<Restaurant["category"]>) => void;
}) {
  const category = restaurant.category;
  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {locationTag && (
            <button
              onClick={() => onLocationTagClick?.(locationTag)}
              className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-100"
            >
              {locationTag}
            </button>
          )}
          {category && (
            <button
              onClick={() => onCategoryClick?.(category)}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
            >
              {CATEGORY_EMOJI[category]} {category}
            </button>
          )}
        </div>
        <p className="mt-1.5 text-sm text-gray-500">{displayAddress(restaurant.address)}</p>
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
