"use client";

import React from "react";

interface DraftInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function DraftInput({ onSubmit, isLoading }: DraftInputProps) {
  const [text, setText] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your draft, notes, or half-formed thinking here..."
        disabled={isLoading}
        rows={10}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
      >
        {isLoading ? "Analysing..." : "Find connections"}
      </button>
    </form>
  );
}
