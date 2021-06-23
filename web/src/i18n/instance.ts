import i18n from "i18next";

import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "pl", "ar"],
    defaultNS: "common",
    ns: ["auth", "common", "field", "feedback", "validation"],
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 24 * 60 * 60 * 1000, // 1 day
          store: window.sessionStorage,
        },
        {
          loadPath: `/locales/{{lng}}/{{ns}}.json`,
        },
      ],
    },
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

export default i18n;
