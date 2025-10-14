import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { createProjectSlice } from './reducers/createProject.reducer';
import { identitySlice } from './reducers/identity.reducer';
import { loadingSlice } from './reducers/loading.reducer';
import { notificationSlice } from './reducers/notification.reducer';
import { roundsSlice } from './reducers/round.reducer';
import { walletSlice } from './reducers/wallet.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['createProject', 'identity'],
};

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  notification: notificationSlice.reducer,
  createProject: createProjectSlice.reducer,
  identity: identitySlice.reducer,
  round: roundsSlice.reducer,
  wallet: walletSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'wallet/setWalletState'],
        ignoredPaths: ['wallet.wallet', 'wallet.walletProvider'],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
