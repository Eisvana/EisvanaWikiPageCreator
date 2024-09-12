import 'bulma';
// import '../css/styles.css';
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import { eisvanaColours } from './scss/stylePreset';
import Tooltip from 'primevue/tooltip';

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
app.directive('tooltip', Tooltip);

app.mount('#app');
