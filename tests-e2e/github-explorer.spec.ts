import { test, expect } from "@playwright/test";

test.describe("Github Explorer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("has title", async ({ page }) => {
    const title = page.getByTestId("title-app");

    await expect(title).toBeVisible();
  });

  test("has color mode switch", async ({ page }) => {
    const switchBtn = page.getByTestId("color-mode-btn");
    await expect(switchBtn).toBeVisible();
  });
});

test("displays username input and allows searching by username and allows to reset", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  const input = page.getByTestId("input-search");
  await expect(input).toBeVisible();

  await input.fill("panduz33");

  const searchButton = page.getByTestId("search-btn");
  await expect(searchButton).toBeVisible();
  await searchButton.click();

  await expect(searchButton).toHaveAttribute("data-loading");

  await expect(searchButton).not.toHaveAttribute("data-loading");

  const users = await page.locator("[data-testid='accordion-item']").count();

  if (users < 1) {
    await expect(page.getByTestId("text-no-user")).toBeVisible();
  } else {
    const user = page.getByTestId("user-1");
    expect(user).toBeVisible();

    await user.click();

    await expect(page.getByTestId("skeleton-loading")).toBeVisible();

    await expect(page.getByTestId("skeleton-loading")).not.toBeVisible();

    const repos = await page.locator("[data-testid='repo-box']").count();

    if (repos < 1) {
      expect(page.getByTestId("text-no-repo"));
    } else {
      const repoTitle = page.getByTestId("user-1-repo-1-title");
      const repoStars = page.getByTestId("user-1-repo-1-stars");

      expect(repoTitle).toBeVisible();
      expect(repoStars).toBeVisible();

      const clearBtn = page.getByTestId("reset-btn");
      await clearBtn.click();

      await expect(user).not.toBeVisible();
      await expect(repoTitle).not.toBeVisible();
      await expect(repoStars).not.toBeVisible();
    }
  }
});
