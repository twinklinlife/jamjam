"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, Restaurant } from "@/lib/types";
import { OFFICE_LOCATION } from "@/lib/constants";
import { distanceMeters, distanceBand, formatDistance, type DistanceBand } from "@/lib/geo";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import DistanceFilter from "./DistanceFilter";
import RandomPickButton from "./RandomPickButton";
import RestaurantCard from "./RestaurantCard";

interface RestaurantWithDistance extends Restaurant {
  distanceM: number | null;
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [distance, setDistance] = useState<DistanceBand | null>(null);
  const [picked, setPicked] = useState<RestaurantWithDistance | null>(null);

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json() as Promise<Restaurant[]>)
      .then((data) => setRestaurants(data))
      .finally(() => setLoading(false));
  }, []);

  const withDistance = useMemo<RestaurantWithDistance[]>(() => {
    return restaurants.map((r) => ({
      ...r,
      distanceM:
        r.lat !== null && r.lng !== null
          ? distanceMeters(OFFICE_LOCATION.lat, OFFICE_LOCATION.lng, r.lat, r.lng)
          : null,
    }));
  }, [restaurants]);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return withDistance.filter((r) => {
      if (category && r.category !== category) return false;
      if (distance) {
        if (r.distanceM === null || distanceBand(r.distanceM) !== distance) return false;
      }
      if (!keyword) return true;
      const haystack = `${r.name} ${r.signatureMenu ?? ""}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }, [withDistance, search, category, distance]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPicked(null);
  }

  function handleCategoryChange(value: Category | null) {
    setCategory(value);
    setPicked(null);
  }

  function handleDistanceChange(value: DistanceBand | null) {
    setDistance(value);
    setPicked(null);
  }

  function handleRandomPick() {
    if (filtered.length === 0) return;
    const index = Math.floor(Math.random() * filtered.length);
    setPicked(filtered[index]);
  }

  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={handleSearchChange} />
      <CategoryFilter selected={category} onChange={handleCategoryChange} />
      <DistanceFilter selected={distance} onChange={handleDistanceChange} />
      <RandomPickButton onPick={handleRandomPick} disabled={filtered.length === 0} />

      {picked && (
        <div className="rounded-lg border-2 border-orange-400 bg-orange-50 p-1">
          <p className="px-3 pt-2 text-sm font-medium text-orange-700">오늘의 추천</p>
          <RestaurantCard
            restaurant={picked}
            distanceLabel={picked.distanceM !== null ? formatDistance(picked.distanceM) : null}
          />
        </div>
      )}

      {loading ? (
        <p className="py-8 text-center text-gray-500">불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <p className="py-8 text-center text-gray-500">검색 결과가 없어요.</p>
      ) : (
        <>
          <p className="text-sm text-gray-500">{filtered.length}개 식당</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                distanceLabel={r.distanceM !== null ? formatDistance(r.distanceM) : null}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
