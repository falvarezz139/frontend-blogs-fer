const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    // Navegar a la URL de la aplicación
    await page.goto('http://127.0.0.1:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Verificar que el formulario de inicio de sesión esté visible
    const loginForm = await page.locator('form#login-form'); // Usa el selector adecuado para tu formulario
    await expect(loginForm).toBeVisible();

    // Verificar si el campo de usuario está presente
    const usernameField = await page.locator('input[name="username"]'); // Usa el selector adecuado para el campo de usuario
    await expect(usernameField).toBeVisible();
  })
})
