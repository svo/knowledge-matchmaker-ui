import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage with Knowledge Matchmaker heading", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Knowledge Matchmaker/i);

    const heading = page.getByRole("heading", {
      name: "Knowledge Matchmaker",
    });
    await expect(heading).toBeVisible();
  });

  test("should display draft input form", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("textbox")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Find connections" })
    ).toBeVisible();
  });

  test("should have proper meta tags for SEO", async ({ page }) => {
    await page.goto("/");

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /.+/);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);
  });
});
