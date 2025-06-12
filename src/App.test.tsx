import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

vi.mock("./features/github-explorer", () => ({
  GithubExplorer: () => <div>Mocked GithubExplorer</div>,
}));

describe("App", () => {
  it("renders GithubExplorer component", () => {
    render(<App />);
    expect(screen.getByText("Mocked GithubExplorer")).toBeInTheDocument();
  });
});
