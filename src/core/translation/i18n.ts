import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import store from 'src/store';

import { generateTranslationFile } from './locales/en/translation';
import { generateTranslationFile as generateESTranslationFile } from './locales/es/translation';
import { generateTranslationFile as generateJPTranslationFile } from './locales/jp/translation';
import { generateTranslationFile as generateKRTranslationFile } from './locales/kr/translation';

const language = store.getState().language.language;

const resources = {
  en: {
    translation: generateTranslationFile(),
  },
  jp: {
    translation: generateJPTranslationFile(),
  },
  es: {
    translation: generateESTranslationFile(),
  },
  kr: {
    translation: generateKRTranslationFile(),
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
