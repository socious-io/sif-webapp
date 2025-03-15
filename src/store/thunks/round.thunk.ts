import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRound } from 'src/core/api';
import { Round } from 'src/core/api';

export const fetchRound = createAsyncThunk<Round, void>('round/fetchRound', async (_, { rejectWithValue }) => {
  try {
    const roundData = await getRound();
    return roundData;
  } catch (error) {
    return rejectWithValue('Error in fetching round data.');
  }
});
