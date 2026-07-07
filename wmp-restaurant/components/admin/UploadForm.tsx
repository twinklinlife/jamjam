"use client";

import { useState } from "react";

interface MergeSummary {
  added: number;
  removed: number;
  kept: number;
}

export default function UploadForm({ onMerged }: { onMerged: () => void }) {
  const [file, setFile] = useState<globalThis.File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<MergeSummary | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    setError(null);
    setSummary(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { error?: string; summary?: MergeSummary };
      if (!res.ok) {
        setError(data.error ?? "업로드에 실패했습니다.");
        return;
      }
      setSummary(data.summary ?? null);
      onMerged();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-white p-4"
    >
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-sm"
      />
      <button
        type="submit"
        disabled={!file || submitting}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        엑셀 재업로드
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {summary && (
        <p className="text-sm text-gray-600">
          신규 {summary.added}건 · 유지 {summary.kept}건 · 제거 {summary.removed}건
        </p>
      )}
    </form>
  );
}
