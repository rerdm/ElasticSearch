import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:9200',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
