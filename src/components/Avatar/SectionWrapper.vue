<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-22 17:46:28
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-06-27 14:14:10
 * @FilePath: /vue3-avator-ts/src/components/SectionWrapper.vue
-->
<template>
  <div class="section-wrapper">
    <div class="title">{{ title }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Poprs {
  title?: string
}
const props = withDefaults(defineProps<Poprs>(), {
  title: ""
});
</script>


<style lang="scss" scoped>
.section-wrapper {
  padding: 1.8rem 1rem;
  .title {
    margin-bottom: 1.5rem;
    font-weight: bold;
    line-height: 23px;
  }
}
</style>
