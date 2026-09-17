"use client";

import { useState } from "react";
import type { Feedback } from "@/lib/types";

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FeedbackList({ initialFeedback }: { initialFeedback: Feedback[] }) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch("/api/admin/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setFeedback((prev) => prev.filter((f) => f.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900">오류 제보 ({feedback.length}건)</h2>
      {feedback.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-400">
          접수된 제보가 없습니다.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
          {feedback.map((f) => (
            <li key={f.id} className="flex items-start justify-between gap-3 p-3">
              <div className="min-w-0">
                <p className="text-xs text-gray-400">{formatDateTime(f.createdAt)}</p>
                <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-800">{f.text}</p>
              </div>
              <button
                onClick={() => handleDelete(f.id)}
                disabled={deletingId === f.id}
                className="shrink-0 rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-100 hover:text-red-600 disabled:opacity-50"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
