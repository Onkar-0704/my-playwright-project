import { test, expect } from '@playwright/test';

test('google search for Rajgad and take screenshot', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=Rajgad&hl=en', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const blockedPage = page.locator('text=Our systems have detected unusual traffic');
  const captchaFrame = page.frameLocator('iframe').locator('text=I\'m not a robot');
  if ((await blockedPage.count()) > 0 || (await captchaFrame.count()) > 0) {
    await page.screenshot({ path: 'test-results/google-search-rajgad-blocked.png', fullPage: true });
    throw new Error(
      'Google blocked automated traffic. See test-results/google-search-rajgad-blocked.png for the blocked page screenshot.',
    );
  }

  const results = page.locator('[role="main"] h3, #search h3, div[id="rso"] h3');
  await expect(results.first()).toBeVisible({ timeout: 60000 });

  //await page.screenshot({ path: 'test-results/google-search-rajgad.png', fullPage: true });
});
