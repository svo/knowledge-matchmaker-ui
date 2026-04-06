import { Pointer, RelationshipMap, RelationshipType } from "@/lib/relationship-engine";
import { PointerCard } from "./PointerCard";

const groupOrder: RelationshipType[] = [
  "RESONANCE",
  "CONFLICT",
  "BLIND_SPOT",
  "OPEN_SPACE",
];

const groupHeadings: Record<RelationshipType, string> = {
  RESONANCE: "Resonance",
  CONFLICT: "Conflict",
  BLIND_SPOT: "Blind Spots",
  OPEN_SPACE: "Open Space",
};

interface RelationshipMapViewProps {
  map: RelationshipMap;
}

export function RelationshipMapView({ map }: RelationshipMapViewProps) {
  if (map.pointers.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        No relevant works found. Add documents to the corpus first.
      </p>
    );
  }

  const grouped = map.pointers.reduce<Record<string, Pointer[]>>(
    (acc, pointer) => {
      const key = pointer.relationship_type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(pointer);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">
      {groupOrder.map((type) => {
        const pointers = grouped[type];
        if (!pointers || pointers.length === 0) return null;
        return (
          <section key={type}>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {groupHeadings[type]}
            </h2>
            <div className="space-y-3">
              {pointers.map((pointer, index) => (
                <PointerCard key={index} pointer={pointer} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
