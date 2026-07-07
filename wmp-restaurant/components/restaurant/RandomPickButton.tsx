"use client";

interface Props {
  onPick: () => void;
  disabled: boolean;
}

export default function RandomPickButton({ onPick, disabled }: Props) {
  return (
    <button
      onClick={onPick}
      disabled={disabled}
      className="w-full rounded-lg bg-orange-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
    >
      🎲 오늘 뭐 먹지?
    </button>
  );
}
