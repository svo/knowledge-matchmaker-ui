import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DraftInput } from "./DraftInput";

describe("DraftInput", () => {
  it("should render a textarea with placeholder text", () => {
    render(<DraftInput onSubmit={vi.fn()} isLoading={false} />);
    expect(
      screen.getByPlaceholderText(
        "Paste your draft, notes, or half-formed thinking here..."
      )
    ).toBeInTheDocument();
  });

  it("should render a submit button with default text", () => {
    render(<DraftInput onSubmit={vi.fn()} isLoading={false} />);
    expect(
      screen.getByRole("button", { name: "Find connections" })
    ).toBeInTheDocument();
  });

  it("should call onSubmit with entered text when submitted", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(<DraftInput onSubmit={handleSubmit} isLoading={false} />);

    await user.type(screen.getByRole("textbox"), "My draft text");
    await user.click(screen.getByRole("button", { name: "Find connections" }));

    expect(handleSubmit).toHaveBeenCalledWith("My draft text");
  });

  it("should not call onSubmit when textarea is empty", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(<DraftInput onSubmit={handleSubmit} isLoading={false} />);

    await user.click(screen.getByRole("button", { name: "Find connections" }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("should not call onSubmit when textarea contains only whitespace", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(<DraftInput onSubmit={handleSubmit} isLoading={false} />);

    await user.type(screen.getByRole("textbox"), "   ");
    await user.click(screen.getByRole("button", { name: "Find connections" }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("should disable textarea when isLoading is true", () => {
    render(<DraftInput onSubmit={vi.fn()} isLoading={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should disable button when isLoading is true", () => {
    render(<DraftInput onSubmit={vi.fn()} isLoading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should show loading text on button when isLoading is true", () => {
    render(<DraftInput onSubmit={vi.fn()} isLoading={true} />);
    expect(
      screen.getByRole("button", { name: "Analysing..." })
    ).toBeInTheDocument();
  });
});
