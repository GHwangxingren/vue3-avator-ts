<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-08-29 17:36:08
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-09-13 10:13:58
 * @FilePath: /vue3-avator-ts/src/components/Avatar/ActionOperate.vue
-->
<template>
  <div class="action-operate">
    <button type="button" class="action-btn" @click="handleRandom">{{ t('action.randomize') }}</button>
    <button type="button" class="action-btn" @click="handleDownload">{{ t('action.download') }}</button>
    <!-- 或者 () => { handleBatchDownload() } -->
    <button type="button" class="action-btn" @click="handleBatchDownload();">{{ t('action.downloadMultiple') }}</button>
    <!-- 批量下载对话框 由于父元素层级问题，无法覆盖到aside的上边 -->
    <BatchDownloadModal
      :visible="batchDownloaVisible"
      :avatar-list="avatarList"
      @regenerate="handleBatchDownload"
      @close=";(batchDownloaVisible = false), (imageDataURL = '')"
    />
  </div>
</template>

<script lang="ts" setup>
import BatchDownloadModal from "@/components/Avatar/BatchDownloadModal.vue";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { getSpecialAvatarOption, getRandomAvatarOption } from "@/utils";
import { TRIGGER_PROBABILITY, NOT_COMPATIBLE_AGENTS, DOWNLOAD_DELAY } from "@/utils/constant";
import { useAvatarOption } from "@/hooks";
import { name as appName } from "../../../package.json";
import type { AvatarOption } from "@/types";

const { t } = useI18n();
const { avatarOpts, setAvatarOpts } = useAvatarOption();
const props = defineProps<{ avatarRef?: HTMLDivElement }>();

// 随机获取
const handleRandom = () => {
  if (Math.random() <= TRIGGER_PROBABILITY) {
    let curOption = getSpecialAvatarOption();
    while (JSON.stringify(curOption) === JSON.stringify(avatarOpts.value)) {
      curOption = getSpecialAvatarOption();
    }
    curOption.wrapperShape = avatarOpts.value.wrapperShape;
    setAvatarOpts(curOption);
  } else {
    const curOption = getRandomAvatarOption(avatarOpts.value);
    setAvatarOpts(curOption);
  }
};

// 单个下载
const downloading = ref(false);
const imageDataURL = ref("");
const downloadModalVisible = ref(false);
const handleDownload = async () => {
  try {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const notCompatible = NOT_COMPATIBLE_AGENTS.some((agent) => userAgent.indexOf(agent) !== -1);
    const avatarEle = props.avatarRef;
    if (avatarEle) {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(avatarEle, {
        backgroundColor: null
      });
      const dataURL = canvas.toDataURL();

      if (notCompatible) {
        imageDataURL.value = dataURL;
        downloadModalVisible.value = true;
      } else {
        const trigger = document.createElement("a");

        trigger.href = dataURL;
        trigger.download = `${appName}.png`;
        trigger.click();
      }
    }
  } finally {
    setTimeout(() => {
      downloading.value = false;
    }, DOWNLOAD_DELAY);
  }
};

// 批量下载
const avatarList = ref<AvatarOption[]>([]);
const batchDownloaVisible = ref(false);

watchEffect(() => {
  batchDownloaVisible.value = Array.isArray(avatarList.value) && avatarList.value.length > 0;
});

const handleBatchDownload = async (count = 10) => {
  const { default: hash } = await import("object-hash");
  const avatarMap = [...Array(count)].reduce<Map<string, AvatarOption>>(res => {
    let randomAvatarOption: AvatarOption;
    let hashKey: string;

    do {
      randomAvatarOption = getRandomAvatarOption(avatarOpts.value);
      hashKey = hash.sha1(randomAvatarOption);
    } while (
      randomAvatarOption.background.color === "transparent" ||
      res.has(hashKey)
    );

    res.set(hashKey, randomAvatarOption);

    return res;
  }, new Map());
  avatarList.value = Array.from(avatarMap.values()); // [...avatarMap.values()]
};
</script>


<style lang="scss" scoped>
@use "src/styles/var";
.action-operate {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  column-gap: 1rem; // 列之间的距离

  @supports not (column-gap: 1rem) {
  // 浏览器不支持column-gap: 1rem属性的时候执行以下央视
  .action-btn {
      margin: 0 0.5rem;
    }
  }
  .action-btn {
    min-width: 6rem;
    height: 2.5rem;
    padding: 0 1rem;
    color: var.$color-text;
    font-weight: bold;
    border-radius: 0.2rem;
    background: var.$color-gray;
    cursor: pointer;
    transition: color 0.2s;
    user-select: none;
    &:hover {
      color: lighten(var.$color-text, 10);
    }
    &:disabled,
    &[disabled] {
      color: rgba(var.$color-text, 0.5);
      cursor: default;
    }
    @media screen and (max-width: var.$screen-sm) {
      .action-multiple {
        display: none;
      }
    }
  }
}
</style>