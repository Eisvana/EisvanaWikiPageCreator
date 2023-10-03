import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '../modules/gallery/App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#galleryInput');