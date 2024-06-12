import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import App from './app.vue';
import { createHead } from '@vueuse/head';
import createRouter from '@/router';

export function createApp() {
  const app = createSSRApp(App);
  const head = createHead();
  const store = createPinia();
  const router = createRouter();
  app.use(store).use(router).use(head);

  return { app, head, router, store };
}
