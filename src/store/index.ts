import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { createProjectSlice } from './reducers/createProject.reducer';
import { identitySlice } from './reducers/identity.reducer';
import { languageSlice } from './reducers/language.reducer';
import { notificationSlice } from './reducers/notification.reducer';
import { roundsSlice } from './reducers/round.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['createProject', 'identity'],
};

const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  language: languageSlice.reducer,
  notification: notificationSlice.reducer,
  createProject: createProjectSlice.reducer,
  identity: identitySlice.reducer,
  round: roundsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modals/openModal', 'persist/PERSIST'],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
