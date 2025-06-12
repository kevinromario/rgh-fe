import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GithubUsers } from "./GithubUsers";
import type { UserResponse } from "../types/githubUser.type";
import type { InfiniteData } from "@tanstack/react-query";
import { renderWithProviders } from "src/test/renderWithProviders";

const users: InfiniteData<UserResponse, number> = {
  pages: [
    {
      incomplete_results: false,
      total_count: 2,
      items: [
        {
          id: 1,
          login: "userone",
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          url: "https://api.github.com/users/userone",
        },
        {
          id: 2,
          login: "usertwo",
          avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
          url: "https://api.github.com/users/usertwo",
        },
      ],
    },
  ],
  pageParams: [1],
};

const defaultProps = {
  data: users,
  isLoading: false,
  openedUsers: [],
  setOpenedUsers: vi.fn(),
};

describe("GithubUsers", () => {
  it("should render user accordions correctly", () => {
    renderWithProviders(
      <GithubUsers
        {...defaultProps}
        fetchNextPage={vi.fn()}
        isFetchingNextPage={false}
        hasNextPage={false}
      />
    );

    expect(screen.getByText("userone")).toBeInTheDocument();
    expect(screen.getByText("usertwo")).toBeInTheDocument();
  });

  it("should call fetchNextPage when 'Load More Users' button is clicked", () => {
    const fetchNextPage = vi.fn();

    renderWithProviders(
      <GithubUsers
        {...defaultProps}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={false}
        hasNextPage={true}
      />
    );

    const button = screen.getByTestId("load-more-user");
    fireEvent.click(button);
    expect(fetchNextPage).toHaveBeenCalled();
  });

  it("should render loading state on 'Load More Users' button", () => {
    const fetchNextPage = vi.fn();

    renderWithProviders(
      <GithubUsers
        {...defaultProps}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={true}
        hasNextPage={true}
      />
    );

    const button = screen.getByTestId("load-more-user");
    fireEvent.click(button);
    expect(button).toHaveAttribute("data-loading");
  });
});
