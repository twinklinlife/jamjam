"use client";

import { DISTANCE_BANDS, type DistanceBand } from "@/lib/geo";

interface Props {
  selected: DistanceBand | null;
  onChange: (band: DistanceBand | null) => void;
}

export default function DistanceFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
          selected === null
            ? "bg-orange-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        거리 전체
      </button>
      {DISTANCE_BANDS.map((band) => (
        <button
          key={band}
          onClick={() => onChange(band)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            selected === band
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {band}
        </button>
      ))}
    </div>
  );
}
