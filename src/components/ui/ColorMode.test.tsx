import { render, screen, fireEvent } from "@testing-library/react";
import {
  ColorModeProvider,
  ColorModeIcon,
  ColorModeButton,
  LightMode,
  DarkMode,
} from "./ColorMode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { describe, it, expect, vi } from "vitest";
import { useColorMode } from "../../hooks/useColorMode";

// Mock useColorMode hook
vi.mock("../../hooks/useColorMode", () => {
  const state = { colorMode: "light", toggleColorMode: vi.fn() };
  return {
    useColorMode: () => state,
  };
});

describe("ColorModeProvider", () => {
  it("renders ThemeProvider without crashing", () => {
    render(<ColorModeProvider>Test Content</ColorModeProvider>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});

describe("ColorModeIcon", () => {
  it("renders LuSun when in light mode", () => {
    render(<ColorModeIcon />);
    expect(screen.getByTestId("lu-sun")).toBeInTheDocument();
  });
});

describe("ColorModeButton", () => {
  it("renders button and icon", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ColorModeButton />
      </ChakraProvider>
    );
    expect(screen.getByTestId("color-mode-btn")).toBeInTheDocument();
    expect(screen.getByTestId("lu-sun")).toBeInTheDocument();
  });

  it("calls toggleColorMode when clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ColorModeButton />
      </ChakraProvider>
    );

    const button = screen.getByTestId("color-mode-btn");
    fireEvent.click(button);
    expect(useColorMode().toggleColorMode).toHaveBeenCalled();
  });
});

describe("LightMode", () => {
  it("renders LightMode span", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <LightMode>Light Content</LightMode>
      </ChakraProvider>
    );
    const span = screen.getByText("Light Content");
    expect(span).toHaveClass("chakra-theme light");
  });
});

describe("DarkMode", () => {
  it("renders DarkMode span", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <DarkMode>Dark Content</DarkMode>
      </ChakraProvider>
    );
    const span = screen.getByText("Dark Content");
    expect(span).toHaveClass("chakra-theme dark");
  });
});
