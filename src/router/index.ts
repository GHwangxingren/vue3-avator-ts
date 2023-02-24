/*
 * @Author: wangxingren
 * @Date: 2022-03-30 16:35:06
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2023-02-24 11:39:11
 * @Descripttion: 路由入口
 * @FilePath: /vue3-avator-ts/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { createRouterGuard } from "./intercept";
import { App } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home"
    },
    component: () => import("@/views/index.vue")
    // redirect: "/avatar"
  },
  {
    path: "/avatar",
    name: "AvatorMain",
    meta: {
      title: "Avatar"
    },
    component: () => import("@/views/avatar/index.vue")
  },
  {
    path: "/carAnimation",
    name: "CarAnimation",
    meta: {
      title: "购物车动画"
    },
    component: () => import("@/views/carAnimation/index.vue")
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