"use client";

import { useState } from "react";
import { CATEGORIES, type Restaurant } from "@/lib/types";
import UploadForm from "./UploadForm";

export default function AdminTable({ initialRestaurants }: { initialRestaurants: Restaurant[] }) {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeMessage, setGeocodeMessage] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/restaurants");
    setRestaurants(await res.json());
  }

  async function handleGeocode() {
    setGeocoding(true);
    setGeocodeMessage(null);
    try {
      const res = await fetch("/api/admin/geocode", { method: "POST" });
      const data = (await res.json()) as { updated?: number; total?: number; error?: string };
      if (!res.ok) {
        setGeocodeMessage(data.error ?? "좌표 갱신에 실패했습니다.");
        return;
      }
      setGeocodeMessage(`${data.updated}건 갱신 완료 (전체 ${data.total}건)`);
      await refresh();
    } finally {
      setGeocoding(false);
    }
  }

  async function handleChange(id: string, patch: Partial<Pick<Restaurant, "category" | "signatureMenu">>) {
    setRestaurants((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function handleSave(restaurant: Restaurant) {
    setSavingId(restaurant.id);
    try {
      await fetch("/api/admin/restaurants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: restaurant.id,
          category: restaurant.category,
          signatureMenu: restaurant.signatureMenu,
        }),
      });
    } finally {
      setSavingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">가맹 식당 관리 ({restaurants.length}건)</h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:underline">
          로그아웃
        </button>
      </div>

      <UploadForm onMerged={refresh} />

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
        <button
          onClick={handleGeocode}
          disabled={geocoding}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {geocoding ? "갱신 중..." : "좌표(거리) 정보 갱신"}
        </button>
        {geocodeMessage && <p className="text-sm text-gray-600">{geocodeMessage}</p>}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-500">가맹점명</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">주소</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">카테고리</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">대표메뉴</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {restaurants.map((r) => (
              <tr key={r.id}>
                <td className="max-w-[160px] truncate px-3 py-2 font-medium text-gray-900">{r.name}</td>
                <td className="max-w-[220px] truncate px-3 py-2 text-gray-500">{r.address}</td>
                <td className="px-3 py-2">
                  <select
                    value={r.category ?? ""}
                    onChange={(e) =>
                      handleChange(r.id, { category: (e.target.value || null) as Restaurant["category"] })
                    }
                    className="rounded border border-gray-300 px-2 py-1"
                  >
                    <option value="">(없음)</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={r.signatureMenu ?? ""}
                    onChange={(e) => handleChange(r.id, { signatureMenu: e.target.value || null })}
                    className="w-56 rounded border border-gray-300 px-2 py-1"
                    placeholder="대표메뉴 (쉼표로 구분)"
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleSave(r)}
                    disabled={savingId === r.id}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {savingId === r.id ? "저장 중..." : "저장"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
