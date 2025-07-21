import { IdentityType, ProjectStatus } from 'src/core/api';
import { DateRangeStatus } from 'src/core/helpers/date-converter';

import { PaginateRes } from '..';

export type ImpactAssessmentType = 'OPTION_A' | 'OPTION_B';

export type RoundStats = {
  estimatedMatch?: number;
  donations: Record<string, number>;
  votes: number;
};

export interface Donation {
  id: string;
  donated_identity: { name: string };
  donated_price: string;
  date: string;
}

export interface Project {
  id: string;
  coverImg?: string;
  socialCause?: string;
  title: string;
  description: string;
  creator: { id: string; type: IdentityType; name: string; img: string; username?: string };
  feasibility: string;
  impact_assessment: string;
  problem_statement: string;
  solution: string;
  total_requested_amount?: number;
  cost_breakdown: string;
  category?: string;
  website?: string;
  location?: string;
  overview?: JSX.Element;
  roundStats?: RoundStats;
  donations?: Donation[];
  voted?: boolean;
  roundStatus?: DateRangeStatus;
  goals?: string;
  linkedin?: string;
  email?: string;
  video?: string;
  voluntery_contribution?: string;
  status?: ProjectStatus;
  wallet_address?: string;
  wallet_env?: string;
  votingStartAt?: Date;
}

export type ProjectRes = PaginateRes<Project>;

export type ProjectReq = {
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
};

export type DonateReq = {
  donate: number;
  currency?: string;
  preventDisplayName: boolean;
  transactionHash?: string;
  wallet_address?: string;
  type?: 'FIAT' | 'CRYPTO';
  token?: string;
  rate: number;
  anonymous: boolean;
};

export type Donate = {
  id: string;
  amount: number;
  anonymous: boolean;
  name: string;
  date: string;
  currency: string;
};

export interface ConfirmDonationRes {
  donationId: string;
  is3DSRequired: boolean;
  clientSecret: string;
}

export type VotedOrDonatedRes = ConfirmDonationRes | { message: string };
