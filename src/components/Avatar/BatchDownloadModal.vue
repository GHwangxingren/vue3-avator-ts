<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-08-31 10:33:38
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-09 17:18:14
 * @FilePath: /vue3-avator-ts/src/components/Avatar/BatchDownloadModal.vue
-->
<template>
  <ModelWrapper :visible="props.visible" @close="emit('close')">
    <div class="container">
      <div class="top-operate">
        <div>{{ t("text.downloadMultipleTip") }}</div>
        <div class="top-right">
          <button class="regenerate-btn" :disabled="making" type="button" @click="emit('regenerate')">{{ t(`text.regenerate`) }}</button>
          <button class="download-btn" type="button" @click="make">
            {{ making ? `${t(`text.downloadingMultiple`)}(${madeCount}/${
              avatarList?.length
            })` : t(`text.downloadMultiple`) }}
          </button>
        </div>
      </div>
      <div class="content">
        <PerfectScrollbar class="content-scroll" :options="{ suppressScrollX: false }">
          <div class="avatar-list">
            <div v-for="(item, index) in props.avatarList" :key="index" class="avatar-item" :style="{ opacity: madeCount && index + 1 > madeCount ? 0.5 : 1 }">
              <AvatarMain :id="`avatar-${index}`" :option="item" />
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  </ModelWrapper>
</template>

<script lang="ts" setup>
import ModelWrapper from "@/components/Modal/ModalWrapper.vue";
import PerfectScrollbar from "./PerfectScrollbar.vue";
import AvatarMain from "@/components/Avatar/AvatarMain.vue";
import { useI18n } from "vue-i18n";
import type { AvatarOption } from "@/types";
import { ref } from "vue";
import { name as appName } from "../../../package.json";

const { t } = useI18n();
const props = withDefaults(defineProps<{ visible?: boolean, avatarList?: AvatarOption[] }>(), {
  visible: false,
  avatarList: () => []
});
const emit = defineEmits<
{(e: "close"): void,
  (e: "regenerate"): void
}>();

const making = ref(false);
const madeCount = ref(0);

async function make() {
  if (props.avatarList.length && !making.value) {
    making.value = true;
    madeCount.value = 0;
    const html2canvas = (await import("html2canvas")).default;
    const { default: JSZip } = await import("jszip");
    const jsZip = new JSZip();

    for (let i in props.avatarList) {
      const dom = window.document.querySelector(`#avatar-${i}`);
      if (dom instanceof HTMLElement) {
        const canvas = await html2canvas(dom, {
          backgroundColor: null
        });
        const dataUrl = canvas.toDataURL().replace("data:image/png;base64,", "");

        jsZip.file(`${i + 1}.png`, dataUrl, { base64: true });
        madeCount.value = madeCount.value + 1;
      }
    }

    const base64 = await jsZip.generateAsync({ type: "base64" });

    making.value = false;
    madeCount.value = 0;
    const a = document.createElement("a");
    a.href = "data:application/zip;base64," + base64;
    a.download = `${appName}.zip`;
    a.click();
  }
}
</script>

<style lang="scss" scoped>
@use 'src/styles/var.scss';
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  height: min(90vh, 1000px);
  overflow: hidden;
  background-color: lighten(var.$color-dark, 3);
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  $top-bar-height: 3.5rem;
  .top-operate {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    height: $top-bar-height;
    padding: 1rem 2rem;
    background-color: lighten(var.$color-dark, 6);

    .top-right {
      display: flex;
      align-items: center;
      margin-left: auto;
      .download-btn {
        color: #fff;
        background-color: var.$color-accent;
      }
      .download-btn,
      .regenerate-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        margin-left: 1rem;
        padding: 0 1rem;
        border-radius: 0.4rem;
        cursor: pointer;

        &:disabled,
        &[disabled] {
          color: rgba(#fff, 0.8);
          cursor: not-allowed;
        }
      }
    }
  }
  .content {
    height: 100%;
    padding: $top-bar-height 0rem 0rem 0rem;
  }
  .content-scroll {
    height: 100%;
    overflow: hidden;
    .avatar-list {
      z-index: 10;
      display: grid;
      grid-auto-rows: min-content;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      justify-content: space-between;
      width: max(85vw, 1280px);
      padding: 2rem;
      .avatar-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
