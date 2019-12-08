import Vue from "vue";
import VueI18n from "vue-i18n";
//@ts-ignore
import ro from "@/locales/ro.json";
//@ts-ignore
import ru from "@/locales/ru.json";
//@ts-ignore
import en from "@/locales/en.json";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: navigator.language.split("-")[0],
  fallbackLocale: navigator.language.split("-")[0],
  messages: {
    ro,
    ru,
    en
  }
});
