/*
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-27 16:20:42
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-07-26 15:43:50
 * @FilePath: /vue3-avator-ts/src/store/modules/avatar/index.ts
 */
import { defineStore } from "pinia";
import { AvatarState, REDO, SET_AVATAR_OPTION, UNDO } from "./type";
import type { AvatarOption } from "@/types";
import { getRandomAvatarOption } from "@/utils";

export const useAvatarStore = defineStore("avatar", {
  state: (): AvatarState => ({
    past: [],
    present: getRandomAvatarOption(),
    feature: []
  }),
  actions: {
    // 设置当前
    [SET_AVATAR_OPTION](data: AvatarOption) {
      this.past = [...this.past, this.present];
      this.present = data;
      this.feature = [];
    },
    // 撤销
    [UNDO]() {
      if (this.past.length) {
        this.present = this.past[this.past.length - 1];
        const newPast = this.past.slice(0, this.past.length - 1);
        this.past = newPast;
        this.feature = [this.present, ...this.feature];
      }
    },
    // 还原
    [REDO]() {
      if (this.feature.length) {
        this.present = this.feature[0];
        const newFeature = this.feature.slice(1);
        this.past = [...this.past, this.present];
        this.feature = newFeature;
      }
    }
  }
});
