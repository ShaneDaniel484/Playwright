// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
   reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    //screenshot: 'on',
    //trace: 'retain-on-failure', //only for failed test cases
  },
});
