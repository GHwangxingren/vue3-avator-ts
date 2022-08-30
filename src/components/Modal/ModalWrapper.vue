<!--
 * @Description: 模态背景遮罩层
 * @Author: web.wangxingren
 * @Date: 2022-07-28 10:57:01
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-07-28 11:17:18
 * @FilePath: /vue3-avator-ts/src/components/Modal/ModalWrapper.vue
-->
<template>
  <transition name="fade">
    <div v-if="visible" class="modal" @click.self="emit('close')">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { toRefs } from "vue-demi";

const props = withDefaults(defineProps<{
    visible?: boolean
  }>(),
  { visible: false }
);
const { visible } = toRefs(props);
const emit = defineEmits<{(e: "close"): void }>();
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  overflow: hidden;
  backdrop-filter: blur(0.1rem);
}
.fade-enter-active,
.fade-leave-active {
  @media (prefers-reduced-motion: no-preference) {
    transition: opacity 0.25s ease, transform 0.2s;
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
