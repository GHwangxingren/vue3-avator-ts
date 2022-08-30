<!--
 * @Description:
 * @Author: web.wangxingren
 * @Date: 2022-06-22 15:50:23
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2022-07-27 16:02:15
 * @FilePath: /vue3-avator-ts/src/components/avatar/ConfigPanel.vue
-->
<template>
  <PerfectScrollbar class="configurator-scroll">
    <!-- 头像形状 -->
    <SectionWrapper :title="t('label.wrapperShape')">
      <ul class="wrapper-shape">
        <li v-for="wrapperShape in SETTINGS.wrapperShape" :key="wrapperShape" class="wrapper-shape-item" @click="switchWrapperShape(wrapperShape)">
          <div class="shape" :class="[wrapperShape, { active: wrapperShape === avatarOpts.wrapperShape }]"></div>
        </li>
      </ul>
    </SectionWrapper>
    <!-- 背景颜色 -->
    <SectionWrapper :title="t('label.backgroundColor')">
      <ul class="color-list">
        <li v-for="bgColor in SETTINGS.backgroundColor" :key="bgColor" class="color-list-item" @click="switchBgColor(bgColor)">
          <div :style="{ background: bgColor }" class="bg-color" :class="{ active: bgColor === avatarOpts.background.color, transparent: bgColor === 'transparent' }"></div>
        </li>
      </ul>
    </SectionWrapper>
    <SectionWrapper v-for="item in section" :key="item.widgetType" :title="t(`WidgetType.${item.widgetType}`)">
      <ul class="widget-list">
        <li
          v-for="it in item.widgetList"
          :key="it.widgetShape"
          class="list-item"
          :class="{ selected: it.widgetShape === avatarOpts.widgets?.[item.widgetType]?.shape }"
          @click="switchWidget(item.widgetType, it.widgetShape)"
          v-html="it.svgRaw"
        >
        </li>
      </ul>
      <details v-if="item.widgetType === WidgetType.Tops || item.widgetType === WidgetType.Clothes" class="color-picker">
        <summary class="color-label">{{ t("label.colors") }}</summary>
        <ul class="color-list">
          <li v-for="color in SETTINGS.commonColors" :key="color" @click="setWidgetColor(item.widgetType, color)">
            <div class="bg-color" :style="{ background: color }"></div>
          </li>
        </ul>
      </details>
    </SectionWrapper>
  </PerfectScrollbar>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import PerfectScrollbar from "./PerfectScrollbar.vue";
import SectionWrapper from "./SectionWrapper.vue";
import { useI18n } from "vue-i18n";
import { useAvatarOption } from "@/hooks";
import { AVATAR_LAYER, SETTINGS } from "@/utils/constant";
import { WrapperShape, WidgetType, WidgetShape, BeardShape } from "@/enums";
import { previewData } from "@/utils/dynamic-data";

const { t } = useI18n();
const { avatarOpts, setAvatarOpts } = useAvatarOption();
const sectionList = reactive(Object.values(WidgetType));
const section = ref<{
  widgetType: WidgetType
  widgetList: {
    widgetType: WidgetType
    widgetShape: WidgetShape,
    svgRaw: string
  }[]
}[]>([]);

onMounted(async () => {
  const _section = await Promise.all(
    sectionList.map(v => {
      return getWidgets(v);
  }));

  section.value = sectionList.map((v, i)=> {
    return {
      widgetType: v,
      widgetList: _section[i]
    };
  });
});

async function getWidgets(widgetType: WidgetType) {
  const list = SETTINGS[`${widgetType}Shape`];
  const svgList = list.map(async (widget: string) => {
    if (widget !== "none" && previewData?.[widgetType]?.[widget]) {
      return (await previewData[widgetType][widget]()).default;
    }
    return "X";
  });
  const svgRawList = await Promise.all(svgList).then(res => {
    return res.map((v, i) => {
      return {
        widgetType,
        widgetShape: list[i],
        svgRaw: v
      };
    });
  });
  return svgRawList;
}

// 切换背景形状
const switchWrapperShape = (wrapperShape: WrapperShape) => {
  if ( wrapperShape !== avatarOpts.value.wrapperShape) {
    setAvatarOpts({ ...avatarOpts.value, wrapperShape });
  }
};

