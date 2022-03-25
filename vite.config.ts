/*
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-02-17 17:11:11
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
  server: {
    base: "./",
    outDir: "dist",
    port: 9000,
    open: true,
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
}));
