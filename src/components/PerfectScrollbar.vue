<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-22 15:20:06
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-22 16:22:36
 * @FilePath: /vue3-avator-ts/src/components/PerfectScrollbar.vue
-->
<template>
  <div ref="scrollWrapper" class="scroll-wrap">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import PerfectScrollbar from "perfect-scrollbar";
import { onMounted, onUnmounted, ref } from "vue";
import { usePerfectScrollbar } from "@/hooks";
const { createBar, destroyBar } = usePerfectScrollbar();
const props = defineProps<{ options?: PerfectScrollbar.Options }>();

const scrollWrapper = ref<HTMLDivElement>();

onMounted(() => {
  if (!scrollWrapper.value) {
    console.warn("No valid 'PerfectScrollbar' container found");
    return;
  }
  createBar(scrollWrapper.value, {
    minScrollbarLength: 20,
    maxScrollbarLength: 160,
    ...props.options
  });
});

onUnmounted(() => {
  destroyBar();
});
</script>

<style lang="scss" scoped>
.scroll-wrap {
  position: relative;
  overflow: hidden;
}
</style>