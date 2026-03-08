import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShareResults } from "../share-results";

describe("ShareResults", () => {
  const defaultProps = {
    title: "Test Results",
    results: {
      "Monthly Payment": "$1,234",
      "Total Interest": "$50,000",
    },
  };

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders all three action buttons", () => {
    render(<ShareResults {...defaultProps} />);
    expect(screen.getByLabelText("Copy results to clipboard")).toBeInTheDocument();
    expect(screen.getByLabelText("Share calculator link")).toBeInTheDocument();
    expect(screen.getByLabelText("Print results")).toBeInTheDocument();
  });

  it("has a toolbar role with accessible label", () => {
    render(<ShareResults {...defaultProps} />);
    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toHaveAttribute("aria-label", "Share calculator results");
  });

  it("copies results to clipboard and shows feedback", async () => {
    render(<ShareResults {...defaultProps} />);
    const copyBtn = screen.getByLabelText("Copy results to clipboard");

    fireEvent.click(copyBtn);

    // Should show "Copied!" feedback
    expect(await screen.findByText("Copied!")).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    // Verify the copied text includes results
    const copiedText = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(copiedText).toContain("Test Results");
    expect(copiedText).toContain("Monthly Payment: $1,234");
    expect(copiedText).toContain("Total Interest: $50,000");
  });

  it("uses getShareUrl for the copied URL when provided", async () => {
    const getShareUrl = vi.fn().mockReturnValue("https://example.com/calc?v=1");
    render(<ShareResults {...defaultProps} getShareUrl={getShareUrl} />);

    fireEvent.click(screen.getByLabelText("Copy results to clipboard"));
    await screen.findByText("Copied!");

    const copiedText = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(copiedText).toContain("https://example.com/calc?v=1");
  });

  it("calls window.print when print button is clicked", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<ShareResults {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Print results"));
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ShareResults {...defaultProps} className="mt-4" />
    );
    const toolbar = container.firstChild as HTMLElement;
    expect(toolbar.className).toContain("mt-4");
  });
});
