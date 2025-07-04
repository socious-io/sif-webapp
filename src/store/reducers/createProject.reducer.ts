import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'yup';

export interface ProjectState {
  id?: string | null;
  title: string;
  wallet_address: string;
  cover_id: string;
  website?: string | null;
  description: string;
  social_cause: string;
  city: string;
  country: string;
  cover_url: string;
  email?: string | null;
  linkedin?: string | null;
  category: string;
  problem_statement: string;
  solution: string;
  total_requested_amount?: number | null;
  feasibility: string;
  goals?: string;
  video?: string;
  cost_breakdown: string;
  voluntery_contribution: string;
  impact_assessment: string;
  impact_assessment_type: 'OPTION_A' | 'OPTION_B';
  mode?: 'create' | 'update';
}

const initialState: ProjectState = {
  id: null,
  title: '',
  wallet_address: '',
  cover_id: '',
  cover_url: '',
  website: '',
  description: '',
  social_cause: '',
  city: '',
  country: '',
  email: '',
  linkedin: '',
  category: '',
  problem_statement: '',
  solution: '',
  goals: '',
  video: '',
  cost_breakdown: '',
  voluntery_contribution: '',
  feasibility: '',
  impact_assessment: '',
  total_requested_amount: null,
  impact_assessment_type: 'OPTION_A',
  mode: 'create',
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
