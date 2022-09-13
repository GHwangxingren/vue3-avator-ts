<!--
 * @Author: wangxingren
 * @Date: 2022-04-06 17:10:27
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-13 16:36:40
 * @Descripttion: header头部部分
 * @FilePath: /vue3-avator-ts/src/layouts/Header.vue
-->
<template>
  <div class="header-view flex flex-align-center">
    <!-- logo -->
    <img class="header-logo" :src="LogoSvg" alt="LOGO" :style="{ width: `${props.size}rem`, height: `${props.size}rem` }">
    <!-- title -->
    <p class="header-title">Copy Color Avator</p>
    <!-- link -->
    <div class="header-right">
      <a href="https://www.baidu.com" target="_black" rel="nofollow noopener noreferrer">
        <button class="github-button flex flex-center">
          <img :src="IconGitHub" alt="GitHub">
          <span class="text">GitHub</span>
        </button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconGitHub from "@/assets/icons/icon-github.svg";
import LogoSvg from "@/assets/logo.svg";

const props = withDefaults(defineProps<{ size?:number }>(), {
  size: 2.5
});
</script>

<style lang="scss" scoped>
@use 'src/styles/var';
.header-view {
  height: var.$layout-header-height;
  padding: 1rem;
  .header-logo {
    width: 40px;
    height: 40px;
  }
  .header-title {
    margin-left: 1rem;
    font-weight: bold;
    font-size: 1.9rem;
    cursor: default;

    @media screen and (max-width: var.$screen-sm) {
      display: none;
    }
  }
  .header-right {
    margin-left: auto;
    .github-button {
      width: 8rem;
      height: 2.5rem;
      color: var.$color-text;
      font-weight: bold;
      font-size: 1.05rem;
      background-color: var.$color-dark;
      border-radius: 0.6rem;
      cursor: pointer;
      user-select: none;
      transition: box-shadow 0.2s, background-color 0.2s;

      &:hover {
        background-color: lighten(var.$color-dark, 2);
        box-shadow: 0 0.2rem 1.5rem 0.2rem lighten(var.$color-dark, 5);
      }

      .text {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
