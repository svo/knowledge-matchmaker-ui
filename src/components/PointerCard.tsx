import { Pointer, RelationshipType } from "@/lib/relationship-engine";

const badgeStyles: Record<RelationshipType, string> = {
  RESONANCE:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  CONFLICT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  BLIND_SPOT:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  OPEN_SPACE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

const badgeLabels: Record<RelationshipType, string> = {
  RESONANCE: "Resonance",
  CONFLICT: "Conflict",
  BLIND_SPOT: "Blind Spot",
  OPEN_SPACE: "Open Space",
};

interface PointerCardProps {
  pointer: Pointer;
}

export function PointerCard({ pointer }: PointerCardProps) {
  const { title, source_url, relationship_type, reason } = pointer;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-2">
        <a
          href={source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {title}
        </a>
        <span
          className={`inline-block shrink-0 text-xs font-medium px-2 py-1 rounded-full ${badgeStyles[relationship_type]}`}
        >
          {badgeLabels[relationship_type]}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{reason}</p>
    </div>
  );
}
