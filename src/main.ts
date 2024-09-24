import 'bulma';
import '@/css/styles.css';
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import { eisvanaColours } from './css/stylePreset';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: eisvanaColours,
    options: {
      darkModeSelector: '.theme-dark',
    },
  },
});
app.use(Toast, {
  position: 'bottom-center',
});

app.mount('#app');
