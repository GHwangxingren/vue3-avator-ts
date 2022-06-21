<!--
 * @Author: wangxingren
 * @Date: 2022-04-06 17:11:00
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-21 17:58:06
 * @Descripttion:
 * @FilePath: /vue3-avator-ts/src/layouts/Container.vue
-->
<template>
  <section class="container" :class="{ full: isCollapsed }">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useSider } from "@/hooks";
import { SCREEN } from "@/utils/constant";

const { isCollapsed, openSider, closeSider } = useSider();

function handleWindowResize() {
  if (window.innerWidth <= SCREEN.lg) {
    closeSider();
  } else {
    openSider();
  }
}
onMounted(() => {
  void (function() {
    const throttle = (type: string, customEventName: string, obj: Window): void => {
      let running = false;
      obj = obj || window;
      const func = () => {
        if (!running) {
          running = true;
          requestAnimationFrame(() => {
            obj.dispatchEvent(new CustomEvent(customEventName));
            running = false;
          });
        }
      };
      obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize", window);
  })();

  window.addEventListener("optimizedResize", handleWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("optimizedResize",handleWindowResize );
});
</script>


<style lang="scss" scoped>
@use "src/styles/var";
.container {
  height: 100%;
  padding-right: var.$layout-sider-width;

  &.full {
    padding-right: 0;
  }
  @media screen and (max-width: var.$screen-lg) {
    padding-right: 0;
  }
  @media (prefers-reduced-motion: no-preference) {
    transition: padding-right 0.2s;
  }
}
</style>