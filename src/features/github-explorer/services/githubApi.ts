// services/githubApi.ts
import axios from "axios";
import { GITHUB_API_BASE, LIMIT_PER_PAGE } from "src/constants";

export const fetchUsersByUsername = async (
  username: string,
  page = 1,
  perPage = LIMIT_PER_PAGE
) => {
  const { data } = await axios.get(`${GITHUB_API_BASE}/search/users`, {
    params: {
      q: username,
      page,
      per_page: perPage,
    },
  });
  return data;
};

export const fetchReposByUsername = async (
  username: string,
  page = 1,
  perPage = LIMIT_PER_PAGE
) => {
  const { data } = await axios.get(
    `${GITHUB_API_BASE}/users/${username}/repos`,
    {
      params: {
        page,
        per_page: perPage,
        sort: "updated",
      },
    }
  );
  return data;
};
