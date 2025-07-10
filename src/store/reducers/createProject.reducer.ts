import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImpactAssessmentType } from 'src/core/adaptors';

export interface ProjectState {
  id: string;
  title: string;
  wallet_address?: string;
  cover_id: string;
  website?: string;
  description: string;
  social_cause: string;
  city: string;
  country: string;
  cover_url: string;
  email: string;
  linkedin?: string;
  category: string;
  problem_statement: string;
  solution: string;
  total_requested_amount?: number;
  feasibility: string;
  goals: string;
  video?: string;
  cost_breakdown: string;
  voluntery_contribution?: string;
  impact_assessment: string;
  impact_assessment_type: ImpactAssessmentType;
  mode?: 'create' | 'update';
}

const initialState: ProjectState = {
  id: '',
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
  total_requested_amount: undefined,
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
