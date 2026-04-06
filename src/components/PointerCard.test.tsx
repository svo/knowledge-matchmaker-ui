import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PointerCard } from "./PointerCard";
import { Pointer } from "@/lib/relationship-engine";

const basePointer: Pointer = {
  title: "Being and Time",
  source_url: "https://example.com/being-and-time",
  relationship_type: "CONFLICT",
  reason:
    "Your claim about distributed cognition conflicts with Heidegger's account of readiness-to-hand.",
};

describe("PointerCard", () => {
  it("should render the title", () => {
    render(<PointerCard pointer={basePointer} />);
    expect(screen.getByText("Being and Time")).toBeInTheDocument();
  });

  it("should render the reason", () => {
    render(<PointerCard pointer={basePointer} />);
    expect(
      screen.getByText(
        "Your claim about distributed cognition conflicts with Heidegger's account of readiness-to-hand."
      )
    ).toBeInTheDocument();
  });

  it("should render a link to source_url", () => {
    render(<PointerCard pointer={basePointer} />);
    const link = screen.getByRole("link", { name: "Being and Time" });
    expect(link).toHaveAttribute("href", "https://example.com/being-and-time");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should render the relationship type badge for CONFLICT", () => {
    render(<PointerCard pointer={basePointer} />);
    expect(screen.getByText("Conflict")).toBeInTheDocument();
  });

  it("should render the relationship type badge for RESONANCE", () => {
    render(
      <PointerCard
        pointer={{ ...basePointer, relationship_type: "RESONANCE" }}
      />
    );
    expect(screen.getByText("Resonance")).toBeInTheDocument();
  });

  it("should render the relationship type badge for BLIND_SPOT", () => {
    render(
      <PointerCard
        pointer={{ ...basePointer, relationship_type: "BLIND_SPOT" }}
      />
    );
    expect(screen.getByText("Blind Spot")).toBeInTheDocument();
  });

  it("should render the relationship type badge for OPEN_SPACE", () => {
    render(
      <PointerCard
        pointer={{ ...basePointer, relationship_type: "OPEN_SPACE" }}
      />
    );
    expect(screen.getByText("Open Space")).toBeInTheDocument();
  });

  it("should apply green badge classes for RESONANCE", () => {
    render(
      <PointerCard
        pointer={{ ...basePointer, relationship_type: "RESONANCE" }}
      />
    );
    const badge = screen.getByText("Resonance");
    expect(badge).toHaveClass("bg-green-100");
  });

  it("should apply red badge classes for CONFLICT", () => {
    render(<PointerCard pointer={basePointer} />);
    const badge = screen.getByText("Conflict");
    expect(badge).toHaveClass("bg-red-100");
  });

  it("should apply amber badge classes for BLIND_SPOT", () => {
    render(
      <PointerCard
        pointer={{ ...basePointer, relationship_type: "BLIND_SPOT" }}
      />
    );
    const badge = screen.getByText("Blind Spot");
    expect(badge).toHaveClass("bg-amber-100");
  });

  it("should apply blue badge classes for OPEN_SPACE", () => {
    render(
      <PointerCard
        pointer={{ ...basePointer, relationship_type: "OPEN_SPACE" }}
      />
    );
    const badge = screen.getByText("Open Space");
    expect(badge).toHaveClass("bg-blue-100");
  });
});
