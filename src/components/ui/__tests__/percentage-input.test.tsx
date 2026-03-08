import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PercentageInput } from "../percentage-input";

describe("PercentageInput", () => {
  it("renders with a label", () => {
    render(<PercentageInput value={5} onChange={() => {}} label="Rate" />);
    expect(screen.getByLabelText("Rate")).toBeInTheDocument();
  });

  it("displays the % suffix", () => {
    const { container } = render(<PercentageInput value={7.5} onChange={() => {}} />);
    const suffix = container.querySelector("[aria-hidden='true']");
    expect(suffix).toHaveTextContent("%");
  });

  it("displays the current value", () => {
    render(<PercentageInput value={12.5} onChange={() => {}} label="Tax" />);
    const input = screen.getByLabelText("Tax") as HTMLInputElement;
    expect(input.value).toBe("12.5");
  });

  it("shows raw value on focus and clamps on blur", () => {
    const onChange = vi.fn();
    render(
      <PercentageInput value={5} onChange={onChange} label="Pct" min={0} max={100} />
    );
    const input = screen.getByLabelText("Pct") as HTMLInputElement;

    fireEvent.focus(input);
    expect(input.value).toBe("5");

    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("handles arrow key stepping", () => {
    const onChange = vi.fn();
    render(
      <PercentageInput value={5} onChange={onChange} label="Step" step={0.5} min={0} max={100} />
    );
    const input = screen.getByLabelText("Step");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith(5.5);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(onChange).toHaveBeenCalledWith(4.5);
  });

  it("rejects non-numeric input characters", () => {
    const onChange = vi.fn();
    render(<PercentageInput value={5} onChange={onChange} label="Pct" />);
    const input = screen.getByLabelText("Pct") as HTMLInputElement;

    fireEvent.focus(input);
    // "abc" doesn't match the /^-?\d*\.?\d*$/ regex, so setRawValue is not called
    fireEvent.change(input, { target: { value: "abc" } });
    // The raw value doesn't update because the regex rejects it
    expect(input.value).toBe("5");
  });

  it("defaults to min when empty on blur", () => {
    const onChange = vi.fn();
    render(
      <PercentageInput value={5} onChange={onChange} label="Empty" min={1} />
    );
    const input = screen.getByLabelText("Empty");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("renders without a label using default aria-label", () => {
    render(<PercentageInput value={0} onChange={() => {}} />);
    expect(screen.getByLabelText("Percentage value")).toBeInTheDocument();
  });
});
