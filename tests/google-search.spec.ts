import { test, expect } from '@playwright/test';

test('google search for Virat Kohli and take screenshot', async ({ page }) => {
  await page.goto('https://www.google.com/');

  const consentButton = page.locator('button:has-text("I agree"), button:has-text("Accept all"), button:has-text("Accept")');
  if (await consentButton.count() > 0) {
    await consentButton.first().click();
  }

  const searchInput = page.locator('input[name="q"], textarea[name="q"]');
  await expect(searchInput).toBeVisible({ timeout: 15000 });

  await searchInput.fill('Virat Kohli');
  await searchInput.press('Enter');

  const results = page.locator('#search');
  await expect(results).toBeVisible({ timeout: 15000 });
  await expect(results.locator('text=Virat Kohli')).toBeVisible({ timeout: 15000 });

  await page.screenshot({ path: 'test-results/google-search-virat-kohli.png', fullPage: true });
});
