import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from 'src/constants/Languages';

const useSwitchLanguage = (defaultLanguage = 'en') => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || defaultLanguage);

  const switchLanguage = language => {
    if (LANGUAGES.map(lang => lang.value).includes(language)) {
      setSelectedLanguage(language);
      i18n.changeLanguage(language);
      localStorage.setItem('lang', language);
      window.location.reload();
    } else {
      console.warn(`Language '${language}' is not supported.`);
    }
  };
  return {
    selectedLanguage,
    switchLanguage,
  };
};

export default useSwitchLanguage;
