<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-22 11:51:31
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-22 14:36:31
 * @FilePath: /vue3-avator-ts/src/components/Background.vue
-->
<template>
  <div class="avatar-background" :style="{ background: props.color }"></div>
</template>

<script lang="ts" setup>
interface BackgroundProps {
  color: string
}

const props = defineProps<BackgroundProps>();
</script>


<style lang="scss" scoped>
.avatar-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.1s;
}
</style>
