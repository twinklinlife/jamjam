"use client";

import { useState } from "react";
import { FEEDBACK_MAX_LENGTH } from "@/lib/constants";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function close() {
    setOpen(false);
    setText("");
    setError(null);
    setDone(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "제출에 실패했습니다.");
        return;
      }
      setDone(true);
      setTimeout(close, 1200);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-40 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50"
      >
        🐞 오류 제보
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            {done ? (
              <p className="py-6 text-center text-sm font-medium text-gray-700">
                제보 감사합니다 🙏
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h2 className="text-base font-semibold text-gray-900">오류 제보</h2>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={FEEDBACK_MAX_LENGTH}
                  rows={4}
                  autoFocus
                  placeholder="잘못된 정보나 사이트 오류를 짧게 남겨주세요."
                  className="w-full resize-none rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-right text-xs text-gray-400">
                  {text.length}/{FEEDBACK_MAX_LENGTH}
                </p>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !text.trim()}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    제출
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
