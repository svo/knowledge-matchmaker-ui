import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutLayout, { metadata } from "./layout";

describe("AboutLayout", () => {
  it("should render children", () => {
    render(
      <AboutLayout>
        <div>About Content</div>
      </AboutLayout>
    );
    expect(screen.getByText("About Content")).toBeInTheDocument();
  });

  it("should export metadata with the correct title", () => {
    expect(metadata.title).toBe(
      "About Sean Van Osselaer | Fractional CTO | qual.is"
    );
  });

  it("should export metadata with the correct description", () => {
    expect(metadata.description).toBe(
      "Fractional CTO specializing in AI-driven development, scalable architecture, and building high-performing engineering teams."
    );
  });

  it("should export metadata with the correct canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe(
      "https://www.knowledge-matchmaker.qual.is/about"
    );
  });

  it("should export metadata with correct openGraph URL", () => {
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.knowledge-matchmaker.qual.is/about",
      type: "website",
    });
  });
});
