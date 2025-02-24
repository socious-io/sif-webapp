import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectState {
  name: string;
  wallet: string;
  coverImage: string;
  website: string;
  description: string;
  socialCauses: string[];
  location: string;
}

const initialState: ProjectState = {
  name: '',
  wallet: '',
  coverImage: '',
  website: '',
  description: '',
  socialCauses: [],
  location: '',
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
