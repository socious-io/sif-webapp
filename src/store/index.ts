import { configureStore } from '@reduxjs/toolkit';

import { createProjectSlice } from './reducers/createProject.reducer';
import { identitySlice } from './reducers/identity.reducer';
import { languageSlice } from './reducers/language.reducer';
import { notificationSlice } from './reducers/notification.reducer';
import { roundsSlice } from './reducers/round.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';

const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
    language: languageSlice.reducer,
    notification: notificationSlice.reducer,
    createProject: createProjectSlice.reducer,
    identity: identitySlice.reducer,
    round: roundsSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({ serializableCheck: { ignoredActions: ['modals/openModal'] } });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
export type AppDispatch = typeof store.dispatch;
