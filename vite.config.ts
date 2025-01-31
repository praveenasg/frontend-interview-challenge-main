import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import VueRouter from "unplugin-vue-router/vite";

// https://vitejs.dev/config/
export default defineConfig({
  // VueRouter() should be before vue(), part of the routing set up
  //  docs -> https://github.com/posva/unplugin-vue-router?tab=readme-ov-file
  plugins: [VueRouter(), vue(), tailwindcss()],
});
