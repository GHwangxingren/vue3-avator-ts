/*
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-02-16 16:28:43
 * @Descripttion:
 * @FilePath: /vue3-avator-ts/vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    })
  ]
});
