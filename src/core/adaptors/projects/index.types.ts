import { IdentityType } from 'src/core/api';
import { DateRangeStatus } from 'src/core/helpers/date-converter';

import { PaginateRes } from '..';

export type RoundStats = {
  estimatedMatch?: number;
  donatedAmount: { USD: number };
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
  coverImg: string;
  category: string;
  title: string;
  description: string;
  creator: { id: string; type: IdentityType; name: string; img: string; username?: string };
  website?: string;
  location?: string;
  overview?: JSX.Element;
  roundStats?: RoundStats;
  donations?: Donation[];
  voted?: boolean;
  roundStatus?: DateRangeStatus;
  feasibility: string;
  goals?: string | null;
  impact_assessment: number | null;
  linkdin?: string | null;
  problem_statement: string;
  email?: string;
  solution: string;
  total_requested_amount: number | null;
  cost_beakdown: string;
  video?: string;
}

export type ProjectRes = PaginateRes<Project>;

export type DonateReq = {
  donate: number;
  currency?: string;
  preventDisplayName: boolean;
  transactionHash?: string;
  wallet_address?: string;
  type?: 'FIAT' | 'CRYPTO';
  token?: string;
};
