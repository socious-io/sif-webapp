import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    showLoading: () => {
      return true;
    },
    hideLoading: () => {
      return false;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
