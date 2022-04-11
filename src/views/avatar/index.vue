<!--
 * @Author: wangxingren
 * @Date: 2022-03-30 17:36:15
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-04-07 18:36:28
 * @Descripttion: 主页
 * @FilePath: /vue3-avator-ts/src/views/avatar/index.vue
-->
<template>
  <div class="avatar-page">
    <Header />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/layouts/Header.vue";
</script>


<style lang="scss" scoped>
@use "src/styles/var";
.avatar-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var.$color-text;
  background-color: var.$color-page-bg;
}
</style>