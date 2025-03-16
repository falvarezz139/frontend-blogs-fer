const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {

    await page.goto('http://127.0.0.1:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const loginForm = await page.locator('form#login-form');
    await expect(loginForm).toBeVisible();

    const usernameField = await page.locator('input[name="username"]');
    await expect(usernameField).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      const usernameField = await page.locator('input[name="username"]');
      const passwordField = await page.locator('input[name="password"]');
      const loginButton = await page.locator('button[type="submit"]');


      await usernameField.fill('fernando');
      await passwordField.fill('correct-password');
      await loginButton.click();

      await expect(page).toHaveURL('http://127.0.0.1:5173/dashboard'); 
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameField = await page.locator('input[name="username"]');
      const passwordField = await page.locator('input[name="password"]');
      const loginButton = await page.locator('button[type="submit"]');

      await usernameField.fill('fernando');
      await passwordField.fill('wrong-password');
      await loginButton.click();

      const errorMessage = await page.locator('div#error-message');
      await expect(errorMessage).toBeVisible();
    })
  })
})
