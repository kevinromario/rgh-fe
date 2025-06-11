import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import {
  fetchUsersByUsername,
  fetchReposByUsername,
} from "../services/githubApi";
import type { UserResponse } from "../types/githubUser.type";
import type { ReposResponse } from "../types/githubRepos.type";
import { LIMIT_PER_PAGE } from "src/constants";

export const useSearchGithubUsers = (username: string) =>
  useInfiniteQuery<
    UserResponse,
    Error,
    InfiniteData<UserResponse, number>,
    ["search-users", string],
    number
  >({
    queryKey: ["search-users", username],
    queryFn: ({ pageParam = 1 }) => fetchUsersByUsername(username, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.total_count;
      const nextPage = allPages.length + 1;
      const fetchedCount = allPages.flatMap((p) => p.items).length;
      return fetchedCount < totalCount ? nextPage : undefined;
    },
    enabled: false,
  });

export const useUserRepos = (username: string) =>
  useInfiniteQuery<
    ReposResponse,
    Error,
    InfiniteData<ReposResponse, number>,
    ["repos", string],
    number
  >({
    queryKey: ["repos", username],
    queryFn: ({ pageParam = 1 }) => fetchReposByUsername(username, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT_PER_PAGE ? allPages.length + 1 : undefined,
    enabled: false,
  });
