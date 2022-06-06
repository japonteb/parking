import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3333/#/');
  const title = page.locator("[data-id='title-index']");
  await expect(title).toHaveText('Welcome to Parking App!');
});

test('Register entry vehicle', async ({ page }) => {
  await page.goto('http://localhost:3333/#/');
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3333/#/entry' }*/),
    page.locator('text=C5crop_free >> a').click(),
  ]);
  await page.locator("[data-id='input-license-plate']").click();
  await page.locator("[data-id='input-license-plate']").fill('HVN876');
  await page.locator("[data-id='btn-register']").click();
  expect(
    page.locator('text=Parking space assigned successfully').isVisible()
  ).toBe(true);
});

test.skip('Register exit vehicle', async ({ page }) => {
  await page.goto('http://localhost:3333/#/');
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3333/#/exit' }*/),
    page.locator('text=C5directions_car_filled >> a').click(),
  ]);
  await page.locator("[data-id='btn-search']").click();
  await page.locator("[data-id='btn-charge']").click();
  const messageSuccess = page.locator('text=Successfull payment');
  expect(messageSuccess.isVisible()).toBe(true);
});
