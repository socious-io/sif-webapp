import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SocialCauseVal = {
  label: string;
  value: string;
};
export interface ProjectState {
  name: string;
  wallet: string;
  coverImage: string;
  website?: string | null;
  description: string;
  socialCause: string;
  city: string;
  country: string;
}

const initialState: ProjectState = {
  name: '',
  wallet: '',
  coverImage: '',
  website: '',
  description: '',
  socialCause: '',
  city: '',
  country: '',
};

export const createProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<Partial<ProjectState>>) => {
      return { ...state, ...action.payload };
    },
    resetProject: () => initialState,
  },
});

export const { setProjectData, resetProject } = createProjectSlice.actions;

export default createProjectSlice.reducer;
