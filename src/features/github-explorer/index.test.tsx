import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GithubExplorer } from "./index";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("GithubExplorer", () => {
  it("should render the component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <GithubExplorer />
        </ChakraProvider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("title-app")).toBeInTheDocument();
  });
});
