import { ThemeProvider } from '@emotion/react';
import { BrowserWallet } from '@meshsdk/core';
import { StyledEngineProvider } from '@mui/material';
import i18next from 'i18next';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { RTL_LANGUAGES } from './constants/Languages';
import { setupInterceptors } from './core/api/http';
import RequestLoading from './modules/General/components/RequestLoading';
import store, { AppDispatch, RootState } from './store';
import 'src/core/translation/i18n';
import { currentIdentities } from './store/thunks/identity,thunk';
import { fetchRound } from './store/thunks/round.thunk';

function App() {
  const { language } = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();
  useEffect(() => {
    const currentLang = i18n.language;
    const direction = RTL_LANGUAGES.includes(currentLang) ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    setupInterceptors(store);
  }, []);

  useEffect(() => {
    dispatch(currentIdentities());
    dispatch(fetchRound());
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router.routes} />
        <RequestLoading />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
