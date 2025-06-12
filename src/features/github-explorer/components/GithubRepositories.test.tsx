import { screen, fireEvent } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from "vitest";
import { GithubRepositories } from "../components/GithubRepositories";
import { useUserRepos } from "../hooks/useGithubQuery";
import type {
  UseInfiniteQueryResult,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import type { GithubUser } from "../types/githubUser.type";
import type { ReposResponse } from "../types/githubRepos.type";
import { renderWithProviders } from "src/test/utils/renderWithProviders";

vi.mock("../hooks/useGithubQuery", async (importOriginal) => {
  const mod = await importOriginal;
  return { ...mod, useUserRepos: vi.fn() };
});

const mockedUseUserRepos = useUserRepos as unknown as MockedFunction<
  () => UseInfiniteQueryResult<InfiniteData<ReposResponse, number>, Error>
>;

const mockUser: GithubUser = {
  id: 1,
  login: "test-user",
  avatar_url: "",
  html_url: "",
};

function mockReposQuery({
  data,
  error,
  hasNextPage = false,
  fetchNextPage = vi
    .fn()
    .mockResolvedValue(
      {} as InfiniteQueryObserverResult<
        InfiniteData<ReposResponse, number>,
        Error
      >
    ),
}: {
  data?: InfiniteData<ReposResponse, number>;
  error?: Error | null;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<ReposResponse, number>, Error>
  >;
}) {
  mockedUseUserRepos.mockReturnValue({
    data,
    error: error ?? null,
    refetch: vi.fn(),
    fetchNextPage,
    hasNextPage,
    status: error ? "error" : "success",
    isLoading: false,
    isFetchingNextPage: false,
    isError: !!error,
    isSuccess: !error,
    isPending: false,
    isFetched: true,
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: error ? Date.now() : 0,
    failureCount: error ? 1 : 0,
    failureReason: error ?? null,
    fetchStatus: "idle",
    isPlaceholderData: false,
    isStale: false,
    isLoadingError: !!error,
    isRefetchError: false,
    isFetchNextPageError: false,
    isFetchPreviousPageError: false,
    isFetchingPreviousPage: false,
    hasPreviousPage: false,
    fetchPreviousPage: vi.fn(),
    errorUpdateCount: 0,
    isFetchedAfterMount: false,
    isFetching: false,
    isInitialLoading: false,
    isPaused: false,
    isRefetching: false,
    promise: Promise.resolve(data ?? { pages: [[]], pageParams: [1] }),
  } as UseInfiniteQueryResult<InfiniteData<ReposResponse, number>, Error>);
}

describe("GithubRepositories", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render repositories list when data is available", () => {
    mockReposQuery({
      data: {
        pages: [
          [
            {
              id: 1,
              name: "test-repo",
              description: "Test repo description",
              stargazers_count: 42,
            },
          ],
        ],
        pageParams: [1],
      },
    });

    renderWithProviders(<GithubRepositories user={mockUser} isOpened={true} />);
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("Test repo description")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should show error box when error is present", () => {
    mockReposQuery({ error: new Error("Failed to fetch") });

    renderWithProviders(<GithubRepositories user={mockUser} isOpened={true} />);
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("should show 'No more repositories' when hasNextPage is false", () => {
    mockReposQuery({
      data: { pages: [[]], pageParams: [1] },
      hasNextPage: false,
    });

    renderWithProviders(<GithubRepositories user={mockUser} isOpened={true} />);
    expect(screen.getByText(/no more repositories/i)).toBeInTheDocument();
  });

  it("should call fetchNextPage when 'Load More Repositories' button clicked", () => {
    const fetchNextPageMock = vi.fn();
    mockReposQuery({
      data: { pages: [[]], pageParams: [1] },
      hasNextPage: true,
      fetchNextPage: fetchNextPageMock,
    });

    renderWithProviders(<GithubRepositories user={mockUser} isOpened={true} />);
    fireEvent.click(
      screen.getByRole("button", { name: /load more repositories/i })
    );
    expect(fetchNextPageMock).toHaveBeenCalled();
  });
});
