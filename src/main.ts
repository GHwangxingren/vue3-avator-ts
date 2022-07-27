/*
 * @Author: wangxingren
 * @Date: 2022-02-07 17:32:53
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-23 15:45:01
 * @Descripttion: main.js
 * @FilePath: /vue3-avator-ts/src/main.ts
 */
import { createApp } from "vue";
import "./styles/reset.css";
import "./styles/global.scss";
import router, { setupRouter } from "./router";
import store from "./store";
import App from "./App.vue";
import i18n from "./i18n";
import mitt from "mitt";
import "./styles/common.scss";//公共样式

const app = createApp(App).use(store).use(i18n);

app.config.globalProperties.$emitter = mitt();
// 挂载路由
setupRouter(app);
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount("#app"));

// 使用vue-devtools工具
const win: any = window;
if (process.env.NODE_ENV === "development") {
  if ("__VUE_DEVTOOLS_GLOBAL_HOOK__" in win) {
  win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
  }
}
