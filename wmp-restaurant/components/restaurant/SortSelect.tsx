"use client";

import { SORT_ORDERS, type SortOrder } from "@/lib/sort";

interface Props {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-1.5 text-sm text-gray-600">
      정렬 순서
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
        className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
      >
        {SORT_ORDERS.map((order) => (
          <option key={order} value={order}>
            {order}
          </option>
        ))}
      </select>
    </label>
  );
}
