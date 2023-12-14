// Plugins
import { registerPlugins } from "@/plugins";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueCookies from "vue3-cookies";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

// CSS styles for libs:
import "vue3-toastify/dist/index.css";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(VueCookies);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "bottom-right",
} as ToastContainerOptions);

registerPlugins(app);

app.mount("#app");
