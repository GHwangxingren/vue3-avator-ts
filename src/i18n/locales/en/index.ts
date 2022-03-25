/*
 * @Author: wangxingren
 * @Date: 2022-02-17 15:28:37
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-02-17 16:42:39
 * @Descripttion: 多语言-英文枚举
 * @FilePath: /vue3-avator-ts/src/i18n/locales/en/index.ts
 */
import { WidgetType } from "@/enums";

export default {
  action: {
    undo: "undo",
    redo: "redo",
    flip: "flip",
    code: "code",
    randomize: "Randomize",
    download: "Download",
    copyCode: "Copy",
    copied: "Copied",
    downloading: "Downloading",
    close: "Close"
  },
  label: {
    wrapperShape: "Avatar Shape",
    backgroundColor: "Background Color"
  },
  widgetType: {
    [WidgetType.Face]: "Face",
    [WidgetType.Tops]: "Tops",
    [WidgetType.Ear]: "Ear",
    [WidgetType.Earrings]: "Earrings",
    [WidgetType.Eyebrows]: "Eyebrows",
    [WidgetType.Eyes]: "Eyes",
    [WidgetType.Nose]: "Nose",
    [WidgetType.Glasses]: "Glasses",
    [WidgetType.Mouth]: "Mouth",
    [WidgetType.Beard]: "Beard",
    [WidgetType.Clothes]: "Clothes"
  },
  wrapperShape: {
    circle: "Circle",
    square: "Square",
    squircle: "Squircle"
  },
  text: {
    codeModalTitle: "Code",
    downloadTip: "LONG PRESS or RIGHT CLICK to save"
  }
};