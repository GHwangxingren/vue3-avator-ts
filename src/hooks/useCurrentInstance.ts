/*
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-23 15:53:04
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-23 15:55:53
 * @FilePath: /vue3-avator-ts/src/hooks/useCurrentInstance.ts
 */
import { ComponentInternalInstance, getCurrentInstance } from "vue";

export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;

  return {
    globalProperties: appContext.config.globalProperties
  };
}