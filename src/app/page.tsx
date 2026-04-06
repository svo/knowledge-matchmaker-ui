"use client";

import React from "react";
import { DraftInput } from "@/components/DraftInput";
import { RelationshipMapView } from "@/components/RelationshipMapView";
import {
  buildRelationshipMap,
  RelationshipMap,
} from "@/lib/relationship-engine";

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [map, setMap] = React.useState<RelationshipMap | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(draft: string) {
    setIsLoading(true);
    setError(null);
    setMap(null);
    try {
      const result = await buildRelationshipMap(draft);
      setMap(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Knowledge Matchmaker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Map your thinking to the literature
        </p>
      </header>

      <DraftInput onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {map && (
        <section className="mt-10">
          <RelationshipMapView map={map} />
        </section>
      )}
    </main>
  );
}
