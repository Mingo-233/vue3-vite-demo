import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
import { directiveHandle } from "@/directive/index.js";
directiveHandle(app);

app.use(router).mount("#app");

// export default app;
