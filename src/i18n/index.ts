/*
 * @Author: wangxingren
 * @Date: 2022-02-17 15:21:38
 * @LastEditors: wangxingren
 * @LastEditTime: 2022-03-30 11:18:48
 * @Descripttion: 多语言入口
 * @FilePath: /vue3-avator-ts/src/i18n/index.ts
 */
import { createI18n } from "vue-i18n";
import { Locale } from "@/enums";
import en from "./locales/en";
import zh from "./locales/zh";

const messages = { en, zh },
 [locale, fallbackLocale] = /^zh\b/.test(window.navigator.language) ? [Locale.ZH, Locale.EN] : [Locale.EN, Locale.ZH];

 export default createI18n({
  locale,
  fallbackLocale,
  messages
});