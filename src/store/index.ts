/*
 * @Author: wangxingren
 * @Date: 2022-04-07 21:05:57
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-28 10:22:50
 * @Descripttion:
 * @FilePath: /vue3-avator-ts/src/store/index.ts
 */
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { useSiderStore } from "./modules/sider";
import { useAvatarStore } from "./modules/avatar";

const pinia = createPinia();
pinia.use(piniaPersist);

export { useSiderStore, useAvatarStore };
export default pinia;