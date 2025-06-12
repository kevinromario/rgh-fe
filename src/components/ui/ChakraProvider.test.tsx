import { render } from "@testing-library/react";
import { ChakraProvider } from "./ChakraProvider";
import { describe, it, expect } from "vitest";

describe("ChakraProvider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ChakraProvider>
        <div>Test content</div>
      </ChakraProvider>
    );

    expect(getByText("Test content")).toBeInTheDocument();
  });
});
