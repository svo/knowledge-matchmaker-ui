import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage with Knowledge Matchmaker heading", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/qual\.is/i);

    const heading = page.getByRole("heading", {
      name: "Knowledge Matchmaker",
    });
    await expect(heading).toBeVisible();
  });

  test("should display navigation links", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /toggle menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    const aboutLinks = page.getByRole("link", { name: /about/i });
    const blogLinks = page.getByRole("link", { name: /blog/i });

    const aboutCount = await aboutLinks.count();
    const blogCount = await blogLinks.count();

    expect(aboutCount).toBeGreaterThan(0);
    expect(blogCount).toBeGreaterThan(0);
  });

  test("should have working navigation to About page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /about/i }).first().click();

    await expect(page).toHaveURL("/about");

    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("should have working navigation to Blog page", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /toggle menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
    }

    await page
      .getByRole("navigation")
      .getByRole("link", { name: /blog/i })
      .click();

    await expect(page).toHaveURL("/blog");
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
