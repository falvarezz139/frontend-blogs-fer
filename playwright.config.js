module.exports = {
  testDir: './tests/example.spec.js', // Directorio donde están tus pruebas
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true, // Si quieres ejecutar las pruebas sin abrir el navegador
  },
};
