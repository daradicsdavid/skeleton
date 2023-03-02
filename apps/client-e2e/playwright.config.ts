import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  outputDir: "./test-results",
  globalSetup: require.resolve("./src/global-setup"),
  use: {
    baseURL: "http://localhost:4200",
    actionTimeout: 30000,
    navigationTimeout: 5000
  },
  projects: [
    {
      name: "Desktop Chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 }
      }
    }
  ]
});
