"use client";

import { CATEGORIES, type Category } from "@/lib/types";

interface Props {
  selected: Category | null;
  onChange: (category: Category | null) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
          selected === null
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        전체
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
