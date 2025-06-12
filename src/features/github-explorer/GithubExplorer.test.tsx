import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GithubExplorer from "./GithubExplorer";
import * as githubApi from "./services/githubApi";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

vi.mock("./components/GithubUsers", () => ({
  GithubUsers: () => <div>Mocked GithubUsers</div>,
}));

vi.mock("./services/githubApi", async () => ({
  fetchUsersByUsername: vi.fn(),
  fetchReposByUsername: vi.fn(),
}));

const renderWithProvider = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <GithubExplorer />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

describe("GithubExplorer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders initial UI correctly", () => {
    renderWithProvider();
    expect(screen.getByTestId("title-app")).toBeInTheDocument();
    expect(screen.getByTestId("search-btn")).toBeInTheDocument();
  });

  it("triggers search on form submit", async () => {
    const mockFetch = githubApi.fetchUsersByUsername as unknown as ReturnType<
      typeof vi.fn
    >;
    mockFetch.mockResolvedValueOnce({
      total_count: 1,
      incomplete_results: false,
      items: [{ id: 1, login: "kevin" }],
    });

    renderWithProvider();

    const input = screen.getByTestId("input-search");
    fireEvent.change(input, { target: { value: "kevin" } });

    expect(input).toHaveValue("kevin");

    const button = screen.getByTestId("search-btn");
    fireEvent.click(button);

    expect(mockFetch).not.toHaveBeenCalledWith("kevin");
  });

  it("reset form", () => {
    renderWithProvider();

    const input = screen.getByTestId("input-search");
    fireEvent.change(input, { target: { value: "kevin" } });
    expect(input).toHaveValue("kevin");

    const resetBtn = screen.getByTestId("reset-btn");
    fireEvent.click(resetBtn);
    expect(input).toHaveValue("");
  });
});
