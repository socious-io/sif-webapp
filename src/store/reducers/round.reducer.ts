import { createSlice } from '@reduxjs/toolkit';
import { Round } from 'src/core/api';

import { fetchRound } from '../thunks/round.thunk';

const initState = { round: null };

export const roundsSlice = createSlice({
  name: 'round',
  initialState: initState as { round: Round | null },
  reducers: {
    setRound: (state, action) => {
      state.round = action.payload;
    },
    removeRound: () => {
      return initState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRound.fulfilled, (state, action) => {
        state.round = action.payload;
      })
      .addCase(fetchRound.rejected, (state, action) => {
        console.error('Failed to fetch round:', action.payload);
      });
  },
});

export const { setRound, removeRound } = roundsSlice.actions;
export default roundsSlice.reducer;
