# Plan: Align Contract, Fix Port, and Complete Test Coverage

## Implementation Strategy

Four changes, ordered by dependency:

1. **Contract alignment** (lib + components) — rename `pointers` → `relationships` in TypeScript interface and all component references
2. **Port fix** (lib) — update fallback URL from `8003` to `28003`
3. **DraftInput tests** (test file) — add component tests following the existing PointerCard/RelationshipMapView test patterns
4. **E2E test** (Playwright) — add end-to-end test for draft submission → relationship map display

Changes 1 and 2 are in the same file (`relationship-engine.ts`) and should be done together. Changes 3 and 4 are independent test additions.

## Changes

### 1. Contract alignment

**`src/lib/relationship-engine.ts`**

Current:
```typescript
export interface RelationshipMap {
  pointers: Pointer[];
}
```

Target:
```typescript
export interface RelationshipMap {
  relationships: Pointer[];
}
```

**`src/components/RelationshipMapView.tsx`**

- Update all references from `map.pointers` → `map.relationships`

**`src/app/page.tsx`**

- If it references `pointers` directly, update to `relationships`

**`src/components/RelationshipMapView.test.tsx`**

- Update all test fixtures: `{ pointers: [...] }` → `{ relationships: [...] }`

### 2. Port fix

**`src/lib/relationship-engine.ts`**

Current:
```typescript
const RELATIONSHIP_ENGINE_URL =
  process.env.NEXT_PUBLIC_RELATIONSHIP_ENGINE_URL || "http://localhost:8003";
```

Target:
```typescript
const RELATIONSHIP_ENGINE_URL =
  process.env.NEXT_PUBLIC_RELATIONSHIP_ENGINE_URL || "http://localhost:28003";
```

### 3. DraftInput tests

**New: `src/components/DraftInput.test.tsx`**

Following the existing test patterns (Vitest, @testing-library/react, describe/it blocks):

```typescript
describe("DraftInput", () => {
  it("should render a textarea", () => { ... });
  it("should render a submit button", () => { ... });
  it("should call onSubmit with entered text when submitted", () => { ... });
  it("should disable textarea when isLoading is true", () => { ... });
  it("should disable button when isLoading is true", () => { ... });
  it("should show 'Analysing...' button text when isLoading is true", () => { ... });
  it("should show default button text when isLoading is false", () => { ... });
  it("should clear textarea after submission", () => { ... });  // if applicable
});
```

Uses: `render`, `screen`, `fireEvent` or `userEvent` from `@testing-library/react`.

### 4. E2E test

**New: `e2e/knowledge-matchmaker.spec.ts`**

Following the existing Playwright patterns (test.describe, page.goto, expect):

```typescript
test.describe("Knowledge Matchmaker", () => {
  test("should submit a draft and display relationship map", async ({ page }) => {
    // Mock the relationship-engine API via route interception
    await page.route("**/map", async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          relationships: [
            { title: "Being and Time", source_url: "https://example.com", relationship_type: "CONFLICT", reason: "Challenges your view." },
            { title: "Distributed Cognition", source_url: "https://example.com/dc", relationship_type: "RESONANCE", reason: "Supports your framing." },
          ],
        }),
      });
    });

    await page.goto("/");
    await page.fill("textarea", "Distributed cognition is fundamentally social.");
    await page.click("button:has-text('Analyse')");  // or whatever the button text is

    // Verify relationship map appears with grouped pointers
    await expect(page.getByText("Being and Time")).toBeVisible();
    await expect(page.getByText("Conflict")).toBeVisible();
    await expect(page.getByText("Resonance")).toBeVisible();
  });

  test("should display empty state when no relationships returned", async ({ page }) => {
    await page.route("**/map", async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ relationships: [] }),
      });
    });

    await page.goto("/");
    await page.fill("textarea", "Some draft text.");
    await page.click("button:has-text('Analyse')");

    await expect(page.getByText("No relevant works found")).toBeVisible();
  });
});
```

## Task List

1. [ ] Update `RelationshipMap` interface: `pointers` → `relationships` in `relationship-engine.ts`
2. [ ] Update fallback URL port from `8003` to `28003` in `relationship-engine.ts`
3. [ ] Update `RelationshipMapView.tsx`: all `map.pointers` → `map.relationships` references
4. [ ] Update `page.tsx` if it references `pointers` directly
5. [ ] Update `RelationshipMapView.test.tsx`: all test fixtures to use `relationships`
6. [ ] Create `DraftInput.test.tsx` with component tests
7. [ ] Create `e2e/knowledge-matchmaker.spec.ts` with Playwright tests
8. [ ] Run `npm run test:all` to verify all tests pass, coverage meets 100%, and architecture checks pass

## Testing Strategy

**Component tests (Vitest)**: `DraftInput.test.tsx` tests textarea rendering, submit behavior, loading state (disabled inputs, button text). Uses `@testing-library/react` with `fireEvent` or `userEvent`.

**E2E tests (Playwright)**: Mock the relationship-engine API via `page.route()` to avoid requiring a running backend. Test the golden path (submit draft → see grouped relationship map) and the empty state (no results). Follows the existing E2E patterns in `e2e/homepage.spec.ts`.

**Existing tests**: `PointerCard.test.tsx` and `RelationshipMapView.test.tsx` are updated for the `relationships` field rename but otherwise unchanged.

## Risks and Mitigations

- **Risk**: `page.route()` mock pattern may not intercept correctly if the URL construction is different than expected. **Mitigation**: Use a broad glob pattern (`**/map`) and verify in the test that the mock is hit.
- **Risk**: The knowledge-matchmaker page may not be at `/` — the existing site has blog/about pages. **Mitigation**: Check `page.tsx` routing and use the correct path.
- **Risk**: E2E test requires the Next.js dev server to serve the knowledge-matchmaker page. **Mitigation**: Playwright config already has `webServer` configured; verify the page route is reachable.
