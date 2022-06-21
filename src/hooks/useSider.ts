/*
 * @Author: wangxingren
 * @Date: 2022-04-07 18:55:10
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-21 17:54:12
 * @Descripttion: useSider
 * @FilePath: /vue3-avator-ts/src/hooks/useSider.ts
 */
import { computed } from "vue";
import { useSiderStore } from "@/store";

export default function useSider() {
  const store = useSiderStore();
  const isCollapsed = computed(() => store.isSiderCollapsed);
  const openSider = () => {
    store.setSiderCollapsed(false);
  };
  const closeSider = () => {
    store.setSiderCollapsed(true);
  };
  return { isCollapsed, openSider, closeSider };
}
