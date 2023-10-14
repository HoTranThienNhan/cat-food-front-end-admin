import { createApp, watch } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from './router';
import { createPinia } from 'pinia';

// create pinia
const pinia = createPinia();

// use watch to detect if localStorage change state
watch(
    pinia.state,
    (state) => {
        createApp(App).use(router).use(pinia).mount('#app');
    },
    { deep: true }
);

createApp(App).use(router).use(pinia).mount('#app');