import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelationshipMapView } from "./RelationshipMapView";
import { Pointer, RelationshipMap } from "@/lib/relationship-engine";

const resonancePointer: Pointer = {
  title: "The Extended Mind",
  source_url: "https://example.com/extended-mind",
  relationship_type: "RESONANCE",
  reason: "Supports your claim about distributed cognition.",
};

const conflictPointer: Pointer = {
  title: "Being and Time",
  source_url: "https://example.com/being-and-time",
  relationship_type: "CONFLICT",
  reason: "Challenges your framing of tool use.",
};

const blindSpotPointer: Pointer = {
  title: "Situated Learning",
  source_url: "https://example.com/situated-learning",
  relationship_type: "BLIND_SPOT",
  reason: "Your thinking hasn't touched this dimension.",
};

const openSpacePointer: Pointer = {
  title: "Novel Territory",
  source_url: "https://example.com/novel",
  relationship_type: "OPEN_SPACE",
  reason: "Your ideas venture into unexplored territory.",
};

describe("RelationshipMapView", () => {
  it("should render empty state when no pointers", () => {
    render(<RelationshipMapView map={{ relationships: [] }} />);
    expect(
      screen.getByText(
        "No relevant works found. Add documents to the corpus first."
      )
    ).toBeInTheDocument();
  });

  it("should not render empty state when pointers exist", () => {
    render(<RelationshipMapView map={{ relationships: [resonancePointer] }} />);
    expect(
      screen.queryByText(
        "No relevant works found. Add documents to the corpus first."
      )
    ).not.toBeInTheDocument();
  });

  it("should render a PointerCard for each pointer", () => {
    const map: RelationshipMap = {
      relationships: [resonancePointer, conflictPointer],
    };
    render(<RelationshipMapView map={map} />);
    expect(screen.getByText("The Extended Mind")).toBeInTheDocument();
    expect(screen.getByText("Being and Time")).toBeInTheDocument();
  });

  it("should render pointers grouped by type with headings", () => {
    const map: RelationshipMap = {
      relationships: [
        resonancePointer,
        conflictPointer,
        blindSpotPointer,
        openSpacePointer,
      ],
    };
    render(<RelationshipMapView map={map} />);
    expect(
      screen.getByRole("heading", { name: "Resonance" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Conflict" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Blind Spots" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Open Space" })
    ).toBeInTheDocument();
  });

  it("should render the Resonance group heading when resonance pointers exist", () => {
    render(<RelationshipMapView map={{ relationships: [resonancePointer] }} />);
    expect(
      screen.getByRole("heading", { name: "Resonance" })
    ).toBeInTheDocument();
  });

  it("should render the Conflict group heading when conflict pointers exist", () => {
    render(<RelationshipMapView map={{ relationships: [conflictPointer] }} />);
    expect(
      screen.getByRole("heading", { name: "Conflict" })
    ).toBeInTheDocument();
  });

  it("should not render group headings for empty groups", () => {
    render(<RelationshipMapView map={{ relationships: [resonancePointer] }} />);
    expect(
      screen.queryByRole("heading", { name: "Conflict" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Blind Spots" })
    ).not.toBeInTheDocument();
  });

  it("should render all four groups when all types present", () => {
    const map: RelationshipMap = {
      relationships: [
        resonancePointer,
        conflictPointer,
        blindSpotPointer,
        openSpacePointer,
      ],
    };
    render(<RelationshipMapView map={map} />);
    expect(screen.getByText("The Extended Mind")).toBeInTheDocument();
    expect(screen.getByText("Being and Time")).toBeInTheDocument();
    expect(screen.getByText("Situated Learning")).toBeInTheDocument();
    expect(screen.getByText("Novel Territory")).toBeInTheDocument();
  });
});
