<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-07-27 15:58:07
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-07-27 17:50:01
 * @FilePath: /vue3-avator-ts/src/components/avatar/ActionBar.vue
-->
<template>
  <div class="action-menu">
    <div
      v-for="item in action"
      :key="item.type"
      class="menu-item"
      :class="{ disabled: item.disabled }"
      :title="item.tip"
      @click="emit('action', item.type)"
    >
      <img :src="item.icon" :alt="item.tip">
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconBack from "@/assets/icons/icon-back.svg";
import IconCode from "@/assets/icons/icon-code.svg";
import IconFlip from "@/assets/icons/icon-flip.svg";
import IconNext from "@/assets/icons/icon-next.svg";
import { useI18n } from "vue-i18n";
import { ActionType } from "@/enums";
import { computed } from "vue";
import { useAvatarStore } from "@/store";

const emit = defineEmits<{(e: "action", actionType: ActionType): void
}>();

const { t } = useI18n();
const store = useAvatarStore();
const prev = computed(() => store.past.length);
const next = computed(() => store.feature.length);
const action = computed(() => [
  {
    type: ActionType.Undo,
    icon: IconBack,
    tip: t("action.undo"),
    disabled: !prev.value
  },
  {
    type: ActionType.Redo,
    icon: IconNext,
    tip: t("action.redo"),
    disabled: !next.value
  },
  {
    type: ActionType.Flip,
    icon: IconFlip,
    tip: t("action.flip")
  },
  {
    type: ActionType.Code,
    icon: IconCode,
    tip: t("action.code")
  }
]);
</script>

<style lang="scss" scoped>
@use "src/styles/var.scss";
.action-menu {
  display: flex;
  align-items: center;
  margin-top: 5rem;
  padding: 0.5rem;
  background-color: var.$color-gray;
  border-radius: 2rem;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
    transition: opacity 0.2s;
    &.disabled {
      opacity: 0.6;
    }
  }
}
</style>
