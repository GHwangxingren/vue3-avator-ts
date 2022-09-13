<!--
 * @Author: wangxingren
 * @Date: 2022-04-06 17:11:16
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-05 23:20:59
 * @Descripttion:
 * @FilePath: /vue3-avator-ts/src/layouts/Sider.vue
-->
<template>
  <aside class="sider" :class="{ collapsed: isCollapsed }">
    <slot />
    <div class="trigger flex flex-center" @click="isCollapsed ? openSider() : closeSider()">
      <img src="../assets/icons/icon-right.svg" class="icon-arrow" alt="">
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useSider } from "@/hooks";
const { isCollapsed, openSider, closeSider } = useSider();
</script>

<style lang="scss" scoped>
@use "src/styles/var.scss";

.sider {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200;
  height: 100%;
  width: var.$layout-sider-width;
  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.2s;
    will-change: transform;
  }
  &.collapsed {
    transform: translateX(100%);

    .icon-arrow {
      transform: rotateY(-180deg);
    }
  }

  .trigger {
    position: absolute;
    top: 50%;
    left: 1px;
    transform: translate(-100%, -50%);
    width: 1.2rem;
    height: 4rem;
    background-color: var.$color-configurator;
    border-radius: 0.4rem 0 0 0.4rem;
    cursor: pointer;
    transition: width 0.2s, background-color 0.2s;
    .icon-arrow {
      transition: transform 0.2s;
    }
    &:hover {
      width: 1.5rem;
      background-color: lighten(var.$color-configurator, 5);
    }
  }
}
</style>
