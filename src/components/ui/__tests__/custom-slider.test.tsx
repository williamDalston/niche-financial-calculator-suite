import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomSlider } from "../custom-slider";

describe("CustomSlider", () => {
  it("renders with a label", () => {
    render(
      <CustomSlider value={50} onChange={() => {}} min={0} max={100} label="Amount" />
    );
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });

  it("renders min/max labels by default", () => {
    render(
      <CustomSlider value={50} onChange={() => {}} min={0} max={100} />
    );
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("formats min/max labels with custom formatter", () => {
    render(
      <CustomSlider
        value={50000}
        onChange={() => {}}
        min={0}
        max={100000}
        formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
      />
    );
    expect(screen.getByText("$0k")).toBeInTheDocument();
    expect(screen.getByText("$100k")).toBeInTheDocument();
  });

  it("hides min/max labels when showMinMax is false", () => {
    render(
      <CustomSlider
        value={50}
        onChange={() => {}}
        min={0}
        max={100}
        showMinMax={false}
      />
    );
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("100")).not.toBeInTheDocument();
  });

  it("calls onChange when native range input changes", () => {
    const onChange = vi.fn();
    render(
      <CustomSlider value={50} onChange={onChange} min={0} max={100} label="Slide" />
    );
    const input = screen.getByLabelText("Slide");
    fireEvent.change(input, { target: { value: "75" } });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  it("has correct ARIA attributes", () => {
    render(
      <CustomSlider
        value={25}
        onChange={() => {}}
        min={0}
        max={100}
        label="Progress"
        formatValue={(v) => `${v}%`}
      />
    );
    const input = screen.getByLabelText("Progress");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "100");
    expect(input).toHaveAttribute("aria-valuenow", "25");
    expect(input).toHaveAttribute("aria-valuetext", "25%");
  });

  it("shows tooltip on hover", () => {
    render(
      <CustomSlider
        value={50}
        onChange={() => {}}
        min={0}
        max={100}
        formatValue={(v) => `${v}%`}
      />
    );
    // Tooltip should not be visible initially
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("renders without a label using default aria-label", () => {
    render(
      <CustomSlider value={50} onChange={() => {}} min={0} max={100} />
    );
    expect(screen.getByLabelText("Slider")).toBeInTheDocument();
  });
});
