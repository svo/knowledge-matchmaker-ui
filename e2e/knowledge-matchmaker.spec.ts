import { test, expect } from "@playwright/test";

async function fillDraftAndSubmit(
  page: import("@playwright/test").Page,
  text: string
) {
  const textbox = page.getByRole("textbox");
  await textbox.click();
  await textbox.pressSequentially(text, { delay: 20 });
  await page.getByRole("button", { name: "Find connections" }).click();
}

test.describe("Knowledge Matchmaker", () => {
  test("should submit a draft and display relationship map grouped by type", async ({
    page,
  }) => {
    await page.route(/\/map$/, async (route) => {
      await route.fulfill({
        json: {
          relationships: [
            {
              title: "The Extended Mind",
              source_url: "https://example.com/extended-mind",
              relationship_type: "RESONANCE",
              reason: "Supports your claim about distributed cognition.",
            },
            {
              title: "Being and Time",
              source_url: "https://example.com/being-and-time",
              relationship_type: "CONFLICT",
              reason: "Challenges your framing of tool use.",
            },
            {
              title: "Situated Learning",
              source_url: "https://example.com/situated-learning",
              relationship_type: "BLIND_SPOT",
              reason: "Your thinking hasn't touched this dimension.",
            },
            {
              title: "Novel Territory",
              source_url: "https://example.com/novel",
              relationship_type: "OPEN_SPACE",
              reason: "Your ideas venture into unexplored territory.",
            },
          ],
        },
      });
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await fillDraftAndSubmit(page, "Distributed cognition");

    await expect(
      page.getByRole("heading", { name: "Resonance" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Conflict" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Blind Spots" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Open Space" })
    ).toBeVisible();

    await expect(page.getByText("The Extended Mind")).toBeVisible();
    await expect(page.getByText("Being and Time")).toBeVisible();
    await expect(page.getByText("Situated Learning")).toBeVisible();
    await expect(page.getByText("Novel Territory")).toBeVisible();

    await expect(
      page.getByText("Supports your claim about distributed cognition.")
    ).toBeVisible();

    const extendedMindLink = page.getByRole("link", {
      name: "The Extended Mind",
    });
    await expect(extendedMindLink).toHaveAttribute(
      "href",
      "https://example.com/extended-mind"
    );
  });

  test("should show loading state while waiting for response", async ({
    page,
  }) => {
    let resolveRoute!: () => void;
    const routeBlocked = new Promise<void>((resolve) => {
      resolveRoute = resolve;
    });

    await page.route(/\/map$/, async (route) => {
      await routeBlocked;
      await route.fulfill({ json: { relationships: [] } });
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await fillDraftAndSubmit(page, "Some draft");

    await expect(
      page.getByRole("button", { name: "Analysing..." })
    ).toBeVisible();

    resolveRoute();

    await expect(
      page.getByRole("button", { name: "Find connections" })
    ).toBeVisible();
  });

  test("should display empty state when no relationships returned", async ({
    page,
  }) => {
    await page.route(/\/map$/, async (route) => {
      await route.fulfill({ json: { relationships: [] } });
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await fillDraftAndSubmit(page, "Some draft");

    await expect(
      page.getByText(
        "No relevant works found. Add documents to the corpus first."
      )
    ).toBeVisible();
  });
});
