import { initReactI18next as realInitReactI18next } from "react-i18next";

const t = (key: string) => key;

export const useTranslation = () => ({
  t,
  i18n: {},
});

export const i18n = {
  t,
  changeLanguage: () => new Promise(() => {}),
};

export const initReactI18next = realInitReactI18next;
