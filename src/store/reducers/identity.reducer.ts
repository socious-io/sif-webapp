import { createSlice } from '@reduxjs/toolkit';
import { CurrentIdentity } from 'src/core/api';

const initState = {
  entities: [],
  status: 'idle',
  error: null,
  avatarImage: '',
};
export const identitySlice = createSlice({
  name: 'identity',
  initialState: initState as {
    entities: CurrentIdentity[];
    status: string;
    error: any;
    avatarImage: string;
  },
  reducers: {
    setIdentityList: (state, action) => {
      state.entities = action.payload.identities;
      if (action.payload.length) state.status = 'succeeded';
      const identity = state.entities.find(identity => identity.current);
      if (identity && identity.meta) {
        state.avatarImage =
          'avatar' in identity.meta
            ? identity.meta.avatar || ''
            : 'image' in identity.meta
              ? identity.meta.image || ''
              : '';
      } else state.avatarImage = '';
    },
    removeIdentityList: () => {
      return initState;
    },
  },
});

export const { setIdentityList, removeIdentityList } = identitySlice.actions;
