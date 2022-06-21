<!--
 * @Author: wangxingren
 * @Date: 2022-03-30 17:36:15
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-21 16:35:17
 * @Descripttion: 主页
 * @FilePath: /vue3-avator-ts/src/views/avatar/index.vue
-->
<template>
  <div class="avatar-page">
    <Container>
      <Header />
    </Container>
    <Sider />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/layouts/Header.vue";
import Container from "@/layouts/Container.vue";
import Sider from "@/layouts/Sider.vue";
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