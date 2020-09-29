import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {setI18nConfig} from '../i18n/i18n';

export const useLanguageListener = () => {
  const {auth} = useSelector(state => ({
    auth: state.auth,
  }));

  const {language} = auth.user || {language: 'en'};

  useEffect(() => {
    if (language) {
      setI18nConfig(language);
    }

    return () => null;
  }, [language]);
};
