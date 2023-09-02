import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import testLogPlugin from "./src/plugins/testHookPlugin";
import virtualFibModulePlugin from "./src/plugins/virtualFibModulePlugin";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // testLogPlugin(),
    virtualFibModulePlugin(),
  ],
  server: {
    host: "0.0.0.0",
    port: 6800,
  },
  define: {
    "process.env": {},
  },
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
