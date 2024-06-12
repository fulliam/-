import { createApp } from './main';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.state.value = JSON.parse(JSON.stringify(window.__INITIAL_STATE__));
}

router.isReady().then(() => {
  app.mount('#app');

  const loader = document.querySelector('#app-loader') as HTMLElement;
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 200);
    }, 500);
  }
});