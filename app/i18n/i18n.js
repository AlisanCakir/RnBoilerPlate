import * as RNLocalize from 'react-native-localize';

import i18n from 'i18n-js';

const en = require('./en');
const tr = require('./tr');

export const setI18nConfig = (appLanguageTag?: string) => {
  const appLanguage = appLanguageTag
    ? {languageTag: appLanguageTag, isRTL: false}
    : null;
  const fallback = {
    languageTag: 'en',
    isRTL: false,
  };

  const {languageTag} =
    appLanguage ||
    RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
    fallback;

  i18n.fallbacks = true;
  i18n.translations = {en, tr};
  i18n.locale = languageTag;
};
