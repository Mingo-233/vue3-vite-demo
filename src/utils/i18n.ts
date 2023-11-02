import { createI18n, useI18n } from "vue-i18n";
import zhMessage from "@/locales/zh/mock/index.json";
import enMessage from "@/locales/en/mock/index.json";
export const i18n = createI18n({
  locale: "zh", // set locale
  fallbackLocale: "en", // set fallback locale
  messages: {
    zh: zhMessage,
    en: enMessage,
  },
  legacy: false,
});
console.log("i18n", i18n);

export function setLocale(locale: "zh" | "en") {
  i18n.global.locale.value = locale;
}

// setTimeout(() => {
//   const res = i18n.global.getLocaleMessage("zh");
//   console.log(res);
// }, 1000);

// setTimeout(() => {
//   const res = i18n.global.setLocaleMessage("zh", zh2);
//   i18n.global.locale = "zh";
//   console.log(res);
// }, 1000);
let zh2 = {
  apple: "苹果",
  ban: "香蕉22",
  buffer: "缓冲液",
  interpolation: "插补文字",
  search: "搜索",
};
