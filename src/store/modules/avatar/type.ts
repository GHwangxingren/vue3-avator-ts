/*
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-27 16:37:49
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-27 17:41:09
 * @FilePath: /vue3-avator-ts/src/store/modules/avatar/type.ts
 */
import { AvatarOption } from "@/types";

export interface AvatarState {
  past: AvatarOption[],
  present: AvatarOption,
  feature: AvatarOption[]
}

export const SET_AVATAR_OPTION = "SET_AVATAR_OPTION";
export const UNDO = "UNDO";
export const REDO = "REDO";