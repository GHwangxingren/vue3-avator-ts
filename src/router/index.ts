/*
 * @Author: wangxingren
 * @Date: 2022-03-30 16:35:06
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-31 09:16:54
 * @Descripttion: 路由入口
 * @FilePath: /vue3-avator-ts/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { createRouterGuard } from "./intercept";
import { App } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/avatar"
  },
  {
    path: "/avatar",
    name: "AvatorMain",
    meta: {
      title: "Avatar"
    },
    component: () => import("@/views/avatar/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuard(router);
}

export default router;