// 切换背景颜色
const switchBgColor = (bgColor: string) => {
  if (bgColor !== avatarOpts.value.background.color) {
    setAvatarOpts({ ...avatarOpts.value, background: { ...avatarOpts.value.background, color: bgColor } });
  }
};

// 切换其它小工具
const switchWidget = (widgetType: WidgetType, widgetShape: WidgetShape) => {
  if (widgetShape && avatarOpts.value.widgets?.[widgetType]) {
    setAvatarOpts({
      ...avatarOpts.value,
      widgets: {
        ...avatarOpts.value.widgets,
        [widgetType]: {
          ...avatarOpts.value.widgets?.[widgetType],
          shape: widgetShape,
          ...(widgetShape === BeardShape.Scruff ?
            { zIndex: AVATAR_LAYER["mouth"].zIndex - 1 } :
            undefined)
        }
      }
    });
  }
};

// 切换颜色
const setWidgetColor = (widgetType: WidgetType, fillColor: string) => {
  if (avatarOpts.value.widgets?.[widgetType]) {
    setAvatarOpts({
      ...avatarOpts.value,
      widgets: {
        ...avatarOpts.value.widgets,
        [widgetType]: {
          ...avatarOpts.value.widgets?.[widgetType],
          fillColor
        }
      }
    });
  }
};

</script>

<style lang="scss" scoped>
@use "src/styles/var.scss";
.configurator-scroll {
  width: var.$layout-sider-width;
  height: 100%;
  @media screen and (max-width: var.$screen-lg) {
    background-color: var.$color-configurator;
  }
  .wrapper-shape {
    display: flex;
    align-items: center;
    .wrapper-shape-item {
      padding: 0.4rem 0.5rem;
      cursor: pointer;
      .shape {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background-color: var.$color-text;
        transition: background-color 0.2s;
        &.circle {
          border-radius: 50%;
        }
        &.squircle {
          border-radius: 20%;
        }
        &.active {
          background-color: var.$color-accent;
        }
      }
    }
  }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .color-list-item {
      position: relative;
      z-index: 1;
      width: calc(100% / 7);
      padding: 0.6rem 0;
      cursor: pointer;
      transition: transform 0.2s;
      .bg-color {
        position: relative;
        width: 1.3rem;
        height: 1.3rem;
        margin: auto;
        font-size: 16px;
        border-radius: 50%;
        box-shadow: 0 0 0.05em 0.2em var.$color-configurator;
        &::before {
          position: absolute;
          z-index: -1;
          top: 50%;
          left: 50%;
          background: inherit;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.5;
          width: 100%;
          height: 100%;
          transition: width 0.15s, height 0.15s;
          content: "";
        }
        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          color: var.$color-configurator;
          font-size: 1.5rem;
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
          transition: opacity 0.15s;
          content: '\2714';
        }
        &.active {
          &::before {
            width: 160%;
            height: 160%;
          }
          &::after {
            opacity: 1;
          }
        }
        &.transparent {
          background: #fff !important;

          &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.5);
            color: #ff4757;
            font-weight: bold;
            font-size: 1.8rem;
            opacity: 1;
            content: "\\";
          }
        }
      }
    }
  }
  .widget-list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 4);
      height: 5rem;
      padding: 1rem;
      border-radius: 0.8rem;
      transition: background-color 0.15s;
      cursor: pointer;

      & > :deep(svg) {
        width: 100% !important;
        height: 100% !important;
      }
      & :deep(path) {
        stroke: var.$color-stroke !important;
      }
      &.selected.selected {
        background-color: lighten(var.$color-configurator, 6);
      }

      &:hover {
        background-color: lighten(var.$color-configurator, 0);
      }
    }
  }
  .color-picker {
    margin-top: 1rem;
    .color-label {
      color: #677f98;
      font-size: small;
      cursor: pointer;
      user-select: none;
    }
    .color-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li {
        width: calc(100% / 7);
        padding: 0.6rem 0;
        cursor: pointer;
        .bg-color {
          width: 1.3em;
          height: 1.3em;
          border-radius: 50%;
          margin: 0 auto;
          box-shadow: 0 0 0.05em 0.2em var.$color-configurator;
        }
      }
    }
  }
}
</style>
