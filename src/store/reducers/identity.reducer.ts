import { createSlice } from '@reduxjs/toolkit';
import { CurrentIdentity } from 'src/core/adaptors';

import { currentIdentities } from '../thunks/identity,thunk';

const initState = {
  entities: [],
  status: 'idle',
  error: null,
};
export const identitySlice = createSlice({
  name: 'identity',
  initialState: initState as {
    entities: CurrentIdentity[];
    status: string;
    error: any;
  },
  reducers: {
    setIdentityList: (state, action) => {
      state.entities = action.payload;
      if (action.payload.length) state.status = 'succeeded';
    },
    removeIdentityList: () => {
      return initState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(currentIdentities.pending, state => {
        state.status = 'loading';
      })
      .addCase(currentIdentities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload || [];
      })
      .addCase(currentIdentities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdentityList, removeIdentityList } = identitySlice.actions;
