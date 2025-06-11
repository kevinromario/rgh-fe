import { renderHook, act } from "@testing-library/react";
import { useColorMode, useColorModeValue } from "./useColorMode";
import { useTheme } from "next-themes";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("useColorMode", () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return light mode when resolvedTheme is light", () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
      forcedTheme: undefined,
      theme: "dark",
      themes: ["light", "dark"],
      systemTheme: "light",
    });

    const { result } = renderHook(() => useColorMode());
    expect(result.current.colorMode).toBe("light");
  });

  it("should return dark mode when forcedTheme is dark", () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
      forcedTheme: "dark",
      theme: "dark",
      themes: ["light", "dark"],
      systemTheme: "light",
    });

    const { result } = renderHook(() => useColorMode());
    expect(result.current.colorMode).toBe("dark");
  });

  it("should toggle color mode", () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
      forcedTheme: undefined,
      theme: "dark",
      themes: ["light", "dark"],
      systemTheme: "light",
    });

    const { result } = renderHook(() => useColorMode());
    act(() => {
      result.current.toggleColorMode();
    });

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("should set color mode directly", () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
      forcedTheme: undefined,
      theme: "dark",
      themes: ["light", "dark"],
      systemTheme: "light",
    });

    const { result } = renderHook(() => useColorMode());
    act(() => {
      result.current.setColorMode("dark");
    });

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});

describe("useColorModeValue", () => {
  it("should return light value when mode is light", () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: "light",
      setTheme: vi.fn(),
      forcedTheme: undefined,
      theme: "dark",
      themes: ["light", "dark"],
      systemTheme: "light",
    });

    const { result } = renderHook(() =>
      useColorModeValue("light-value", "dark-value")
    );
    expect(result.current).toBe("light-value");
  });

  it("should return dark value when mode is dark", () => {
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: "dark",
      setTheme: vi.fn(),
      forcedTheme: undefined,
      theme: "dark",
      themes: ["light", "dark"],
      systemTheme: "light",
    });

    const { result } = renderHook(() =>
      useColorModeValue("light-value", "dark-value")
    );
    expect(result.current).toBe("dark-value");
  });
});
