<!--
 * @Description:
 * @Author: 王兴仁
 * @Date: 2022-06-22 10:46:30
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-08-30 16:12:21
 * @FilePath: /vue3-avator-ts/src/components/Avatar/AvatarMain.vue
-->
<template>
  <div ref="avatarRef" class="avatar-main" :class="avatarOpts.wrapperShape" :style="{ width: `${avatarSize}px`, height: `${avatarSize}px` }">
    <Backgrpund :color="avatarOpts.background.color" />
    {{ avatarOpts.wrapperShape }}
    <div class="avatar-content" v-html="svgContent"></div>
  </div>
</template>

<script lang="ts">
export interface VueColorAvatarRef {
  avatarRef: HTMLDivElement
}
</script>

<script lang="ts" setup>
import { ref, toRefs, watchEffect } from "vue";
import Backgrpund from "./Background.vue";
import { AvatarOption } from "@/types";
import { AVATAR_LAYER, NONE } from "@/utils/constant";
import { WidgetType } from "@/enums";
import { getRandomAvatarOption } from "@/utils";
import { widgetData } from "@/utils/dynamic-data";

const avatarRef = ref<VueColorAvatarRef["avatarRef"]>();
// 暴露此属性，否组父组件无法获取
defineExpose({ avatarRef });

interface Props {
  option: AvatarOption,
  size?: number
}

const svgContent = ref("");
const props = withDefaults(defineProps<Props>(), {
  option: () => getRandomAvatarOption(),
  size: 280
});
const { option: avatarOpts, size: avatarSize } = toRefs(props);

watchEffect(async () => {
  const sortedList = Object.entries(avatarOpts.value.widgets).sort(
    ([prevShape, prev], [nextShape, next]) => {
      const ix = prev.zIndex ?? (AVATAR_LAYER)[prevShape as WidgetType]?.zIndex ?? 0;
      const iix = next.zIndex ?? AVATAR_LAYER[nextShape as WidgetType]?.zIndex ?? 0;
      return ix - iix;
    }
  );
  const promises: Promise<string>[] = sortedList.map(
    async ([widgetType, opt]) => {
      if (opt.shape !== NONE && widgetData?.[widgetType as WidgetType]?.[opt.shape]) {
        return (await widgetData[widgetType as WidgetType][opt.shape]()).default;
      }
      return "";
    }
  );
  const svgRawList = await Promise.all(promises).then((raw) => {
    return raw.map((svgRaw, i) => {
      const widgetFillColor = sortedList[i][1].fillColor;
      const content = svgRaw
        .slice(svgRaw.indexOf(">", svgRaw.indexOf("<svg")) + 1)
        .replace("</svg>", "")
        .replaceAll("$fillColor", widgetFillColor || "transparent");
      return `
        <g id="vue-color-avatar-${sortedList[i][0]}">
          ${content}
        </g>
      `;
    });
  });
  svgContent.value = `
    <svg
      width="${avatarSize.value}"
      height="${avatarSize.value}"
      viewBox="0 0 ${avatarSize.value / 0.7} ${avatarSize.value / 0.7}"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 65)">
        ${svgRawList.join("")}
      </g>
    </svg>
  `;
});
</script>

<style lang="scss" scoped>
.avatar-main {
  position: relative;
  overflow: hidden;
  width: 280px;
  height: 280px;
  &.circle {
    border-radius: 50%;
  }
  &.squircle {
    border-radius: 25px;
  }
  .avatar-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
}
</style>
