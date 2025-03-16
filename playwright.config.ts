import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directorio donde estarán tus tests
  use: {
    browserName: 'chromium', // Puedes cambiar a 'firefox' o 'webkit' si prefieres otro navegador
    headless: true, // Ejecutará los tests sin abrir el navegador
  },
});
