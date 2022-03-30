/*
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-30 10:46:18
 * @Descripttion:
 * @FilePath: /vue3-avator-ts/vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import path = require("path");
import path from "path";
import eslintPlugin from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }),
    ...mode === "production" ?
    [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: "sunburst"
        })
      ] :
    []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    outDir: "dist"
  },
  server: {
    port: 9000,
    open: true,
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
  // 在开发时会被定义为全局变量，而在构建时则是静态替换
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  }
}));
