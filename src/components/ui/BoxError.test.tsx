import { screen } from "@testing-library/react";
import { BoxError } from "./BoxError";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "src/test/utils/renderWithProviders";

function setup(message: string) {
  renderWithProviders(<BoxError message={message} />);
}

describe("BoxError", () => {
  it("renders the given error message", () => {
    setup("Something went wrong");
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("displays the error icon", () => {
    setup("Error occurred");
    const icon = screen.getByTestId("icon-error");
    expect(icon).toBeInTheDocument();
  });
});
