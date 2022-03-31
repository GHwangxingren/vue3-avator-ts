/*
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-30 18:51:25
 * @Descripttion: main.js
 * @FilePath: /vue3-avator-ts/src/main.ts
 */
import { createApp } from "vue";
import "./styles/reset.css";
import "./styles/global.scss";
import router, { setupRouter } from "./router";
import App from "./App.vue";
// import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

const app = createApp(App);
// 挂载路由
setupRouter(app);
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount("#app"));
