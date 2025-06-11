import axios, { AxiosError } from "axios";
import { GITHUB_API_BASE, LIMIT_PER_PAGE, RATE_LIMIT_MSG } from "src/constants";
import type { GithubErrorResponse } from "../types/githubError.type";

const handleError = (error: unknown) => {
  const githubError = error as AxiosError<GithubErrorResponse>;

  const message = githubError.response?.data.message || "Unknown error";

  if (githubError.response?.data.message.includes(RATE_LIMIT_MSG)) {
    return "Too many requests. Please try again later";
  }
  const errors: string[] = [];

  githubError.response?.data.errors?.map((error) => {
    if (error.field === "q" && error.code === "missing") {
      errors.push("Field username is missing");
    } else {
      errors.push(`Field ${error.field} is ${error.code}`);
    }
  });

  return `Error: ${message}${errors.length ? `. ${errors.join(".")}` : ""}`;
};

export const fetchUsersByUsername = async (
  username: string,
  page = 1,
  perPage = LIMIT_PER_PAGE
) => {
  try {
    const { data } = await axios.get(`${GITHUB_API_BASE}/search/users`, {
      params: {
        q: username,
        page,
        per_page: perPage,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError<GithubErrorResponse>(error)) {
      const githubError = error as AxiosError<GithubErrorResponse>;
      const message = handleError(githubError);

      throw new Error(message);
    }

    throw new Error("Unknown error");
  }
};

export const fetchReposByUsername = async (
  username: string,
  page = 1,
  perPage = LIMIT_PER_PAGE
) => {
  try {
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
  } catch (error) {
    if (axios.isAxiosError<GithubErrorResponse>(error)) {
      const githubError = error as AxiosError<GithubErrorResponse>;
      const message = handleError(githubError);

      throw new Error(message);
    }

    throw new Error("Unknown error");
  }
};
