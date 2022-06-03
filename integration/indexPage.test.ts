import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3333/#/");
  const title = page.locator("[data-id='title-index']");
  await expect(title).toHaveText("Welcome to Parking App!");
});

test("Register entry vehicle", async ({ page }) => {
  await page.goto("http://localhost:3333/#/");
  await page.locator('text=C5crop_free >> i[role="img"]').click();
  await page.locator('[aria-label="License\\ Plate\\:\\ \\*"]').click();
  await page.locator('[aria-label="License\\ Plate\\:\\ \\*"]').fill("HVN876");
  await page
    .locator(
      '#app div:has-text("Parking Lot🇬🇧🇪🇸🇧🇷menuhomeHomeloginRegister Vehicle EntrylogoutRegister Veh")'
    )
    .nth(2)
    .click();
  await page
    .locator(
      '#app div:has-text("Parking Lot🇬🇧🇪🇸🇧🇷menuhomeHomeloginRegister Vehicle EntrylogoutRegister Veh")'
    )
    .nth(2)
    .click();
  await page.locator('button:has-text("Register")').click();
  await page.locator("text=Parking space assigned successfully").click();
});
