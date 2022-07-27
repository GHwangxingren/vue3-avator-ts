/*
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-27 16:18:08
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-28 10:30:49
 * @FilePath: /vue3-avator-ts/src/hooks/useAvatarOption.ts
 */
import { computed } from "vue";
import { useAvatarStore } from "@/store";
import { SET_AVATAR_OPTION } from "@/store/modules/avatar/type";
import type { AvatarOption } from "@/types";

export default function useAvatarOption() {
  const store = useAvatarStore();
  const avatarOpts = computed(() => store.present);
  const setAvatarOpts = (newOpts: AvatarOption): void => {
    store[SET_AVATAR_OPTION](newOpts);
  };

  return { avatarOpts, setAvatarOpts };
}
