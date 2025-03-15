import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import i18next from 'i18next';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { getRound, identities } from './core/api';
import { RootState } from './store';

import 'src/core/translation/i18n';
import { setRound } from './store/reducers/round.reducer';

function App() {
  const { language } = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();

  const getIdentities = async () => {
    const new_identities = await identities();
    await dispatch(setIdentityList(new_identities));
  };
  useEffect(() => {
    i18next.changeLanguage(language);
    getIdentities();
  }, [language]);

  useEffect(() => {
    const fetchRound = async () => {
      const roundData = await getRound();
      dispatch(setRound(roundData));
    };
    fetchRound();
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router.routes} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
