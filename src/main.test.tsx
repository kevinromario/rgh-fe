import { beforeEach, describe, expect, it, vi } from "vitest";

const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock("react-dom/client", async () => {
  const actual = await vi.importActual<typeof import("react-dom/client")>(
    "react-dom/client"
  );
  return {
    ...actual,
    createRoot: mockCreateRoot,
  };
});

beforeEach(() => {
  document.body.innerHTML = "";
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  mockRender.mockClear();
  mockCreateRoot.mockClear();
});

describe("main.tsx", () => {
  it("should call createRoot and render the app", async () => {
    await import("./main");

    expect(mockCreateRoot).toHaveBeenCalledTimes(1);

    const rootElement = document.getElementById("root");
    expect(rootElement).not.toBeNull();

    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});
