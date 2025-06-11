// hooks/useGithubQuery.ts
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import {
  fetchUsersByUsername,
  fetchReposByUsername,
} from "../services/githubApi";
import type { User } from "../types/user.type";

// Search GitHub users
export const useSearchGithubUsers = (username: string) =>
  useInfiniteQuery<
    User,
    Error,
    InfiniteData<User, number>,
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
  useInfiniteQuery({
    queryKey: ["repos", username],
    queryFn: ({ pageParam = 1 }) => fetchReposByUsername(username, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 5 ? allPages.length + 1 : undefined,
    enabled: false,
  });
