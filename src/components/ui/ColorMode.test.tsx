import { render, screen, fireEvent } from "@testing-library/react";
import {
  ColorModeProvider,
  ColorModeIcon,
  ColorModeButton,
  LightMode,
  DarkMode,
} from "./ColorMode";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useColorMode } from "../../hooks/useColorMode";
import { renderWithProviders } from "src/test/utils/renderWithProviders";

vi.mock("../../hooks/useColorMode", () => {
  const state = { colorMode: "light", toggleColorMode: vi.fn() };
  return {
    useColorMode: () => state,
  };
});

describe("ColorMode components", () => {
  describe("<ColorModeProvider />", () => {
    it("renders children", () => {
      render(<ColorModeProvider>Test Content</ColorModeProvider>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("<ColorModeIcon />", () => {
    it("renders LuSun when in light mode", () => {
      render(<ColorModeIcon />);
      expect(screen.getByTestId("lu-sun")).toBeInTheDocument();
    });
  });

  describe("<ColorModeButton />", () => {
    beforeEach(() => {
      renderWithProviders(<ColorModeButton />);
    });

    it("renders button and icon", () => {
      expect(screen.getByTestId("color-mode-btn")).toBeInTheDocument();
      expect(screen.getByTestId("lu-sun")).toBeInTheDocument();
    });

    it("calls toggleColorMode when clicked", () => {
      fireEvent.click(screen.getByTestId("color-mode-btn"));
      expect(useColorMode().toggleColorMode).toHaveBeenCalled();
    });
  });

  describe("<LightMode />", () => {
    it("applies light class", () => {
      renderWithProviders(<LightMode>Light Content</LightMode>);
      expect(screen.getByText("Light Content")).toHaveClass(
        "chakra-theme light"
      );
    });
  });

  describe("<DarkMode />", () => {
    it("applies dark class", () => {
      renderWithProviders(<DarkMode>Dark Content</DarkMode>);
      expect(screen.getByText("Dark Content")).toHaveClass("chakra-theme dark");
    });
  });
});
