# Feature: Align Contract, Fix Port, and Complete Test Coverage

## Overview

The UI frontend has four gaps:

1. **Consumer contract update** — the relationship-engine is changing its `POST /map` response key from `pointers` to `relationships`. The UI's `RelationshipMap` TypeScript interface and all components must update.
2. **Port mismatch** — the fallback URL in `relationship-engine.ts` uses port `8003` (container port) instead of `28003` (host-mapped port per Vagrantfile).
3. **Missing DraftInput tests** — the plan requires component tests for all three components. `PointerCard` and `RelationshipMapView` have tests; `DraftInput` does not.
4. **Missing E2E test** — the plan requires a Playwright test for the full draft-to-relationship-map flow. No such test exists.

## Motivation

### Contract alignment

The canonical spec defines the relationship-engine response as `{ "relationships": [...] }`. The UI's TypeScript types must match the wire format. The `RelationshipMap` interface currently has `pointers: Pointer[]`; this must become `relationships: Pointer[]`.

### Port fix

The Vagrantfile maps container port 8003 to host port 28003. The `.env.example` correctly documents `http://localhost:28003`. But the code fallback uses `http://localhost:8003`, which only works if running inside the container. In local dev (the only supported environment), requests to port 8003 will fail.

### DraftInput tests

The project requires 100% test coverage. `DraftInput` is a controlled textarea with submit functionality and loading state — it has testable behavior that is not currently verified.

### E2E test

The plan explicitly requires: "Playwright tests for the full user journey — submit draft, see relationship map with grouped pointers." This is the primary user flow and the only way to verify the integration works end-to-end.

## Acceptance Criteria

### Contract

- [ ] Given the `RelationshipMap` TypeScript interface, when inspected, then it has a `relationships` field (not `pointers`).
- [ ] Given the `buildRelationshipMap` function, when it parses the response, then it reads `relationships` from the JSON body.
- [ ] Given `RelationshipMapView` receives a `RelationshipMap`, when it renders, then it iterates over `relationships` (not `pointers`).

### Port

- [ ] Given no `NEXT_PUBLIC_RELATIONSHIP_ENGINE_URL` environment variable, when the fallback is used, then it points to `http://localhost:28003`.

### DraftInput tests

- [ ] Given the DraftInput component, when rendered, then a textarea and submit button are visible.
- [ ] Given text entered in the textarea, when the submit button is clicked, then `onSubmit` is called with the entered text.
- [ ] Given `isLoading` is true, when rendered, then the textarea and button are disabled.
- [ ] Given `isLoading` is true, when rendered, then the button text is "Analysing...".
- [ ] Given an empty textarea, when the submit button is clicked, then `onSubmit` is not called (or called with empty string per current behavior).

### E2E test

- [ ] Given the knowledge-matchmaker page, when a draft is submitted, then the loading state appears.
- [ ] Given a successful API response, when the relationship map renders, then pointers are grouped by relationship type with visible titles, badges, reasons, and links.
- [ ] Given an empty corpus (API returns empty relationships), when rendered, then the empty state message is displayed.

## Current State

### TypeScript interface (`relationship-engine.ts`)

```typescript
export interface RelationshipMap {
  pointers: Pointer[];  // Should be: relationships
}
```

### Fallback URL (`relationship-engine.ts`)

```typescript
const RELATIONSHIP_ENGINE_URL =
  process.env.NEXT_PUBLIC_RELATIONSHIP_ENGINE_URL || "http://localhost:8003";  // Should be: 28003
```

### Test files

- `src/components/PointerCard.test.tsx` — 10 tests (exists)
- `src/components/RelationshipMapView.test.tsx` — 13 tests (exists)
- `src/components/DraftInput.test.tsx` — does not exist
- `e2e/knowledge-matchmaker.spec.ts` — does not exist

## Cross-Service Dependencies

- **Depends on**: relationship-engine response key change (`pointers` → `relationships`)

## Open Questions

1. Should the E2E test mock the relationship-engine API (via Playwright route interception) or require a running backend? Recommendation: mock via route interception for reliability, with a note that full integration requires all services running.
