import axios, { AxiosError } from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUsersByUsername, fetchReposByUsername } from "./githubApi";
import { LIMIT_PER_PAGE, RATE_LIMIT_MSG } from "src/constants";

import { handleError } from "./githubApi";

const createMockError = (
  message: string,
  errors?: { field: string; code: string }[]
) => {
  return {
    response: {
      data: {
        message,
        errors,
      },
    },
  } as unknown as AxiosError;
};

vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("GitHub API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchUsersByUsername", () => {
    it("should return data when API call is successful", async () => {
      const mockData = { items: [{ login: "kevin" }] };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchUsersByUsername("kevin");

      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.github.com/search/users",
        {
          params: {
            q: "kevin",
            page: 1,
            per_page: LIMIT_PER_PAGE,
          },
        }
      );
    });

    it("should throw unknown error if not axios error", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Some random error"));

      await expect(fetchUsersByUsername("kevin")).rejects.toThrow(
        "Unknown error"
      );
    });
  });

  describe("fetchReposByUsername", () => {
    it("should return data when API call is successful", async () => {
      const mockData = [{ name: "repo1" }, { name: "repo2" }];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchReposByUsername("kevin");

      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.github.com/users/kevin/repos",
        {
          params: {
            page: 1,
            per_page: LIMIT_PER_PAGE,
            sort: "updated",
          },
        }
      );
    });
  });
});

describe("handleError", () => {
  it("should handle rate limit error", () => {
    const error = createMockError(`API rate limit exceeded ${RATE_LIMIT_MSG}`);
    const result = handleError(error);
    expect(result).toBe("Too many requests. Please try again later");
  });

  it("should handle missing 'q' field error", () => {
    const error = createMockError("Validation Failed", [
      { field: "q", code: "missing" },
    ]);
    const result = handleError(error);
    expect(result).toBe("Error: Validation Failed. Field username is missing");
  });

  it("should handle other field validation errors", () => {
    const error = createMockError("Validation Failed", [
      { field: "q", code: "invalid" },
      { field: "type", code: "missing" },
    ]);
    const result = handleError(error);
    expect(result).toBe(
      "Error: Validation Failed. Field q is invalid. Field type is missing"
    );
  });

  it("should return only message if no errors array", () => {
    const error = createMockError("Something went wrong", undefined);
    const result = handleError(error);
    expect(result).toBe("Error: Something went wrong");
  });

  it("should return 'Unknown error' if no response", () => {
    const error = {} as unknown as AxiosError;
    const result = handleError(error);
    expect(result).toBe("Error: Unknown error");
  });
});

describe("fetchUsersByUsername", () => {
  it("should throw 'Unknown error' for non-Axios error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network down"));

    await expect(fetchUsersByUsername("john")).rejects.toThrow("Unknown error");
  });
});
