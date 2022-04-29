import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
import styleImport, { VantResolve } from "vite-plugin-style-import";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
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
