import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import testLogPlugin from "./src/plugins/testHookPlugin";
import virtualFibModulePlugin from "./src/plugins/virtualFibModulePlugin";
import mpa from "./src/plugins/mpa";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  mode: "development",
  plugins: [
    vue(),
    mpa({
      defaultOpenPage: "",
      // ignorePageNames: "",
    }),
    // testLogPlugin(),
    // virtualFibModulePlugin(),
  ],
  server: {
    host: "0.0.0.0",
    port: 6800,
  },
  build: {
    minify: false,
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
