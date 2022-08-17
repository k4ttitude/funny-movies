import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import { getBaseUrl } from "./src/utils/baseUrl";

const baseURL = getBaseUrl();

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
