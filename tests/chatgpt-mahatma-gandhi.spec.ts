import { test, expect } from '@playwright/test';

test('chatgpt: search information on Mahatma Gandhi', async ({ page }) => {
  await page.goto('https://chat.openai.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const loginPrompt = page.locator('text=Log in, text=Sign in, text=Continue with Google, text=Continue with Microsoft');
  if (await loginPrompt.count() > 0) {
    await page.screenshot({ path: 'test-results/chatgpt-mahatma-gandhi-signin-required.png', fullPage: true });
    throw new Error('ChatGPT login required. See test-results/chatgpt-mahatma-gandhi-signin-required.png');
  }

  const promptTextarea = page.locator('textarea').first();
  await expect(promptTextarea).toBeVisible({ timeout: 60000 });

  await promptTextarea.click();
  await promptTextarea.fill('Please provide a concise summary of Mahatma Gandhi.');
  await promptTextarea.press('Enter');

  const responseText = page.locator('text=Mahatma Gandhi').first();
  await expect(responseText).toBeVisible({ timeout: 120000 });

  await page.screenshot({ path: 'test-results/chatgpt-mahatma-gandhi.png', fullPage: true });
});
