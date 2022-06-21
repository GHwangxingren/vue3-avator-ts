/*
 * @Description:
 * @Author: 王兴仁
 * @Date: 2022-06-21 16:57:23
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-21 17:54:24
 * @FilePath: /vue3-avator-ts/src/store/modules/sider/index.ts
 */
import { defineStore } from "pinia";
import { SiderState } from "./types";
import { SCREEN } from "@/utils/constant";

export const useSiderStore = defineStore("sider", {
  state: (): SiderState => ({
    isSiderCollapsed: window.innerHeight <= SCREEN.lg
  }),
  actions: {
    setSiderCollapsed(bol: boolean) {
      this.isSiderCollapsed = bol;
    }
  }
});