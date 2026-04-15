import { describe, it, expect, vi, afterEach } from "vitest";
import { buildRelationshipMap } from "./relationship-engine";

describe("buildRelationshipMap", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should send POST request with draft to the relationship engine", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ relationships: [] }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await buildRelationshipMap("my draft");

    expect(mockFetch).toHaveBeenCalledWith("http://localhost:28003/map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draft: "my draft" }),
    });
  });

  it("should return the parsed relationship map from the response", async () => {
    const expectedMap = {
      relationships: [
        {
          title: "Test Work",
          source_url: "https://example.com",
          relationship_type: "RESONANCE",
          reason: "Supports your argument.",
        },
      ],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(expectedMap),
      })
    );

    const result = await buildRelationshipMap("draft");

    expect(result).toEqual(expectedMap);
  });

  it("should throw when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error",
      })
    );

    await expect(buildRelationshipMap("draft")).rejects.toThrow(
      "Failed to build relationship map: Internal Server Error"
    );
  });
});
