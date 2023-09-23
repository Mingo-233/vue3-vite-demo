import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), viteSingleFile()],
  server: {
    host: "0.0.0.0",
    port: 6800,
  },
  // build: {
  //   polyfillDynamicImport: false,
  //   rollupOptions: {
  //     output: {
  //       format: "iife",
  //     },
  //   },
  // },
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
