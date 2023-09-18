import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/index.less";
const app = createApp(App);
import { directiveHandle } from "@/directive/index.js";
import { i18n } from "@/utils/i18n";
directiveHandle(app);
app.use(router);
app.use(createPinia());
app.use(i18n);
app.mount("#app");

// app.config.errorHandler = function (err, vm, info) {
//   console.log("全局捕获 err >>>", err);
//   console.log("全局捕获 vm >>>", vm);
//   console.log("全局捕获 info >>>", info);
// };
