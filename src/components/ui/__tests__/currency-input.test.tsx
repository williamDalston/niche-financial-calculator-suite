import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CurrencyInput } from "../currency-input";

describe("CurrencyInput", () => {
  it("renders with a label", () => {
    render(<CurrencyInput value={1000} onChange={() => {}} label="Amount" />);
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });

  it("displays formatted value with commas", () => {
    render(<CurrencyInput value={50000} onChange={() => {}} label="Salary" />);
    const input = screen.getByLabelText("Salary") as HTMLInputElement;
    expect(input.value).toBe("50,000");
  });

  it("displays the $ prefix", () => {
    const { container } = render(<CurrencyInput value={100} onChange={() => {}} />);
    const prefix = container.querySelector("[aria-hidden='true']");
    expect(prefix).toHaveTextContent("$");
  });

  it("shows raw value on focus and reformats on blur", () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={1500} onChange={onChange} label="Price" />);
    const input = screen.getByLabelText("Price") as HTMLInputElement;

    fireEvent.focus(input);
    expect(input.value).toBe("1500");

    fireEvent.change(input, { target: { value: "2000" } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(2000);
  });

  it("clamps value to min/max on blur", () => {
    const onChange = vi.fn();
    render(
      <CurrencyInput value={50} onChange={onChange} label="Val" min={0} max={100} />
    );
    const input = screen.getByLabelText("Val") as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "200" } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("handles arrow key stepping", () => {
    const onChange = vi.fn();
    render(
      <CurrencyInput value={1000} onChange={onChange} label="Step" step={500} />
    );
    const input = screen.getByLabelText("Step");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith(1500);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(onChange).toHaveBeenCalledWith(500);
  });

  it("parses non-numeric input as 0", () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={0} onChange={onChange} label="Parse" />);
    const input = screen.getByLabelText("Parse");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("renders without a label using default aria-label", () => {
    render(<CurrencyInput value={0} onChange={() => {}} />);
    expect(screen.getByLabelText("Currency amount")).toBeInTheDocument();
  });
});
