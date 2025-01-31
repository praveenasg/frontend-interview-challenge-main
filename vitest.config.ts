/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom", // Simulates browser environment
    globals: true, // Allows global test functions like describe & it
  },
});
