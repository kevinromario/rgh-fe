import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUsersByUsername, fetchReposByUsername } from "./githubApi";
import { LIMIT_PER_PAGE } from "src/constants";

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
