/*
 * @Author: wangxingren
 * @Date: 2022-03-30 17:42:05
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-31 09:14:58
 * @Descripttion: 路由拦截
 * @FilePath: /vue3-avator-ts/src/router/intercept.ts
 */
import { isNavigationFailure, Router } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // 进度条样式

NProgress.configure({ showSpinner: false }); // NProgress Configuration

export function createRouterGuard(route: Router) {
  route.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  route.afterEach((to, from, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      console.log("failed navigation", failure);
    }
    NProgress.done();
  });

  route.onError(error => {
    console.log(error, "路由错误");
  });
}
