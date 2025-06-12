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

  test("displays username input and allows searching by username", async ({
    page,
  }) => {
    const input = page.getByTestId("input-search");
    await expect(input).toBeVisible();

    await input.fill("panduz33");

    const searchButton = page.getByTestId("search-btn");
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    await expect(searchButton).toHaveAttribute("data-loading");

    await expect(searchButton).not.toHaveAttribute("data-loading");
  });
});
