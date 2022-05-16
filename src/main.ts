import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import MainLayout from "./layouts/MainLayout.vue";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import router from "./router";

import "./assets/css/tailwind.css";
import "./assets/css/animations.css";
import "./assets/css/global.css";

import {
  DatePicker,
  Input,
  InputNumber,
  Space,
  Button,
  Modal,
} from "ant-design-vue";

const app = createApp(App);

const toastOptions: PluginOptions = {
  // set default toast options here
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

app.use(DatePicker);
app.use(Input);
app.use(InputNumber);
app.use(Space);
app.use(Button);
app.use(Modal);
app.use(MainLayout);
app.use(Toast, toastOptions);

app.mount("#app");
