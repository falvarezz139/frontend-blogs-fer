const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    // Vaciar la base de datos y crear un usuario de prueba aquí si es necesario

    // Navegar a la URL de la aplicación
    await page.goto('http://127.0.0.1:5173')

    // Iniciar sesión con un usuario válido
    const usernameField = await page.locator('input[name="username"]');
    const passwordField = await page.locator('input[name="password"]');
    const loginButton = await page.locator('button[type="submit"]');

    // Introducir las credenciales correctas
    await usernameField.fill('fernando'); // Usa un nombre de usuario válido
    await passwordField.fill('fernando123'); // Usa una contraseña válida
    await loginButton.click();

    // Esperar a que la página de blogs cargue después de iniciar sesión
    await expect(page).toHaveURL('http://127.0.0.1:5173/blogs'); // Ajusta la URL si es necesario
  })

  describe('When logged in', () => {
    test('a new blog can be created', async ({ page }) => {
      // Localizar el formulario para crear un nuevo blog
      const newBlogButton = await page.locator('button#create-new-blog'); // Ajusta el selector si es necesario
      await newBlogButton.click();

      // Completar el formulario de creación de blog
      const titleField = await page.locator('input[name="title"]');
      const contentField = await page.locator('textarea[name="content"]');
      const submitButton = await page.locator('button[type="submit"]');

      // Rellenar el formulario con el título y contenido del nuevo blog
      await titleField.fill('Nuevo Blog de Prueba');
      await contentField.fill('Este es el contenido de mi nuevo blog.');
      await submitButton.click();

      // Esperar que el nuevo blog aparezca en la lista
      const blogList = await page.locator('.blog-list'); // Ajusta el selector de la lista de blogs
      const newBlog = await blogList.locator('text=Nuevo Blog de Prueba'); // Asegúrate de que este texto coincida con el del blog creado
      await expect(newBlog).toBeVisible();
    })
  })
})
