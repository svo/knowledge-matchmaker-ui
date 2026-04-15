import { describe, it, expect } from "vitest";
import { HOME_OG_IMAGE_URL } from "./constants";

describe("constants", () => {
  describe("HOME_OG_IMAGE_URL", () => {
    it("should be defined", () => {
      expect(HOME_OG_IMAGE_URL).toBeDefined();
    });

    it("should have the correct URL", () => {
      expect(HOME_OG_IMAGE_URL).toBe(
        "https://www.knowledge-matchmaker.qual.is/assets/open-graph-large.png"
      );
    });

    it("should be a string", () => {
      expect(typeof HOME_OG_IMAGE_URL).toBe("string");
    });

    it("should start with https://", () => {
      expect(HOME_OG_IMAGE_URL).toMatch(/^https:\/\//);
    });
  });
});
