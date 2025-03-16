const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');
  });

  test('User can delete their own blog', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    const deleteButton = await page.locator('button.delete');
    await deleteButton.click();
    const blog = await page.locator('.blog');
    await expect(blog).not.toBeVisible();
  });
});
