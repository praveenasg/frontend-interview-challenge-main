import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import "./style.css";
import App from "./App.vue";

// routing set up -> npm i -D unplugin-vue-router
// docs -> https://github.com/posva/unplugin-vue-router?tab=readme-ov-file

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(createPinia()).use(router).mount("#app");
