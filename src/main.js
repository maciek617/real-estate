import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'


import { globalCookiesConfig } from "vue3-cookies";
globalCookiesConfig({
    expireTimes: "180d",
});

createApp(App).use(store).use(router).mount('#app')
