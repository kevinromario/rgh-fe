import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "./SearchInput";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const setup = (value = "") => {
  const onChange = vi.fn();
  const onClear = vi.fn();

  render(
    <ChakraProvider value={defaultSystem}>
      <SearchInput value={value} onChange={onChange} onClear={onClear} />
    </ChakraProvider>
  );

  return { onChange, onClear };
};

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input with placeholder", () => {
    setup();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const { onChange } = setup();
    const input = screen.getByTestId("input-search");

    fireEvent.change(input, { target: { value: "abc" } });

    expect(onChange).toHaveBeenCalledWith("abc");
  });

  it("does not show CloseButton if input is empty", () => {
    setup("");

    const closeBtn = screen.queryByTestId("close-btn");
    expect(closeBtn).not.toBeInTheDocument();
  });

  it("shows CloseButton and calls onClear when clicked", () => {
    const { onClear } = setup("some text");

    const closeBtn = screen.getByTestId("close-btn");
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    expect(onClear).toHaveBeenCalled();
  });
});
