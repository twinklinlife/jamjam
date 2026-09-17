"use client";

import { LANDMARKS, type LandmarkName } from "@/lib/landmarks";

interface Props {
  selected: LandmarkName | null;
  onChange: (landmark: LandmarkName | null) => void;
}

export default function LocationFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
          selected === null
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        위치 전체
      </button>
      {LANDMARKS.map((landmark) => (
        <button
          key={landmark.name}
          onClick={() => onChange(landmark.name)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            selected === landmark.name
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {landmark.name}
        </button>
      ))}
      <button
        onClick={() => onChange("기타")}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
          selected === "기타"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        기타
      </button>
    </div>
  );
}
