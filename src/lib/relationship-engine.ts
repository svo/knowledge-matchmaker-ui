const RELATIONSHIP_ENGINE_URL =
  process.env.NEXT_PUBLIC_RELATIONSHIP_ENGINE_URL || "http://localhost:8003";

export type RelationshipType =
  | "RESONANCE"
  | "CONFLICT"
  | "BLIND_SPOT"
  | "OPEN_SPACE";

export interface Pointer {
  title: string;
  source_url: string;
  relationship_type: RelationshipType;
  reason: string;
}

export interface RelationshipMap {
  pointers: Pointer[];
}

export async function buildRelationshipMap(
  draft: string
): Promise<RelationshipMap> {
  const response = await fetch(`${RELATIONSHIP_ENGINE_URL}/map`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ draft }),
  });
  if (!response.ok) {
    throw new Error(`Failed to build relationship map: ${response.statusText}`);
  }
  return response.json();
}
