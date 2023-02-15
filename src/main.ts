import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/index.less";
const app = createApp(App);
import { directiveHandle } from "@/directive/index.js";
directiveHandle(app);
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
app.use(router);
app.use(antd);
app.use(createPinia());
app.mount("#app");

// app.config.errorHandler = function (err, vm, info) {
//   console.log("全局捕获 err >>>", err);
//   console.log("全局捕获 vm >>>", vm);
//   console.log("全局捕获 info >>>", info);
// };
