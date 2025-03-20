module.exports = {
  testDir: "./tests/example.spec.js",
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    headless: true,
  },
};
