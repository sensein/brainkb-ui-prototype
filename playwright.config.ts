import { defineConfig, devices } from "@playwright/test";

const uploadToArgos = !!process.env.ARGOS_TOKEN;

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: uploadToArgos
    ? [["list"], ["@argos-ci/playwright/reporter"]]
    : [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  },
  webServer: {
    command: "npx serve out -l 3000 --single --no-clipboard",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
