/*
 * @Author: wangxingren
 * @Date: 2022-04-07 21:05:57
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-21 17:21:38
 * @Descripttion:
 * @FilePath: /vue3-avator-ts/src/store/index.ts
 */
import { createPinia } from "pinia";
import { useSiderStore } from "./modules/sider";

const pinia = createPinia();

export { useSiderStore };
export default pinia;