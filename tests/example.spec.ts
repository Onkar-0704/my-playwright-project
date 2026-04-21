import { test, expect } from '@playwright/test';

test('basic local content loads and validates', async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <h1>Playwright Demo</h1>
        <p>This is a simple demo page.</p>
      </body>
    </html>
  `);

  await expect(page.locator('h1')).toHaveText('Playwright Demo');
  await expect(page.locator('p')).toContainText('simple demo page');
});
