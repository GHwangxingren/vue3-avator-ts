/*
 * @Author: wangxingren
 * @Date: 2022-04-07 21:05:57
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-04-07 23:31:11
 * @Descripttion: store入口
 * @FilePath: /vue3-avator-ts/src/store/index.ts
 */
import { InjectionKey } from "vue";
import { Store, createStore, createLogger, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// export const key:InjectionKey