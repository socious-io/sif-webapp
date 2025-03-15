import { createSlice } from '@reduxjs/toolkit';
import { Round } from 'src/core/api';

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
});

export const { setRound, removeRound } = roundsSlice.actions;

export default roundsSlice.reducer;
