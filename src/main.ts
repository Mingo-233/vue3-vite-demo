import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
import { directiveHandle } from "@/directive/index.js";
directiveHandle(app);

app.use(router);
app.use(createPinia());
app.mount("#app");
