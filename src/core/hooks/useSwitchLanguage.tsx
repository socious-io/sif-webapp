import i18next from 'i18next';
import { useState } from 'react';
import { LANGUAGES } from 'src/constants/Languages';

const useSwitchLanguage = (defaultLanguage = 'en') => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('i18nextLng') || defaultLanguage;
  });

  const switchLanguage = language => {
    if (LANGUAGES.map(lang => lang.value).includes(language)) {
      setSelectedLanguage(language);
      i18next.changeLanguage(language);
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
