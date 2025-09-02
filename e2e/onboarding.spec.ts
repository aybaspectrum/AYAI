import { test, expect } from "@playwright/test";

test.describe("Onboarding Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    console.log("Initial page URL:", page.url());
  });

  test("should complete the onboarding flow", async ({ page }) => {
    // The user should be redirected to the onboarding page
    await expect(page).toHaveURL("/onboarding");
    console.log("Onboarding page URL:", page.url());

    // Find and click the "Grant Consent" button
    await page.getByRole("button", { name: "Grant Consent" }).click();

    // After consenting, the user should be redirected back to the root page
    await expect(page).toHaveURL("/");
    console.log("Final page URL:", page.url());

    // Verify that the user is no longer on the onboarding page
    await expect(
      page.getByRole("heading", { name: "Connect Your Professional Accounts" }),
    ).not.toBeVisible();
  });
});
