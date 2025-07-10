import { Identity, PaginateResV3, Round } from '..';
import { Media } from '../media/index.types';

export type ProjectStatus = 'ACTIVE' | 'DRAFT';

export interface Project {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  social_cause: string;
  identity: Identity;
  cover: Media;
  website: string;
  status: ProjectStatus;
  wallet_address: string;
  wallet_env: string;
  total_donations: { [currency: string]: number };
  total_votes: number;
  user_voted: boolean;
  round: Round;
  feasibility: string;
  goals: string;
  impact_assessment: string;
  linkedin: string;
  problem_statement: string;
  email: string;
  solution: string;
  total_requested_amount: number;
  video: string;
  cost_breakdown: string;
  category: string;
  voluntery_contribution: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
  deleted_at: Date;
}

export type ProjectsRes = PaginateResV3<Project>;

export type DonationReq = {
  amount: number;
  currency?: string;
  txid?: string;
  wallet_address?: string;
  payment_type?: 'FIAT' | 'CRYPTO';
  card_token?: string;
  rate: number;
};

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  reply_id?: string;
  replied: boolean;
  likes: number;
  reported: boolean;
  identity_reaction?: string;
  liked: boolean;
  identity: Identity;
  identity_type: Identity['type'];
  created_at: Date;
  updated_at: Date;
  reactions?: Reaction[];
  children?: Comment[];
}

export interface Reaction {
  count: number;
  reaction: string;
}
export type CommentsRes = PaginateResV3<Comment>;

export interface CommentReq {
  content: string;
  parent_id?: string;
}
