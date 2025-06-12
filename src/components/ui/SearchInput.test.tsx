import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "./SearchInput";
import { renderWithProviders } from "src/test/utils/renderWithProviders";

const setup = (value = "") => {
  const onChange = vi.fn();
  const onClear = vi.fn();

  renderWithProviders(
    <SearchInput value={value} onChange={onChange} onClear={onClear} />
  );

  const input = screen.getByTestId("input-search");
  const closeBtn = screen.queryByTestId("reset-btn");

  return { onChange, onClear, input, closeBtn };
};

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input with placeholder", () => {
    expect(setup().input).toHaveAttribute("placeholder", "Enter username");
  });

  it("calls onChange when typing", () => {
    const { input, onChange } = setup();
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledWith("abc");
  });

  it("does not show CloseButton if input is empty", () => {
    const { closeBtn } = setup("");
    expect(closeBtn).not.toBeInTheDocument();
  });

  it("shows CloseButton and calls onClear when clicked", () => {
    const { closeBtn, onClear } = setup("some text");
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn!);
    expect(onClear).toHaveBeenCalled();
  });
});
