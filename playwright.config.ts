import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  testDir: './__checks__',
  use: {
      baseURL: process.env.BASE_URL,
  }
})
