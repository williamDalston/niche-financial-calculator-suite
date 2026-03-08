import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "../stat-card";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total" value="$5,000" />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$5,000")).toBeInTheDocument();
  });

  it("renders subvalue when provided", () => {
    render(<StatCard label="Rate" value="7.5%" subvalue="per year" />);
    expect(screen.getByText("per year")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    const icon = <span data-testid="test-icon">icon</span>;
    render(<StatCard label="Metric" value="42" icon={icon} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("applies highlight styling when highlight is true", () => {
    const { container } = render(
      <StatCard label="Highlighted" value="$100" highlight />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-l-accent-primary");
  });

  it("renders up trend arrow with correct sr-only text", () => {
    render(<StatCard label="Growth" value="10%" trend="up" />);
    expect(screen.getByText("Trending up")).toBeInTheDocument();
  });

  it("renders down trend arrow with correct sr-only text", () => {
    render(<StatCard label="Loss" value="-5%" trend="down" />);
    expect(screen.getByText("Trending down")).toBeInTheDocument();
  });

  it("does not render trend arrow for neutral trend", () => {
    render(<StatCard label="Flat" value="0%" trend="neutral" />);
    expect(screen.queryByText("Trending up")).not.toBeInTheDocument();
    expect(screen.queryByText("Trending down")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatCard label="Custom" value="1" className="col-span-2" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("col-span-2");
  });

  it("renders ReactNode values", () => {
    render(
      <StatCard
        label="Complex"
        value={<span data-testid="complex-value">$1,234</span>}
      />
    );
    expect(screen.getByTestId("complex-value")).toBeInTheDocument();
  });
});
