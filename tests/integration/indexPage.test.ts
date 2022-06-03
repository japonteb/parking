import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3333/#/");
  const title = page.locator("[data-id='title-index']");
  await expect(title).toHaveText("Welcome to Parking App!");
});
