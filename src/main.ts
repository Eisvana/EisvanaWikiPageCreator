import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
});

app.mount('#app');
