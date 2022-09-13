<!--
 * @Description: 代码框
 * @Author: web.wangxingren
 * @Date: 2022-07-28 11:17:29
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-13 16:35:42
 * @FilePath: /vue3-avator-ts/src/components/Avatar/CodeModal.vue
-->
<template>
  <ModalWrapper :visible="props.visible" @close="emit('close')">
    <div class="code-box">
      <div class="code-header">
        <div class="title">{{ t('text.codeModalTitle') }}</div>

        <div class="close-btn" @click="emit('close')">
          <img :src="IconClose" class="icon-close" :alt="t('action.close')" />
        </div>
      </div>
      <div class="code-content-box">
        <PerfectScrollbar class="code-scroll-wrapper">
          <pre><code class="code-content" v-html="highlightedCode"></code></pre>
        </PerfectScrollbar>
        <button
          id="copy-code-btn"
          class="copy-btn"
          :class="{ copied: copied }"
          :data-clipboard-text="codeJson"
        >
          {{ copied ? t('action.copied') : t('action.copyCode') }}
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>

<script lang="ts" setup>
import ModalWrapper from "@/components/Modal/ModalWrapper.vue";
import PerfectScrollbar from "@/components/Avatar/PerfectScrollbar.vue";
import IconClose from "@/assets/icons/icon-close.svg";
import { useI18n } from "vue-i18n";
import { computed, effect, onMounted, onUnmounted, ref } from "vue";
import useAvatarOption from "@/hooks/useAvatarOption";
import { highlightJSON } from "@/utils";
import type ClipboardJS from "clipboard";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{(e: "close"): void}>();
const { t } = useI18n();
const { avatarOpts } = useAvatarOption();
const codeJson = computed(() => JSON.stringify(avatarOpts.value, null, 4));
const highlightedCode = ref("");

effect(() => {
  if (codeJson.value) {
    highlightedCode.value = highlightJSON(codeJson.value);
  }
});

const copied = ref(false);
let clipboard: ClipboardJS;
onMounted(async () => {
  const { default: ClipboardJS } = await import("clipboard");

  clipboard = new ClipboardJS("#copy-code-btn");
  clipboard.on("success", (e) => {
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 800);

    e.clearSelection();
  });
  clipboard.on("error", (e) => {
    console.error("Action", e.action);
    console.error("Trigger", e.trigger);
  });
});
onUnmounted(() => {
  clipboard.destroy();
});
</script>


<style lang="scss" scoped>
  @use 'src/styles/var';

  .code-box {
    $code-header-height: 4rem;
    $code-box-side-padding-normal: 2rem;
    $code-box-side-padding-small: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 75%;
    max-width: 800px;
    height: min(90vh, 1000px);
    margin: 0 auto;
    padding: $code-header-height $code-box-side-padding-normal 2.5rem
      $code-box-side-padding-normal;
    overflow: hidden;
    background-color: lighten(var.$color-dark, 3);
    border-radius: 1rem;
    transform: translate(-50%, -50%);
    transition: width 0.2s;

    @media screen and (max-width: 1200px) {
      width: 75%;
    }

    @media screen and (max-width: var.$screen-md) {
      width: 80%;
    }

    @media screen and (max-width: var.$screen-sm) {
      width: 90%;
      padding: $code-header-height $code-box-side-padding-small 2.5rem
        $code-box-side-padding-small;

      .code-header {
        padding: 0 $code-box-side-padding-small;
      }
    }

    .code-header {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: $code-header-height;
      padding: 0 $code-box-side-padding-normal;

      .title {
        font-weight: bold;
      }

      .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin-left: auto;
        background-color: lighten(var.$color-dark, 8);
        border-radius: 50%;
        cursor: pointer;

        .icon-close {
          width: 45%;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        &:hover {
          .icon-close {
            opacity: 1;
          }
        }
      }
    }

    .code-content-box {
      position: relative;
      height: 20rem;
      height: 100%;
      padding: 1rem 0;
      background: darken(var.$color-dark, 1);
      border-radius: 0.8rem;

      .code-scroll-wrapper {
        height: 100%;
      }

      .copy-btn {
        position: absolute;
        top: 100%;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height: 2rem;
        color: #fff;
        background-color: var.$color-accent;
        border-radius: 0.4rem;
        transform: translate(-50%, -45%);
        cursor: pointer;
        transition: color 0.15s, background-color 0.15s;

        &.copied {
          color: var.$color-dark;
          background-color: var.$color-secondary;
        }
      }
    }
  }
  </style>

  <style lang="scss">
  @use 'src/styles/var';

  .code-content {
    display: block;
    padding: 0 1.5rem;
    color: #c0c5ce;
    color: #81cfef;
    font-size: 1.25rem;
    font-family: 'Ubuntu Mono', Fallback;
    line-height: 1.4;

    @media screen and (max-width: var.$screen-sm) {
      padding: 0 1rem;
      font-size: 1rem;
    }

    & > .token {
      &.key {
        color: #ffcb6b;
      }

      &.string,
      &.number {
        color: #c3e88d;
      }
    }
  }
  </style>
