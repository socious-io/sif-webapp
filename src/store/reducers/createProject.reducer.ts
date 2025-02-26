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
  socialCauses: SocialCauseVal[];
  location: string;
}

const initialState: ProjectState = {
  name: 'Project name',
  wallet: '',
  coverImage: 'https://marketplace.canva.com/EAE4nT7zOMA/1/0/1600w/canva-professional-linkedin-banner-XlMmvzORY4U.jpg',
  website: 'www.example.com',
  description: 'A project with blockchain and for crowdfunding',
  socialCauses: [],
  location: '',
};

export const createProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<Partial<ProjectState>>) => {
      console.log(state);
      return { ...state, ...action.payload };
    },
    resetProject: () => initialState,
  },
});

export const { setProjectData, resetProject } = createProjectSlice.actions;

export default createProjectSlice.reducer;
