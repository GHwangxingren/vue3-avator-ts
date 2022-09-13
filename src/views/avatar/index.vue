<!--
 * @Author: wangxingren
 * @Date: 2022-03-30 17:36:15
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-13 11:36:45
 * @Descripttion: 主页
 * @FilePath: /vue3-avator-ts/src/views/avatar/index.vue
-->
<template>
  <div class="avatar-page">
    <Container>
      <div class="content-warpper">
        <div class="content-view">
          <!-- 头部 -->
          <Header />
          <!-- 中央头像区域 -->
          <div class="palyground">
            <div class="avatar-wrapper">
              <AvatarMain
                ref="avatarRef"
                :option="avatarOpts"
                :size="280"
                :style="{
                  transform: `rotateY(${ flipped ? -180 : 0 }deg)`
                }"
              />
            </div>
            <!-- 操作栏1 -->
            <ActionBar @action="handleAction" />
            <!-- 操作栏2 -->
            <ActionOperate :avatar-ref="avatarRef?.avatarRef" />
          </div>
          <Footer />
          <CodeModal :visible="codeVisible" @close="codeVisible = false" />
        </div>
      </div>
    </Container>
    <Sider>
      <ConfigPanel />
    </Sider>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/layouts/Header.vue";
import Container from "@/layouts/Container.vue";
import Footer from "@/components/Avatar/Footer.vue";
import Sider from "@/layouts/Sider.vue";
import AvatarMain, { type VueColorAvatarRef } from "@/components/Avatar/AvatarMain.vue";
import ConfigPanel from "@/components/Avatar/ConfigPanel.vue";
import ActionBar from "@/components/Avatar/ActionBar.vue";
import ActionOperate from "@/components/Avatar/ActionOperate.vue";
import CodeModal from "@/components/Avatar/CodeModal.vue";
import { useAvatarOption } from "@/hooks";
import { ActionType } from "@/enums";
import { useAvatarStore } from "@/store";
import { REDO, UNDO } from "@/store/modules/avatar/type";
import { ref } from "vue";

const store = useAvatarStore();
const { avatarOpts } = useAvatarOption();
const flipped = ref<boolean>(false);
const avatarRef = ref<VueColorAvatarRef>(); // 访问子组件暴露的属性
const codeVisible = ref(false);
const handleAction = (type: ActionType) => {
  switch(type) {
    case ActionType.Undo:
      store[UNDO]();
      break;
    case ActionType.Redo:
      store[REDO]();
      break;
    case ActionType.Flip:
      flipped.value = !flipped.value;
      break;
    case ActionType.Code:
      codeVisible.value = !codeVisible.value;
      break;
    default:
  }
};
</script>


<style lang="scss" scoped>
@use "src/styles/var";
.avatar-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var.$color-text;
  background-color: var.$color-page-bg;
  .content-warpper {
    height: 100%;
    transform: scale(1);

    .content-view {
      position: relative;
      z-index: 110;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }
  }
  .palyground {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: var.$screen-sm) {
        transform: scale(0.85);
      }
    }
  }
}
</style>